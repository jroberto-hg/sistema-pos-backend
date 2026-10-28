import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";

//Entidades
import { SaleDto } from "./dtos/sale.dto.js";
import { SaleDetail } from "./entities/sale-detail.entity.js";
import { Sale, SaleStatus } from "./entities/sale.entity.js";

//Sales
import { SALE_REPOSITORY } from "./repositories/sale.repository.js";
import type { ISaleRepository } from './repositories/sale.repository.js';

//Products
import { PRODUCT_REPOSITORY } from "../catalog/repositories/product.repository.js";
import type { IProductRepository } from "../catalog/repositories/product.repository.js";

//Customers
import { CUSTOMER_REPOSITORY } from "../customers/repositories/customer.repository.js";
import type { ICustomerRepository } from "../customers/repositories/customer.repository.js";
import { PosSocketAdapter } from "../../commons/events/adapters/pos-socket.adapters.js";
import { DataSource } from "typeorm";
import { InventoryStock } from "../inventory/entities/inventory-stock.entity.js";

@Injectable()
export class SaleService {
    constructor(
        @Inject(SALE_REPOSITORY)
        private readonly saleRepository: ISaleRepository,

        @Inject(PRODUCT_REPOSITORY)
        private readonly productRepository: IProductRepository,
        
        @Inject(CUSTOMER_REPOSITORY)
        private readonly customerRepository: ICustomerRepository,
        private readonly dataSource: DataSource,
        private readonly posSocketAdapter: PosSocketAdapter,
    ) { }

    async findAll() {
        return await this.saleRepository.findAll();
    }

    async findById(id: number) {
        const sale = await this.saleRepository.findById(id);
        if (!sale) {
            throw new NotFoundException(`Venta con ID ${id} no encontrada.`);
        }
        return sale;
    }

    async create(dto: SaleDto) {
        // Validar cliente si se proporciona
        if (dto.customer_id) {
            const customer = await this.customerRepository.findById(dto.customer_id);
            if (!customer) {
                throw new NotFoundException(`El cliente con ID ${dto.customer_id} no existe.`);
            }
        }

        if (!dto.items || dto.items.length === 0) {
            throw new BadRequestException('La venta debe incluir al menos un producto.');
        }

        let subtotal = 0;
        const details: SaleDetail[] = [];

        // Procesar cada item, validar stock y calcular precios
        for (const item of dto.items) {
            const product = await this.productRepository.findById(item.product_id);
            if (!product) {
                throw new NotFoundException(`Producto con ID ${item.product_id} no encontrado.`);
            }

            if (product.stock < item.quantity) {
                throw new BadRequestException(`Stock insuficiente para el producto '${product.name}'. Stock actual: ${product.stock}`);
            }

            // Descontar stock
            product.stock -= item.quantity;
            await this.productRepository.save(product);

            // emitir evento de actualización de stock 
            this.posSocketAdapter.emitEvent('stock:updated', { productId: product.id, newStock: product.stock });

            const itemSubtotal = Number(product.sale_price) * item.quantity;
            subtotal += itemSubtotal;

            const detail = new SaleDetail();
            detail.product = product;
            detail.quantity = item.quantity;
            detail.unit_price = product.sale_price;
            detail.subtotal = itemSubtotal;

            details.push(detail);
        }

        const tax = dto.tax ?? 0;
        const total = subtotal + tax;

        // 3. Crear y guardar la venta
        const sale = new Sale();
        sale.invoice_number = dto.invoice_number;
        sale.payment_method = dto.payment_method;
        sale.customer_id = dto.customer_id ?? null;
        sale.subtotal = subtotal;
        sale.tax = tax;
        sale.total = total;
        sale.details = details;

        const savedSale = await this.saleRepository.save(sale);

        // Emitir evento en tiempo real de que una venta fue creada exitosamente
        this.posSocketAdapter.emitEvent('sale:created', savedSale);
    }

    async cancel(saleId: number): Promise<Sale> { 
        // Ejecutamos todo dentro de una transacción para garantizar consistencia
        return await this.dataSource.transaction(async (manager) => { 
            // 1. Buscar la venta con sus detalles y almacén
            const sale = await manager.findOne(Sale, {
                where: { id: saleId },
                relations: ['details', 'details.product'],
            });

            if (!sale) {
                throw new NotFoundException(`Venta con ID ${saleId} no encontrada`);
            }

            if (sale.status === SaleStatus.CANCELLED) {
                throw new BadRequestException(`La venta ${saleId} ya se encuentra cancelada`);
            }

            // 2. Devolver el stock al inventario por cada ítem de la venta
            const returnedItems = [];
            for (const detail of sale.details) { 
                // Buscamos el stock en el almacén donde se realizó la venta (o el almacén por defecto)
                let inventoryStock = await manager.findOne(InventoryStock, {
                    where: {
                        warehouse_id: sale.warehouse_id,
                        product_id: detail.product_id,
                    },
                });

                if (inventoryStock) { 
                    // Sumamos de vuelta la cantidad vendida
                    inventoryStock.stock = Number(inventoryStock.stock) + Number(detail.quantity);
                    await manager.save(inventoryStock);
                } else {
                    // Si por alguna razón el registro no existía, lo creamos con la cantidad devuelta
                    inventoryStock = manager.create(InventoryStock, {
                        warehouse_id: sale.warehouse_id,
                        product_id: detail.product_id,
                        stock: detail.quantity,
                    });

                    await manager.save(inventoryStock);
                }

                returnedItems.push({
                    productId: detail.product_id,
                    quantity: detail.quantity,
                });
            }

            // 3. Actualizar el estado de la venta a CANCELLED
            sale.status = SaleStatus.CANCELLED;
            const updatedSale = await manager.save(sale);
            
            // 4. Emitir el evento por WebSockets en tiempo real
            this.posSocketAdapter.emitEvent('sale:cancelled', {
                saleId: updatedSale.id,
                warehouseId: sale.warehouse_id,
                returnedItems,
                cancelledAt: new Date(),
            });

            return updatedSale;
        });
    }
}