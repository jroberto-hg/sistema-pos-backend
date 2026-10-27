import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Warehouse } from "../../inventory/entities/warehouse.entity.js";
import { User } from "../../users/entities/user.entity.js";
import { PurchaseItem } from "./purchase-item.entity.js";
import type { Supplier } from "./supplier.entity.js";

export enum PurchaseStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

@Entity('purchases')
export class Purchase { 
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_amount: number;

    @Column({ type: 'enum', enum: PurchaseStatus, default: PurchaseStatus.PENDING })
    status: PurchaseStatus;

    @ManyToOne('Supplier', (supplier: any) => supplier.purchases, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'supplier_id' })
    supplier: Supplier;

    @ManyToOne(() => Warehouse, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'warehouse_id' })
    warehouse: Warehouse; // Almacén a donde ingresa la mercancía

    @ManyToOne(() => User, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'user_id' })
    user: User; // Usuario que registró la compra

    @OneToMany(() => PurchaseItem, (item) => item.purchase, { cascade: true })
    items: PurchaseItem[];

    @CreateDateColumn()
    created_at: Date;
}