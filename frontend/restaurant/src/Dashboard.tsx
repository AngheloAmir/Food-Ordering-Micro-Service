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
            <AppShell.Main className="bg-stone-100 dark:bg-stone-950 transition-colors duration-300 min-h-screen">
                <Header />
                <Container fluid px={0} py={0}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[65vh] border-b-4 border-dashed border-stone-300 dark:border-stone-800">
                        <div className="p-6 border-r-4 border-dashed border-stone-300 dark:border-stone-800 bg-stone-200/50 dark:bg-stone-900/50">
                            <Group justify="space-between" mb="lg" className="border-b-2 border-stone-400 dark:border-stone-700 pb-2">
                                <Title order={2} ff="monospace" className="uppercase text-stone-700 dark:text-stone-300 tracking-wider">
                                    <span className="text-stone-400 mr-2">01.</span> PENDING ORDERS
                                </Title>
                                <Title order={2} ff="monospace" className="text-stone-500">
                                    ({orders.filter(o => o.status === 'pending').length})
                                </Title>
                            </Group>
                            <Orders orders={orders} whatLookingFor='pending' onStatusChange={handleStatusChange} cols={{ base: 1, sm: 2, md: 3, lg: 2 }} />
                        </div>

                        <div className="p-6 bg-stone-100/50 dark:bg-stone-900/30">
                            <Group justify="space-between" mb="lg" className="border-b-2 border-stone-400 dark:border-stone-700 pb-2">
                                <Title order={2} ff="monospace" className="uppercase text-stone-700 dark:text-stone-300 tracking-wider">
                                    <span className="text-stone-400 mr-2">02.</span> PREPARATION STATION
                                </Title>
                                <Title order={2} ff="monospace" className="text-stone-500">
                                    ({orders.filter(o => o.status === 'cooking').length})
                                </Title>
                            </Group>
                            <Orders orders={orders} whatLookingFor='cooking' onStatusChange={handleStatusChange} cols={{ base: 1, sm: 2, md: 3, lg: 2 }} />
                        </div>
                    </div>

                    <div className="p-6 bg-stone-300/30 dark:bg-stone-900/80 min-h-[35vh]">
                        <Group justify="space-between" mb="lg" className="border-b-2 border-stone-400 dark:border-stone-700 pb-2">
                            <Title order={2} ff="monospace" className="uppercase text-stone-700 dark:text-stone-300 tracking-wider">
                                <span className="text-stone-400 mr-2">03.</span> READY FOR PICKUP
                            </Title>
                            <Title order={2} ff="monospace" className="text-stone-500">
                                ({orders.filter(o => o.status === 'completed').length})
                            </Title>
                        </Group>
                        <Orders orders={orders} whatLookingFor='completed' onStatusChange={handleStatusChange} cols={{ base: 1, sm: 2, md: 3, lg: 4 }} />
                    </div>
                </Container>
            </AppShell.Main>
        </AppShell>
    );
}
