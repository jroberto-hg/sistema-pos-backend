import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transfer } from "./entities/transfer.entity.js";
import { TransferDetail } from "./entities/transfer-details.js";
import { TransferController } from "./transfer-controller.js";
import { TransferService } from "./transfer-service.js";
import { TRANSFER_REPOSITORY } from "./repositories/transfer.repository.js";
import { TransferTypeOrmRepository } from "./repositories/impl/transfer.repository.impl.js";
import { EventsModule } from "../../commons/events/event.module.js";

@Module({
    imports: [
        TypeOrmModule.forFeature([Transfer, TransferDetail]),
        EventsModule
    ],
    controllers: [TransferController],
    providers: [
        TransferService,
        {
            provide: TRANSFER_REPOSITORY,
            useClass: TransferTypeOrmRepository,
        },
    ],
    exports: [TransferService, TRANSFER_REPOSITORY],
})

export class TransferModule { }