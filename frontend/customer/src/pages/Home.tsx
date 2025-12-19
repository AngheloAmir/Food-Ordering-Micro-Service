import PaperLikeMainContainer from '../components/ui/StickyPostCard/PaperLikeMainContainer';

import { IconUser, IconHistory, IconToolsKitchen } from "@tabler/icons-react";
import UserProfile from '../components/UserProfile';
import UserOrderHistory from '../components/UserOrderHistory';
import FoodMenu from '../components/FoodMenu';
import useNavStore from '../store/navStore';

export default function Home() {
    const activeTab = useNavStore.use.activeTab();
    const setActiveTab = useNavStore.use.setActiveTab();

    return (
        <PaperLikeMainContainer
            navigation={[
                {
                    label: "Menu",
                    icon: IconToolsKitchen,
                    active: activeTab === "menu",
                    onClick: () => { setActiveTab("menu"); console.log('clicked me') }
                },
                {
                    label: "Profile",
                    icon: IconUser,
                    active: activeTab === "profile",
                    onClick: () => { setActiveTab("profile") }
                },
                {
                    label: "Order History",
                    icon: IconHistory,
                    active: activeTab === "orderHistory",
                    onClick: () => { setActiveTab("orderHistory") }
                },
            ]}
            className="pt-5"
        >
            {activeTab === "menu" && <FoodMenu />}
            {activeTab === "profile" && <UserProfile />}
            {activeTab === "orderHistory" && <UserOrderHistory />}
        </PaperLikeMainContainer>
    )
}

