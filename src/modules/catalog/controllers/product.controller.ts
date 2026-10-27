import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ProductService } from "../services/product.service.js";
import { WebResponse } from "../../../commons/dtos/web-response.dto.js";
import { ProductDto } from "../dtos/product.dto.js";

@Controller('catalog/products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async findAll() {
        const products = await this.productService.findAll();
        return new WebResponse(products, HttpStatus.OK, "SUCCESS", "");
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        const product = await this.productService.findById(id);
        return new WebResponse(product, HttpStatus.OK, "SUCCESS", "");
    }

    @Post()
    async create(@Body() dto: ProductDto) {
        const newProduct = await this.productService.create(dto);
        return new WebResponse(newProduct, HttpStatus.CREATED, "SUCCESS", "Producto dado de alta correctamente");
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: Partial<ProductDto>
    ) {
        const updatedProduct = await this.productService.update(id, dto);
        return new WebResponse(updatedProduct, HttpStatus.OK, "SUCCESS", "Producto actualizado correctamente");
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        const result = await this.productService.remove(id);
        return new WebResponse(result, HttpStatus.OK, "SUCCESS", "Producto eliminado correctamente");
    }
}