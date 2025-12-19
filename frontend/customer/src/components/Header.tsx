import useCartStore from '../store/cartStore';
import useModalStore from '../store/useModals';
import useUserStore from '../store/userStore';
import { IconMessageCircle, IconReceipt, IconShoppingCart, IconHome } from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';
import HeaderStickyPostCard from '../ui/StickyPostCard/HeaderStickyPostCard';

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

    return (
        <HeaderStickyPostCard
            title="Amir Online Restaurant"
            subtitle="Food deliveries and services"
            navigations={[
                {
                    isSelected: location.pathname === '/',
                    title: 'Home',
                    onClick: onOpenHome,
                    notificationCount: 0,
                    isNotAvailable: false,
                    icon: IconHome,
                },
                {
                    isSelected: location.pathname === '/cart',
                    title: 'Cart',
                    onClick: () => onOpenCart(),
                    notificationCount: cart.length + 1,
                    isNotAvailable: !isAuthenticated,
                    icon: IconShoppingCart,
                },
                {
                    isSelected: location.pathname === '/orders',
                    title: 'Order',
                    onClick: () => onOpenOrder(),
                    notificationCount: cart.length + 1,
                    notifcationColor: 'red',
                    isNotAvailable: !isAuthenticated,
                    icon: IconReceipt,
                },
                {
                    isSelected: location.pathname === '/chats',
                    title: 'Chat',
                    onClick: () => onOpenChat(),
                    notificationCount: cart.length + 1,
                    notifcationColor: 'red',
                    isNotAvailable: !isAuthenticated,
                    icon: IconMessageCircle,
                }
            ]}
        />
    );
}