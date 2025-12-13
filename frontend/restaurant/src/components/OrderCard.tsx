import { Badge, Button, Card, Group, Stack, Text } from '@mantine/core';
import { IconCheck, IconChefHat, IconMotorbike, IconToolsKitchen2, IconUser, IconWallet } from '@tabler/icons-react';
import type { Order, OrderStatus } from '../types';

interface OrderCardProps {
    order: Order;
    onStatusChange: (id: string, status: OrderStatus) => void;
}

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
    //const isProcessing = order.status === 'cooking';
    //const isCompleted = order.status === 'completed';

    // Dynamic Background classes based on status
    // Using Tailwind utility classes for colors
    //const cardBgClass = isProcessing
    //    ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
    //    : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';

    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className={`transition-colors duration-300 `}
        >
            <Group justify="space-between" mb="xs">
                <Group>
                    <Text fw={700} size="lg">#{order.id}</Text>
                    <Badge
                        color={order.source === 'csr' ? 'blue' : 'grape'}
                        variant="light"
                    >
                        {order.source === 'csr' ? 'CSR' : 'App'}
                    </Badge>
                    <Badge
                        color={order.type === 'dine_in' ? 'teal' : 'orange'}
                        variant="dot"
                    >
                        {order.type === 'dine_in' ? 'Dine In' : 'Take Out'}
                    </Badge>
                </Group>

                <Group gap="xs">
                    {order.isPaid ? (
                        <Badge leftSection={<IconCheck size={12} />} color="green" variant="filled">PAID</Badge>
                    ) : (
                        <Badge leftSection={<IconWallet size={12} />} color="red" variant="outline">UNPAID</Badge>
                    )}
                </Group>
            </Group>

            <Group align="flex-start" mb="md">
                <div>
                    <Group gap={5} mb={2}>
                        <IconUser size={16} className="text-gray-500" />
                        <Text fw={500}>{order.customerName}</Text>
                    </Group>

                    {order.type === 'take_out' && (
                        <Group gap={5}>
                            <IconMotorbike size={16} className="text-gray-500" />
                            <Text size="sm" c="dimmed">
                                {order.customerAddress || 'No address provided'}
                            </Text>
                        </Group>
                    )}
                    {order.type === 'dine_in' && (
                        <Group gap={5}>
                            <IconToolsKitchen2 size={16} className="text-gray-500" />
                            <Text size="sm" c="dimmed">Table Service</Text>
                        </Group>
                    )}
                </div>
            </Group>

            <Card.Section withBorder inheritPadding py="xs" className="bg-white/50 dark:bg-black/20">
                <Stack gap="xs">
                    <Text size="sm" fw={600} c="dimmed">Order Items:</Text>
                    {order.items.map((item, index) => (
                        <Group key={index} justify="space-between">
                            <Text size="sm">{item.name}</Text>
                            <Badge size="sm" variant="outline" color="gray">x{item.quantity}</Badge>
                        </Group>
                    ))}
                </Stack>
            </Card.Section>

            <Group mt="md" grow>
                {order.status === 'pending' && (
                    <Button
                        leftSection={<IconChefHat size={20} />}
                        color="blue"
                        variant="light"
                        onClick={() => onStatusChange(order.id, 'cooking')}
                    >
                        Prepare Dishes
                    </Button>
                )}

                {order.status === 'cooking' && (
                    <Button
                        leftSection={<IconChefHat size={20} />}
                        color="orange"
                        variant="light"
                        onClick={() => onStatusChange(order.id, 'completed')}
                    >
                        Dish Ready
                    </Button>
                )}

                {order.status === 'completed' && (
                    <Button
                        leftSection={<IconChefHat size={20} />}
                        color="green"
                        variant="light"
                        onClick={() => onStatusChange(order.id, 'pending')}
                    >
                        (remove this button) Reset
                    </Button>
                )}



            </Group>
        </Card>
    );
}
