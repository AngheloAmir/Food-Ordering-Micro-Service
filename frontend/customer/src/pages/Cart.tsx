import { Container, Title, Grid, Image, Text, Group, Button, ActionIcon, Stack, Paper } from '@mantine/core';
import { IconTrash, IconMinus, IconPlus, IconReceipt } from '@tabler/icons-react';
import { useState } from 'react';

const INITIAL_CART_ITEMS = [
    {
        id: 1,
        name: "Classic Cheeseburger",
        description: "Juicy beef patty with cheddar cheese, lettuce, tomato, and our secret sauce.",
        price: 12.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Crispy French Fries",
        description: "Golden fried potatoes seasoned with sea salt.",
        price: 4.50,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1541592106381-b31e9674c0e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Vanilla Milkshake",
        description: "Creamy vanilla milkshake topped with whipped cream.",
        price: 6.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
    }
];

export default function Cart() {
    const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.1; // 10% tax
    const deliveryFee = 5.00;
    const total = subtotal + tax + deliveryFee;

    const handleQuantityChange = (id: number, change: number) => {
        setCartItems(items => items.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const handleRemoveItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    return (
        <Container size="xl" className="pb-10">
            <Group mb="xl" align="center">
                <div className="bg-yellow-200 dark:bg-yellow-900 p-3 rounded-full shadow-md">
                    <IconReceipt size={32} className="text-yellow-900 dark:text-yellow-100" />
                </div>
                <div>
                    <Title order={1} className="font-sans text-stone-800 dark:text-stone-100 font-black tracking-tight text-3xl">
                        Your Order
                    </Title>
                    <Text className="text-stone-500 dark:text-stone-400 font-medium">
                        {cartItems.length} items in your tray
                    </Text>
                </div>
            </Group>

            <Grid gutter="xl">
                {/* Cart Items List */}
                <Grid.Col span={{ base: 12, md: 8 }}>
                    <Stack gap="lg">
                        {cartItems.map((item) => (
                            <Paper
                                key={item.id}
                                className="overflow-hidden bg-yellow-50 dark:bg-stone-900 border-2 border-dashed border-stone-300 dark:border-stone-700 shadow-sm transition-all hover:shadow-md hover:scale-[1.01] duration-200"
                                radius="md"
                            >
                                <div className="flex flex-col sm:flex-row h-full">
                                    <div className="w-full sm:w-40 h-40 sm:h-auto shrink-0 relative">
                                        <Image
                                            src={item.image}
                                            h="100%"
                                            w="100%"
                                            fit="cover"
                                            className="absolute inset-0"
                                            fallbackSrc="https://placehold.co/600x400?text=Food+Image"
                                        />
                                    </div>
                                    <div className="flex-1 p-5 flex flex-col justify-between">
                                        <div className="flex justify-between items-start gap-3">
                                            <div>
                                                <Text className="font-bold text-lg text-stone-800 dark:text-stone-100 leading-tight mb-1">
                                                    {item.name}
                                                </Text>
                                                <Text className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                                                    {item.description}
                                                </Text>
                                            </div>
                                            <ActionIcon
                                                variant="subtle"
                                                color="red"
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                                            >
                                                <IconTrash size={20} />
                                            </ActionIcon>
                                        </div>

                                        <Group justify="space-between" align="end" mt="md" className="w-full">
                                            <Text className="font-bold text-xl text-yellow-700 dark:text-yellow-400">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </Text>

                                            <Group gap="xs" className="bg-white dark:bg-stone-800 p-1 rounded-lg border border-stone-200 dark:border-stone-700 shadow-sm">
                                                <ActionIcon
                                                    size="sm"
                                                    variant="transparent"
                                                    color="gray"
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <IconMinus size={14} />
                                                </ActionIcon>
                                                <Text className="w-8 text-center font-bold text-sm text-stone-700 dark:text-stone-200 select-none">
                                                    {item.quantity}
                                                </Text>
                                                <ActionIcon
                                                    size="sm"
                                                    variant="transparent"
                                                    color="gray"
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                >
                                                    <IconPlus size={14} />
                                                </ActionIcon>
                                            </Group>
                                        </Group>
                                    </div>
                                </div>
                            </Paper>
                        ))}
                        {cartItems.length === 0 && (
                            <Paper className="p-10 text-center bg-stone-100 dark:bg-stone-900 border-2 border-dashed border-stone-300 dark:border-stone-800 rounded-xl">
                                <Text className="text-stone-500 dark:text-stone-400 text-lg font-medium">
                                    Your tray is empty. Time to add some delicious food!
                                </Text>
                            </Paper>
                        )}
                    </Stack>
                </Grid.Col>

                {/* Summary Section */}
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Paper
                        className="sticky top-24 transform rotate-1 p-6 bg-yellow-200 dark:bg-yellow-800 shadow-xl shadow-yellow-900/10 dark:shadow-black/40"
                        radius="sm"
                    >
                        {/* Tape effect */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-100/30 dark:bg-white/10 backdrop-blur-sm transform -rotate-2"></div>

                        <Title order={3} className="font-sans text-stone-900 dark:text-stone-900 mb-6 flex items-center gap-2">
                            Receipt
                        </Title>

                        <Stack gap="md" className="font-mono text-stone-800 dark:text-stone-900/80">
                            <Group justify="space-between">
                                <Text>Subtotal</Text>
                                <Text>${subtotal.toFixed(2)}</Text>
                            </Group>
                            <Group justify="space-between">
                                <Text>Tax (10%)</Text>
                                <Text>${tax.toFixed(2)}</Text>
                            </Group>
                            <Group justify="space-between">
                                <Text>Delivery Fee</Text>
                                <Text>${deliveryFee.toFixed(2)}</Text>
                            </Group>

                            <div className="border-t-2 border-dashed border-stone-800/20 my-2"></div>

                            <Group justify="space-between" className="text-xl font-bold text-stone-900 dark:text-stone-950">
                                <Text>Total</Text>
                                <Text>${total.toFixed(2)}</Text>
                            </Group>
                        </Stack>

                        <Button
                            fullWidth
                            size="lg"
                            mt="xl"
                            className="bg-stone-900 hover:bg-stone-800 text-yellow-100 hover:text-white transition-all transform hover:scale-[1.02] shadow-lg"
                        >
                            Checkout
                        </Button>
                    </Paper>
                </Grid.Col>
            </Grid>
        </Container>
    );
}
