import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Transfer } from "./transfer.entity.js";
import { Product } from "../../catalog/entities/product.entity.js";

@Entity('transfer_details')
export class TransferDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    transfer_id: number;

    @ManyToOne('Transfer', (transfer: any) => transfer.details, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'transfer_id' })
    transfer: Transfer;

    @Column()
    product_id: number;

    @ManyToOne(() => Product, { eager: true })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column('decimal', { precision: 10, scale: 2 })
    quantity: number;
}