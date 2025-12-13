import { Table, Avatar, Group, Text, Badge, Stack } from '@mantine/core';
import { employeesList } from '../data/mockData';
import { IconUsers } from '@tabler/icons-react';

export function EmployeesTab() {
    const rows = employeesList.map((employee) => (
        <Table.Tr key={employee.id} className="hover:bg-stone-50 dark:hover:bg-stone-700/30 transition-colors">
            <Table.Td>
                <Group gap="sm">
                    <Avatar color="dark" radius="md" className="bg-stone-200 dark:bg-stone-600 text-stone-700 dark:text-stone-300">
                        {employee.name.charAt(0)}
                    </Avatar>
                    <Text fw={700} ff="monospace" className="text-stone-800 dark:text-stone-200">{employee.name}</Text>
                </Group>
            </Table.Td>
            <Table.Td>
                <Badge
                    variant="outline"
                    className="font-mono border-stone-400 text-stone-700 dark:text-stone-300"
                    color="gray"
                >
                    {employee.role}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Badge
                    variant="filled"
                    radius="sm"
                    color={
                        employee.status === 'Working' ? 'green' :
                            employee.status === 'Break' ? 'yellow' : 'gray'
                    }
                    className="font-mono"
                >
                    {employee.status}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Text ff="monospace" size="sm" c="dimmed">
                    {employee.loginTime}
                </Text>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <div className="relative p-8 pt-12 min-h-[400px] bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-lg border border-stone-200 dark:border-stone-700 rotate-[-0.5deg]">
            {/* Push Pin Visual - Orange/Blue */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 drop-shadow-md">
                <div className="w-5 h-5 rounded-full bg-blue-600 border-2 border-blue-800 shadow-inner"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-blue-400 rounded-full opacity-50"></div>
            </div>

            <Stack gap="lg">
                <Group justify="space-between" align="center" className="border-b-2 border-stone-300 dark:border-stone-600 pb-4">
                    <Stack gap={0}>
                        <Text fz="2xl" fw={900} ff="monospace" tt="uppercase" className="tracking-widest">Duty Roster</Text>
                        <Text size="sm" c="dimmed" ff="monospace">Staff Attendance Log</Text>
                    </Stack>
                    <div className="p-3 bg-stone-100 dark:bg-stone-700 rounded-full">
                        <IconUsers size={24} className="text-stone-500 dark:text-stone-300" />
                    </div>
                </Group>

                <Table.ScrollContainer minWidth={500}>
                    <Table verticalSpacing="sm">
                        <Table.Thead className="bg-stone-100 dark:bg-stone-700/50 border-b-2 border-stone-300 dark:border-stone-600">
                            <Table.Tr>
                                <Table.Th ff="monospace" tt="uppercase" className="text-stone-500">Personnel</Table.Th>
                                <Table.Th ff="monospace" tt="uppercase" className="text-stone-500">Assignment</Table.Th>
                                <Table.Th ff="monospace" tt="uppercase" className="text-stone-500">Status</Table.Th>
                                <Table.Th ff="monospace" tt="uppercase" className="text-stone-500">Punch In</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </Stack>
        </div>
    );
}
