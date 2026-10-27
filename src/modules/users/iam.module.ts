import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Entidades
import { User } from "./entities/user.entity.js";
import { Role } from "./entities/role.entity.js";

// Controladores
import { UserController } from "./controllers/user.controller.js";
import { RoleController } from "./controllers/role.controller.js";

// Servicios
import { UserService } from "./services/user.service.js";
import { RoleService } from "./services/role.service.js";

// Repositorios e Implementaciones
import { USER_REPOSITORY } from "./repositories/user.repository.js";
import { UserRepositoryImpl } from "./repositories/impl/user.repository.impl.js";
import { ROLE_REPOSITORY } from "./repositories/role.repository.js";
import { RoleRepositoryImpl } from "./repositories/impl/role.repository.impl.js";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role])
    ],
    controllers: [
        UserController,
        RoleController
    ],
    providers: [
        UserService,
        {
            provide: USER_REPOSITORY,
            useClass: UserRepositoryImpl,
        },
        RoleService,
        {
            provide: ROLE_REPOSITORY,
            useClass: RoleRepositoryImpl,
        },
    ],
    exports: [
        TypeOrmModule,
        USER_REPOSITORY,
        ROLE_REPOSITORY
    ]
})
export class IamModule {}