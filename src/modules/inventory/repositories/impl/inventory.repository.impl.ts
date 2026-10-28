import { Injectable } from "@nestjs/common";
import { IInventoryRepository } from "../inventory.repository.js";
import { InjectRepository } from "@nestjs/typeorm";
import { InventoryStock } from "../../entities/inventory-stock.entity.js";
import { Repository } from "typeorm";

@Injectable()
export class InventoryRepositoryImpl implements IInventoryRepository { 
    constructor(
        @InjectRepository(InventoryStock)
        private readonly inventoryRepository: Repository<InventoryStock>,
    ) { }

    async findByWarehouseAndProduct(warehouseId: number, productId: number): Promise<InventoryStock | null> {
        return await this.inventoryRepository.findOne({
            where: { warehouse_id: warehouseId, product_id: productId },
            relations: ['product', 'warehouse'],
        });
    }

    async save(inventoryStock: InventoryStock): Promise<InventoryStock> {
        return await this.inventoryRepository.save(inventoryStock);
    }
}