import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryStock } from './entities/inventory-stock.entity.js';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(InventoryStock)
        private readonly inventoryRepository: Repository<InventoryStock>,
    ) {}

    async getStockByWarehouseAndProduct(warehouseId: number, productId: number): Promise<InventoryStock> {
        let stockRecord = await this.inventoryRepository.findOne({
            where: { warehouse_id: warehouseId, product_id: productId },
        });

        if (!stockRecord) {
            // Si no existe el registro de stock para este almacén, lo inicializamos en 0
            stockRecord = this.inventoryRepository.create({
                warehouse_id: warehouseId,
                product_id: productId,
                stock: 0,
            });
            await this.inventoryRepository.save(stockRecord);
        }

        return stockRecord;
    }
}