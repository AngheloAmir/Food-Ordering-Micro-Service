import { Group } from '@mantine/core';
import DarkmodeButton from './Header/DarkmodeButton';
import Brand from './Header/Brand';
import SearchBar from './Header/SearchBar';
import useCartStore from '../store/cartStore';
import useModalStore from '../store/useModals';
import useUserStore from '../store/userStore';
import HeaderButtons from './Header/HeaderButtons';
import { IconMessageCircle, IconReceipt, IconShoppingCart, IconUser } from '@tabler/icons-react';


export default function HeaderSearch() {
    const cart = useCartStore.use.cart();
    const isAuthenticated = useUserStore.use.isAuthenticated();
    const openLogin = useModalStore.use.openLogin();

    function onOpenCart() {
        if (!isAuthenticated) {
            openLogin();
            return;
        }
    }

    function onOpenOrder() {
        if (!isAuthenticated) {
            openLogin();
            return;
        }
    }

    function onOpenChat() {
        if (!isAuthenticated) {
            openLogin();
            return;
        }
    }

    function onOpenProfile() {
        if (!isAuthenticated) {
            openLogin();
            return;
        }
    }

    return (
        <header className="h-[64px] mb-[120px] bg-yellow-200 dark:bg-yellow-900 shadow-lg shadow-yellow-900/10 dark:shadow-yellow-900/50 px-4 border-b-4 border-dashed border-stone-300 dark:border-stone-800">
            <div className="h-[64px] flex justify-between items-center">
                <Brand />

                <Group>
                    <Group ml={20} gap={15} visibleFrom="sm">
                        <HeaderButtons
                            title="Cart"
                            onClick={() => onOpenCart()}
                            notificationCount={cart.length + 1}
                            isNotAvailable={!isAuthenticated}
                            icon={<IconShoppingCart className="text-yellow-900 dark:text-white" size={30} stroke={1.5} />}
                        />

                        <HeaderButtons
                            title="Order"
                            onClick={() => onOpenOrder()}
                            notificationCount={cart.length + 1}
                            notifcationColor="red"
                            isNotAvailable={!isAuthenticated}
                            icon={<IconReceipt className="text-yellow-900 dark:text-white" size={30} stroke={1.5} />}
                        />

                        <HeaderButtons
                            title="Chat"
                            onClick={() => onOpenChat()}
                            notificationCount={cart.length + 1}
                            notifcationColor="red"
                            isNotAvailable={!isAuthenticated}
                            icon={<IconMessageCircle className="text-yellow-900 dark:text-white" size={30} stroke={1.5} />}
                        />

                        <HeaderButtons
                            title="Profile"
                            onClick={() => onOpenProfile()}
                            notificationCount={cart.length + 1}
                            notifcationColor="blue"
                            isNotAvailable={!isAuthenticated}
                            icon={<IconUser className="text-yellow-900 dark:text-white" size={30} stroke={1.5} />}
                        />
                    </Group>

                    <SearchBar />
                    <DarkmodeButton />
                </Group>
            </div>
        </header>
    );
}