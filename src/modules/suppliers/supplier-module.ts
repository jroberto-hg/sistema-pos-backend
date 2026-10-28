import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Supplier } from "./entities/supplier.entity.js";
import { SupplierController } from "./supplier.controller.js";
import { SupplierService } from "./supplier.service.js";
import { SUPPLIER_REPOSITORY } from "./repositories/supplier.repository.js";
import { SupplierRepositoryImpl } from "./repositories/impl/supplier.repository.impl.js";

@Module({
    imports: [
        TypeOrmModule.forFeature([Supplier]),
    ],
    controllers: [SupplierController],
    providers: [
        SupplierService,
        {
            provide: SUPPLIER_REPOSITORY,
            useClass: SupplierRepositoryImpl,
        },
    ],
    exports: [SupplierService, SUPPLIER_REPOSITORY],
})

export class SuppliersModule { }