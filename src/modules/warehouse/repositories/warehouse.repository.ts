import { Warehouse } from "../entities/warehouse.entity.js";

export interface IWarehouseRepository {
    findAll(): Promise<Warehouse[]>;

    findById(id: number): Promise<Warehouse | null>;

    save(warehouse: Warehouse): Promise<Warehouse>;
}

export const WAREHOUSE_REPOSITORY = Symbol('WAREHOUSE_REPOSITORY');