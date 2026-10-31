import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity.js";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true, length: 100 })
    username: string;

    @Column({ unique: true, nullable: true })
    email?: string;

    @Column({ type: 'varchar', length: 100, select: false })
    app_key: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 100 })
    paternal_lastname: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    maternal_lastname: string | null;

    @Column({ default: true })
    is_active: boolean;

    @ManyToOne(() => Role, { eager: true })
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @CreateDateColumn()
    created_at: Date;
}