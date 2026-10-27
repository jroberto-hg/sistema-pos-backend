import { Controller, Get, HttpStatus, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ReportService } from "./report.service.js";
import { WebResponse } from "../../commons/dtos/web-response.dto.js";

@Controller('reports')
@UseGuards(AuthGuard('jwt'))
export class ReportController { 
    constructor(private readonly reportService: ReportService) {}

    @Get('stock-warehouse')
    async getStockByWarehouse() {
        const data = await this.reportService.getStockByWarehouse();
        return new WebResponse(data, HttpStatus.OK, "SUCCESS", "");
    }

    @Get('quotations-summary')
    async getQuotationsSummary() {
        const data = await this.reportService.getQuotationsSummary();
        return new WebResponse(data, HttpStatus.OK, "SUCCESS", "");
    }

    @Get('purchases-summary')
    async getPurchasesSummary() {
        const data = await this.reportService.getPurchasesSummary();
        return new WebResponse(data, HttpStatus.OK, "SUCCESS", "");
    }
}