import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { SALE_REPOSITORY } from "./repositories/sale.repository.js";
import type { ISaleRepository } from './repositories/sale.repository.js';

import { PRODUCT_REPOSITORY } from "../catalog/repositories/product.repository.js";
import type { IProductRepository } from "../catalog/repositories/product.repository.js";

import { CUSTOMER_REPOSITORY } from "../customers/repositories/customer.repository.js";
import type { ICustomerRepository } from "../customers/repositories/customer.repository.js";
import { SaleDto } from "./dtos/sale.dto.js";
import { SaleDetail } from "./entities/sale-detail.entity.js";
import { Sale } from "./entities/sale.entity.js";


@Injectable()
export class SaleService {
    constructor(
        @Inject(SALE_REPOSITORY)
        private readonly saleRepository: ISaleRepository,

        @Inject(PRODUCT_REPOSITORY)
        private readonly productRepository: IProductRepository,
        
        @Inject(CUSTOMER_REPOSITORY)
        private readonly customerRepository: ICustomerRepository,
    ) {}

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

        return await this.saleRepository.save(sale);
    }
}