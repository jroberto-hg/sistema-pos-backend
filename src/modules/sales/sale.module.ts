import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sale } from "./entities/sale.entity.js";
import { SaleDetail } from "./entities/sale-detail.entity.js";
import { CatalogModule } from "../catalog/catalog.module.js";
import { CustomerModule } from "../customers/customer.module.js";
import { SaleController } from "./sale.controller.js";
import { SaleService } from "./sale.service.js";
import { SALE_REPOSITORY } from "./repositories/sale.repository.js";
import { SaleRepositoryImpl } from "./repositories/impl/sale.repository.impl.js";

@Module({
    imports: [
        TypeOrmModule.forFeature([Sale, SaleDetail]),
        CatalogModule,
        CustomerModule
    ],
    controllers: [SaleController],
    providers: [
        SaleService,
        {
            provide: SALE_REPOSITORY,
            useClass: SaleRepositoryImpl,
        },
    ],
    exports: [TypeOrmModule]
})
export class SaleModule { }