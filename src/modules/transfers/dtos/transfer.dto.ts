import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { TransferItemDto } from "./transfer-item.dto.js";

export class TransferDto { 
    @IsNumber()
    @IsNotEmpty()
    origin_warehouse_id: number;

    @IsNumber()
    @IsNotEmpty()
    destination_warehouse_id: number;

    @IsString()
    @IsOptional()
    notes?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TransferItemDto)
    details: TransferItemDto[];
}