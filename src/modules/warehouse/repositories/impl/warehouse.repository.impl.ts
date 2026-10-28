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
        return this.warehouseRepository.find({ order: { name: 'ASC' } });
    }

    async findById(id: number): Promise<Warehouse | null> {
        return this.warehouseRepository.findOne({ where: { id } });
    }

    async save(warehouse: Warehouse): Promise<Warehouse> {
        return this.warehouseRepository.save(warehouse);
    }
}