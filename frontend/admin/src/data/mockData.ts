export const dashboardStats = {
    ongoingOrders: 12,
    completedOrders: 45,
    ordersToDeliver: 8,
    dailySales: [
        { date: 'Mon', count: 45, revenue: 1250 },
        { date: 'Tue', count: 52, revenue: 1480 },
        { date: 'Wed', count: 38, revenue: 1050 },
        { date: 'Thu', count: 65, revenue: 1980 },
        { date: 'Fri', count: 89, revenue: 2650 },
        { date: 'Sat', count: 120, revenue: 3800 },
        { date: 'Sun', count: 95, revenue: 2900 },
    ]
};

export const procurementList = [
    { id: '1', item: 'Tomatoes', quantity: '5 kg', checked: false },
    { id: '2', item: 'Flour', quantity: '20 kg', checked: false },
    { id: '3', item: 'Milk', quantity: '10 L', checked: true },
    { id: '4', item: 'Eggs', quantity: '100 pcs', checked: false },
    { id: '5', item: 'Chicken Breast', quantity: '15 kg', checked: false },
    { id: '6', item: 'Olive Oil', quantity: '5 L', checked: true },
];

export const productsList = [
    {
        id: 'p1',
        name: 'Margherita Pizza',
        description: 'Classic tomato and cheese pizza',
        price: 12.99,
        basePrice: 4.50,
        ingredients: ['Flour', 'Tomatoes', 'Mozzarella', 'Basil']
    },
    {
        id: 'p2',
        name: 'Cheeseburger',
        description: 'Angus beef patty with cheddar',
        price: 14.50,
        basePrice: 5.20,
        ingredients: ['Beef Bun', 'Cheddar', 'Lettuce', 'Tomato']
    },
    {
        id: 'p3',
        name: 'Caesar Salad',
        description: 'Fresh romaine with parmesan and croutons',
        price: 10.00,
        basePrice: 3.00,
        ingredients: ['Romaine Lettuce', 'Parmesan', 'Croutons', 'Caesar Dressing']
    },
];

export const employeesList = [
    { id: 'e1', name: 'John Doe', role: 'Delivery', status: 'Working', loginTime: '08:00 AM' },
    { id: 'e2', name: 'Jane Smith', role: 'Chef', status: 'Working', loginTime: '07:30 AM' },
    { id: 'e3', name: 'Mike Johnson', role: 'CSR', status: 'Break', loginTime: '08:00 AM' },
    { id: 'e4', name: 'Sarah Wilson', role: 'Chef', status: 'Working', loginTime: '10:00 AM' },
    { id: 'e5', name: 'Tom Brown', role: 'Delivery', status: 'Off', loginTime: '--' },
];

export const employeeAccessList = [
    { id: 'a1', name: 'John Doe', role: 'Delivery', username: 'johnD', password: 'password123', accessLevel: 'Limited' },
    { id: 'a2', name: 'Jane Smith', role: 'Chef', username: 'chefJane', password: 'securePass!', accessLevel: 'Full Kitchen' },
    { id: 'a3', name: 'Mike Johnson', role: 'CSR', username: 'mikeCSR', password: 'csrPass2024', accessLevel: 'Customer Data' },
    { id: 'a4', name: 'Sarah Wilson', role: 'Chef', username: 'sarahChef', password: 'chefSarah99', accessLevel: 'Full Kitchen' },
    { id: 'admin', name: 'Admin User', role: 'Admin', username: 'admin', password: 'adminPassword', accessLevel: 'System Admin' },
];
