import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "../../catalog/entities/product.entity.js";
import { Warehouse } from "../../warehouse/entities/warehouse.entity.js";

@Entity('inventory_stocks')
export class InventoryStock {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    warehouse_id: number;

    @ManyToOne(() => Warehouse, { eager: true })
    @JoinColumn({ name: 'warehouse_id' })
    warehouse: Warehouse;

    @Column()
    product_id: number;

    @ManyToOne(() => Product, { eager: true })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    stock: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}