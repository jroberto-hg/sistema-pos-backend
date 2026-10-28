import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class WarehouseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    location?: string;
}