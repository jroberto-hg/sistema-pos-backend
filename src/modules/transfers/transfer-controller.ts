import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TransferService } from "./transfer-service.js";
import { WebResponse } from "../../commons/dtos/web-response.dto.js";
import { TransferDto } from "./dtos/transfer.dto.js";

@Controller('transfers')
@UseGuards(AuthGuard('jwt'))
export class TransferController { 
    constructor(private readonly transferService: TransferService) { }

    @Get()
    async findAll() {
        const transfers = await this.transferService.findAll();
        return new WebResponse(transfers, HttpStatus.OK, "SUCCESS", "");
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        const transfer = await this.transferService.findById(id);
        return new WebResponse(transfer, HttpStatus.OK, "SUCCESS", "");
    }

    @Post()
    async create(@Body() createTransferDto: TransferDto) {
        const newTransfer = await this.transferService.create(createTransferDto);
        return new WebResponse(newTransfer, HttpStatus.CREATED, 'SUCCESS', 'Transferencia realizada con éxito e inventario actualizado');
    }
}