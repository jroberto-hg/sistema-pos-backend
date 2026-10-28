import { Purchase } from "../entities/purchase.entity.js";

export interface IPurchaseRepository {
    findAll(): Promise<Purchase[]>;

    findById(id: number): Promise<Purchase | null>;

    save(supplier: Purchase): Promise<Purchase>;
}

export const PURCHASE_REPOSITORY = Symbol('PURCHASE_REPOSITORY');