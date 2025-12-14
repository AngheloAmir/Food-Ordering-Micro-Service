import { Group, Text, Avatar, Image, Title, ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

export function Header() {
    return (
        <div className="h-[60px] px-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-white dark:bg-stone-900 sticky top-0 z-50 shadow-sm">
            <Group>
                <Group gap="md">
                    <div className="bg-white p-1 rounded-sm">
                        <Image src={'/brand.png'} h={40} w="auto" fit="contain" />
                    </div>
                    <div className="flex flex-col">
                        <Title
                            order={4}
                            className="text-stone-100 uppercase tracking-widest"
                            ff="monospace"
                        >
                            Amir Online Restaurant <span className="text-stone-500">/</span> Accounting
                        </Title>
                    </div>
                </Group>
            </Group>

            <Group>
                <div className="text-right hidden sm:block">
                    <Text size="sm" fw={700} className="font-mono">Accountant Admin</Text>
                    <Text size="xs" c="dimmed" className="font-mono">Authorized Personnel</Text>
                </div>
                <Avatar color="blue" radius="md">AC</Avatar>

                <ThemeToggle />
            </Group>
        </div>
    );
}

function ThemeToggle() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    return (
        <ActionIcon
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
            variant="default"
            size="xl"
            aria-label="Toggle color scheme"
            className="dark:bg-gray-700 bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
            {computedColorScheme === 'dark' ? <IconSun stroke={1.5} /> : <IconMoon stroke={1.5} />}
        </ActionIcon>
    );
}
