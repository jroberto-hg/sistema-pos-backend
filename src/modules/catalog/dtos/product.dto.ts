export class ProductDto {
    sku: string;
    name: string;
    description?: string;
    purchase_price: number;
    sale_price: number;
    stock: number;
    category_id: number;
    unit_id: number;
}