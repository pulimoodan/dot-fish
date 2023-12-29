import { Customer } from '../Customers/Customer';
import { Product } from '../Products/Product';

export interface Order {
    id: string;
    num: number;
    items: Item[];
    slot: number;
    payment: string;
    status: string;
    total: number;
    createdAt: Date;
    customer: Customer;
}

export interface Item {
    product: Product;
    quantity: number;
}
