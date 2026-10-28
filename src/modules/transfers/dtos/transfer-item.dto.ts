import { IsNotEmpty, IsNumber } from "class-validator";

export class TransferItemDto {
    @IsNumber()
    @IsNotEmpty()
    product_id: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}