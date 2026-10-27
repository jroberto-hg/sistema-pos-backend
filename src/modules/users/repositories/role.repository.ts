import { Role } from '../entities/role.entity.js';

export interface IRoleRepository {
    findAll(): Promise<Role[]>;

    findById(id: number): Promise<Role | null>;

    findByName(name: string): Promise<Role | null>;

    save(role: Role): Promise<Role>;
    
    delete(id: number): Promise<void>;
}

export const ROLE_REPOSITORY = Symbol('ROLE_REPOSITORY');