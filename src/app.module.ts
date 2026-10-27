import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config.js';
import { CatalogModule } from './modules/catalog/catalog.module.js';
import { CustomerModule } from './modules/customers/customer.module.js';
import { SaleModule } from './modules/sales/sale.module.js';
import { IamModule } from './modules/users/iam.module.js';
import { InventoryModule } from './modules/inventory/inventoey.module.js';
import { PurchasesModule } from './modules/purchases/purchases.module.js';
import { QuotationsModule } from './modules/quotations/quotations.module.js';
import { ReportsModule } from './modules/reports/report.module.js';

@Module({
    imports: [
        // Configuración global usando tu archivo database.config
        TypeOrmModule.forRootAsync({
            useFactory: () => databaseConfig(),
        }),
        
        IamModule,
        CatalogModule,
        CustomerModule,
        SaleModule,
        InventoryModule,
        PurchasesModule,
        QuotationsModule,
        ReportsModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }