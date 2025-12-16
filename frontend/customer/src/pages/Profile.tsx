import PaperLikeMainContainer from '../ui/StickyPostCard/PaperLikeMainContainer';
import { IconUser, IconHistory } from "@tabler/icons-react";
import { useState } from 'react';
import UserProfile from '../components/UserProfile';
import UserOrderHistory from '../components/UserOrderHistory';

export default function Profile() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <PaperLikeMainContainer
            navigation={[
                {
                    label: "Profile",
                    icon: IconUser,
                    active: activeTab === 0,
                    onClick: () => { setActiveTab(0) }
                },
                {
                    label: "Order History",
                    icon: IconHistory,
                    active: activeTab === 2,
                    onClick: () => { setActiveTab(2) }
                },
            ]}
        >
            {activeTab === 0 && <UserProfile />}
            {activeTab === 2 && <UserOrderHistory />}
        </PaperLikeMainContainer>
    )
}
