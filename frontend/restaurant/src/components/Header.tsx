import { Group, Title, Text, ActionIcon, useMantineColorScheme, useComputedColorScheme, Container, Image } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

export default function Header() {
    return (
        <header className="h-[100px] w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <Container size="xl" h="100%">
                <Group justify="space-between" h="100%">
                    <Group gap="md">
                        <Image src={'/brand.png'} h={80} w="auto" fit="contain" radius="md" />
                        <div>
                            <Title order={2} className="text-red-600 dark:text-blue-400">
                                Amir Online Restaurant - Chef's Dashboard
                            </Title>
                            <Text size="sm" c="dimmed" fw={500}>
                                Food deliveries and services
                            </Text>
                        </div>
                    </Group>
                    <ThemeToggle />
                </Group>
            </Container>
        </header>
    )
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
