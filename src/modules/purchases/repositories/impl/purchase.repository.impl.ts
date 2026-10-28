import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Purchase } from "../../entities/purchase.entity.js";
import { IPurchaseRepository } from "../purchase.repository.js";

@Injectable()
export class PurchaseRepositoryImpl implements IPurchaseRepository {
    constructor(
        @InjectRepository(Purchase)
        private readonly purcharseRepository: Repository<Purchase>,
    ) { }

    findAll(): Promise<Purchase[]> {
        return this.purcharseRepository.find({ 
            relations: ['details', 'details.product', 'supplier'] 
        });
    }
    
    findById(id: number): Promise<Purchase | null> {
        return this.purcharseRepository.findOne({
            where: { id },
            relations: ['details', 'details.product', 'supplier'],
        });
    }

    save(supplier: Purchase): Promise<Purchase> {
        return this.purcharseRepository.save(supplier);
    } 
}