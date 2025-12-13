import { Badge, Button, Group, Stack, Text } from '@mantine/core';
import { IconCheck, IconChefHat, IconMotorbike, IconToolsKitchen2, IconUser, IconWallet } from '@tabler/icons-react';
import type { Order, OrderStatus } from '../types';

interface OrderCardProps {
    order: Order;
    onStatusChange: (id: string, status: OrderStatus) => void;
}

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
    // Color mapping for "Sticky Note" types
    const getStickyColor = (status: OrderStatus) => {
        switch (status) {
            case 'cooking':
                return 'bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-100 shadow-lg shadow-blue-900/10 dark:shadow-blue-900/50';
            case 'completed':
                return 'bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-100 shadow-lg shadow-green-900/10 dark:shadow-green-900/50';
            default: // pending
                return 'bg-yellow-200 dark:bg-yellow-600 text-yellow-900 dark:text-yellow-100 shadow-lg shadow-yellow-900/10 dark:shadow-yellow-900/50';
        }
    };

    const stickyClass = getStickyColor(order.status);
    // Random slight rotation for natural feel - strictly purely visual
    // Note: In React we might want this deterministic or it causes hydration mismatch.
    // We'll stick to a fixed rotation based on ID length or standard class for consistency.
    const rotationClass = order.status === 'cooking' ? '-rotate-1' : order.status === 'completed' ? 'rotate-1' : 'rotate-0';

    return (
        <div className={`relative p-6 pt-8 min-h-[320px] flex flex-col justify-between transition-all hover:-translate-y-1 duration-200 ${stickyClass} ${rotationClass}`}>
            {/* Scotch Tape Visual */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/40 backdrop-blur-sm rotate-[-2deg] shadow-sm z-10"></div>

            <div>
                {/* Header: ID + Badges */}
                <Group justify="space-between" mb="xs">
                    <Text fw={900} size="xl" ff="monospace">#{order.id}</Text>
                    <Group gap={4}>
                        {order.isPaid ? (
                            <Badge color="black" variant="transparent" p={0}><IconCheck size={18} /></Badge>
                        ) : (
                            <Badge color="red" variant="transparent" p={0}><IconWallet size={18} /></Badge>
                        )}
                        <Badge
                            color="black"
                            variant="outline"
                            className="border-current"
                        >
                            {order.type === 'dine_in' ? 'Dine In' : 'Take Out'}
                        </Badge>
                    </Group>
                </Group>

                {/* Customer Info */}
                <div className="mb-4 pb-4 border-b border-black/10 dark:border-white/10 border-dashed">
                    <Group gap={5} mb={2}>
                        <IconUser size={16} />
                        <Text fw={700} ff="monospace">{order.customerName}</Text>
                    </Group>

                    {order.type === 'take_out' && (
                        <Group gap={5}>
                            <IconMotorbike size={16} />
                            <Text size="sm" ff="monospace">
                                {order.customerAddress || 'No address'}
                            </Text>
                        </Group>
                    )}
                    {order.type === 'dine_in' && (
                        <Group gap={5}>
                            <IconToolsKitchen2 size={16} />
                            <Text size="sm" ff="monospace">Table Service</Text>
                        </Group>
                    )}
                </div>

                {/* Order Items */}
                <Stack gap="xs">
                    {order.items.map((item, index) => (
                        <Group key={index} justify="space-between" align="start">
                            <Text size="md" ff="monospace" lh={1.2} className="flex-1">- {item.name}</Text>
                            <Text fw={700} ff="monospace">x{item.quantity}</Text>
                        </Group>
                    ))}
                </Stack>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 border-dashed">
                <Group grow>
                    {order.status === 'pending' && (
                        <Button
                            leftSection={<IconChefHat size={18} />}
                            color="black"
                            variant="white"
                            // @ts-ignore
                            className="bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 text-black dark:text-white border-none"
                            onClick={() => onStatusChange(order.id, 'cooking')}
                        >
                            Start Cooking
                        </Button>
                    )}

                    {order.status === 'cooking' && (
                        <Button
                            leftSection={<IconCheck size={18} />}
                            color="black"
                            variant="white"
                            // @ts-ignore
                            className="bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 text-black dark:text-white border-none"
                            onClick={() => onStatusChange(order.id, 'completed')}
                        >
                            Mark Ready
                        </Button>
                    )}

                    {order.status === 'completed' && (
                        <Text ta="center" ff="monospace" fw={700} className="opacity-60" onClick={() => onStatusChange(order.id, 'pending')}>
                            WAITING FOR PICKUP
                        </Text>
                    )}
                </Group>
            </div>
        </div>
    );
}
