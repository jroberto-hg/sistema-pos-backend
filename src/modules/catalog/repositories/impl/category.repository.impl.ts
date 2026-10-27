import { Injectable } from "@nestjs/common";
import { ICategoryRepository } from "../category.repository.js";
import { Category } from "../../entities/category.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CategoryRepositoryImpl implements ICategoryRepository {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async findById(id: number): Promise<Category | null> {
        return await this.categoryRepository.findOne({ where: { id } });
    }

    async findByName(name: string): Promise<Category | null> {
        return await this.categoryRepository.findOne({ where: { name } });
    }

    async save(category: Category): Promise<Category> {
        return await this.categoryRepository.save(category);
    }

    async delete(id: number): Promise<void> {
        await this.categoryRepository.delete(id);
    }
}