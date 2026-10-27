import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { CategoryService } from "../services/category.service.js";
import { WebResponse } from "../../../commons/dtos/web-response.dto.js";
import { AuthGuard } from "@nestjs/passport";

@Controller('catalog/categories')
@UseGuards(AuthGuard('jwt'))
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    async findAll() {
        const categories = await this.categoryService.findAll();
        return new WebResponse(categories, HttpStatus.OK, "SUCCESS", "");
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        const category = await this.categoryService.findById(id);
        return new WebResponse(category, 200, "SUCCESS", "");
    }

    @Post()
    async create(@Body() body: { name: string; description?: string; is_active?: boolean }) {
        const newCategory = await this.categoryService.create(body);
        return new WebResponse(newCategory, 201, "SUCCESS", "Categoría dada de alta correctamente");
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: Partial<{ name: string; description: string; is_active: boolean }>
    ) {
        const updatedCategory = await this.categoryService.update(id, body);
        return new WebResponse(updatedCategory, 200, "SUCCESS", "Categoría actualizada correctamente");
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        const result = await this.categoryService.remove(id);
        return new WebResponse(result, 200, "SUCCESS", "Categoría eliminada correctamente");
    }
}