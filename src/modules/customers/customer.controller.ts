import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { WebResponse } from "../../commons/dtos/web-response.dto.js";
import { CustomerService } from "./customer.service.js";
import { CustomerDto } from "./dtos/customer.dto.js";
import { AuthGuard } from "@nestjs/passport";

@Controller('customers')
@UseGuards(AuthGuard('jwt'))
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Get()
    async findAll() {
        const customers = await this.customerService.findAll();
        return new WebResponse(customers, 200, "SUCCESS", "Clientes obtenidos correctamente");
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        const customer = await this.customerService.findById(id);
        return new WebResponse(customer, 200, "SUCCESS", "Cliente encontrado correctamente");
    }

    @Post()
    async create(@Body() dto: CustomerDto) {
        const newCustomer = await this.customerService.create(dto);
        return new WebResponse(newCustomer, 201, "SUCCESS", "Cliente dado de alta correctamente");
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: Partial<CustomerDto>
    ) {
        const updatedCustomer = await this.customerService.update(id, dto);
        return new WebResponse(updatedCustomer, 200, "SUCCESS", "Cliente actualizado correctamente");
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        const result = await this.customerService.remove(id);
        return new WebResponse(result, 200, "SUCCESS", "Cliente eliminado correctamente");
    }
}