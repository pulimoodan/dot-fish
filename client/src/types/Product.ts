export interface Product {
    id: string;
    name: string;
    purchase: number;
    sale: number;
    cleaning: boolean;
}

export interface OrderProduct {
    product: Product;
    quantity: number;
}
