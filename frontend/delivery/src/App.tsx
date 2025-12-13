import { AppShell, Container, Tabs, Text, Grid, Stack, Title } from '@mantine/core';
import Header from './components/Header';
import { useState } from 'react';
import { Login } from './components/Login';
import { IconPackage, IconMotorbike } from '@tabler/icons-react';
import { mockDeliveryOrders, type DeliveryOrder } from './data/mockData';
import { DeliveryCard } from './components/DeliveryCard';
import { DeliveryMap } from './components/DeliveryMap';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState<DeliveryOrder[]>(mockDeliveryOrders);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const pickupOrders = orders.filter(o => o.status === 'ready_for_pickup');
  const transitOrders = orders.filter(o => o.status === 'in_transit');

  const selectedOrder = transitOrders.find(o => o.id === selectedOrderId) || transitOrders[0];

  const handlePickup = (order: DeliveryOrder) => {
    const updatedOrders = orders.map(o =>
      o.id === order.id ? { ...o, status: 'in_transit' as const } : o
    );
    setOrders(updatedOrders);
    setSelectedOrderId(order.id); // Auto-select the newly picked up order
  };

  const handleCompleteDelivery = (order: DeliveryOrder) => {
    const updatedOrders = orders.map(o =>
      o.id === order.id ? { ...o, status: 'delivered' as const } : o
    );
    setOrders(updatedOrders);
    if (selectedOrderId === order.id) {
      setSelectedOrderId(null);
    }
  };

  return (
    <AppShell
      header={{ height: 100 }}
      padding="md"
    >
      <Header />

      <AppShell.Main className="bg-stone-50 dark:bg-stone-900 transition-colors duration-300 min-h-screen">
        <Container fluid py="xl" px="lg">
          <Tabs defaultValue="pickup" variant="pills" radius="md" orientation="vertical" className="gap-6" onChange={(val) => {
            // Auto-select first in-transit order when switching to 'delivery' tab if none selected
            if (val === 'delivery' && !selectedOrderId && transitOrders.length > 0) {
              setSelectedOrderId(transitOrders[0].id);
            }
          }}>
            <Tabs.List className="bg-stone-200 dark:bg-stone-900/50 rounded-sm p-4 border-2 border-stone-300 dark:border-stone-700 min-w-[200px] h-fit sticky top-24 shadow-lg">
              <div className="mb-4 pb-2 border-b-2 border-stone-300 dark:border-stone-700">
                <Text fz={10} fw={900} c="dimmed" tt="uppercase" ff="monospace" className="tracking-widest">
                  Rider Log
                </Text>
              </div>

              <Tabs.Tab
                value="pickup"
                leftSection={<IconPackage size={18} />}
                className="mb-2 justify-start font-mono uppercase tracking-wide data-[active]:bg-stone-300 dark:data-[active]:bg-stone-800 data-[active]:text-stone-900 dark:data-[active]:text-stone-100 text-stone-500 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-all border-none data-[active]:shadow-sm rounded-sm"
              >
                Pickup Point
                {pickupOrders.length > 0 && <span className="ml-auto bg-yellow-500 text-white text-[10px] px-1.5 rounded-full">{pickupOrders.length}</span>}
              </Tabs.Tab>

              <Tabs.Tab
                value="delivery"
                leftSection={<IconMotorbike size={18} />}
                className="mb-1 justify-start font-mono text-sm data-[active]:bg-stone-300 dark:data-[active]:bg-stone-800 data-[active]:text-stone-900 dark:data-[active]:text-stone-100 text-stone-500 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-all border-none rounded-sm"
              >
                On Route
                {transitOrders.length > 0 && <span className="ml-auto bg-green-600 text-white text-[10px] px-1.5 rounded-full">{transitOrders.length}</span>}
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="pickup" className="flex-1">
              <Stack>
                <Title order={3} ff="monospace" tt="uppercase" className="text-stone-700 dark:text-stone-300 border-b-2 border-dashed border-stone-300 dark:border-stone-700 pb-2">
                  Ready for Collection
                </Title>
                {pickupOrders.length === 0 ? (
                  <div className="p-12 text-center border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-lg opacity-50">
                    <Text ff="monospace" size="lg" fw={700}>NO ORDERS READY</Text>
                    <Text size="sm">Please wait for chef dispatch...</Text>
                  </div>
                ) : (
                  <Grid>
                    {pickupOrders.map(order => (
                      <Grid.Col key={order.id} span={{ base: 12, sm: 6, lg: 4 }}>
                        <DeliveryCard
                          order={order}
                          onAction={handlePickup}
                          actionLabel="Accept & Pickup"
                        />
                      </Grid.Col>
                    ))}
                  </Grid>
                )}
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="delivery" className="flex-1">
              <Grid gutter="lg">
                {/* List of active deliveries */}
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Stack gap="md" className="h-full overflow-y-auto max-h-[80vh] pr-2">
                    <Text ff="monospace" fw={700} tt="uppercase" c="dimmed">Active Deliveries</Text>
                    {transitOrders.length === 0 ? (
                      <div className="p-8 text-center border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-lg opacity-50">
                        <Text ff="monospace">No active deliveries</Text>
                      </div>
                    ) : (
                      transitOrders.map(order => (
                        <div
                          key={order.id}
                          onClick={() => setSelectedOrderId(order.id)}
                          className={`cursor-pointer transition-all duration-200 ${selectedOrderId === order.id ? 'ring-2 ring-offset-2 ring-green-500 rounded-sm' : 'opacity-80 hover:opacity-100'}`}
                        >
                          <DeliveryCard
                            order={order}
                            onAction={handleCompleteDelivery}
                            actionLabel="Confirm Delivery"
                            isInTransit
                          />
                        </div>
                      ))
                    )}
                  </Stack>
                </Grid.Col>

                {/* Map View */}
                <Grid.Col span={{ base: 12, md: 8 }}>
                  {selectedOrder ? (
                    <Stack>
                      <DeliveryMap address={selectedOrder.address} customerName={selectedOrder.customerName} />
                      <div className="p-4 bg-white dark:bg-stone-800 border-l-4 border-green-500 shadow-sm">
                        <Text size="xs" tt="uppercase" fw={700} c="dimmed">Customer Note</Text>
                        <Text ff="monospace" size="lg">{selectedOrder.notes || "No special instructions."}</Text>
                      </div>
                    </Stack>
                  ) : (
                    <div className="h-full min-h-[400px] flex items-center justify-center bg-stone-200 dark:bg-stone-800 rounded-lg border-2 border-dashed border-stone-300 dark:border-stone-600">
                      <Text ff="monospace" c="dimmed">Select an order to view navigation</Text>
                    </div>
                  )}
                </Grid.Col>
              </Grid>
            </Tabs.Panel>
          </Tabs>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
