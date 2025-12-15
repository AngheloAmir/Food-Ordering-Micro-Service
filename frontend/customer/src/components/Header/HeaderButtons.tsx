import { Button, Indicator } from "@mantine/core";
import React from "react";


interface HeaderButtonProps {
    title: string;
    onClick: () => void;
    notificationCount: number;
    notifcationColor?: "blue" | "red"
    isNotAvailable: boolean;
    icon: React.ReactNode;

}

export default function HeaderButtons({ title, onClick, notificationCount, isNotAvailable, icon, notifcationColor }: HeaderButtonProps) {
    if (isNotAvailable) return (
        <Button
            visibleFrom="md"
            onClick={onClick}
            variant="subtle" leftSection={icon}
            className="opacity-50">
            <p className="text-yellow-900 dark:text-white">
                {title}
            </p>
        </Button>
    )

    if (notificationCount === 0) return (
        <Button visibleFrom="md" onClick={onClick} variant="subtle" leftSection={icon}>
            <p className="text-yellow-900 dark:text-white">
                {title}
            </p>
        </Button>
    );

    return (
        <Indicator visibleFrom="md" inline color={notifcationColor ?? "blue"} label={notificationCount} size={24} offset={5}>
            <Button onClick={onClick} variant="subtle" leftSection={icon}>
                <p className="text-yellow-900 dark:text-white">
                    {title}
                </p>
            </Button>
        </Indicator>
    );
}