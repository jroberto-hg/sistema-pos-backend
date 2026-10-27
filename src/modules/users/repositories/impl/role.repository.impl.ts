import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../entities/role.entity.js';
import { IRoleRepository } from '../role.repository.js';

@Injectable()
export class RoleRepositoryImpl implements IRoleRepository {
    constructor(
        @InjectRepository(Role)
        private readonly repository: Repository<Role>,
    ) {}

    async findAll(): Promise<Role[]> {
        return await this.repository.find();
    }

    async findById(id: number): Promise<Role | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async findByName(name: string): Promise<Role | null> {
        return await this.repository.findOne({ where: { name } });
    }

    async save(role: Role): Promise<Role> {
        return await this.repository.save(role);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}