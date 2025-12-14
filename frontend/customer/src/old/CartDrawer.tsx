import { Drawer, ScrollArea, Text, Button, Group, Avatar, ActionIcon, Stack, Divider } from '@mantine/core';
import { IconTrash, IconMinus, IconPlus } from '@tabler/icons-react';
import type { CartItem } from '../types';

interface CartDrawerProps {
    opened: boolean;
    onClose: () => void;
    items: CartItem[];
    onUpdateQuantity: (id: string, newQuantity: number) => void;
    onRemoveItem: (id: string) => void;
    onCheckout: () => void;
}

export function CartDrawer({ opened, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: CartDrawerProps) {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Drawer
            opened={opened}
            onClose={onClose}
            title="Your Cart"
            padding="md"
            size="md"
            position="right"
        >
            <Stack h="calc(100vh - 140px)">
                <ScrollArea className="flex-grow">
                    {items.length === 0 ? (
                        <Text c="dimmed" ta="center" mt="xl">
                            Your cart is empty.
                        </Text>
                    ) : (
                        <Stack gap="md">
                            {items.map((item) => (
                                <Group key={item.id} justify="space-between" wrap="nowrap">
                                    <Group wrap="nowrap">
                                        <Avatar src={item.image} size="lg" radius="md" />
                                        <div style={{ flex: 1 }}>
                                            <Text size="sm" fw={500} lineClamp={1}>
                                                {item.name}
                                            </Text>
                                            <Text size="xs" c="dimmed">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </Text>
                                        </div>
                                    </Group>

                                    <Group gap={5} wrap="nowrap">
                                        <ActionIcon size="sm" variant="subtle" color="gray" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                                            <IconMinus size={14} />
                                        </ActionIcon>
                                        <Text size="sm" w={20} ta="center">{item.quantity}</Text>
                                        <ActionIcon size="sm" variant="subtle" color="gray" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                                            <IconPlus size={14} />
                                        </ActionIcon>
                                        <ActionIcon size="sm" variant="subtle" color="red" onClick={() => onRemoveItem(item.id)}>
                                            <IconTrash size={16} />
                                        </ActionIcon>
                                    </Group>
                                </Group>
                            ))}
                        </Stack>
                    )}
                </ScrollArea>

                <div className="mt-auto">
                    <Divider my="sm" />
                    <Group justify="space-between" mb="md">
                        <Text fw={700}>Total</Text>
                        <Text fw={700} size="xl">${total.toFixed(2)}</Text>
                    </Group>
                    <Button fullWidth size="lg" onClick={onCheckout} disabled={items.length === 0} color="green">
                        Checkout
                    </Button>
                </div>
            </Stack>
        </Drawer>
    );
}
