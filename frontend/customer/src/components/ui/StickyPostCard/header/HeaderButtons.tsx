import { Button, Indicator } from "@mantine/core";
import React from "react";


interface HeaderButtonProps {
    title: string;
    onClick: () => void;
    notificationCount: number;
    notifcationColor?: "blue" | "red"
    isNotAvailable: boolean;
    icon: React.ElementType;
    isSelected?: boolean;

}

export default function HeaderButtons({ title, onClick, notificationCount, isNotAvailable, icon: Icon, notifcationColor, isSelected }: HeaderButtonProps) {
    if (isSelected) {
        const IconNode = <Icon className="text-black dark:text-white" size={30} stroke={1.5} />;
        return (
            <Button
                visibleFrom="md"
                onClick={onClick}
                variant="light"
                leftSection={IconNode}
            >
                <p className="text-black dark:text-white">
                    {title}
                </p>
            </Button>
        )
    }

    const IconNode = <Icon className="text-yellow-900 dark:text-white" size={30} stroke={1.5} />;
    if (isNotAvailable) return (
        <Button
            visibleFrom="md"
            onClick={onClick}
            variant="subtle" leftSection={IconNode}
            className="opacity-50">
            <p className="text-yellow-900 dark:text-white">
                {title}
            </p>
        </Button>
    )

    if (notificationCount === 0) return (
        <Button visibleFrom="md" onClick={onClick} variant="subtle" leftSection={IconNode}>
            <p className="text-yellow-900 dark:text-white">
                {title}
            </p>
        </Button>
    );

    return (
        <Indicator visibleFrom="md" inline color={notifcationColor ?? "blue"} label={notificationCount} size={24} offset={5}>
            <Button onClick={onClick} variant="subtle" leftSection={IconNode}>
                <p className="text-yellow-900 dark:text-white">
                    {title}
                </p>
            </Button>
        </Indicator>
    );
}