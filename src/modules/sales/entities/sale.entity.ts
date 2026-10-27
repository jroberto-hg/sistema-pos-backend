import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity.js';
import { SaleDetail } from './sale-detail.entity.js';

@Entity('sales')
export class Sale { 
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    invoice_number: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    subtotal: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    tax: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total: number;

    @Column({ type: 'varchar', length: 50 })
    payment_method: string;

    @ManyToOne(() => Customer,  { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @Column({ nullable: true })
    customer_id: number | null;

    @OneToMany(() => SaleDetail, (detail) => detail.sale, { cascade: true })
    details: SaleDetail[];

    @CreateDateColumn()
    created_at: Date;
}