import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Warehouse } from "../../entities/warehouse.entity.js";
import { Repository } from "typeorm";
import { IWarehouseRepository } from "../warehouse.repository.js";

@Injectable()
export class WarehouseRepositoryImpl implements IWarehouseRepository {
    constructor(
    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,
    ) { }

    async findAll(): Promise<Warehouse[]> {
        return this.warehouseRepository.find();
    }

    async findById(id: number): Promise<Warehouse | null> {
        return this.warehouseRepository.findOne({ where: { id } });
    }

    async findByName(name: string): Promise<Warehouse | null> {
        return this.warehouseRepository.findOne({ where: { name } });
    }

    async create(data: Partial<Warehouse>): Promise<Warehouse> {
        const warehouse = this.warehouseRepository.create(data);
        return this.warehouseRepository.save(warehouse);
    }

    async save(warehouse: Warehouse): Promise<Warehouse> {
        return this.warehouseRepository.save(warehouse);
    }
}