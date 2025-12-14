import { ActionIcon, Avatar, Badge, Group, Table, Text } from '@mantine/core';
import { StickyNoteContainer } from './StickyNoteContainer';
import { IconCash } from '@tabler/icons-react';

const employees = [
    { id: 'E01', name: 'John Doe', role: 'Head Chef', salary: 4500, status: 'Active' },
    { id: 'E02', name: 'Jane Smith', role: 'Manager', salary: 3800, status: 'Active' },
    { id: 'E03', name: 'Bob Jones', role: 'Line Cook', salary: 2800, status: 'On Leave' },
    { id: 'E04', name: 'Alice White', role: 'Server', salary: 2400, status: 'Active' },
];

export function Payroll() {
    const totalPayroll = employees.reduce((acc, curr) => acc + curr.salary, 0);

    return (
        <StickyNoteContainer title="Payroll Processing" color="white">
            <Group justify="space-between" mb="md">
                <Text className="font-mono text-sm uppercase font-bold text-stone-500">Period: Oct 1 - Oct 15</Text>
                <Badge color="green" size="lg" className="font-mono">Total Liability: ${totalPayroll.toLocaleString()}</Badge>
            </Group>

            <Table verticalSpacing="sm">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th className="font-mono text-xs uppercase">Employee</Table.Th>
                        <Table.Th className="font-mono text-xs uppercase">Role</Table.Th>
                        <Table.Th className="font-mono text-xs uppercase text-right">Gross Pay</Table.Th>
                        <Table.Th className="font-mono text-xs uppercase text-center">Status</Table.Th>
                        <Table.Th className="font-mono text-xs uppercase text-right">Action</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {employees.map((emp) => (
                        <Table.Tr key={emp.id} className="font-mono text-sm">
                            <Table.Td>
                                <Group gap="sm">
                                    <Avatar size="sm" radius="xl" color="blue">{emp.name.slice(0, 2)}</Avatar>
                                    <div>
                                        <Text size="sm" fw={500}>{emp.name}</Text>
                                        <Text size="xs" c="dimmed">{emp.id}</Text>
                                    </div>
                                </Group>
                            </Table.Td>
                            <Table.Td>{emp.role}</Table.Td>
                            <Table.Td className="text-right font-bold">${emp.salary.toLocaleString()}</Table.Td>
                            <Table.Td className="text-center">
                                <Badge
                                    color={emp.status === 'Active' ? 'blue' : 'gray'}
                                    variant="light"
                                >
                                    {emp.status}
                                </Badge>
                            </Table.Td>
                            <Table.Td className="text-right">
                                <ActionIcon variant="filled" color="green" aria-label="Process">
                                    <IconCash size={16} />
                                </ActionIcon>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </StickyNoteContainer>
    );
}
