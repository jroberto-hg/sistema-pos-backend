import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Sale } from "./sale.entity.js";
import { Product } from "../../catalog/entities/product.entity.js";

@Entity('sale_details')
export class SaleDetail { 
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne('Sale', (sale: any) => sale.details, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sale_id' })
    sale: Sale;

    @Column()
    sale_id: number;

    @ManyToOne(() => Product, { eager: true })
    @JoinColumn({ name: 'product_id' })
    product: Product

    @Column()
    product_id: number;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    unit_price: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    subtotal: number;
}