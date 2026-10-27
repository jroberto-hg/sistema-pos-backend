import { Unit } from "../entities/unit.entity.js";

export interface IUnitRepository {
    findAll(): Promise<Unit[]>;

    findById(id: number): Promise<Unit | null>;

    findByNameOrCode(name: string, code: string): Promise<Unit| null>;

    save(unit: Unit): Promise<Unit>;

    delete(id: number): Promise<void>;
}

export const UNIT_REPOSITORY = Symbol('UNIT_REPOSITORY');