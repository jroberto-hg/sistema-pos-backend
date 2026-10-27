import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class ReportService { 
    constructor(private readonly dataSource: DataSource) { }

    // 1. Reporte de Stock Actual por Almacén
    async getStockByWarehouse() { 
        return await this.dataSource.query(`
            SELECT 
                w.id as warehouse_id,
                w.name as warehouse_name,
                p.id as product_id,
                p.name as product_name,
                s.quantity,
                s.updated_at
            FROM stocks s
            INNER JOIN warehouses w ON s.warehouse_id = w.id
            INNER JOIN products p ON s.product_id = p.id
            ORDER BY w.name ASC, p.name ASC;
        `);
    }

    // 2. Resumen de Cotizaciones por Estatus (Pendientes, Aprobadas, etc.)
    async getQuotationsSummary() {
        return await this.dataSource.query(`
            SELECT 
                status,
                COUNT(*) as total_quotations,
                SUM(total_amount) as total_amount_sum
            FROM quotations
            GROUP BY status;
        `);
    }

    // 3. Resumen de Compras a Proveedores
    async getPurchasesSummary() {
        return await this.dataSource.query(`
            SELECT 
                s.name as supplier_name,
                COUNT(p.id) as total_purchases,
                SUM(p.total_amount) as total_spent
            FROM purchases p
            INNER JOIN suppliers s ON p.supplier_id = s.id
            GROUP BY s.id, s.name
            ORDER BY total_spent DESC;
        `);
    }
}