import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Purchase } from "../../purchases/entities/purchase.entity.js";

@Entity('suppliers')
export class Supplier { 
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 150 })
    name: string; // Nombre del proveedor o empresa

    @Column({ type: 'varchar', length: 150, nullable: true })
    contact_name: string | null; // Persona de contacto

    @Column({ type: 'varchar', length: 50, nullable: true })
    phone: string | null;

    @Column({ type: 'varchar', length: 150, nullable: true, unique: true })
    email: string | null;

    @Column({ type: 'text', nullable: true })
    address: string | null;;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @OneToMany(() => Purchase, (purchase) => purchase.supplier)
    purchases: Purchase[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}