import { Drawer, ScrollArea, Badge } from "@mantine/core";
import { IconXboxX } from '@tabler/icons-react';
import CardHr from "./stickypostcard/CardHr";

interface DrawerMobileProps {
    opened: boolean;
    onClose: () => void;

    navigations: Array<{
        isSelected: boolean;
        title: string;
        onClick: () => void;
        notificationCount: number;
        notifcationColor?: "blue" | "red"
        isNotAvailable: boolean;
        icon: React.ElementType;
    }>;

    additonalNaviations?: Array<{
        isSelected: boolean;
        title: string;
        onClick: () => void;
        notificationCount: number;
        notifcationColor?: "blue" | "red"
        isNotAvailable: boolean;
        icon: React.ElementType;
    }>;
}

export default function DrawerMobile(props: DrawerMobileProps) {
    return (
        <Drawer
            opened={props.opened}
            onClose={props.onClose}
            size="85%"
            scrollAreaComponent={ScrollArea.Autosize}
            closeButtonProps={{
                icon: <IconXboxX size={26} stroke={2} />,
            }}
            classNames={{
                root: "flex flex-col",
                content: "bg-yellow-200 dark:bg-yellow-900 text-stone-900 dark:text-white flex flex-col",
                header: "w-full bg-yellow-200 dark:bg-yellow-900 border-b-4 border-dashed border-stone-300 dark:border-stone-800 p-4",
                body: "h-[calc(100vh-64px)] bg-yellow-200 dark:bg-yellow-900 flex-1 p-0",
                close: "text-stone-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors",
            }}
            title={<span className="font-extrabold text-2xl tracking-tight text-stone-900 dark:text-yellow-100">Menu</span>}
        >
            <div className="flex flex-col gap-3 p-4">
                {
                    props.navigations.map((navigation, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                navigation.onClick();
                                props.onClose();
                                console.log('aaa')
                            }}
                            className={`
                                w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group
                                border-2 
                                ${navigation.isSelected
                                    ? "bg-stone-900 border-stone-900 text-yellow-100 shadow-lg scale-[1.02] rotate-1"
                                    : "border-transparent hover:bg-yellow-300/50 dark:hover:bg-yellow-800/50 hover:border-stone-900/10 dark:hover:border-yellow-100/10 text-stone-800 dark:text-stone-100"
                                }
                                ${navigation.isNotAvailable ? "opacity-50 cursor-not-allowed grayscale" : "cursor-pointer active:scale-95"}
                            `}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`
                                    p-2.5 rounded-lg transition-colors
                                    ${navigation.isSelected ? "bg-yellow-400 text-stone-900" : "bg-stone-900/5 dark:bg-white/5 group-hover:bg-stone-900/10"}
                                `}>
                                    <navigation.icon size={26} stroke={2} />
                                </div>
                                <span className="font-bold text-xl">{navigation.title}</span>
                            </div>

                            {navigation.notificationCount > 0 && (
                                <Badge
                                    size="lg"
                                    circle
                                    variant={navigation.isSelected ? "white" : "filled"}
                                    color={navigation.notifcationColor || 'red'}
                                    className="shadow-sm"
                                >
                                    {navigation.notificationCount}
                                </Badge>
                            )}
                        </button>
                    ))
                }
            </div>

            <CardHr />
            {props.additonalNaviations && (
                props.additonalNaviations.map((navigation, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            navigation.onClick();
                            props.onClose();
                        }}
                        className={`
                            w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group
                            border-2 
                            ${navigation.isSelected
                                ? "bg-stone-900 border-stone-900 text-yellow-100 shadow-lg scale-[1.02] rotate-1"
                                : "border-transparent hover:bg-yellow-300/50 dark:hover:bg-yellow-800/50 hover:border-stone-900/10 dark:hover:border-yellow-100/10 text-stone-800 dark:text-stone-100"
                            }
                            ${navigation.isNotAvailable ? "opacity-50 cursor-not-allowed grayscale" : "cursor-pointer active:scale-95"}
                        `}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`
                                p-2.5 rounded-lg transition-colors
                                ${navigation.isSelected ? "bg-yellow-400 text-stone-900" : "bg-stone-900/5 dark:bg-white/5 group-hover:bg-stone-900/10"}
                            `}>
                                <navigation.icon size={26} stroke={2} />
                            </div>
                            <span className="font-bold text-xl">{navigation.title}</span>
                        </div>

                        {navigation.notificationCount > 0 && (
                            <Badge
                                size="lg"
                                circle
                                variant={navigation.isSelected ? "white" : "filled"}
                                color={navigation.notifcationColor || 'red'}
                                className="shadow-sm"
                            >
                                {navigation.notificationCount}
                            </Badge>
                        )}
                    </button>
                ))
            )}

        </Drawer>
    )
}
