import { Injectable } from "@nestjs/common";
import { ICustomerRepository } from "../customer.repository.js";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "../../entities/customer.entity.js";
import { Repository } from "typeorm";

@Injectable()
export class CustomerRepositoryImpl implements ICustomerRepository {
    constructor(
        @InjectRepository(Customer)
        private readonly repository: Repository<Customer>,
    ) {}

    async findAll(): Promise<Customer[]> {
        return await this.repository.find();
    }

    async findById(id: number): Promise<Customer | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<Customer | null> {
        return await this.repository.findOne({ where: { email } });
    }

    async save(customer: Customer): Promise<Customer> {
        return await this.repository.save(customer);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}