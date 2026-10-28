import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { SaleService } from "./sale.service.js";
import { WebResponse } from "../../commons/dtos/web-response.dto.js";
import { SaleDto } from "./dtos/sale.dto.js";
import { AuthGuard } from "@nestjs/passport";

@Controller('sales')
@UseGuards(AuthGuard('jwt'))
export class SaleController {
    constructor(private readonly saleService: SaleService) {}

    @Get()
    async findAll() {
        const sales = await this.saleService.findAll();
        return new WebResponse(sales, HttpStatus.OK, "SUCCESS", "");
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        const sale = await this.saleService.findById(id);
        return new WebResponse(sale, HttpStatus.OK, "SUCCESS", "");
    }

    @Post()
    async create(@Body() dto: SaleDto) {
        const newSale = await this.saleService.create(dto);
        return new WebResponse(newSale, HttpStatus.CREATED, "SUCCESS", "Venta registrada con éxito");
    }

    @Patch(':id/cancel')
    async cancelSale(@Param('id', ParseIntPipe) id: number) {
        const sale = await this.saleService.cancel(id);
        return new WebResponse(sale, HttpStatus.OK, "SUCCESS", "Venta cancelada y stock devuelto exitosamente");
    }
}