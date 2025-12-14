import { Group } from '@mantine/core';
import DarkmodeButton from './DarkmodeButton';
import Brand from './Brand';
import CartButton from './CartButton';
import OrderButton from './OrderButton';
import ChatButton from './ChatButton';
import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar';


export default function HeaderSearch() {

    return (
        <header className="h-[64px] mb-[120px] bg-yellow-200 dark:bg-yellow-900 shadow-lg shadow-yellow-900/10 dark:shadow-yellow-900/50 px-4 border-b-4 border-dashed border-stone-300 dark:border-stone-800">
            <div className="h-[64px] flex justify-between items-center">
                <Brand />

                <Group>
                    <Group ml={20} gap={15} visibleFrom="sm">
                        <CartButton />
                        <OrderButton />
                        <ChatButton />
                        <ProfileButton />
                    </Group>

                    <SearchBar />
                    <DarkmodeButton />
                </Group>
            </div>
        </header>
    );
}