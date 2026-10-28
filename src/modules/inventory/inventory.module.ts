import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryStock } from "./entities/inventory-stock.entity.js";
import { InventoryMovement } from "./entities/inventory-movement-entity.js";
import { WarehouseModule } from "../warehouse/warehouse.module.js";
import { InventoryService } from "./inventory.service.js";
import { INVENTORY_REPOSITORY } from "./repositories/inventory.repository.js";
import { InventoryRepositoryImpl } from "./repositories/impl/inventory.repository.impl.js";
import { InventoryController } from "./inventory.controller.js";

@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryStock, InventoryMovement]),
        WarehouseModule, 
    ],
    controllers: [InventoryController],
    providers: [
        InventoryService,
        {
            provide: INVENTORY_REPOSITORY,
            useClass: InventoryRepositoryImpl,
        },
    ],
    exports: [InventoryService, INVENTORY_REPOSITORY],
})

export class InventoryModule { }