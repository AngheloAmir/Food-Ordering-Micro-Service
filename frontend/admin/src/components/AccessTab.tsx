import { Table, Text, Badge, Group, Code, Stack } from '@mantine/core';
import { employeeAccessList } from '../data/mockData';
import { IconLock, IconShieldLock } from '@tabler/icons-react';

export function AccessTab() {
    const rows = employeeAccessList.map((access) => (
        <Table.Tr key={access.id} className="hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
            <Table.Td>
                <Text fw={700} ff="monospace" className="text-stone-800 dark:text-stone-200">{access.name}</Text>
            </Table.Td>
            <Table.Td>
                <Badge
                    variant="outline"
                    className="font-mono border-stone-400 text-stone-700 dark:text-stone-300"
                    color="gray"
                >
                    {access.role}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Code color="dark" className="bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold">{access.username}</Code>
            </Table.Td>
            <Table.Td>
                <Group gap={4}>
                    <IconLock size={14} className="text-stone-400" />
                    <div className="font-mono text-sm tracking-widest blur-[2px] hover:blur-none transition-all cursor-help select-none">
                        {access.password}
                    </div>
                </Group>
            </Table.Td>
            <Table.Td>
                <Badge
                    variant="filled"
                    color={access.accessLevel === 'Level 5' ? 'red' : 'blue'}
                    radius="sm"
                    className="font-mono"
                >
                    {access.accessLevel}
                </Badge>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <div className="relative p-8 pt-12 min-h-[400px] bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-lg border-2 border-stone-300 dark:border-stone-700 border-l-[16px] border-l-red-800/80 dark:border-l-red-900/50">
            {/* Stamp Visual */}
            <div className="absolute top-4 right-8 z-10 opacity-20 rotate-[-15deg] pointer-events-none border-4 border-red-600 p-2 rounded">
                <Text fz="xl" fw={900} c="red" tt="uppercase" ff="monospace">Confidential</Text>
            </div>

            <Stack gap="lg">
                <Group justify="space-between" align="center" className="border-b-2 border-stone-300 dark:border-stone-600 pb-4">
                    <Stack gap={0}>
                        <Group gap="xs">
                            <IconShieldLock size={32} className="text-red-700 dark:text-red-500" />
                            <Text fz="2xl" fw={900} ff="monospace" tt="uppercase" className="tracking-widest text-red-900 dark:text-red-400">Security Clearance</Text>
                        </Group>
                        <Text size="sm" c="dimmed" ff="monospace" className="pl-1">Authorized Personnel Registry</Text>
                    </Stack>
                </Group>

                <Table.ScrollContainer minWidth={600}>
                    <Table verticalSpacing="sm">
                        <Table.Thead className="bg-stone-200 dark:bg-stone-800/50 border-b-2 border-stone-300 dark:border-stone-600">
                            <Table.Tr>
                                <Table.Th ff="monospace" tt="uppercase" className="text-stone-600 dark:text-stone-400">Name</Table.Th>
                                <Table.Th ff="monospace" tt="uppercase" className="text-stone-600 dark:text-stone-400">Designation</Table.Th>
                                <Table.Th ff="monospace" tt="uppercase" className="text-stone-600 dark:text-stone-400">Operator ID</Table.Th>
                                <Table.Th ff="monospace" tt="uppercase" className="text-stone-600 dark:text-stone-400">Keycode</Table.Th>
                                <Table.Th ff="monospace" tt="uppercase" className="text-stone-600 dark:text-stone-400">Clearance</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </Stack>
        </div>
    );
}
