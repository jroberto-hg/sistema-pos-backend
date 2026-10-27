import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity.js";
import { Role } from "../entities/role.entity.js";
import { USER_REPOSITORY } from "../repositories/user.repository.js";
import type { IUserRepository } from "../repositories/user.repository.js";
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,

        @Inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
    ) { }

    async findAll() {
        return await this.userRepository.findAll();
    }

    async findById(id: number): Promise<User | null> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
        }
        
        return user;
    }

    async create(data: {
        username: string;
        app_key: string;
        name: string;
        paternal_lastname: string;
        maternal_lastname?: string;
        role_id: number;
    }) {
        // Validar si el username ya existe
        const existingUser = await this.userRepository.findByUsername(data.username);
        if(existingUser) {
            throw new ConflictException(`El nombre de usuario '${data.username}' ya está registrado.`);
        }

        // Buscar el rol
        const role = await this.roleRepository.findOne({ where: { id: data.role_id } });
        if (!role) {
            throw new NotFoundException(`El rol con ID ${data.role_id} no existe.`);
        }
        
        // Encriptar la app_key de forma segura
        const saltRounds = 10;
        const hashedAppKey = await bcrypt.hash(data.app_key, saltRounds);

        if (!data.app_key) {
            throw new BadRequestException('La app_key es obligatoria.');
        }

        //Crear instancia del usuario
        const newUser = new User();
        newUser.username = data.username;
        newUser.app_key = hashedAppKey;
        newUser.name = data.name;
        newUser.paternal_lastname = data.paternal_lastname;
        newUser.maternal_lastname = data.maternal_lastname ?? null;
        newUser.role = role;

        const savedUser = await this.userRepository.save(newUser);

        const { app_key, ...userWithoutAppKey } = savedUser as any;
        return userWithoutAppKey;
    }

    async update(
        id: number, 
        data: Partial<{ 
            name: string; 
            paternal_lastname: string; 
            maternal_lastname: string; 
            role_id: number;
            is_active: boolean 
        }>
    ) {
        // Validar si ya existe el usuario
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
        }

        if (data.role_id !== undefined) {
            const role = await this.roleRepository.findOne({ where: { id: data.role_id } });
            if (!role) {
                throw new NotFoundException(`El rol con ID ${data.role_id} no existe.`);
            }
            user.role = role;
            delete data.role_id;
        }

        Object.assign(user, data);
        const updatedUser = await this.userRepository.save(user);

        const { app_key, ...userWithoutAppKey } = updatedUser as any;
        return userWithoutAppKey;
    }

    async disable(id: number) {
        // Validar si ya existe el usuario
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
        }

        user.is_active = false;
        const disabledUser = await this.userRepository.save(user);

        const { app_key, ...userWithoutAppKey } = disabledUser as any;
        return userWithoutAppKey;
    }

    async remove(id: number) {
        // Validar si ya existe el usuario
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
        }

        await this.userRepository.delete(id);
    }
}