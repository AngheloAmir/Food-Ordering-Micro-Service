import PaperLikeMainContainer from '../ui/StickyPostCard/PaperLikeMainContainer';

import { IconUser, IconHistory, IconToolsKitchen } from "@tabler/icons-react";
import { useState } from 'react';
import UserProfile from '../components/UserProfile';
import UserOrderHistory from '../components/UserOrderHistory';
import FoodMenu from '../components/FoodMenu';

export default function Home() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <PaperLikeMainContainer
            navigation={[
                {
                    label: "Menu",
                    icon: IconToolsKitchen,
                    active: activeTab === 0,
                    onClick: () => { setActiveTab(0) }
                },
                {
                    label: "Profile",
                    icon: IconUser,
                    active: activeTab === 1,
                    onClick: () => { setActiveTab(1) }
                },
                {
                    label: "Order History",
                    icon: IconHistory,
                    active: activeTab === 2,
                    onClick: () => { setActiveTab(2) }
                },
            ]}
            className="pt-5"
        >
            {activeTab === 0 && <FoodMenu />}
            {activeTab === 1 && <UserProfile />}
            {activeTab === 2 && <UserOrderHistory />}
        </PaperLikeMainContainer>
    )
}

