import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { UnitService } from "../services/unit.service.js";
import { WebResponse } from "../../../commons/dtos/web-response.dto.js";

@Controller('catalog/units')
export class UnitController {
    constructor(private readonly unitService: UnitService) { }

    @Get()
    async findAll() {
        const units = await this.unitService.findAll();
        return new WebResponse(units, HttpStatus.OK, "SUCCESS", "");
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        const unit = await this.unitService.findById(id);
        return new WebResponse(unit, HttpStatus.OK, "SUCCESS", "");
    }

    @Post()
    async create(@Body() body: { name: string; code: string }) {
        const newUnit = await this.unitService.create(body);
        return new WebResponse(newUnit, HttpStatus.OK, "SUCCESS", "Unidad dada de alta correctamente");
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: Partial<{ name: string; code: string }>
    ) {
        const updatedUnit = await this.unitService.update(id, body);
        return new WebResponse(updatedUnit, HttpStatus.OK, "UPDATED", "Unidad actualizada correctamente");
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        const result = await this.unitService.remove(id);
        return new WebResponse(result, HttpStatus.OK, "DELETED", "Unidad eliminada correctamente");
    }
}