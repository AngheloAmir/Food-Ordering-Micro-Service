import { AppShell, Group, Title, Container } from '@mantine/core';
import { useState } from 'react';
import { mockOrders } from './data/mockOrders';
import type { Order, OrderStatus } from './types';
import Header from './components/Header';
import Orders from './components/Orders';

export default function Dashboard() {
    const [orders, setOrders] = useState<Order[]>(mockOrders);

    const handleStatusChange = (id: string, newStatus: OrderStatus) => {
        setOrders((currentOrders) =>
            currentOrders.map((order) =>
                order.id === id ? { ...order, status: newStatus } : order
            )
        );
    };

    return (
        <AppShell
            padding="0"
        >
            <AppShell.Main className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300 min-h-screen">
                <Header />
                <Container fluid px={0} py={0}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh] border-b border-gray-200 dark:border-gray-800">
                        <div className="p-6 border-r border-gray-200 dark:border-gray-800 bg-orange-50/30 dark:bg-orange-900/5">
                            <Group justify="space-between" mb="lg">
                                <Title order={3}>Pending Orders ({orders.filter(o => o.status === 'pending').length})</Title>
                            </Group>
                            <Orders orders={orders} whatLookingFor='pending' onStatusChange={handleStatusChange} cols={{ base: 1, sm: 2, md: 3, lg: 2 }} />
                        </div>

                        <div className="p-6 bg-blue-50/30 dark:bg-blue-900/5">
                            <Group justify="space-between" mb="lg">
                                <Title order={3}>Cooking Orders ({orders.filter(o => o.status === 'cooking').length})</Title>
                            </Group>
                            <Orders orders={orders} whatLookingFor='cooking' onStatusChange={handleStatusChange} cols={{ base: 1, sm: 2, md: 3, lg: 2 }} />
                        </div>
                    </div>

                    <div className="p-6 bg-green-50/30 dark:bg-green-900/5">
                        <Group justify="space-between" mb="lg">
                            <Title order={3}>Completed Dishes ({orders.filter(o => o.status === 'completed').length})</Title>
                        </Group>
                        <Orders orders={orders} whatLookingFor='completed' onStatusChange={handleStatusChange} cols={{ base: 1, sm: 2, md: 3, lg: 4 }} />
                    </div>
                </Container>
            </AppShell.Main>
        </AppShell>
    );
}
