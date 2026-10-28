import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Supplier } from "../../entities/supplier.entity.js";
import { Repository } from "typeorm";
import { SupplierDto } from "../../dtos/supplier.dto.js";
import { ISupplierRepository } from "../supplier.repository.js";

@Injectable()
export class SupplierRepositoryImpl implements ISupplierRepository { 
    constructor(
        @InjectRepository(Supplier)
        private readonly repository: Repository<Supplier>,
    ) { }

    async findAll(): Promise<Supplier[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<Supplier | null> {
        return this.repository.findOne({ where: { id } });
    }

    async save(dto: SupplierDto): Promise<Supplier> {
        const supplier = this.repository.create(dto);
        return this.repository.save(supplier);
    }
}