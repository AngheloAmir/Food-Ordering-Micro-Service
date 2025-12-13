export interface DeliveryOrder {
    id: string;
    customerName: string;
    address: string;
    items: string[];
    status: 'ready_for_pickup' | 'in_transit' | 'delivered';
    coordinates: { lat: number; lng: number }; // For mock map
    notes?: string;
    totalAmount: number;
}

export const mockDeliveryOrders: DeliveryOrder[] = [
    {
        id: 'ORD-8801',
        customerName: 'Alice Johnson',
        address: '42 Wallaby Way, Sydney',
        items: ['Truffle Burger', 'Fries'],
        status: 'ready_for_pickup',
        coordinates: { lat: -33.8688, lng: 151.2093 },
        notes: 'Leave at front door',
        totalAmount: 24.50
    },
    {
        id: 'ORD-8802',
        customerName: 'Bob Smith',
        address: '10 Downing Street, London',
        items: ['Fish & Chips', 'Mushy Peas', 'Coke'],
        status: 'ready_for_pickup',
        coordinates: { lat: 51.5034, lng: -0.1276 },
        totalAmount: 18.75
    },
    {
        id: 'ORD-8755',
        customerName: 'Charlie Brown',
        address: '742 Evergreen Terrace, Springfield',
        items: ['Donuts (Dozen)', 'Coffee'],
        status: 'in_transit',
        coordinates: { lat: 44.0521, lng: -123.0868 },
        notes: 'Doorbell is broken, please knock',
        totalAmount: 15.00
    }
];
