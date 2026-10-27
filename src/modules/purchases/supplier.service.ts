import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { SUPPLIER_REPOSITORY } from "./repositories/supplier.repository.js";
import type { ISupplierRepository } from "./repositories/supplier.repository.js";
import { Supplier } from "./entities/supplier.entity.js";
import { SupplierDto } from "./dtos/supplier.dto.js";

@Injectable()
export class SupplierService {
    constructor(
        @Inject(SUPPLIER_REPOSITORY)
        private readonly supplierRepository: ISupplierRepository,
    ) {}

    async findAll(): Promise<Supplier[]> {
        return this.supplierRepository.findAll();
    }

    async findOne(id: number): Promise<Supplier> {
        const supplier = await this.supplierRepository.findById(id);
        if (!supplier) {
            throw new NotFoundException(`Proveedor con ID ${id} no encontrado.`);
        }
        return supplier;
    }

    async create(dto: SupplierDto): Promise<Supplier> {
        return this.supplierRepository.create(dto);
    }
}