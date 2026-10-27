import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { QuotationService } from "./quotation.service.js";
import { WebResponse } from "../../commons/dtos/web-response.dto.js";
import { QuotationDto } from "./dtos/quotation.dto.js";

@Controller('quotations')
@UseGuards(AuthGuard('jwt'))
export class QuotationController {
    constructor(private readonly quotationService: QuotationService) {}

    @Get()
    async findAll() {
        const quotations = await this.quotationService.findAll();
        return new WebResponse(quotations, 200, "SUCCESS", "Lista de cotizaciones obtenida");
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const quotation = await this.quotationService.findOne(id);
        return new WebResponse(quotation, 200, "SUCCESS", "Cotización encontrada");
    }

    @Post()
    async create(@Body() dto: QuotationDto, @Req() req: any) {
        const userId = req.user.id; // Asumiendo que el JWT decodificado inyecta el usuario
        const quotation = await this.quotationService.create(dto, userId);
        return new WebResponse(quotation, 201, "CREATED", "Cotización creada exitosamente");
    }
}