import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Purchase } from "./purchase.entity.js";
import { Product } from "../../catalog/entities/product.entity.js";

@Entity('purchase_items')
export class PurchaseItem { 
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    unit_cost: number; // Costo de compra por unidad

    @ManyToOne('Purchase', (purchase: any) => purchase.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'purchase_id' })
    purchase: Purchase;

    @ManyToOne(() => Product, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'product_id' })
    product: Product;
}