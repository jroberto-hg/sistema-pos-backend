import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseDetail } from "./purchase-detail.entity.js";
import { Supplier } from "../../suppliers/entities/supplier.entity.js";

export enum PurchaseStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

@Entity('purchases')
export class Purchase { 
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    invoice_number: string;

    @Column()
    supplier_id: number;

    @ManyToOne(() => Supplier, { eager: true })
    @JoinColumn({ name: 'supplier_id' })
    supplier: Supplier;

    @Column('decimal', { precision: 10, scale: 2 })
    total_cost: number;

    @Column({
        type: 'enum',
        enum: PurchaseStatus,
        default: PurchaseStatus.COMPLETED,
    })
    status: PurchaseStatus;
    
    @CreateDateColumn()
    created_at: Date;

    @OneToMany('PurchaseDetail', (detail: any) => detail.purchase, { cascade: true })
    details: PurchaseDetail[];
}