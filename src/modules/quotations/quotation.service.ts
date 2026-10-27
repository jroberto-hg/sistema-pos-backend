import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository, DeepPartial } from "typeorm"; 
import { QUOTATION_REPOSITORY } from "./repositories/quotation.repository.js";
import type { IQuotationRepository } from "./repositories/quotation.repository.js";
import { Quotation } from "./entities/quotation.entity.js";
import { QuotationDto } from "./dtos/quotation.dto.js";

@Injectable()
export class QuotationService {
    constructor(
        @Inject(QUOTATION_REPOSITORY)
        private readonly quotationRepository: IQuotationRepository,
    ) {}

    async findAll(): Promise<Quotation[]> {
        return this.quotationRepository.findAll();
    }

    async findOne(id: number): Promise<Quotation> {
        const quotation = await this.quotationRepository.findById(id);
        if (!quotation) {
            throw new NotFoundException(`Cotización con ID ${id} no encontrada.`);
        }
        return quotation;
    }

    async create(dto: QuotationDto, userId: number): Promise<Quotation> {
        // Calcular el total general sumando item.quantity * item.unit_price
        const totalAmount = dto.items.reduce((acc, item) => acc + (item.quantity * item.unit_price), 0);

        const quotationData: DeepPartial<Quotation> = {
            total_amount: totalAmount,
            customer: { id: dto.customer_id } as any,
            user: { id: userId } as any,
            expires_at: dto.expires_at ? new Date(dto.expires_at) : undefined,
            items: dto.items.map(item => ({
                quantity: item.quantity,
                unit_price: item.unit_price,
                product: { id: item.product_id } as any,
            })),
        };

        return this.quotationRepository.create(quotationData);
    }
}