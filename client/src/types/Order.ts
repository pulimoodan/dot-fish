import { Customer } from './Customer';
import { OrderProduct } from './Product';

export interface Order {
    id: string;
    items: OrderProduct[];
    total: number;
    status: string;
    payment: string;
    slot: string;
    createdAt: Date;
    customer: Customer;
}
