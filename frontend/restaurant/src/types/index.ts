export type OrderStatus = 'pending' | 'cooking' | 'completed';
export type OrderType = 'dine_in' | 'take_out';
export type OrderSource = 'csr' | 'customer';

export interface OrderItem {
    name: string;
    quantity: number;
}

export interface Order {
    id: string;
    customerName: string;
    customerAddress?: string;
    items: OrderItem[];
    isPaid: boolean;
    source: OrderSource;
    type: OrderType;
    status: OrderStatus;
}
