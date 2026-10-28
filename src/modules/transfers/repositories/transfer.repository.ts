import { Transfer } from "../entities/transfer.entity.js";

export interface TransferRepository {
    findAll(): Promise<Transfer[]>;

    findById(id: number): Promise<Transfer | null>;

    save(transfer: Transfer): Promise<Transfer>;
}

export const TRANSFER_REPOSITORY = Symbol('TRANSFER_REPOSITORY');