import { Group, Stack, Text } from '@mantine/core';
import { useMemo, useState } from 'react';
import CardHr from './CardHr';


export default function OrderTable({ order }: { order: Array<{ name?: string; quantity?: number, price?: number }> }) {
    const [total, setTotal] = useState(0);
    useMemo(() => {
        let total = 0;
        order.forEach((item) => {
            if (item.price && item.quantity) {
                total += item.price * item.quantity;
            }
        });
        setTotal(total);
    }, [order]);

    return (
        <Stack className='mt-2'>
            {order.map((item, index) => (
                <Group style={{ margin: "-8px" }} key={index} justify="space-between" align="start">
                    <div className='flex gap-2 px-4'>
                        <Text size="md" ff="monospace"> {item.name} </Text>
                        <Text size="xl" ff="monospace" className='opacity-70'>x{item.quantity}</Text>
                    </div>

                    <Text size="md" ff="monospace">${item.price}</Text>
                </Group>
            ))}

            <div style={{ margin: "-8px" }}>
                <CardHr />
            </div>

            <Group style={{ margin: "-8px" }} justify="space-between" align="start">
                <Text size="xl" ff="monospace">Total</Text>
                <Text size="xl" ff="monospace">${total}</Text>
            </Group>
        </Stack>
    );
}