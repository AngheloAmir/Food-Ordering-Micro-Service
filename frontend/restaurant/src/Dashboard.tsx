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
            header={{ height: 100 }}
            padding="md"
        >
            <Header />

            <AppShell.Main className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300 min-h-screen">
                <Container size="xl" py="xl">
                    <div className="mb-10">
                        <Group justify="space-between" mb="lg">
                            <Title order={3}>Pending Orders ({orders.filter(o => o.status === 'pending').length})</Title>
                        </Group>
                        <Orders orders={orders} whatLookingFor='pending' onStatusChange={handleStatusChange} />
                    </div>

                    <div className="mb-10">
                        <Group justify="space-between" mb="lg">
                            <Title order={3}>Cooking Orders ({orders.filter(o => o.status === 'cooking').length})</Title>
                        </Group>
                        <Orders orders={orders} whatLookingFor='cooking' onStatusChange={handleStatusChange} />
                    </div>

                    <div className="mb-10">
                        <Group justify="space-between" mb="lg">
                            <Title order={3}>Completed Dishes ({orders.filter(o => o.status === 'completed').length})</Title>
                        </Group>
                        <Orders orders={orders} whatLookingFor='completed' onStatusChange={handleStatusChange} />
                    </div>
                </Container>
            </AppShell.Main>
        </AppShell>
    );
}
