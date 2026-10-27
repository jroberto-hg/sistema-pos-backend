import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Warehouse } from "./entities/warehouse.entity.js";
import { Stock } from "./entities/stock.entity.js";
import { InventoryMovement } from "./entities/inventory-movement-entity.js";
import { WarehouseController } from "./warehouse.controller.js";
import { WarehouseService } from "./warehouse.service.js";
import { WAREHOUSE_REPOSITORY } from "./repositories/warehouse.repository.js";
import { WarehouseRepositoryImpl } from "./repositories/impl/warehouse.repository.impl.js";

@Module({
    imports: [TypeOrmModule.forFeature([Warehouse, Stock, InventoryMovement])],
    controllers: [WarehouseController],
    providers: [
        WarehouseService,
        {
            provide: WAREHOUSE_REPOSITORY,
            useClass: WarehouseRepositoryImpl,
        },
    ],
    exports: [WarehouseService, WAREHOUSE_REPOSITORY],
})

export class InventoryModule { }