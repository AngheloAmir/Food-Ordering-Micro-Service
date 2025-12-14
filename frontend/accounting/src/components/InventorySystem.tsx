import { Badge, Table, Text, Group } from '@mantine/core';
import { StickyNoteContainer } from './StickyNoteContainer';

const inventory = [
    { sku: 'ING-001', item: 'Premium Flour (25kg)', qty: 45, unitCost: 32.50, status: 'In Stock' },
    { sku: 'ING-005', item: 'Olive Oil (5L)', qty: 12, unitCost: 45.00, status: 'Low Stock' },
    { sku: 'PKG-102', item: 'Takeout Boxes (500pc)', qty: 8, unitCost: 28.00, status: 'Reorder' },
    { sku: 'ING-200', item: 'Spices Mix A', qty: 150, unitCost: 5.50, status: 'In Stock' },
];

export function InventorySystem() {
    return (
        <StickyNoteContainer title="Inventory Audit" color="blue">
            <Group justify="space-between" mb="md">
                <Text className="font-mono text-sm uppercase font-bold text-stone-500">Stock Valuation</Text>
                <Badge color="cyan" size="lg" className="font-mono">Total Value: $4,059.50</Badge>
            </Group>

            <Table striped highlightOnHover className="border border-stone-200 dark:border-stone-700">
                <Table.Thead className="bg-stone-50 dark:bg-stone-800">
                    <Table.Tr>
                        <Table.Th className="font-mono text-xs uppercase">SKU</Table.Th>
                        <Table.Th className="font-mono text-xs uppercase">Item Name</Table.Th>
                        <Table.Th className="font-mono text-xs uppercase text-right">Qty</Table.Th>
                        <Table.Th className="font-mono text-xs uppercase text-right">Unit Cost</Table.Th>
                        <Table.Th className="font-mono text-xs uppercase text-right">Total</Table.Th>
                        <Table.Th className="font-mono text-xs uppercase text-center">Status</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {inventory.map((item) => (
                        <Table.Tr key={item.sku} className="font-mono text-sm">
                            <Table.Td className="font-bold text-stone-500">{item.sku}</Table.Td>
                            <Table.Td>{item.item}</Table.Td>
                            <Table.Td className="text-right">{item.qty}</Table.Td>
                            <Table.Td className="text-right">${item.unitCost.toFixed(2)}</Table.Td>
                            <Table.Td className="text-right font-bold">${(item.qty * item.unitCost).toFixed(2)}</Table.Td>
                            <Table.Td className="text-center">
                                <Badge
                                    color={item.status === 'In Stock' ? 'teal' : item.status === 'Low Stock' ? 'yellow' : 'red'}
                                    variant="outline"
                                >
                                    {item.status}
                                </Badge>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </StickyNoteContainer>
    );
}
