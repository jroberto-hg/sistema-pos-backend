import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Purchase } from "./purchase.entity.js";
import { Product } from "../../catalog/entities/product.entity.js";

@Entity('purchase_details')
export class PurchaseDetail { 
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Purchase, (purchase) => purchase.details, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'purchase_id' })
    purchase: Purchase;

    @Column()
    product_id: number;

    @ManyToOne(() => Product, { eager: true })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column('decimal', { precision: 10, scale: 2 })
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    unit_cost: number;

    @Column('decimal', { precision: 10, scale: 2 })
    subtotal: number;
}