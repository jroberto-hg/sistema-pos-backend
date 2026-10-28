import { IsString, IsNumber, IsArray, ValidateNested, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer'

export class PurchaseItemDto {
    @IsNumber()
    @IsNotEmpty()
    product_id: number;

    @IsNumber()
    @Min(1)
    quantity: number;

    @IsNumber()
    @Min(0)
    cost_price: number;
}

export class PurchaseDto {
    @IsString()
    @IsNotEmpty()
    invoice_number: string;

    @IsNumber()
    @IsNotEmpty()
    supplier_id: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PurchaseItemDto)
    items: PurchaseItemDto[];
}