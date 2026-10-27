import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Entidades
import { Category } from "./entities/category.entity.js";
import { Unit } from "./entities/unit.entity.js";
import { Product } from "./entities/product.entity.js";

// Unidades
import { UnitController } from "./controllers/unit.controller.js";
import { UnitService } from "./services/unit.service.js";
import { UNIT_REPOSITORY } from "./repositories/unit.repository.js";
import { UnitRepositoryImpl } from "./repositories/impl/unit.repository.impl.js";

// Categories
import { CategoryController } from "./controllers/category.controller.js";
import { CategoryService } from "./services/category.service.js";
import { CATEGORY_REPOSITORY } from "./repositories/category.repository.js";
import { CategoryRepositoryImpl } from "./repositories/impl/category.repository.impl.js";

// Productos
import { ProductController } from "./controllers/product.controller.js";
import { ProductService } from "./services/product.service.js";
import { PRODUCT_REPOSITORY } from "./repositories/product.repository.js";
import { ProductRepositoryImpl } from "./repositories/impl/product.repository.impl.js";

@Module({
    imports: [
        TypeOrmModule.forFeature([Category, Unit, Product])
    ],
    controllers: [
        UnitController,
        CategoryController,
        ProductController
    ],
    providers: [
        // Proveedores de Unidades
        UnitService,
        {
            provide: UNIT_REPOSITORY,
            useClass: UnitRepositoryImpl,
        },
        // Proveedores de Categorias
        CategoryService, 
        {
            provide: CATEGORY_REPOSITORY,
            useClass: CategoryRepositoryImpl,
        },
        // Provedores de Productos
        ProductService, {
            provide: PRODUCT_REPOSITORY,
            useClass: ProductRepositoryImpl
        }
    ],
    exports: [
        TypeOrmModule, 
        UNIT_REPOSITORY,
        CATEGORY_REPOSITORY,
        PRODUCT_REPOSITORY
    ]
})

export class CatalogModule { }