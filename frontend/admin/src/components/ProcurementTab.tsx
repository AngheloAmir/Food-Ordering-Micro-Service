import { Checkbox, Paper, Stack, Text, Button, Group } from '@mantine/core';
import { useState } from 'react';
import { procurementList } from '../data/mockData';
import { IconTrash } from '@tabler/icons-react';

export function ProcurementTab() {
    const [items, setItems] = useState(procurementList);

    const toggleItem = (id: string) => {
        setItems(current =>
            current.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
        );
    };

    const clearCompleted = () => {
        setItems(current => current.map(item => item.checked ? { ...item, checked: false } : item));
        // Alternatively, if "clear" means remove:
        // setItems(current => current.filter(item => !item.checked));
        // But usually regular lists just uncheck or "archive". Let's assume uncheck for now or maybe delete? 
        // The user said "clear checked items", usually implies removing them or resetting.
        // Let's implement removing completed for "Grocery list" style
        setItems(current => current.filter(item => !item.checked));
    };

    return (
        <Paper withBorder p="md" radius="md">
            <Group justify="space-between" mb="lg">
                <Text fz="lg" fw={700}>Procurement List</Text>
                <Button
                    color="red"
                    variant="light"
                    leftSection={<IconTrash size={16} />}
                    onClick={clearCompleted}
                    disabled={!items.some(i => i.checked)}
                >
                    Clear Completed
                </Button>
            </Group>

            <Stack gap="sm">
                {items.length === 0 ? (
                    <Text c="dimmed" fs="italic">No items on the list.</Text>
                ) : (
                    items.map((item) => (
                        <Paper
                            key={item.id}
                            p="sm"
                            withBorder
                            className={item.checked ? "bg-gray-50 dark:bg-gray-900/50" : ""}
                        >
                            <Checkbox
                                label={
                                    <Group>
                                        <Text td={item.checked ? 'line-through' : undefined} c={item.checked ? 'dimmed' : undefined}>
                                            {item.item}
                                        </Text>
                                        <Text size="sm" c="dimmed">{item.quantity}</Text>
                                    </Group>
                                }
                                checked={item.checked}
                                onChange={() => toggleItem(item.id)}
                            />
                        </Paper>
                    ))
                )}
            </Stack>
        </Paper>
    );
}
