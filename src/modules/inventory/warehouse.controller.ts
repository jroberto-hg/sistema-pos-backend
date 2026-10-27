import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { WarehouseService } from "./warehouse.service.js";
import { WebResponse } from "../../commons/dtos/web-response.dto.js";
import { WarehouseDto } from "./dtos/warehouse.dto.js";

@Controller('warehouses')
@UseGuards(AuthGuard('jwt'))
export class WarehouseController {
    constructor(private readonly warehouseService: WarehouseService) {}

    @Get()
    async findAll() {
        const warehouses = await this.warehouseService.findAll();
        return new WebResponse(warehouses, 200, "SUCCESS", "Lista de almacenes obtenida correctamente");
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const warehouse = await this.warehouseService.findOne(id);
        return new WebResponse(warehouse, 200, "SUCCESS", "Almacén encontrado");
    }

    @Post()
    async create(@Body() dto: WarehouseDto) {
        const warehouse = await this.warehouseService.create(dto);
        return new WebResponse(warehouse, 201, "CREATED", "Almacén creado exitosamente");
    }
}