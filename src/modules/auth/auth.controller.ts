import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dtos/login.dto.js';
import { WebResponse } from '../../commons/dtos/web-response.dto.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(
        @Body() dto: LoginDto,
        @Res({ passthrough: true }) res: Response
    ) {
        const result = await this.authService.login(dto);

        //Establecemos el token JWT en una cookie HttpOnly ultrasegura
        res.cookie('authentication', result.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24*60*60*1000,
        });

        return new WebResponse(result, HttpStatus.OK, "SUCCESS", "");
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('authentication');
        return new WebResponse(null, HttpStatus.OK, "SUCCESS", "Sesión cerrada correctamente");
    }
}