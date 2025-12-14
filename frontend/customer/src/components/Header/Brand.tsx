import { Group, Burger, Title, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function Brand() {
    const [opened, { toggle }] = useDisclosure(false);

    return (
        <Group>
            <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
            <img src="brand.png" alt="" width={32} height={32} />
            <div className="flex flex-col justify-center">
                <Title visibleFrom="sm" className="cursor-default p-0 m-0 text-yellow-900 dark:text-white font-sans" order={2} size="xl">
                    Amir Online Restaurant
                </Title>
                <Text visibleFrom="sm" className="cursor-default text-sm font-medium opacity-70 text-yellow-900 dark:text-white font-sans" size="xs">
                    Food deliveries and services
                </Text>
            </div>
        </Group>
    );
}