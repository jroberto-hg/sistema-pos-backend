import { SupplierDto } from "../dtos/supplier.dto.js";
import { Supplier } from "../entities/supplier.entity.js";

export interface ISupplierRepository {
    findAll(): Promise<Supplier[]>;

    findById(id: number): Promise<Supplier | null>;
    
    save(dto: SupplierDto): Promise<Supplier>;
}

export const SUPPLIER_REPOSITORY  = Symbol('SUPPLIER_REPOSITORY');