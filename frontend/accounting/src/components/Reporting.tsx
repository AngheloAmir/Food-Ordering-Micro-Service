import { Grid, Paper, Text, ThemeIcon, Progress, Stack } from '@mantine/core';
import { StickyNoteContainer } from './StickyNoteContainer';
import { IconArrowUpRight, IconArrowDownRight, IconCoin } from '@tabler/icons-react';
import { chartOfAccounts } from '../data/mockData';

export function Reporting() {
    const totalAssets = chartOfAccounts.filter(a => a.type === 'Asset').reduce((acc, curr) => acc + curr.balance, 0);
    const totalLiabilities = chartOfAccounts.filter(a => a.type === 'Liability').reduce((acc, curr) => acc + curr.balance, 0);
    const equity = chartOfAccounts.filter(a => a.type === 'Equity').reduce((acc, curr) => acc + curr.balance, 0);

    return (
        <div className="space-y-6">
            <StickyNoteContainer title="Executive Summary" color="blue">
                <Grid>
                    <Grid.Col span={4}>
                        <Paper p="md" className="bg-white/50 dark:bg-black/20 text-center">
                            <ThemeIcon variant="light" color="teal" size="xl" radius="xl" className="mb-2">
                                <IconArrowUpRight />
                            </ThemeIcon>
                            <Text className="font-mono text-xs uppercase" c="dimmed">Total Assets</Text>
                            <Text className="font-mono text-xl font-bold">${totalAssets.toLocaleString()}</Text>
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Paper p="md" className="bg-white/50 dark:bg-black/20 text-center">
                            <ThemeIcon variant="light" color="red" size="xl" radius="xl" className="mb-2">
                                <IconArrowDownRight />
                            </ThemeIcon>
                            <Text className="font-mono text-xs uppercase" c="dimmed">Liabilities</Text>
                            <Text className="font-mono text-xl font-bold">${totalLiabilities.toLocaleString()}</Text>
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Paper p="md" className="bg-white/50 dark:bg-black/20 text-center">
                            <ThemeIcon variant="light" color="blue" size="xl" radius="xl" className="mb-2">
                                <IconCoin />
                            </ThemeIcon>
                            <Text className="font-mono text-xs uppercase" c="dimmed">Owner's Equity</Text>
                            <Text className="font-mono text-xl font-bold">${equity.toLocaleString()}</Text>
                        </Paper>
                    </Grid.Col>
                </Grid>
            </StickyNoteContainer>

            <StickyNoteContainer title="Budget Usage">
                <Stack gap="xs">
                    <Text className="font-mono text-xs uppercase font-bold flex justify-between">
                        <span>Operating Expenses</span>
                        <span>75%</span>
                    </Text>
                    <Progress value={75} color="orange" size="lg" radius="xs" striped animated />

                    <Text className="font-mono text-xs uppercase font-bold flex justify-between mt-2">
                        <span>Capital Expenditure</span>
                        <span>30%</span>
                    </Text>
                    <Progress value={30} color="blue" size="lg" radius="xs" />

                    <Text className="font-mono text-xs uppercase font-bold flex justify-between mt-2">
                        <span>Marketing</span>
                        <span>55%</span>
                    </Text>
                    <Progress value={55} color="teal" size="lg" radius="xs" />
                </Stack>
            </StickyNoteContainer>
        </div>
    );
}
