import { Controller, Get, HttpStatus, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InventoryService } from "./inventory.service.js";
import { WebResponse } from "../../commons/dtos/web-response.dto.js";

@Controller('inventory')
@UseGuards(AuthGuard('jwt'))
export class InventoryController { 
    constructor(private readonly inventoryService: InventoryService) {}

    @Get(':warehouseId/product/:productId')
    async getStock(
        @Param('warehouseId', ParseIntPipe) warehouseId: number,
        @Param('productId', ParseIntPipe) productId: number,
    ) {
        const stock = await this.inventoryService.getStockByWarehouseAndProduct(warehouseId, productId);
        return new WebResponse(stock, HttpStatus.OK, 'SUCCESS', 'Stock consultado exitosamente');
    }
}