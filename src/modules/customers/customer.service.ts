import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CUSTOMER_REPOSITORY } from "./repositories/customer.repository.js";
import type { ICustomerRepository } from './repositories/customer.repository.js';
import { CustomerDto } from "./dtos/customer.dto.js";
import { Customer } from "./entities/customer.entity.js";

@Injectable()
export class CustomerService {
    constructor(
        @Inject(CUSTOMER_REPOSITORY)
        private readonly customerRepository: ICustomerRepository,
    ) {}

    async findAll() {
        return await this.customerRepository.findAll();
    }

    async findById(id: number) {
        const customer = await this.customerRepository.findById(id);
        if (!customer) {
            throw new NotFoundException(`Cliente con ID ${id} no encontrado.`);
        }
        return customer;
    }

    async create(dto: CustomerDto) {
        if (dto.email) {
            const existingEmail = await this.customerRepository.findByEmail(dto.email);
            if (existingEmail) {
                throw new ConflictException(`Ya existe un cliente registrado con el correo '${dto.email}'.`);
            }
        }

        const customer = new Customer();
        Object.assign(customer, dto);

        return await this.customerRepository.save(customer);
    }

    async update(id: number, dto: Partial<CustomerDto>) {
        const customer = await this.findById(id);

        if (dto.email && dto.email !== customer.email) {
            const existingEmail = await this.customerRepository.findByEmail(dto.email);
            if (existingEmail) {
                throw new ConflictException(`Ya existe otro cliente con el correo '${dto.email}'.`);
            }
        }

        Object.assign(customer, dto);
        return await this.customerRepository.save(customer);
    }

    async remove(id: number) {
        await this.findById(id);
        await this.customerRepository.delete(id);
        return { message: `Cliente con ID ${id} eliminado correctamente.` };
    }
}