import { Paper, Text, Button, Group, Badge, Stack, ActionIcon } from '@mantine/core';
import { IconMapPin, IconPackage, IconCheck, IconMotorbike } from '@tabler/icons-react';
import { type DeliveryOrder } from '../data/mockData';

interface DeliveryCardProps {
    order: DeliveryOrder;
    onAction: (order: DeliveryOrder) => void;
    actionLabel: string;
    isInTransit?: boolean;
}

export function DeliveryCard({ order, onAction, actionLabel, isInTransit }: DeliveryCardProps) {
    const bgClass = isInTransit
        ? "bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100"
        : "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-900 dark:text-yellow-100";

    const borderClass = isInTransit
        ? "border-blue-300 dark:border-blue-700"
        : "border-yellow-300 dark:border-yellow-700";

    return (
        <div
            className={`relative p-5 ${bgClass} shadow-lg ${borderClass} border-l-4 min-h-[220px] flex flex-col justify-between transition-transform hover:-translate-y-1 duration-200 rotate-[-1deg]`}
        >
            {/* Tape Visual */}
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/40 backdrop-blur-sm shadow-sm rotate-[1deg] z-10`}></div>

            <Stack gap="xs">
                <Group justify="space-between" align="start">
                    <div>
                        <Text fw={900} size="lg" ff="monospace" tt="uppercase">{order.id}</Text>
                        <Text size="xs" fw={700} c="dimmed" ff="monospace">
                            {isInTransit ? 'ON ROUTE' : 'WAITING FOR RIDER'}
                        </Text>
                    </div>
                    {isInTransit && <IconMotorbike size={24} className="opacity-50" />}
                    {!isInTransit && <IconPackage size={24} className="opacity-50" />}
                </Group>

                <div className="py-2 border-t border-dashed border-current opacity-50"></div>

                <Group gap="xs" wrap="nowrap">
                    <IconMapPin size={18} className="shrink-0 opacity-70" />
                    <Text size="sm" ff="monospace" lineClamp={2} fw={600}>
                        {order.address}
                    </Text>
                </Group>

                <div className="bg-white/50 dark:bg-black/20 p-2 rounded">
                    <Text size="xs" tt="uppercase" opacity={0.7} ff="monospace">Items:</Text>
                    <Text size="sm" ff="monospace" lineClamp={2}>
                        {order.items.join(', ')}
                    </Text>
                </div>

                {order.notes && (
                    <Text size="xs" fs="italic" ff="monospace" className="mt-1 opacity-80">
                        "{order.notes}"
                    </Text>
                )}
            </Stack>

            <Button
                fullWidth
                color={isInTransit ? "green" : "dark"}
                className={`mt-4 uppercase font-mono tracking-wider ${isInTransit ? 'bg-green-600 hover:bg-green-700' : 'bg-stone-800 hover:bg-stone-900'}`}
                onClick={() => onAction(order)}
                leftSection={isInTransit ? <IconCheck size={18} /> : <IconMotorbike size={18} />}
            >
                {actionLabel}
            </Button>
        </div>
    );
}
