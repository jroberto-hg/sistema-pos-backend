import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Stock } from "./stock.entity.js";

@Entity('warehouses')
export class Warehouse {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true })
    name: string; // Ej: Almacén Central, Sucursal Centro

    @Column({ nullable: true })
    location: string; // Dirección o descripción física

    @Column({ default: true })
    is_active: boolean;

    @OneToMany(() => Stock, (stock) => stock.warehouse)
    stocks: Stock[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}