import { AppShell, Group, Title, Text, Container, SimpleGrid } from '@mantine/core';
import { useState } from 'react';
import { mockOrders } from './data/mockOrders';
import type { Order, OrderStatus } from './types';
import { OrderCard } from './components/OrderCard';
import Header from './components/Header';


export default function App() {
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
              <Title order={3}>Active Orders ({orders.filter(o => o.status === 'processing').length})</Title>
            </Group>

            {orders.filter(o => o.status === 'processing').length > 0 ? (
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                {orders
                  .filter((order) => order.status === 'processing')
                  .map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
              </SimpleGrid>
            ) : (
              <Text c="dimmed" fs="italic">No active orders to process.</Text>
            )}
          </div>

          <div>
            <Title order={4} mb="lg" c="dimmed">Completed Orders ({orders.filter(o => o.status === 'completed').length})</Title>

            {orders.filter(o => o.status === 'completed').length > 0 ? (
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                {orders
                  .filter((order) => order.status === 'completed')
                  .map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
              </SimpleGrid>
            ) : (
              <Text c="dimmed" fs="italic">No completed orders yet.</Text>
            )}
          </div>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
