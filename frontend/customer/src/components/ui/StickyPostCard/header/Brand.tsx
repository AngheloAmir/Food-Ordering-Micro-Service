import { Group, Burger, Title, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function Brand({ title, subtitle }: { title: string, subtitle: string }) {
    const [opened, { toggle }] = useDisclosure(false);

    return (
        <Group>
            <Burger opened={opened} onClick={toggle} size="md" hiddenFrom="md" />
            <img src="brand.png" alt="" width={32} height={32} />
            <div className="flex flex-col justify-center">
                <Title visibleFrom="lg" className="cursor-default p-0 m-0 text-yellow-900 dark:text-white font-sans" order={2} size="xl">
                    {title}
                </Title>
                <Text visibleFrom="lg" className="cursor-default text-sm font-medium opacity-70 text-yellow-900 dark:text-white font-sans" size="xs">
                    {subtitle}
                </Text>
            </div>
        </Group>
    );
}