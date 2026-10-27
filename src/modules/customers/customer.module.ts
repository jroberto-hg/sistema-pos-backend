import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "./entities/customer.entity.js";
import { CustomerController } from "./customer.controller.js";
import { CustomerService } from "./customer.service.js";
import { CUSTOMER_REPOSITORY } from "./repositories/customer.repository.js";
import { CustomerRepositoryImpl } from "./repositories/impl/customer.repository.impl.js";

@Module({
    imports: [
        TypeOrmModule.forFeature([Customer])
    ],
    controllers: [CustomerController],
    providers: [
        CustomerService,
        {
            provide: CUSTOMER_REPOSITORY,
            useClass: CustomerRepositoryImpl,
        },
    ],
    exports: [
        TypeOrmModule,
        CUSTOMER_REPOSITORY
    ]
})
export class CustomerModule { }