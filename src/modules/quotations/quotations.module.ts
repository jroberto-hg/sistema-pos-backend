import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Quotation } from "./entities/quotation.entity.js";
import { QuotationDetail } from "./entities/quotation-detail.entity.js";
import { QuotationController } from "./quotation.controller.js";
import { QuotationService } from "./quotation.service.js";
import { QUOTATION_REPOSITORY } from "./repositories/quotation.repository.js";
import { QuotationRepositoryImpl } from "./repositories/impl/quotation.repository.impl.js";

@Module({
    imports: [TypeOrmModule.forFeature([Quotation, QuotationDetail])],
    controllers: [QuotationController],
    providers: [
        QuotationService,
        {
            provide: QUOTATION_REPOSITORY,
            useClass: QuotationRepositoryImpl,
        },
    ],
    exports: [QuotationService, QUOTATION_REPOSITORY],
})

export class QuotationsModule {}