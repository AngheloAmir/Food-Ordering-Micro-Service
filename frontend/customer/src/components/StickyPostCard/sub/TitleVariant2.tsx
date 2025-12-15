import { Text } from "@mantine/core";

interface TitleVariant2Props {
    title?: string;
    badge?: string;
}

export default function TitleVariant2(props: TitleVariant2Props) {

    return (
        <div className="text-center flex flex-col">
            <Text fw={900} size="xl" ff="monospace" className="uppercase tracking-widest text-center">
                {props.title}
            </Text>
            <Text size="xs" ff="monospace" ta="center" className="opacity-70">
                {props.badge}
            </Text>
        </div>

    );
}