import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Purchase } from "./entities/purchase.entity.js";
import { PurchaseDetail } from "./entities/purchase-detail.entity.js";
import { Product } from "../catalog/entities/product.entity.js";
import { PurchaseController } from "./purchase.controller.js";
import { PurchaseService } from "./puchase.service.js";

@Module({
    imports: [
        TypeOrmModule.forFeature([Purchase, PurchaseDetail, Product]),
    ],
    controllers: [PurchaseController],
    providers: [PurchaseService],
    exports: [PurchaseService],
})
export class PurchaseModule {}