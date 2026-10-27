import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CATEGORY_REPOSITORY } from "../repositories/category.repository.js";
import type { ICategoryRepository } from "../repositories/category.repository.js";
import { Category } from "../entities/category.entity.js";

@Injectable()
export class CategoryService {
    constructor(
        @Inject(CATEGORY_REPOSITORY)
        private readonly categoryRepository: ICategoryRepository,
    ) { }

    async findAll() {
        return await this.categoryRepository.findAll();
    }

    async findById(id: number) {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new NotFoundException(`Categoría con ID ${id} no encontrada.`);
        }

        return category;
    }

    async create(data: { name: string; description?: string, is_active?: boolean }) {
        const category = await this.categoryRepository.findByName(data.name);
        if (category) {
            throw new ConflictException(`Ya existe una categoría con el nombre '${data.name}'.`);
        }

        const newCategory = new Category();
        newCategory.name = data.name;
        newCategory.description = data.description ?? '';
        if (data.is_active !== undefined) newCategory.is_active = data.is_active;

        return await this.categoryRepository.save(newCategory);
    }

    async update(
        id: number, 
        data: Partial<{
            name: string;
            description: string;
            is_active: boolean
    }>) {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new NotFoundException(`Categoría con ID ${id} no encontrada.`);
        }

        if (data.name && data.name !== category.name) {
            const categoryName = await this.categoryRepository.findByName(data.name);
            if (categoryName) {
                throw new ConflictException(`Ya existe otra categoría con el nombre '${data.name}'.`);
            }
        }

        Object.assign(category, data);
        return await this.categoryRepository.save(category);
    }

    async remove(id: number) {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new NotFoundException(`Categoría con ID ${id} no encontrada.`);
        }

        await this.categoryRepository.delete(id);
        return { message: `Categoría con ID ${id} eliminada correctamente.` };
    }
}