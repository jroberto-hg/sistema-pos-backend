import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Warehouse } from "../../warehouse/entities/warehouse.entity.js";
import { TransferDetail } from "./transfer-details.js";

export enum TransferStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

@Entity('transfers')
export class Transfer { 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    origin_warehouse_id: number;

    @ManyToOne(() => Warehouse, { eager: true })
    @JoinColumn({ name: 'origin_warehouse_id' })
    origin_warehouse: Warehouse;

    @Column()
    destination_warehouse_id: number;

    @ManyToOne(() => Warehouse, { eager: true })
    @JoinColumn({ name: 'destination_warehouse_id' })
    destination_warehouse: Warehouse;

    @Column({ type: 'enum', enum: TransferStatus, default: TransferStatus.COMPLETED })
    status: TransferStatus;

    @Column({ type: 'text', nullable: true })
    notes: string | null;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany('TransferDetail', (detail: any) => detail.transfer, { cascade: true })
    details: TransferDetail[];
}