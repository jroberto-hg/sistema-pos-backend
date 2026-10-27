import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Purchase } from "./purchase.entity.js";

@Entity('suppliers')
export class Supplier { 
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string; // Nombre del proveedor o empresa

    @Column({ nullable: true })
    contact_name: string; // Persona de contacto

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true, unique: true })
    email: string;

    @Column({ nullable: true })
    address: string;

    @Column({ default: true })
    is_active: boolean;

    @OneToMany(() => Purchase, (purchase) => purchase.supplier)
    purchases: Purchase[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}