export class PurchaseItemDto {
    product_id: number;
    quantity: number;
    unit_cost: number;
}

export class PurchaseDto {
    supplier_id: number;
    warehouse_id: number;
    items: PurchaseItemDto[];
}