export interface FoodItem {
    id: string;
    name: string;
    description: string;
    price: number;
    calories: number;
    image: string;
    category: string;
    rating: number;
}

export interface CartItem extends FoodItem {
    quantity: number;
}

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    status: 'cooking' | 'delivering' | 'delivered' | 'cancelled';
    date: string;
}

export interface Transaction {
    id: string;
    date: string;
    amount: number;
    description: string;
}
