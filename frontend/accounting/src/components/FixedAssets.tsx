import { ActionIcon, Progress, Stack, Text, Group, RingProgress, Center, ThemeIcon } from '@mantine/core';
import { StickyNoteContainer } from './StickyNoteContainer';
import { IconBuildingSkyscraper, IconCar, IconDeviceDesktop } from '@tabler/icons-react';

export function FixedAssets() {
    return (
        <StickyNoteContainer title="Fixed Assets Management" color="white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AssetCard
                    icon={<IconBuildingSkyscraper size={24} />}
                    name="Real Estate"
                    value={1200000}
                    depreciation={15}
                    color="cyan"
                />
                <AssetCard
                    icon={<IconDeviceDesktop size={24} />}
                    name="IT Equipment"
                    value={45000}
                    depreciation={65}
                    color="violet"
                />
                <AssetCard
                    icon={<IconCar size={24} />}
                    name="Vehicles"
                    value={85000}
                    depreciation={40}
                    color="orange"
                />
            </div>

            <Stack mt="xl" gap="xs">
                <Text className="font-mono text-sm uppercase font-bold text-stone-500 mb-2">Total Depreciation Schedule (FY 2024)</Text>
                <Progress.Root size="xl">
                    <Progress.Section value={30} color="cyan">
                        <Progress.Label>Real Estate</Progress.Label>
                    </Progress.Section>
                    <Progress.Section value={25} color="orange">
                        <Progress.Label>Vehicles</Progress.Label>
                    </Progress.Section>
                    <Progress.Section value={15} color="violet">
                        <Progress.Label>IT</Progress.Label>
                    </Progress.Section>
                </Progress.Root>
            </Stack>
        </StickyNoteContainer>
    );
}

function AssetCard({ icon, name, value, depreciation, color }: { icon: any, name: string, value: number, depreciation: number, color: string }) {
    return (
        <div className="border border-stone-200 dark:border-stone-700 p-4 rounded-sm bg-stone-50 dark:bg-stone-900/50">
            <Group justify="space-between" align="start" mb="md">
                <ThemeIcon size="lg" radius="md" color={color} variant="light">{icon}</ThemeIcon>
                <div className="text-right">
                    <Text className="font-mono font-bold leading-none">{name}</Text>
                    <Text className="font-mono text-xs text-stone-400">Asset Class</Text>
                </div>
            </Group>

            <Center>
                <RingProgress
                    size={100}
                    thickness={8}
                    roundCaps
                    sections={[{ value: depreciation, color: color }]}
                    label={
                        <Text c={color} fw={700} ta="center" size="sm" className="font-mono">
                            {depreciation}%
                        </Text>
                    }
                />
            </Center>
            <Text ta="center" size="xs" c="dimmed" className="font-mono mt-2 uppercase">Depreciated Value</Text>
            <Text ta="center" fw={900} className="font-mono">${(value * ((100 - depreciation) / 100)).toLocaleString()}</Text>
        </div>
    )
}
