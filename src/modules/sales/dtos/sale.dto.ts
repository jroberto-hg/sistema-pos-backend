export class SaleItemDto {
    product_id: number;
    quantity: number;
}

export class SaleDto {
    invoice_number: string;
    payment_method: string;
    customer_id?: number;
    tax?: number;
    items: SaleItemDto[];
}