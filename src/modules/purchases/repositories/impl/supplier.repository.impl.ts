import { Injectable } from "@nestjs/common";
import { Supplier } from '../../entities/supplier.entity.js';
import { ISupplierRepository } from '../supplier.repository.js';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class SupplierRepositoryImpl implements ISupplierRepository {
    constructor(
        @InjectRepository(Supplier)
        private readonly supplierRepository: Repository<Supplier>,
    ) { }

    findAll(): Promise<Supplier[]> {
        return this.supplierRepository.find();
    }
    
    findById(id: number): Promise<Supplier | null> {
        return this.supplierRepository.findOne({ where: { id } });
    }
    
    create(data: Partial<Supplier>): Promise<Supplier> {
        const supplier = this.supplierRepository.create(data);
        return this.supplierRepository.save(supplier);
    }
    
    save(supplier: Supplier): Promise<Supplier> {
        return this.supplierRepository.save(supplier);
    } 
}