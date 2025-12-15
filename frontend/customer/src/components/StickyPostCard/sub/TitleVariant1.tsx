import { Group, Badge, Text, useMantineTheme, useMantineColorScheme } from "@mantine/core";

interface TitleVariant1Props {
    title?: string;
    badge?: string;
}

export default function TitleVariant1(props: TitleVariant1Props) {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    return (
        <Group justify="space-between" >
            <Text fw={900} size="xl" ff="monospace">{props.title}</Text>
            <Group gap={4}>
                {props.badge &&
                    <Badge
                        variant="outline"
                        styles={{
                            root: {
                                color:
                                    colorScheme === "dark"
                                        ? theme.colors.gray[3]
                                        : theme.colors.blue[7],
                                borderColor:
                                    colorScheme === "dark"
                                        ? theme.colors.gray[3]
                                        : theme.colors.blue[7],
                            },
                        }}
                    >
                        {props.badge}
                    </Badge>
                }
            </Group>
        </Group>
    );
}