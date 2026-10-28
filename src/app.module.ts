import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config.js';
import { CatalogModule } from './modules/catalog/catalog.module.js';
import { CustomerModule } from './modules/customers/customer.module.js';
import { SaleModule } from './modules/sales/sale.module.js';
import { IamModule } from './modules/users/iam.module.js';
import { InventoryModule } from './modules/inventory/inventory.module.js';
import { QuotationsModule } from './modules/quotations/quotations.module.js';
import { ReportsModule } from './modules/reports/report.module.js';
import { PurchaseModule } from './modules/purchases/purchase.module.js';
import { SuppliersModule } from './modules/suppliers/supplier-module.js';
import { WarehouseModule } from './modules/warehouse/warehouse.module.js';
import { TransferModule } from './modules/transfers/transfer-module.js';
import { LoggerModule } from './commons/logger/logger.module.js';

@Module({
    imports: [
        // Configuración global usando tu archivo database.config
        TypeOrmModule.forRootAsync({
            useFactory: () => databaseConfig(),
        }),
        
        LoggerModule,
        IamModule,
        CatalogModule,
        CustomerModule,
        SuppliersModule,
        WarehouseModule,
        InventoryModule,
        TransferModule,
        SaleModule,
        InventoryModule,
        PurchaseModule,
        QuotationsModule,
        ReportsModule
    ],
    controllers: [],
    providers: [],
})

export class AppModule { }