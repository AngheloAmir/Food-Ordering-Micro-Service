import { Grid, Paper, Text, Group, Stack, ThemeIcon } from '@mantine/core';
import { IconShoppingBag, IconTruckDelivery, IconChecks } from '@tabler/icons-react';
import { dashboardStats } from '../data/mockData';

export function DashboardTab() {
    const maxRevenue = Math.max(...dashboardStats.dailySales.map(d => d.revenue));

    return (
        <Stack gap="lg">
            <Grid>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <StatCard
                        title="Ongoing Orders"
                        value={dashboardStats.ongoingOrders}
                        icon={<IconShoppingBag size="2rem" />}
                        color="blue"
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <StatCard
                        title="Completed Orders"
                        value={dashboardStats.completedOrders}
                        icon={<IconChecks size="2rem" />}
                        color="green"
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <StatCard
                        title="To Deliver"
                        value={dashboardStats.ordersToDeliver}
                        icon={<IconTruckDelivery size="2rem" />}
                        color="orange"
                    />
                </Grid.Col>
            </Grid>

            <Paper p="md" withBorder radius="md">
                <Text fz="lg" fw={700} mb="xl">Weekly Sales Overview</Text>
                <Group align="flex-end" grow preventGrowOverflow={false} h={200} gap="xs">
                    {dashboardStats.dailySales.map((day) => {
                        const heightPercentage = (day.revenue / maxRevenue) * 100;
                        return (
                            <Stack key={day.date} gap={5} align="center" style={{ height: '100%' }} justify="flex-end">
                                <Text size="xs" fw={700}>${day.revenue}</Text>
                                <div
                                    className="bg-blue-500 dark:bg-blue-600 rounded-t-md hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors w-full"
                                    style={{ height: `${heightPercentage}%`, minHeight: '4px' }}
                                />
                                <Text size="sm" c="dimmed">{day.date}</Text>
                            </Stack>
                        )
                    })}
                </Group>
            </Paper>
        </Stack>
    );
}

function StatCard({ title, value, icon, color }: { title: string, value: number | string, icon: React.ReactNode, color: string }) {
    return (
        <Paper withBorder p="md" radius="md" className="flex items-center justify-between">
            <div>
                <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
                    {title}
                </Text>
                <Text fw={700} fz="xl">
                    {value}
                </Text>
            </div>
            <ThemeIcon color={color} variant="light" size={48} radius="md">
                {icon}
            </ThemeIcon>
        </Paper>
    );
}
