import { Injectable } from "@nestjs/common";
import { IUnitRepository } from "../unit.repository.js";
import { Unit } from "../../entities/unit.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UnitRepositoryImpl implements IUnitRepository {
    constructor (
        @InjectRepository(Unit)
        private readonly unitRepository: Repository<Unit>,
    ) { }

    async findAll(): Promise<Unit[]> {
        return await this.unitRepository.find();
    }

    async findById(id: number): Promise<Unit | null> {
        return await this.unitRepository.findOne({ where: { id } });
    }

    async findByNameOrCode(name: string, code: string): Promise<Unit | null> {
        return await this.unitRepository.findOne({
            where: [{ name }, { code }],
        });
    }

    async save(unit: Unit): Promise<Unit> {
        return await this.unitRepository.save(unit);
    }

    async delete(id: number): Promise<void> {
        await this.unitRepository.delete(id);
    }
}