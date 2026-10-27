import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { RoleService } from "../services/role.service.js";
import { WebResponse } from "../../../commons/dtos/web-response.dto.js";
import { RoleDto } from "../dtos/role.dto.js";

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Get()
    async findAll() {
        const roles = await this.roleService.findAll();
        return new WebResponse(roles, HttpStatus.OK, "SUCCESS", "");
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        const role = await this.roleService.findById(id);
        return new WebResponse(role, HttpStatus.OK, "SUCCESS", "");
    }

    @Post()
    async create(@Body() dto: RoleDto) {
        const newRole = await this.roleService.create(dto);
        return new WebResponse(newRole, HttpStatus.CREATED, "SUCCESS", "Rol creado correctamente");
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: Partial<RoleDto>
    ) {
        const updatedRole = await this.roleService.update(id, dto);
        return new WebResponse(updatedRole, HttpStatus.OK, "SUCCESS", "Rol actualizado correctamente");
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        const result = await this.roleService.remove(id);
        return new WebResponse(result, HttpStatus.OK, "SUCCESS", "Rol eliminado correctamente");
    }
}