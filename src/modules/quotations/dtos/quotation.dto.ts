export class QuotationItemDto {
    product_id: number;
    quantity: number;
    unit_price: number;
}

export class QuotationDto {
    customer_id: number;
    expires_at?: string; // Formato YYYY-MM-DD
    items: QuotationItemDto[];
}