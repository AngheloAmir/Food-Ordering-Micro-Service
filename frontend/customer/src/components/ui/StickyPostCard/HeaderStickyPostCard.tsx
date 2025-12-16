import { Group } from '@mantine/core';
import Brand from './header/Brand';
import HeaderButtons from './header/HeaderButtons';
import SearchBar from './header/SearchBar';
import DarkmodeButton from './header/DarkmodeButton';

interface HeaderProps {
    title: string;
    subtitle: string;
    navigations: Array<{
        isSelected: boolean;
        title: string;
        onClick: () => void;
        notificationCount: number;
        notifcationColor?: "blue" | "red"
        isNotAvailable: boolean;
        icon: React.ElementType;
    }>;
}


export default function HeaderStickyPostCard(props: HeaderProps) {

    return (
        <header className="h-[64px] bg-yellow-200 dark:bg-yellow-900 shadow-lg shadow-yellow-900/10 dark:shadow-yellow-900/50 px-4 border-b-4 border-dashed border-stone-300 dark:border-stone-800">
            <div className="h-[64px] flex justify-between items-center">
                <Brand title={props.title} subtitle={props.subtitle} />

                <Group>
                    <Group ml={20} gap={15} visibleFrom="sm">
                        {props.navigations.map((navigation, index) => (
                            <HeaderButtons
                                key={index}
                                isSelected={navigation.isSelected}
                                title={navigation.title}
                                onClick={navigation.onClick}
                                notificationCount={navigation.notificationCount}
                                isNotAvailable={navigation.isNotAvailable}
                                icon={navigation.icon}
                            />
                        ))}
                    </Group>

                    <SearchBar />
                    <DarkmodeButton />
                </Group>
            </div>
        </header>
    );
}