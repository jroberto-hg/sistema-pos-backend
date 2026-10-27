import { Supplier } from "../entities/supplier.entity.js";

export interface ISupplierRepository {
    findAll(): Promise<Supplier[]>;

    findById(id: number): Promise<Supplier | null>;

    create(data: Partial<Supplier>): Promise<Supplier>;
    
    save(supplier: Supplier): Promise<Supplier>;
}

export const SUPPLIER_REPOSITORY  = Symbol('SUPPLIER_REPOSITORY');