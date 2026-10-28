import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { WAREHOUSE_REPOSITORY } from "../warehouse/repositories/warehouse.repository.js";
import type { IWarehouseRepository } from "../warehouse/repositories/warehouse.repository.js";
import { Warehouse } from "./entities/warehouse.entity.js";
import { WarehouseDto } from "./dtos/warehouse.dto.js";

@Injectable()
export class WarehouseService {
    constructor(
        @Inject(WAREHOUSE_REPOSITORY)
        private readonly warehouseRepository: IWarehouseRepository,
    ) {}

    async findAll(): Promise<Warehouse[]> {
        return this.warehouseRepository.findAll();
    }

    async findOne(id: number): Promise<Warehouse> {
        const warehouse = await this.warehouseRepository.findById(id);
        if (!warehouse) {
            throw new NotFoundException(`Almacén con ID ${id} no encontrado.`);
        }
        return warehouse;
    }

    async create(dto: WarehouseDto): Promise<Warehouse> {
        const warehouse = new Warehouse();
        warehouse.name = dto.name;
        warehouse.location = dto.location ?? null; 
        return await this.warehouseRepository.save(warehouse);
    }
} 