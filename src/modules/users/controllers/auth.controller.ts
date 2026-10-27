import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service.js';
import { AuthDto } from '../dtos/auth.dto.js';
import { WebResponse } from '../../../commons/dtos/web-response.dto.js';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() dto: AuthDto) {
        const result = await this.authService.login(dto);
        return new WebResponse(result, HttpStatus.OK, "SUCCESS", "");
    }
}