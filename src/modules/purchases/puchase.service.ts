import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Purchase, PurchaseStatus } from "./entities/purchase.entity.js";
import { DataSource, Repository } from "typeorm";
import { PurchaseDetail } from "./entities/purchase-detail.entity.js";
import { Product } from "../catalog/entities/product.entity.js";
import { PosSocketAdapter } from "../../commons/events/adapters/pos-socket.adapters.js";

@Injectable()
export class PurchaseService { 
    constructor(
        @InjectRepository(Purchase)
        private readonly purchaseRepository: Repository<Purchase>,

        @InjectRepository(PurchaseDetail)
        private readonly purchaseDetailRepository: Repository<PurchaseDetail>,

        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly posSocketAdapter: PosSocketAdapter,
        private readonly dataSource: DataSource,
    ) { }

    async findAll(): Promise<Purchase[]> {
        return await this.purchaseRepository.find({
            relations: ['supplier', 'details', 'details.product'],
            order: { created_at: 'DESC' },
        });
    }

    async findById(id: number): Promise<Purchase> {
        const purchase = await this.purchaseRepository.findOne({
            where: { id },
            relations: ['supplier', 'details', 'details.product'],
        });

        if (!purchase) {
            throw new NotFoundException(`La compra con ID ${id} no fue encontrada`);
        }

        return purchase;
    }

    async create(purchaseDto: any): Promise<Purchase> {
        const { invoice_number, supplier_id, details } = purchaseDto;

        // Utilizamos un QueryRunner para manejar transacciones atómicas (Stock + Compra)
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            let total_cost = 0;
            const purchaseDetails: PurchaseDetail[] = []
            
            for (const item of details) {
                const product = await queryRunner.manager.findOne(Product, { 
                    where: { id: item.product_id } 
                });

                if (!product) {
                    throw new NotFoundException(`Producto con ID ${item.product_id} no encontrado`);
                }

                const subtotal = Number(item.quantity) * Number(item.unit_cost);
                total_cost += subtotal;

                const detail = new PurchaseDetail();
                detail.product = product;
                detail.quantity = item.quantity;
                detail.unit_cost = item.unit_cost;
                detail.subtotal = subtotal;
                purchaseDetails.push(detail);

                product.stock = Number(product.stock) + Number(item.quantity);
                product.purchase_price = item.unit_cost;

                await queryRunner.manager.save(product);
            }

            const purchase = queryRunner.manager.create(Purchase, {
                invoice_number,
                supplier_id,
                total_cost,
                status: PurchaseStatus.COMPLETED,
                details: purchaseDetails,
            });

            const savedPurchase = await queryRunner.manager.save(Purchase, purchase);

            await queryRunner.commitTransaction();

            this.posSocketAdapter.emitEvent('purchase_created', savedPurchase);

            return savedPurchase;
        } catch (error) {
            // Revertir cambios si algo falla
            await queryRunner.rollbackTransaction();
            throw new BadRequestException(`Error al registrar la compra: ${error}`);
        } finally {
            // Liberar la conexión
            await queryRunner.release();
        }
    }
}