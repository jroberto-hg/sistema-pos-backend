import { Injectable } from "@nestjs/common";
import { IProductRepository } from "../product.repository.js";
import { Product } from "../../entities/product.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ProductRepositoryImpl implements IProductRepository {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find({ relations: ['category', 'unit'] });
    }

    async findById(id: number): Promise<Product | null> {
        return await this.productRepository.findOne({
            where: { id },
            relations: ['category', 'unit']
        });
    }

    async findBySku(sku: string): Promise<Product | null> {
        return await this.productRepository.findOne({ 
            where: { sku },
            relations: ['category', 'unit'] 
        });
    }

    async save(product: Product): Promise<Product> {
        return await this.productRepository.save(product);
    }

    async delete(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }
}