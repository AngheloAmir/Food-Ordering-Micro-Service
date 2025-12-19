import { useMantineColorScheme, useComputedColorScheme, ActionIcon } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

export default function DarkmodeButton() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    return (
        <ActionIcon
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
            variant="default"
            size="lg"
            aria-label="Toggle color scheme"
            radius="xl"
        >
            {computedColorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
        </ActionIcon>
    );
}