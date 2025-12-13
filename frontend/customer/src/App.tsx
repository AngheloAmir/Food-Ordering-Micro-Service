import { AppShell, Container, Grid, Tabs, TextInput, Group, ActionIcon, Title, Badge, Card, Text, Avatar, Button, Indicator, SimpleGrid, ThemeIcon, Timeline, Stack, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSearch, IconHome, IconReceipt, IconUser, IconShoppingCart, IconChefHat, IconTruckDelivery, IconCheck, IconToolsKitchen2, IconHistory, IconCreditCard, IconMessageChatbot, IconSun, IconMoon } from '@tabler/icons-react';
import { useState, useMemo } from 'react';
import { foodItems, mockOrders, mockTransactions } from './data/mockData';
import { FoodCard } from './components/FoodCard';
import { CartDrawer } from './components/CartDrawer';
import type { CartItem, FoodItem } from './types';
import { Login } from './components/Login';

// Helper for status colors
const getStatusColor = (status: string) => {
  switch (status) {
    case 'cooking': return 'orange';
    case 'delivering': return 'blue';
    case 'delivered': return 'green';
    case 'cancelled': return 'red';
    default: return 'gray';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'cooking': return <IconChefHat size={16} />;
    case 'delivering': return <IconTruckDelivery size={16} />;
    case 'delivered': return <IconCheck size={16} />;
    default: return <IconToolsKitchen2 size={16} />;
  }
};


const ThemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
      radius="xl"
    >
      {computedColorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
    </ActionIcon>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>('home');
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);


  const handleAddToCart = (food: FoodItem, quantity: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === food.id);
      if (existing) {
        return prev.map(item => item.id === food.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...food, quantity }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    alert('Checkout functionality coming soon!');
    setCartItems([]);
    setCartOpen(false);
  };

  const filteredFood = useMemo(() => {
    return foodItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categories = Array.from(new Set(foodItems.map(f => f.category)));


  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      <AppShell
        header={{ height: 70 }}
        footer={{ height: 0 }} // Hidden footer for now, we use Tabs for nav
        padding="md"
        className="bg-gray-50 dark:bg-gray-900 min-h-screen"
      >
        <AppShell.Header p="md" className="flex items-center justify-between">
          <Group>
            <ThemeIcon variant="light" size="lg" color="orange">
              <IconToolsKitchen2 />
            </ThemeIcon>
            <Title order={3} className="hidden sm:block">TastyBites</Title>
          </Group>

          <Group>
            <ThemeToggle />
            <Indicator label={cartItems.reduce((acc, item) => acc + item.quantity, 0)} size={16} color="red" disabled={cartItems.length === 0}>
              <ActionIcon variant="light" size="lg" onClick={() => setCartOpen(true)}>
                <IconShoppingCart size={22} />
              </ActionIcon>
            </Indicator>
            <Avatar src="https://ui.mantine.dev/_next/static/media/avatar.7e174f82.png" alt="it's me" radius="xl" size="md" />
          </Group>
        </AppShell.Header>

        <AppShell.Main pb={80}> {/* Padding bottom for mobile nav potentially, usually implied */}
          <Container size="md">

            <Tabs value={activeTab} onChange={setActiveTab} variant="pills" radius="md">
              <Tabs.List grow mb="xl">
                <Tabs.Tab value="home" leftSection={<IconHome size={16} />}>Home</Tabs.Tab>
                <Tabs.Tab value="orders" leftSection={<IconReceipt size={16} />}>Orders</Tabs.Tab>
                <Tabs.Tab value="transactions" leftSection={<IconHistory size={16} />}>Transactions</Tabs.Tab>
                <Tabs.Tab value="profile" leftSection={<IconUser size={16} />}>Profile</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="home">
                <TextInput
                  placeholder="Search for delicious food..."
                  leftSection={<IconSearch size={16} />}
                  size="md"
                  mb="lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.currentTarget.value)}
                />

                <Group mb="lg" className="overflow-x-auto flex-nowrap pb-2">
                  <Button
                    variant={selectedCategory === null ? 'filled' : 'light'}
                    onClick={() => setSelectedCategory(null)}
                    radius="xl"
                    size="xs"
                  >
                    All
                  </Button>
                  {categories.map(cat => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? 'filled' : 'light'}
                      onClick={() => setSelectedCategory(cat)}
                      radius="xl"
                      size="xs"
                    >
                      {cat}
                    </Button>
                  ))}
                </Group>

                <Title order={3} mb="md">Popular Near You</Title>
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
                  {filteredFood.map(food => (
                    <FoodCard key={food.id} food={food} onAddToCart={handleAddToCart} />
                  ))}
                </SimpleGrid>
              </Tabs.Panel>

              <Tabs.Panel value="orders">
                <Title order={2} mb="xl">Your Orders</Title>
                <Grid>
                  {mockOrders.map(order => (
                    <Grid.Col span={{ base: 12 }} key={order.id}>
                      <Card padding="lg" radius="md" withBorder>
                        <Group justify="space-between" mb="xs">
                          <Text fw={700}>Order #{order.id}</Text>
                          <Badge color={getStatusColor(order.status)} leftSection={getStatusIcon(order.status)}>
                            {order.status.toUpperCase()}
                          </Badge>
                        </Group>
                        <Text size="sm" c="dimmed" mb="md">
                          {new Date(order.date).toLocaleString()}
                        </Text>

                        <Timeline active={1} bulletSize={24} lineWidth={2}>
                          <Timeline.Item bullet={<IconToolsKitchen2 size={12} />} title="Order Placed">
                            <Text c="dimmed" size="xs">We received your order</Text>
                          </Timeline.Item>
                          <Timeline.Item bullet={<IconChefHat size={12} />} title="Cooking" lineVariant={order.status === 'cooking' ? 'dashed' : 'solid'}>
                            <Text c="dimmed" size="xs">Chef is preparing your food</Text>
                          </Timeline.Item>
                          <Timeline.Item bullet={<IconTruckDelivery size={12} />} title="Out for Delivery" lineVariant={order.status === 'delivering' ? 'dashed' : 'solid'}>
                            <Text c="dimmed" size="xs">Rider is on the way</Text>
                          </Timeline.Item>
                          <Timeline.Item bullet={<IconCheck size={12} />} title="Delivered">
                            <Text c="dimmed" size="xs">Order delivered successfully</Text>
                          </Timeline.Item>
                        </Timeline>

                        <Group justify="space-between" mt="md">
                          <Text size="sm">{order.items.length} items</Text>
                          <Text fw={700} size="lg">${order.total.toFixed(2)}</Text>
                        </Group>
                      </Card>
                    </Grid.Col>
                  ))}
                </Grid>
              </Tabs.Panel>

              <Tabs.Panel value="transactions">
                <Title order={2} mb="xl">Transaction History</Title>
                <Card withBorder radius="md">
                  <Stack>
                    {mockTransactions.map(t => (
                      <Group key={t.id} justify="space-between" p="sm" className="border-b last:border-0 border-gray-100 dark:border-gray-800">
                        <Group>
                          <ThemeIcon color="blue" variant="light" size="lg" radius="xl">
                            <IconCreditCard size={20} />
                          </ThemeIcon>
                          <div>
                            <Text fw={500}>{t.description}</Text>
                            <Text size="xs" c="dimmed">{t.date}</Text>
                          </div>
                        </Group>
                        <Text fw={700} c="red">-${t.amount.toFixed(2)}</Text>
                      </Group>
                    ))}
                  </Stack>
                </Card>
              </Tabs.Panel>

              <Tabs.Panel value="profile">
                <Container size="xs">
                  <Card withBorder radius="md" p="xl" mb="lg" className="text-center">
                    <Avatar src="https://ui.mantine.dev/_next/static/media/avatar.7e174f82.png" size={120} radius={120} mx="auto" mb="md" />
                    <Title order={2}>Jane Doe</Title>
                    <Text c="dimmed">jane.doe@example.com</Text>
                    <Badge mt="md" size="lg" variant="dot" color="green">Premium Member</Badge>
                  </Card>

                  <Title order={4} mb="md">Support</Title>
                  <Button fullWidth size="lg" variant="light" leftSection={<IconMessageChatbot />} color="violet" onClick={() => alert("Customer Service Chat functionality would open here.")}>
                    Contact Customer Service
                  </Button>
                </Container>
              </Tabs.Panel>

            </Tabs>

          </Container>
        </AppShell.Main>
      </AppShell>

      <CartDrawer
        opened={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />
    </>
  );
}

