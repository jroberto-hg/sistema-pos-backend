import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PurchaseDto } from './dtos/purchase.dto.js';
import { PurchaseService } from './puchase.service.js';
import { AuthGuard } from '@nestjs/passport';

@Controller('purchases')
@UseGuards(AuthGuard('jwt'))
export class PurchaseController {
    constructor(private readonly purchaseService: PurchaseService) {}

    @Get()
    async findAll() {
        return await this.purchaseService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return await this.purchaseService.findById(+id);
    }

    @Post()
    async create(@Body() dto: PurchaseDto) {
        return await this.purchaseService.create(dto);
    }
}