import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { UserService } from "../services/user.service.js";
import { WebResponse } from "../../../commons/dtos/web-response.dto.js";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async findAll() {
        const users = await this.userService.findAll();
        return new WebResponse(users, HttpStatus.OK, "SUCCESS", "OK");
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        const user = await this.userService.findById(id);
        return new WebResponse(user, 200, "SUCCESS", "OK");
    }

    @Post()
    async create(@Body() body: any) {
        const result = await this.userService.create(body);
        return new WebResponse(result, HttpStatus.CREATED, "SUCCESS", "Usuario dado de alta correctamente")
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
        const result = await this.userService.update(id, body);
        return new WebResponse(result, HttpStatus.OK, "SUCCESS", "Usuario actualizado correctamente");
    }

    @Patch(':id/disable')
    async disable(@Param('id', ParseIntPipe) id: number) {
        const result = await this.userService.disable(id);
        return new WebResponse(result, HttpStatus.OK, "DISABLED");
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        const result = await this.userService.remove(id);
        return new WebResponse(result, HttpStatus.OK, "DELETED", "Usuario eliminado correctamente");
    }
}