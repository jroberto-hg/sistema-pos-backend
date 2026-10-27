import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./category.entity.js";
import { Unit } from "./unit.entity.js";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    sku: string;            // Código de barras o SKU único

    @Column({ type: 'varchar', length: 150 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    purchase_price: number; // Precio al que se compra al proveedor

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    sale_price: number;     // Precio al que se vende al cliente

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    stock: number;          // Cantidad actual en inventario

    @Column({ default: true })
    is_active: boolean;

    @ManyToOne(() => Category, { eager: true })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @ManyToOne(() => Unit, { eager: true })
    @JoinColumn({ name: 'unit_id' })
    unit: Unit;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}