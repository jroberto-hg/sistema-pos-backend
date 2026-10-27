import { Sale } from "../entities/sale.entity.js";

export interface ISaleRepository {
    findAll(): Promise<Sale[]>;

    findById(id: number): Promise<Sale | null>;
    
    save(sale: Sale): Promise<Sale>;
}

export const SALE_REPOSITORY  = Symbol('SALE_REPOSITORY');