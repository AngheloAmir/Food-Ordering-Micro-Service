import useCartStore from '../store/cartStore';
import useModalStore from '../store/useModals';
import useUserStore from '../store/userStore';
import { IconMessageCircle, IconReceipt, IconShoppingCart, IconHome, IconUser, IconHistory } from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';
import HeaderStickyPostCard from './ui/StickyPostCard/HeaderStickyPostCard';
import useNavStore from '../store/navStore';

export default function HeaderSearch() {
    const navigate = useNavigate();
    const location = useLocation();
    const cart = useCartStore.use.cart();
    const isAuthenticated = useUserStore.use.isAuthenticated();
    const openLogin = useModalStore.use.openLogin();

    const activeTab = useNavStore.use.activeTab();
    const setActiveTab = useNavStore.use.setActiveTab();

    function onOpenHome() {
        navigate('/');
        setActiveTab("menu");
    }

    function onOpenCart() {
        if (!isAuthenticated) {
            openLogin();
            return;
        }
        navigate('/cart');
        setActiveTab("none");
    }

    function onOpenOrder() {
        if (!isAuthenticated) {
            openLogin();
            return;
        }
        navigate('/orders');
        setActiveTab("none");
    }

    function onOpenChat() {
        if (!isAuthenticated) {
            openLogin();
            return;
        }
        navigate('/chats');
        setActiveTab("none");
    }

    //Additional Tabs for mobile users==================
    function onOpenProfile() {
        navigate('/');
        if (!isAuthenticated) {
            openLogin();
            return;
        }
        setActiveTab("profile");
    }

    function onOpenOrderHistory() {
        navigate('/');
        if (!isAuthenticated) {
            openLogin();
            return;
        }
        setActiveTab("orderHistory");
    }

    return (
        <HeaderStickyPostCard
            title="Amir Online Restaurant"
            subtitle="Food deliveries and services"
            navigations={[
                {
                    isSelected: location.pathname === '/' && activeTab == "menu",
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

            additonalNaviations={[
                {
                    isSelected: activeTab === "profile",
                    title: 'Profile',
                    onClick: () => onOpenProfile(),
                    notificationCount: 0,
                    notifcationColor: 'blue',
                    isNotAvailable: !isAuthenticated,
                    icon: IconUser,
                },
                {
                    isSelected: activeTab === "orderHistory",
                    title: 'Order History',
                    onClick: () => onOpenOrderHistory(),
                    notificationCount: 0,
                    notifcationColor: 'blue',
                    isNotAvailable: !isAuthenticated,
                    icon: IconHistory,
                },
            ]}
        />
    );
}