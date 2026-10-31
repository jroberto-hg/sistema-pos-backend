import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { USER_REPOSITORY } from '../users/repositories/user.repository.js';
import type { IUserRepository } from '../users/repositories/user.repository.js';
import { LoginDto } from './dtos/login.dto.js';

@Injectable()
export class AuthService {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
        private readonly jwtService: JwtService,
    ) {}

    async login(dto: LoginDto) {
        let user = null;
        
        // Buscar al usuario por su username
        if (dto.username) { 
            user = await this.userRepository.findByUsername(dto.username);
        } else if (dto.email) {
            user = await this.userRepository.findByEmail(dto.email);
        }

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas.');
        }

        // Validar contraseña con bcrypt
        const isPasswordValid = await bcrypt.compare(dto.app_key, user.app_key);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas.');
        }

        // Crear el payload del token (lo que viaja cifrado por dentro)
        const payload = { 
            sub: user.id, 
            username: user.username, 
            role: user.role?.name 
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                username: user.username,
                name: user.name,
                role: user.role?.name
            }
        };
    }
}