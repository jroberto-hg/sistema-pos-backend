import { Injectable } from "@nestjs/common";
import { IQuotationRepository } from "../quotation.repository.js";
import { Quotation } from "../../entities/quotation.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeepPartial } from "typeorm"; // 👈 Importar DeepPartial

@Injectable()
export class QuotationRepositoryImpl implements IQuotationRepository {
    constructor(
        @InjectRepository(Quotation)
        private readonly quotationRepository: Repository<Quotation>,
    ) { }

    async findAll(): Promise<Quotation[]> {
        return this.quotationRepository.find({ relations: ['customer', 'user', 'items', 'items.product'] });
    }
    
    async findById(id: number): Promise<Quotation | null> {
        return this.quotationRepository.findOne({
            where: { id },
            relations: ['customer', 'user', 'items', 'items.product'],
        });
    }
    
    async create(data: DeepPartial<Quotation>): Promise<Quotation> {
        const quotation = this.quotationRepository.create(data);
        return this.quotationRepository.save(quotation);
    }
    
    async save(quotation: Quotation): Promise<Quotation> {
        return this.quotationRepository.save(quotation);
    } 
}