import { Product } from "../entities/product.entity.js";

export interface IProductRepository {
    findAll(): Promise<Product[]>;

    findById(id: number): Promise<Product | null>;

    findBySku(sku: string): Promise<Product | null>;
    
    save(product: Product): Promise<Product>;

    delete(id: number): Promise<void>;
}

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');