import { Table, Paper, Text, Badge, Group, Code } from '@mantine/core';
import { employeeAccessList } from '../data/mockData';
import { IconLock } from '@tabler/icons-react';

export function AccessTab() {
    const rows = employeeAccessList.map((access) => (
        <Table.Tr key={access.id}>
            <Table.Td>
                <Text fw={500}>{access.name}</Text>
            </Table.Td>
            <Table.Td>
                <Badge
                    color={
                        access.role === 'Admin' ? 'red' :
                            access.role === 'Chef' ? 'orange' :
                                access.role === 'Delivery' ? 'cyan' : 'grape'
                    }
                >
                    {access.role}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Code>{access.username}</Code>
            </Table.Td>
            <Table.Td>
                <Group gap={4}>
                    <IconLock size={14} className="text-gray-400" />
                    <Code color="red">{access.password}</Code>
                </Group>
            </Table.Td>
            <Table.Td>
                <Text size="sm">{access.accessLevel}</Text>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Paper withBorder p="md" radius="md">
            <Text fz="lg" fw={700} mb="md">Employee Access Credentials</Text>
            <Table.ScrollContainer minWidth={600}>
                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Role</Table.Th>
                            <Table.Th>Username</Table.Th>
                            <Table.Th>Password</Table.Th>
                            <Table.Th>Access Level</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Paper>
    );
}
