import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: '$2b$10$9vK8xQyZ2W4pL0mN1r5tUu3vX7yZ2W4pL0mN1r5tUu3vX7yZ2W4pL',
        });
    }

    async validate(payload: any) {
        // Lo que retornemos aquí se inyectará en el objeto `request.user`
        return { userId: payload.sub, username: payload.username, role: payload.role };
    }
}