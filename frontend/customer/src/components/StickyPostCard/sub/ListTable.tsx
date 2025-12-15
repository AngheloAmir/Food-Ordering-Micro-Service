import { Group, Stack, Text } from '@mantine/core';

export default function ListTable({ order }: { order: Array<{ name?: string; quantity?: number, price?: number }> }) {
    return (
        <Stack gap="xs" className='pt-2 px-2'>
            {order.map((item, index) => (
                <Group key={index} justify="space-between" align="start">
                    <Text size="md" ff="monospace" lh={1.2} className="flex-1">- {item.name}</Text>
                    <Text fw={700} ff="monospace">x{item.quantity}</Text>
                </Group>
            ))}
        </Stack>
    );
}