import type { FoodItem, Order, Transaction } from '../types';


export const foodItems: FoodItem[] = [
    {
        id: '1',
        name: 'Classic Burger',
        description: 'Juicy beef patty with fresh lettuce, tomato, and our secret sauce.',
        price: 12.99,
        calories: 850,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        category: 'Burgers',
        rating: 4.5,
    },
    {
        id: '2',
        name: 'Margherita Pizza',
        description: 'Traditional wood-fired pizza with fresh basil and mozzarella.',
        price: 14.50,
        calories: 1200,
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        category: 'Pizza',
        rating: 4.8,
    },
    {
        id: '3',
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing.',
        price: 9.99,
        calories: 450,
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        category: 'Salads',
        rating: 4.2,
    },
    {
        id: '4',
        name: 'Spicy Chicken Wings',
        description: 'Crispy wings tossed in a spicy buffalo sauce.',
        price: 11.50,
        calories: 700,
        image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        category: 'Appetizers',
        rating: 4.6,
    },
    {
        id: '5',
        name: 'Sushi Platter',
        description: 'Assorted fresh nigiri and maki rolls.',
        price: 24.00,
        calories: 600,
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        category: 'Japanese',
        rating: 4.9,
    },
    {
        id: '6',
        name: 'Pasta Carbonara',
        description: 'Creamy pasta with pancetta and black pepper.',
        price: 16.00,
        calories: 950,
        image: 'https://images.unsplash.com/photo-1612874742237-9828fa365671?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        category: 'Italian',
        rating: 4.7,
    },
];

export const mockOrders: Order[] = [
    {
        id: 'ord-123',
        items: [
            { ...foodItems[0], quantity: 2 },
            { ...foodItems[3], quantity: 1 }
        ],
        total: 37.48,
        status: 'cooking',
        date: '2023-10-27T10:30:00Z',
    },
    {
        id: 'ord-124',
        items: [
            { ...foodItems[1], quantity: 1 }
        ],
        total: 14.50,
        status: 'delivering',
        date: '2023-10-27T11:15:00Z',
    },
    {
        id: 'ord-100',
        items: [
            { ...foodItems[4], quantity: 1 }
        ],
        total: 24.00,
        status: 'delivered',
        date: '2023-10-26T19:00:00Z',
    }
];

export const mockTransactions: Transaction[] = [
    { id: 'txn-1', date: '2023-10-26', amount: 24.00, description: 'Order #ord-100' },
    { id: 'txn-2', date: '2023-10-25', amount: 50.00, description: 'Wallet Top-up' },
];
