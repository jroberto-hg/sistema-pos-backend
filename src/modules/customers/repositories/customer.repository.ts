import { Customer } from "../entities/customer.entity.js";

export interface ICustomerRepository {
    findAll(): Promise<Customer[]>
    ;
    findById(id: number): Promise<Customer | null>
    ;
    findByEmail(email: string): Promise<Customer | null>;

    save(customer: Customer): Promise<Customer>;
    
    delete(id: number): Promise<void>;
}

export const CUSTOMER_REPOSITORY = Symbol('CUSTOMER_REPOSITORY');