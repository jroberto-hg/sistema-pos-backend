import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";

// Product
import { PRODUCT_REPOSITORY } from "../repositories/product.repository.js";
import type { IProductRepository } from '../repositories/product.repository.js';

//Category
import { CATEGORY_REPOSITORY } from "../repositories/category.repository.js";
import type { ICategoryRepository } from '../repositories/category.repository.js';

//Unit
import { UNIT_REPOSITORY } from "../repositories/unit.repository.js";
import type { IUnitRepository } from '../repositories/unit.repository.js';
import { ProductDto } from "../dtos/product.dto.js";
import { Product } from "../entities/product.entity.js";

@Injectable()
export class ProductService {
    constructor(
        @Inject(PRODUCT_REPOSITORY)
        private readonly productRepository: IProductRepository,

        @Inject(CATEGORY_REPOSITORY)
        private readonly categoryRepository: ICategoryRepository,

        @Inject(UNIT_REPOSITORY)
        private readonly unitRepository: IUnitRepository,
    ) { }

    async findAll() {
        return await this.productRepository.findAll();
    }

    async findById(id: number) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
        }

        return product;
    }

    async create(dto: ProductDto) {
        const existingSku = await this.productRepository.findBySku(dto.sku);
        if (existingSku) {
            throw new ConflictException(`Ya existe un producto con el SKU '${dto.sku}'.`);
        }

        const category = await this.categoryRepository.findById(dto.category_id);
        if (!category) {
            throw new NotFoundException(`La categoría con ID ${dto.category_id} no existe.`);
        }

        const unit = await this.unitRepository.findById(dto.unit_id);
        if (!unit) {
            throw new NotFoundException(`La unidad con ID ${dto.unit_id} no existe.`);
        }

        const product = new Product();
        Object.assign(product, dto);

        return await this.productRepository.save(product);
    }

    async update(id: number, data: Partial<ProductDto>) {
        const product = await this.findById(id);
        if (!product) {
            throw new NotFoundException(`Producto con ID ${id} no encontrada.`);
        }

        if (data.sku && data.sku !== product.sku) {
            const existingSku = await this.productRepository.findBySku(data.sku);
            if (existingSku) {
                throw new ConflictException(`Ya existe otro producto con el SKU '${data.sku}'.`);
            }
        }

        if (data.category_id) {
            const category = await this.categoryRepository.findById(data.category_id);
            if (!category) {
                throw new NotFoundException(`La categoría con ID ${data.category_id} no existe.`);
            }
        }

        if (data.unit_id) {
            const unit = await this.unitRepository.findById(data.unit_id);
            if (!unit) {
                throw new NotFoundException(`La unidad con ID ${data.unit_id} no existe.`);
            }
        }

        Object.assign(product, data);
        return await this.productRepository.save(product);
    }

    async remove(id: number) {
        await this.findById(id);
        await this.productRepository.delete(id);
        return { message: `Producto con ID ${id} eliminado correctamente.` };
    }
}