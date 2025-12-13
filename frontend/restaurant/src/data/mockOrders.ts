import type { Order } from "../types";

export const mockOrders: Order[] = [
    {
        id: "ORD-001",
        customerName: "John Doe",
        customerAddress: "123 Main St, Springfield",
        items: [
            { name: "Spaghetti", quantity: 1 },
            { name: "Coke", quantity: 2 },
            { name: "Burger", quantity: 1 },
        ],
        isPaid: true,
        source: "customer",
        type: "take_out",
        status: "pending",
    },
    {
        id: "ORD-002",
        customerName: "Jane Smith",
        items: [
            { name: "Caesar Salad", quantity: 1 },
            { name: "Water", quantity: 1 },
        ],
        isPaid: false,
        source: "csr",
        type: "dine_in",
        status: "pending",
    },
    {
        id: "ORD-003",
        customerName: "Bob Johnson",
        customerAddress: "456 Oak Ave, Metropolis",
        items: [
            { name: "Pizza", quantity: 2 },
            { name: "Beer", quantity: 4 },
        ],
        isPaid: true,
        source: "customer",
        type: "take_out",
        status: "pending",
    },
    {
        id: "ORD-004",
        customerName: "Alice Wonderland",
        items: [
            { name: "Tea", quantity: 1 },
            { name: "Cake", quantity: 1 },
        ],
        isPaid: true,
        source: "csr",
        type: "dine_in",
        status: "pending",
    },
];
