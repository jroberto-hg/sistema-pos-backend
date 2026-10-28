import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Transfer } from "../../entities/transfer.entity.js";
import { TransferRepository } from "../transfer.repository.js";

@Injectable()
export class TransferTypeOrmRepository implements TransferRepository { 
    constructor(
        @InjectRepository(Transfer)
        private readonly repository: Repository<Transfer>,
    ) { }

    async findAll(): Promise<Transfer[]> {
        return await this.repository.find({
            relations: ['origin_warehouse', 'destination_warehouse', 'details', 'details.product'],
            order: { created_at: 'DESC' },
        });
    }

    async findById(id: number): Promise<Transfer | null> {
        return await this.repository.findOne({
            where: { id },
            relations: ['origin_warehouse', 'destination_warehouse', 'details', 'details.product'],
        });
    }

    async save(transfer: Transfer): Promise<Transfer> {
        return await this.repository.save(transfer);
    }
}