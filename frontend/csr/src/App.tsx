import { AppShell, Group, Title, Text, ActionIcon, useMantineColorScheme, useComputedColorScheme, Container, Image } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

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

export default function App() {
  return (
    <AppShell
      header={{ height: 100 }}
      padding="md"
    >
      <AppShell.Header>
        <div className="h-full bg-gray-100 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-800 transition-colors duration-300">
          <Container size="xl" h="100%">
            <Group justify="space-between" h="100%">
              <Group gap="md">
                <Image src={"/brand.png"} h={60} w="auto" fit="contain" radius="md" />
                <div>
                  <Title order={2} >
                    Amir Online Restaurant - Customer Service
                  </Title>
                  <Text size="sm" c="dimmed" fw={500}>
                    Food deliveries and services
                  </Text>
                </div>
              </Group>

              <ThemeToggle />
            </Group>
          </Container>
        </div>
      </AppShell.Header>

      <AppShell.Main className="bg-white dark:bg-gray-800 transition-colors duration-300 min-h-screen">
        <Container size="xl" py="xl">
          <Title order={1} mb="md">Welcome to our refined dining experience</Title>
          <Text>
            This application uses Vite, React, TypeScript, Mantine UI, and Tailwind CSS v4.
          </Text>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
