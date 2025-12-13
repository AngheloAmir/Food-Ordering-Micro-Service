import { Table, Text, Badge, Group, Stack } from '@mantine/core';
import { productsList } from '../data/mockData';
import { IconTag } from '@tabler/icons-react';

export function ProductsTab() {
    const rows = productsList.map((product) => (
        <Table.Tr key={product.id} className="hover:bg-stone-50 dark:hover:bg-stone-700/30 transition-colors">
            <Table.Td>
                <Text fw={700} ff="monospace" className="text-stone-800 dark:text-stone-200">{product.name}</Text>
            </Table.Td>
            <Table.Td>
                <Text size="sm" c="dimmed" lineClamp={1} ff="monospace">{product.description}</Text>
            </Table.Td>
            <Table.Td ff="monospace" fw={600}>${product.price.toFixed(2)}</Table.Td>
            <Table.Td>
                <Text ff="monospace" c="dimmed" size="sm">${product.basePrice.toFixed(2)}</Text>
            </Table.Td>
            <Table.Td>
                <Group gap={4}>
                    {product.ingredients.map(ing => (
                        <Badge
                            key={ing}
                            size="xs"
                            variant="outline"
                            color="gray"
                            className="font-mono border-stone-400 text-stone-600 dark:text-stone-400"
                        >
                            {ing}
                        </Badge>
                    ))}
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <div className="relative p-8 pt-12 min-h-[400px] bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-lg border border-stone-200 dark:border-stone-700 rotate-[0.5deg]">
            {/* Push Pin Visual */}
            <div className="absolute -top-4 right-1/2 translate-x-1/2 z-10 drop-shadow-md">
                <div className="w-5 h-5 rounded-full bg-red-600 border-2 border-red-800 shadow-inner"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-red-400 rounded-full opacity-50"></div>
            </div>

            <Stack gap="lg">
                <Group justify="space-between" align="center" className="border-b-2 border-stone-300 dark:border-stone-600 pb-4">
                    <Stack gap={0}>
                        <Text fz="2xl" fw={900} ff="monospace" tt="uppercase" className="tracking-widest">Master Menu</Text>
                        <Text size="sm" c="dimmed" ff="monospace">Standard Operating Products</Text>
                    </Stack>
                    <div className="p-3 bg-stone-100 dark:bg-stone-700 rounded-full">
                        <IconTag size={24} className="text-stone-500 dark:text-stone-300" />
                    </div>
                </Group>

                <Table.ScrollContainer minWidth={700}>
                    <Table verticalSpacing="sm" horizontalSpacing="md">
                        <Table.Thead className="bg-stone-100 dark:bg-stone-700/50 border-b-2 border-stone-300 dark:border-stone-600">
                            <Table.Tr>
                                <Table.Th ff="monospace" tt="uppercase" className="text-stone-500">Item Name</Table.Th>
                                <Table.Th ff="monospace" tt="uppercase" className="text-stone-500">Details</Table.Th>
                                <Table.Th ff="monospace" tt="uppercase" className="text-stone-500">Price</Table.Th>
                                <Table.Th ff="monospace" tt="uppercase" className="text-stone-500">Cost</Table.Th>
                                <Table.Th ff="monospace" tt="uppercase" className="text-stone-500">Composition</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </Stack>
        </div>
    );
}
