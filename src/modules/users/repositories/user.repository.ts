import { User } from "../entities/user.entity.js";

export interface IUserRepository {
    findAll(): Promise<User[]>;

    findById(id: number): Promise<User | null>;
    
    findByUsername(username: string): Promise<User | null>;

    findByEmail(email: string): Promise<User | null>;
    
    save(user: User): Promise<User>;

    delete(id: number): Promise<void>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');