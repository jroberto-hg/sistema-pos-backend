import { Body, Controller, Get, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { SupplierService } from "./supplier.service.js";
import { WebResponse } from "../../commons/dtos/web-response.dto.js";
import { SupplierDto } from "./dtos/supplier.dto.js";

@Controller('suppliers')
@UseGuards(AuthGuard('jwt'))
export class SupplierController {
    constructor(private readonly supplierService: SupplierService) {}

    @Get()
    async findAll() {
        const suppliers = await this.supplierService.findAll();
        return new WebResponse(suppliers, HttpStatus.OK, "SUCCESS", "");
    }

    @Post()
    async create(@Body() dto: SupplierDto) {
        const supplier = await this.supplierService.create(dto);
        return new WebResponse(supplier, HttpStatus.CREATED, "CREATED", "Proveedor registrado exitosamente");
    }
}