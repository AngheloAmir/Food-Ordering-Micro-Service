import { Checkbox, Stack, Text, Button, Group } from '@mantine/core';
import { useState } from 'react';
import { procurementList } from '../data/mockData';
import { IconTrash, IconClipboardList } from '@tabler/icons-react';

export function ProcurementTab() {
    const [items, setItems] = useState(procurementList);

    const toggleItem = (id: string) => {
        setItems(current =>
            current.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
        );
    };

    const clearCompleted = () => {
        setItems(current => current.filter(item => !item.checked));
    };

    return (
        <div className="relative p-6 pt-16 min-h-[400px] bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-md border border-stone-300 dark:border-stone-700 mx-auto max-w-4xl">
            {/* Clipboard Clip Visual */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-48 h-12 bg-stone-800 dark:bg-black rounded-lg shadow-lg z-10 flex items-center justify-center border-b-4 border-stone-600">
                <div className="w-40 h-8 border-2 border-stone-500 rounded flex items-center justify-center">
                    <Text c="white" fw={700} size="xs" tt="uppercase" ff="monospace">Procurement List</Text>
                </div>
            </div>

            <Group justify="space-between" mb="lg" align="end" className="border-b-2 border-dashed border-stone-300 dark:border-stone-600 pb-4">
                <Group gap="xs">
                    <IconClipboardList size={24} className="text-stone-500" />
                    <Text fz="xl" fw={900} ff="monospace" tt="uppercase">Restock Manifesto</Text>
                </Group>

                <Button
                    color="red"
                    variant="subtle"
                    leftSection={<IconTrash size={16} />}
                    onClick={clearCompleted}
                    disabled={!items.some(i => i.checked)}
                    className="hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                    Clear Done
                </Button>
            </Group>

            <Stack gap={0}>
                {items.length === 0 ? (
                    <div className="py-12 text-center text-stone-400 border-2 border-dashed border-stone-200 dark:border-stone-700 rounded-lg">
                        <Text fs="italic" ff="monospace">All stocks are replenished.</Text>
                    </div>
                ) : (
                    items.map((item, index) => (
                        <div
                            key={item.id}
                            className={`p-3 border-b border-stone-200 dark:border-stone-700 transition-colors ${item.checked ? "bg-stone-100 dark:bg-stone-900/50 opacity-60" : "hover:bg-stone-50 dark:hover:bg-stone-700/30"}`}
                        >
                            <Checkbox
                                color="dark"
                                label={
                                    <Group justify="space-between" w="100%">
                                        <Text
                                            ff="monospace"
                                            fw={600}
                                            td={item.checked ? 'line-through' : undefined}
                                        >
                                            {item.item}
                                        </Text>
                                        <Text size="sm" ff="monospace" c="dimmed" className="bg-stone-200 dark:bg-stone-700 px-2 py-0.5 rounded">
                                            QTY: {item.quantity}
                                        </Text>
                                    </Group>
                                }
                                checked={item.checked}
                                onChange={() => toggleItem(item.id)}
                                styles={{
                                    label: { width: '100%' },
                                    input: { cursor: 'pointer', borderColor: 'currentColor' }
                                }}
                            />
                        </div>
                    ))
                )}
            </Stack>
        </div>
    );
}
