import { Group } from '@mantine/core';
import DarkmodeButton from './Header/DarkmodeButton';
import Brand from './Header/Brand';
import SearchBar from './Header/SearchBar';
import useCartStore from '../store/cartStore';
import useModalStore from '../store/useModals';
import useUserStore from '../store/userStore';
import HeaderButtons from './Header/HeaderButtons';
import { IconMessageCircle, IconReceipt, IconShoppingCart, IconUser, IconHome } from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function HeaderSearch() {
    const navigate = useNavigate();
    const location = useLocation();
    const cart = useCartStore.use.cart();
    const isAuthenticated = useUserStore.use.isAuthenticated();
    const openLogin = useModalStore.use.openLogin();

    function onOpenHome() {
        navigate('/');
    }

    function onOpenCart() {
        if (!isAuthenticated) {
            openLogin();
            return;
        }
        navigate('/cart');
    }

    function onOpenOrder() {
        if (!isAuthenticated) {
            openLogin();
            return;
        }
        navigate('/orders');
    }

    function onOpenChat() {
        if (!isAuthenticated) {
            openLogin();
            return;
        }
        navigate('/chats');
    }

    function onOpenProfile() {
        if (!isAuthenticated) {
            openLogin();
            return;
        }
        navigate('/profile');
    }

    return (
        <header className="h-[64px] bg-yellow-200 dark:bg-yellow-900 shadow-lg shadow-yellow-900/10 dark:shadow-yellow-900/50 px-4 border-b-4 border-dashed border-stone-300 dark:border-stone-800">
            <div className="h-[64px] flex justify-between items-center">
                <Brand title='Amir Online Restaurant' subtitle='Food deliveries and services' />

                <Group>
                    <Group ml={20} gap={15} visibleFrom="sm">
                        <HeaderButtons
                            isSelected={location.pathname === '/'}
                            title="Home"
                            onClick={onOpenHome}
                            notificationCount={0}
                            isNotAvailable={false}
                            icon={IconHome}
                        />

                        <HeaderButtons
                            isSelected={location.pathname === '/cart'}
                            title="Cart"
                            onClick={() => onOpenCart()}
                            notificationCount={cart.length + 1}
                            isNotAvailable={!isAuthenticated}
                            icon={IconShoppingCart}
                        />

                        <HeaderButtons
                            isSelected={location.pathname === '/orders'}
                            title="Order"
                            onClick={() => onOpenOrder()}
                            notificationCount={cart.length + 1}
                            notifcationColor="red"
                            isNotAvailable={!isAuthenticated}
                            icon={IconReceipt}
                        />

                        <HeaderButtons
                            isSelected={location.pathname === '/chats'}
                            title="Chat"
                            onClick={() => onOpenChat()}
                            notificationCount={cart.length + 1}
                            notifcationColor="red"
                            isNotAvailable={!isAuthenticated}
                            icon={IconMessageCircle}
                        />

                        <HeaderButtons
                            isSelected={location.pathname === '/profile'}
                            title="Profile"
                            onClick={() => onOpenProfile()}
                            notificationCount={cart.length + 1}
                            notifcationColor="blue"
                            isNotAvailable={!isAuthenticated}
                            icon={IconUser}
                        />
                    </Group>

                    <SearchBar />
                    <DarkmodeButton />
                </Group>
            </div>
        </header>
    );
}