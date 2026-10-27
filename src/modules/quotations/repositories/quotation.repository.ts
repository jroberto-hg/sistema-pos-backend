import { DeepPartial } from "typeorm";
import { Quotation } from "../entities/quotation.entity.js";

export interface IQuotationRepository {
    findAll(): Promise<Quotation[]>;

    findById(id: number): Promise<Quotation | null>;

    create(data: DeepPartial<Quotation>): Promise<Quotation>;
    
    save(quotation: Quotation): Promise<Quotation>;
}

export const QUOTATION_REPOSITORY  = Symbol('QUOTATION_REPOSITORY');