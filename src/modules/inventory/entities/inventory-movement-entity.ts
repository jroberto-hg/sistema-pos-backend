import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../catalog/entities/product.entity.js";
import { User } from "../../users/entities/user.entity.js";
import { Warehouse } from "../../warehouse/entities/warehouse.entity.js";

export enum MovementType {
    IN = 'IN',       // Entrada (Compra, devolución)
    OUT = 'OUT',     // Salida (Merma, daño)
    SALE = 'SALE',   // Salida por venta automática
}

@Entity('inventory_movements')
export class InventoryMovement { 
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'enum', enum: MovementType })
    type: MovementType;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ nullable: true })
    reason: string; // Motivo u observación

    @ManyToOne(() => Warehouse)
    @JoinColumn({ name: 'warehouse_id' })
    warehouse: Warehouse;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User; // Quién realizó el movimiento

    @CreateDateColumn()
    created_at: Date;
}