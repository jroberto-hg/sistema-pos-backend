import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { SaleService } from "./sale.service.js";
import { WebResponse } from "../../commons/dtos/web-response.dto.js";
import { SaleDto } from "./dtos/sale.dto.js";

@Controller('sales')
export class SaleController {
    constructor(private readonly saleService: SaleService) {}

    @Get()
    async findAll() {
        const sales = await this.saleService.findAll();
        return new WebResponse(sales, 200, "SUCCESS", "Ventas obtenidas correctamente");
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        const sale = await this.saleService.findById(id);
        return new WebResponse(sale, 200, "SUCCESS", "Venta encontrada correctamente");
    }

    @Post()
    async create(@Body() dto: SaleDto) {
        const newSale = await this.saleService.create(dto);
        return new WebResponse(newSale, 201, "SUCCESS", "Venta registrada con éxito");
    }
}