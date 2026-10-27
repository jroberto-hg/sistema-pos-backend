import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UNIT_REPOSITORY } from "../repositories/unit.repository.js";
import type { IUnitRepository } from "../repositories/unit.repository.js";
import { Unit } from "../entities/unit.entity.js";

@Injectable()
export class UnitService {
    constructor(
        @Inject(UNIT_REPOSITORY)
        private readonly unitRepository: IUnitRepository,
    ) { }

    async findAll() {
        return await this.unitRepository.findAll();
    }

    async findById(id: number) {
        const unit = await this.unitRepository.findById(id);
        if (!unit) {
            throw new NotFoundException(`Unidad con ID ${id} no encontrada.`);
        }

        return unit;
    }

    async create(data: { name: string, code: string }) {
        // Validar si ya existe una unidad con el mismo nombre o código
        const existingNameCode = await this.unitRepository.findByNameOrCode(data.name, data.code);
        if (existingNameCode) {
            throw new ConflictException(`Ya existe una unidad con el nombre '${data.name}' o código '${data.code}'.`);
        }

        //Crear instancia de unidad
        const newUnit = new Unit();
        newUnit.name = data.name;
        newUnit.code = data.code.toUpperCase();

        return await this.unitRepository.save(newUnit);
    }

    async update(id: number, data: Partial<{ name: string; code: string }>) {
        const unit = await this.unitRepository.findById(id);
        if (!unit) {
            throw new NotFoundException(`Unidad con ID ${id} no encontrada.`);
        }

        //Validamos que no pertenezcan a otra unidad
        if (data.name || data.code) {
            const existingNameCode = await this.unitRepository.findByNameOrCode(
                data.name ?? '',
                data.code ?? ''
            );
            if (existingNameCode && existingNameCode.id !== id) {
                throw new ConflictException(`Ya existe otra unidad con el nombre o código proporcionado.`);
            }
        }
        
        if (data.code) {
            data.code = data.code.toUpperCase();
        }

        Object.assign(unit, data);
        return await this.unitRepository.save(unit);
    }

    async remove(id: number) {
        // Validar si ya existe la unidad
        const unit = await this.unitRepository.findById(id);
        if (!unit) {
            throw new NotFoundException(`Unidad con ID ${id} no encontrada.`);
        }
        
        await this.unitRepository.delete(id);
        return { message: `Unidad con ID ${id} eliminada correctamente.` };
    }
}