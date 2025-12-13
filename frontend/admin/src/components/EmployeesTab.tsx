import { Table, Paper, Text, Badge, Avatar, Group } from '@mantine/core';
import { employeesList } from '../data/mockData';

export function EmployeesTab() {
    const rows = employeesList.map((employee) => (
        <Table.Tr key={employee.id}>
            <Table.Td>
                <Group gap="sm">
                    <Avatar color="blue" radius="xl">{employee.name.charAt(0)}</Avatar>
                    <Text fw={500}>{employee.name}</Text>
                </Group>
            </Table.Td>
            <Table.Td>
                <Badge
                    color={
                        employee.role === 'Chef' ? 'orange' :
                            employee.role === 'Delivery' ? 'cyan' : 'grape'
                    }
                >
                    {employee.role}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Badge
                    variant="dot"
                    color={
                        employee.status === 'Working' ? 'green' :
                            employee.status === 'Break' ? 'yellow' : 'gray'
                    }
                >
                    {employee.status}
                </Badge>
            </Table.Td>
            <Table.Td>{employee.loginTime}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Paper withBorder p="md" radius="md">
            <Text fz="lg" fw={700} mb="md">Employee Status</Text>
            <Table.ScrollContainer minWidth={500}>
                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Employee</Table.Th>
                            <Table.Th>Role</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Log In Time</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Paper>
    );
}
