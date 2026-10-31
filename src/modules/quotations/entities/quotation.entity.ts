import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../../customers/entities/customer.entity.js";
import { User } from "../../users/entities/user.entity.js";
import { QuotationDetail } from "./quotation-detail.entity.js";


export enum QuotationStatus { 
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    EXPIRED = 'EXPIRED',
}

@Entity('quotations')
export class Quotation { 
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_amount: number;

    @Column({ type: 'enum', enum: QuotationStatus, default: QuotationStatus.PENDING })
    status: QuotationStatus;

    @Column({ type: 'date', nullable: true })
    expires_at: Date;

    @ManyToOne(() => Customer, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(() => User, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'user_id' })
    user: User; // Usuario que creó la cotización

    @OneToMany(() => QuotationDetail, (item) => item.quotation, { cascade: true })
    items: QuotationDetail[];

    @CreateDateColumn()
    created_at: Date;
}