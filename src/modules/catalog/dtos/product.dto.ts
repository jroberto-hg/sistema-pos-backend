import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class ProductDto {
    @IsString()
    @IsNotEmpty()
    sku: string;
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @Min(0)
    purchase_price: number;

    @IsNumber()
    @Min(0)
    sale_price: number;

    @IsNumber()
    @Min(0)
    stock: number;

    @IsNumber()
    @IsNotEmpty()
    category_id: number;

    @IsNumber()
    @IsNotEmpty()
    unit_id: number;
}