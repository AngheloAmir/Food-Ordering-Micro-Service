export const menuItems = [
    { id: '1', name: 'Truffle Mushroom Burger', price: 18.50, category: 'Main' },
    { id: '2', name: 'Crispy Pork Belly', price: 22.00, category: 'Main' },
    { id: '3', name: 'Seared Scallops', price: 26.00, category: 'Starter' },
    { id: '4', name: 'Caesar Salad', price: 12.00, category: 'Starter' },
    { id: '5', name: 'Craft Cola', price: 4.50, category: 'Drink' },
    { id: '6', name: 'Yuzu Lemonade', price: 5.50, category: 'Drink' },
];

export const mockCustomer = {
    id: 'C-001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Culinary Ave, Gourmet City',
    notes: 'Allergic to peanuts. Prefers contactless delivery.',
    status: 'VIP',
    currentDeliveries: [
        { id: 'ORD-7782', status: 'Out for Delivery', items: ['Truffle Mushroom Burger', 'Craft Cola'], total: 23.00, eta: '15 mins' }
    ],
    orderHistory: [
        { id: 'ORD-7701', date: '2025-10-15', total: 45.50, status: 'Delivered' },
        { id: 'ORD-7654', date: '2025-10-10', total: 32.00, status: 'Delivered' },
    ]
};

export const mockChatHistory = [
    { sender: 'System', message: 'Chat started with Customer Support', time: '10:00 AM' },
    { sender: 'You', message: 'Hello, how can I help you today?', time: '10:01 AM' },
    { sender: 'Customer', message: 'Hi, I would like to check on my order #7782.', time: '10:02 AM' },
];
