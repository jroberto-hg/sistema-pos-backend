import { Category } from "../entities/category.entity.js";

export interface ICategoryRepository {
    findAll(): Promise<Category[]>;

    findById(id: number): Promise<Category | null>;
    
    findByName(name: string): Promise<Category | null>;
    
    save(category: Category): Promise<Category>;
    
    delete(id: number): Promise<void>;
}

export const CATEGORY_REPOSITORY = Symbol('CATEGORY_REPOSITORY');