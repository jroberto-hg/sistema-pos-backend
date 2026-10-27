import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from '../../entities/sale.entity.js';
import { ISaleRepository } from '../sale.repository.js';

@Injectable()
export class SaleRepositoryImpl implements ISaleRepository {
    constructor(
        @InjectRepository(Sale)
        private readonly repository: Repository<Sale>,
    ) { }

    async findAll(): Promise<Sale[]> {
        return await this.repository.find({ relations: ['customer', 'details', 'details.product'] });
    }

    async findById(id: number): Promise<Sale | null> {
        return await this.repository.findOne({ 
            where: { id },
            relations: ['customer', 'details', 'details.product'] 
        });
    }

    async save(sale: Sale): Promise<Sale> {
        return await this.repository.save(sale);
    }
}