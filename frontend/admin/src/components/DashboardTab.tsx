import { Text, Group, Stack } from '@mantine/core';
import { IconShoppingBag, IconTruckDelivery, IconChecks, IconChartBar } from '@tabler/icons-react';
import { dashboardStats } from '../data/mockData';

export function DashboardTab() {
    const maxRevenue = Math.max(...dashboardStats.dailySales.map(d => d.revenue));

    return (
        <Stack gap="xl">
            <Group align="start" grow>
                {/* Combined Order Stats Sticky Note */}
                <div className="relative p-6 pt-8 min-h-[250px] bg-yellow-200 dark:bg-yellow-600 text-yellow-900 dark:text-yellow-100 shadow-lg shadow-yellow-900/10 dark:shadow-yellow-900/50 rotate-[-1deg] transition-all hover:-translate-y-1 duration-200">
                    {/* Scotch Tape Visual */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/40 backdrop-blur-sm rotate-[-2deg] shadow-sm z-10"></div>

                    <Stack gap="lg">
                        <div className="border-b-2 border-yellow-900/20 dark:border-yellow-100/20 pb-2 mb-2">
                            <Text fw={900} size="xl" ff="monospace" className="uppercase tracking-widest text-center">
                                Daily Order Summary
                            </Text>
                            <Text size="xs" ff="monospace" ta="center" className="opacity-70">
                                {new Date().toLocaleDateString()}
                            </Text>
                        </div>

                        <Group grow preventGrowOverflow={false} gap="sm">
                            <Stack align="center" gap={4} className="border-r-2 border-yellow-900/10 dark:border-yellow-100/10 pr-2">
                                <IconShoppingBag size={28} className="opacity-80" />
                                <Text fw={900} size="2rem" ff="monospace" lh={1}>
                                    {dashboardStats.ongoingOrders}
                                </Text>
                                <Text size="xs" fw={700} tt="uppercase" ff="monospace" className="opacity-70">Ongoing</Text>
                            </Stack>

                            <Stack align="center" gap={4} className="border-r-2 border-yellow-900/10 dark:border-yellow-100/10 px-2">
                                <IconChecks size={28} className="opacity-80" />
                                <Text fw={900} size="2rem" ff="monospace" lh={1}>
                                    {dashboardStats.completedOrders}
                                </Text>
                                <Text size="xs" fw={700} tt="uppercase" ff="monospace" className="opacity-70">Done</Text>
                            </Stack>

                            <Stack align="center" gap={4} className="pl-2">
                                <IconTruckDelivery size={28} className="opacity-80" />
                                <Text fw={900} size="2rem" ff="monospace" lh={1}>
                                    {dashboardStats.ordersToDeliver}
                                </Text>
                                <Text size="xs" fw={700} tt="uppercase" ff="monospace" className="opacity-70">Deliver</Text>
                            </Stack>
                        </Group>
                    </Stack>
                </div>

                {/* Sales Overview Pinned Paper */}
                <div className="relative p-6 pt-8 min-h-[250px] bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-md rotate-[1deg] border border-stone-200 dark:border-stone-700">
                    {/* Push Pin Visual */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 drop-shadow-md">
                        <div className="w-4 h-4 rounded-full bg-red-600 border-2 border-red-800 shadow-inner"></div>
                    </div>

                    <Stack justify="space-between" h="100%">
                        <Group justify="space-between" align="center" mb="lg">
                            <Stack gap={0}>
                                <Text fz="lg" fw={700} ff="monospace" className="uppercase tracking-wider">Weekly Sales</Text>
                                <Text size="xs" c="dimmed" ff="monospace">Revenue Overview</Text>
                            </Stack>
                            <IconChartBar size={24} className="text-stone-400" />
                        </Group>

                        <Group align="flex-end" grow preventGrowOverflow={false} h={140} gap="xs">
                            {dashboardStats.dailySales.map((day) => {
                                const heightPercentage = (day.revenue / maxRevenue) * 100;
                                return (
                                    <Stack key={day.date} gap={5} align="center" style={{ height: '100%' }} justify="flex-end">
                                        <Text size="xs" fw={700} ff="monospace">${day.revenue}</Text>
                                        <div
                                            className="bg-stone-600 dark:bg-stone-400 w-full relative group"
                                            style={{ height: `${heightPercentage}%`, minHeight: '4px' }}
                                        >
                                            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.1)_2px,rgba(255,255,255,0.1)_4px)]"></div>
                                        </div>
                                        <Text size="xs" c="dimmed" ff="monospace">{day.date}</Text>
                                    </Stack>
                                )
                            })}
                        </Group>
                    </Stack>
                </div>
            </Group>
        </Stack>
    );
}
