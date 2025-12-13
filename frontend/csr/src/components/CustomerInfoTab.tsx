import { Grid, Stack, Text, Group, Badge, Avatar, Timeline, Card } from '@mantine/core';
import { IconMapPin, IconPhone, IconMail, IconTruckDelivery, IconNote, IconUser } from '@tabler/icons-react';
import { mockCustomer } from '../data/mockData';

export function CustomerInfoTab() {
    return (
        <Grid gutter="xl">
            {/* Customer Profile File */}
            <Grid.Col span={{ base: 12, md: 4 }}>
                <div className="relative p-6 bg-stone-100 dark:bg-stone-900 shadow-lg border-2 border-stone-300 dark:border-stone-700 rounded-lg min-h-[500px]">
                    {/* Tab Label */}
                    <div className="absolute -top-8 left-0 w-32 h-10 bg-stone-300 dark:bg-stone-700 rounded-t-lg border-2 border-b-0 border-stone-300 dark:border-stone-600 flex items-center justify-center">
                        <Text fw={700} size="sm" tt="uppercase" ff="monospace">Profile</Text>
                    </div>

                    <Stack align="center" mt="md" mb="xl">
                        <div className="p-2 bg-white dark:bg-stone-800 rounded-full border-2 border-stone-300 dark:border-stone-600 shadow-inner">
                            <IconUser size={64} className="text-stone-400" />
                        </div>
                        <div className="text-center">
                            <Text fz="xl" fw={900} ff="monospace" tt="uppercase" className="tracking-widest">{mockCustomer.name}</Text>
                            <Badge color="red" variant="filled" className="mt-1 font-mono">{mockCustomer.status} MEMBER</Badge>
                        </div>
                    </Stack>

                    <Stack gap="md">
                        <Group wrap="nowrap" align="start">
                            <IconMapPin size={20} className="text-stone-500 mt-1 shrink-0" />
                            <div>
                                <Text size="xs" fw={700} tt="uppercase" c="dimmed" ff="monospace">Delivery Address</Text>
                                <Text size="sm" ff="monospace" fw={600}>{mockCustomer.address}</Text>
                            </div>
                        </Group>

                        <Group wrap="nowrap" align="start">
                            <IconPhone size={20} className="text-stone-500 mt-1 shrink-0" />
                            <div>
                                <Text size="xs" fw={700} tt="uppercase" c="dimmed" ff="monospace">Contact</Text>
                                <Text size="sm" ff="monospace">{mockCustomer.phone}</Text>
                            </div>
                        </Group>

                        <Group wrap="nowrap" align="start">
                            <IconMail size={20} className="text-stone-500 mt-1 shrink-0" />
                            <div>
                                <Text size="xs" fw={700} tt="uppercase" c="dimmed" ff="monospace">Email</Text>
                                <Text size="sm" ff="monospace">{mockCustomer.email}</Text>
                            </div>
                        </Group>

                        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/30 rounded relative">
                            <IconNote size={16} className="absolute top-2 right-2 text-yellow-600 opacity-50" />
                            <Text size="xs" fw={700} tt="uppercase" c="yellow.8" ff="monospace" mb={4}>Important Notes</Text>
                            <Text size="sm" ff="monospace" className="italic text-stone-700 dark:text-stone-300">"{mockCustomer.notes}"</Text>
                        </div>
                    </Stack>
                </div>
            </Grid.Col>

            {/* Current Activity & History */}
            <Grid.Col span={{ base: 12, md: 8 }}>
                <Stack gap="lg">
                    {/* Active Deliveries Note */}
                    <div className="relative p-6 bg-blue-50 dark:bg-blue-900/10 shadow-md border-l-4 border-blue-500 dark:border-blue-700">
                        <Text fz="lg" fw={700} ff="monospace" tt="uppercase" className="text-blue-800 dark:text-blue-200 mb-4 flex items-center gap-2">
                            <IconTruckDelivery size={24} /> Active Logistics
                        </Text>

                        {mockCustomer.currentDeliveries.map(delivery => (
                            <Card key={delivery.id} withBorder shadow="sm" radius="md" className="bg-white dark:bg-stone-800">
                                <Group justify="space-between" align="start">
                                    <Stack gap={0}>
                                        <Text fw={700} ff="monospace" size="lg">{delivery.id}</Text>
                                        <Badge color="blue" variant="light" className="font-mono mt-1">{delivery.status}</Badge>
                                    </Stack>
                                    <div className="text-right">
                                        <Text ff="monospace" fw={700} size="xl">${delivery.total.toFixed(2)}</Text>
                                        <Text size="xs" c="dimmed" ff="monospace">ETA: {delivery.eta}</Text>
                                    </div>
                                </Group>
                                <div className="mt-4 pt-4 border-t border-dashed border-stone-200 dark:border-stone-700">
                                    <Text size="xs" tt="uppercase" c="dimmed" fw={700} ff="monospace" mb={2}>Items:</Text>
                                    <Text size="sm" ff="monospace">{delivery.items.join(', ')}</Text>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Order History Timeline */}
                    <div className="p-6">
                        <Text fz="lg" fw={700} ff="monospace" tt="uppercase" c="dimmed" mb="lg">Recent Interactions</Text>
                        <Timeline active={-1} bulletSize={24} lineWidth={2}>
                            {mockCustomer.orderHistory.map(history => (
                                <Timeline.Item key={history.id} bullet={<div className="w-2 h-2 bg-stone-400 rounded-full"></div>} title={<Text ff="monospace" fw={700}>{history.id}</Text>}>
                                    <Text c="dimmed" size="sm" ff="monospace">Order delivered successfully on {history.date}</Text>
                                    <Text size="xs" mt={4} ff="monospace" fw={600}>Total: ${history.total.toFixed(2)}</Text>
                                </Timeline.Item>
                            ))}
                        </Timeline>
                    </div>
                </Stack>
            </Grid.Col>
        </Grid>
    );
}
