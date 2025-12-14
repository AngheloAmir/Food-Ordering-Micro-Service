import { ActionIcon, Badge, Group, Table, Text } from '@mantine/core';
import { StickyNoteContainer } from './StickyNoteContainer';
import { IconCheck, IconEye } from '@tabler/icons-react';

const mockBills = [
    { id: 'BILL-889', vendor: 'Office Supply Co', amount: 320.00, dueDate: '2024-10-30', status: 'Due Soon' },
    { id: 'BILL-990', vendor: 'Electric Utilities', amount: 1500.00, dueDate: '2024-11-05', status: 'Unpaid' },
    { id: 'BILL-992', vendor: 'Cleaning Services', amount: 450.00, dueDate: '2024-10-25', status: 'Overdue' },
];

export function AccountsPayable() {
    return (
        <StickyNoteContainer title="Accounts Payable" color="yellow">
            <Group justify="space-between" mb="md">
                <Text className="font-mono text-sm uppercase font-bold text-stone-500">Upcoming Bills</Text>
                <div className="flex gap-2">
                    <Badge color="red" variant="dot" className="font-mono uppercase">Total Due: $2,270.00</Badge>
                </div>
            </Group>

            <Table striped highlightOnHover className="border border-stone-200 dark:border-stone-700">
                <Table.Thead className="bg-stone-50 dark:bg-stone-800">
                    <Table.Tr>
                        <Table.Th className="font-mono text-xs uppercase">Reference</Table.Th>
                        <Table.Th className="font-mono text-xs uppercase">Vendor</Table.Th>
                        <Table.Th className="font-mono text-xs uppercase">Due Date</Table.Th>
                        <Table.Th className="font-mono text-xs uppercase text-right">Amount</Table.Th>
                        <Table.Th className="font-mono text-xs uppercase text-center">Status</Table.Th>
                        <Table.Th className="font-mono text-xs uppercase text-center">Approve</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {mockBills.map((bill) => (
                        <Table.Tr key={bill.id} className="font-mono text-sm">
                            <Table.Td>{bill.id}</Table.Td>
                            <Table.Td className="font-bold">{bill.vendor}</Table.Td>
                            <Table.Td>{bill.dueDate}</Table.Td>
                            <Table.Td className="text-right">${bill.amount.toFixed(2)}</Table.Td>
                            <Table.Td className="text-center">
                                <Badge
                                    color={bill.status === 'Overdue' ? 'red' : 'gray'}
                                    variant="outline"
                                >
                                    {bill.status}
                                </Badge>
                            </Table.Td>
                            <Table.Td className="text-center">
                                <Group justify="center" gap="xs">
                                    <ActionIcon size="sm" color="blue" variant="light"><IconEye size={14} /></ActionIcon>
                                    <ActionIcon size="sm" color="green" variant="filled"><IconCheck size={14} /></ActionIcon>
                                </Group>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </StickyNoteContainer>
    );
}
