import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ROLE_REPOSITORY } from '../repositories/role.repository.js';
import type { IRoleRepository } from '../repositories/role.repository.js';
import { Role } from '../entities/role.entity.js';
import { RoleDto } from '../dtos/role.dto.js';

@Injectable()
export class RoleService {
    constructor(
        @Inject(ROLE_REPOSITORY)
        private readonly roleRepository: IRoleRepository,
    ) {}

    async findAll() {
        return await this.roleRepository.findAll();
    }

    async findById(id: number) {
        const role = await this.roleRepository.findById(id);
        if (!role) {
            throw new NotFoundException(`Rol con ID ${id} no encontrado.`);
        }
        return role;
    }

    async create(dto: RoleDto) {
        const existing = await this.roleRepository.findByName(dto.name);
        if (existing) {
            throw new ConflictException(`El rol '${dto.name}' ya existe.`);
        }

        const role = new Role();
        Object.assign(role, dto);

        return await this.roleRepository.save(role);
    }

    async update(id: number, dto: Partial<RoleDto>) {
        const role = await this.findById(id);

        if (dto.name && dto.name !== role.name) {
            const existing = await this.roleRepository.findByName(dto.name);
            if (existing) {
                throw new ConflictException(`Ya existe otro rol con el nombre '${dto.name}'.`);
            }
        }

        Object.assign(role, dto);
        return await this.roleRepository.save(role);
    }

    async remove(id: number) {
        await this.findById(id);
        await this.roleRepository.delete(id);
        return { message: `Rol con ID ${id} eliminado correctamente.` };
    }
}