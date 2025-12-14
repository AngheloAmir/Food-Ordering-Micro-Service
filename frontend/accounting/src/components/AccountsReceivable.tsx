import { ActionIcon, Badge, Group, Table, Text } from '@mantine/core';
import { StickyNoteContainer } from './StickyNoteContainer';
import { IconCheck, IconX } from '@tabler/icons-react';

const mockInvoices = [
    { id: 'INV-001', customer: 'Acme Corp', amount: 1250.00, date: '2024-10-15', status: 'Pending' },
    { id: 'INV-002', customer: 'Globex Inc', amount: 3400.50, date: '2024-10-12', status: 'Overdue' },
    { id: 'INV-003', customer: 'Soylent Corp', amount: 850.00, date: '2024-10-18', status: 'Paid' },
    { id: 'INV-004', customer: 'Initech', amount: 5000.00, date: '2024-10-20', status: 'Pending' },
];

export function AccountsReceivable() {
    return (
        <StickyNoteContainer title="Accounts Receivable" color="blue">
            <Group justify="space-between" mb="md">
                <Text className="font-mono text-sm uppercase font-bold text-stone-500">Active Invoices</Text>
                <div className="flex gap-2">
                    <Badge color="red" variant="dot" className="font-mono uppercase">Overdue: $3,400.50</Badge>
                    <Badge color="blue" variant="dot" className="font-mono uppercase">Pending: $6,250.00</Badge>
                </div>
            </Group>

            <Table striped highlightOnHover className="border border-stone-200 dark:border-stone-700">
                <Table.Thead className="bg-stone-50 dark:bg-stone-800">
                    <Table.Tr>
                        <Table.Th className="font-mono text-xs uppercase">Invoice #</Table.Th>
                        <Table.Th className="font-mono text-xs uppercase">Customer</Table.Th>
                        <Table.Th className="font-mono text-xs uppercase">Date</Table.Th>
                        <Table.Th className="font-mono text-xs uppercase text-right">Amount</Table.Th>
                        <Table.Th className="font-mono text-xs uppercase text-center">Status</Table.Th>
                        <Table.Th className="font-mono text-xs uppercase text-center">Action</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {mockInvoices.map((inv) => (
                        <Table.Tr key={inv.id} className="font-mono text-sm">
                            <Table.Td>{inv.id}</Table.Td>
                            <Table.Td className="font-bold">{inv.customer}</Table.Td>
                            <Table.Td>{inv.date}</Table.Td>
                            <Table.Td className="text-right">${inv.amount.toFixed(2)}</Table.Td>
                            <Table.Td className="text-center">
                                <Badge
                                    color={inv.status === 'Paid' ? 'green' : inv.status === 'Overdue' ? 'red' : 'yellow'}
                                    variant="light"
                                >
                                    {inv.status}
                                </Badge>
                            </Table.Td>
                            <Table.Td className="text-center">
                                <Group justify="center" gap="xs">
                                    <ActionIcon size="sm" color="green" variant="subtle"><IconCheck size={14} /></ActionIcon>
                                    <ActionIcon size="sm" color="red" variant="subtle"><IconX size={14} /></ActionIcon>
                                </Group>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </StickyNoteContainer>
    );
}
