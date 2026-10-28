import { InventoryStock } from "../entities/inventory-stock.entity.js";

export interface IInventoryRepository {
    findByWarehouseAndProduct(warehouseId: number, productId: number): Promise<InventoryStock | null>;

    save(inventoryStock: InventoryStock): Promise<InventoryStock>;
}

export const INVENTORY_REPOSITORY = Symbol('INVENTORY_REPOSITORY');