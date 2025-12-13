import { Table, Paper, Text, Badge, Group } from '@mantine/core';
import { productsList } from '../data/mockData';

export function ProductsTab() {
    const rows = productsList.map((product) => (
        <Table.Tr key={product.id}>
            <Table.Td>
                <Text fw={500}>{product.name}</Text>
            </Table.Td>
            <Table.Td>
                <Text size="sm" c="dimmed" lineClamp={1}>{product.description}</Text>
            </Table.Td>
            <Table.Td>${product.price.toFixed(2)}</Table.Td>
            <Table.Td>${product.basePrice.toFixed(2)}</Table.Td>
            <Table.Td>
                <Group gap={4}>
                    {product.ingredients.map(ing => (
                        <Badge key={ing} size="xs" variant="dot">{ing}</Badge>
                    ))}
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Paper withBorder p="md" radius="md">
            <Text fz="lg" fw={700} mb="md">Product Catalog</Text>
            <Table.ScrollContainer minWidth={700}>
                <Table verticalSpacing="sm" striped>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Description</Table.Th>
                            <Table.Th>Price</Table.Th>
                            <Table.Th>Base Price</Table.Th>
                            <Table.Th>Ingredients</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Paper>
    );
}
