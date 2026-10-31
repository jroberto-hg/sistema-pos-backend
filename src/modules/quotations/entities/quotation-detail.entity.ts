import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Quotation } from "./quotation.entity.js";
import { Product } from "../../catalog/entities/product.entity.js";

@Entity('quotation_detail')
export class QuotationDetail { 
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    unit_price: number;

    @ManyToOne('Quotation', (quotation: any) => quotation.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'quotation_id' })
    quotation: Quotation;

    @ManyToOne(() => Product, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'product_id' })
    product: Product;
}