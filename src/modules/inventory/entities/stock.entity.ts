import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import type { Warehouse } from "./warehouse.entity.js";
import { Product } from "../../catalog/entities/product.entity.js";

@Entity('stocks')
export class Stock {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int', default: 0 })
    quantity: number; // Cantidad física actual en este almacén

    @ManyToOne('Warehouse', (warehouse: any) => warehouse.stocks, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'warehouse_id' })
    warehouse: Warehouse;

    @ManyToOne(() => Product, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @UpdateDateColumn()
    updated_at: Date;
}