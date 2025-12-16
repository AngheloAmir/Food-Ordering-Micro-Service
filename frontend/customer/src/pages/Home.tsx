
import { Container, Title } from '@mantine/core';
import StickyPostCard from '../ui/StickyPostCard/StickyPostCard';
import PaperLikeMainContainer from '../ui/StickyPostCard/PaperLikeMainContainer';

import { IconUser, IconHistory } from "@tabler/icons-react";
import PaperLikeTornContainer from '../ui/StickyPostCard/PaperLikeTornContainer';
import { useState } from 'react';
import UserProfile from '../components/UserProfile';

export default function Home() {
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
            {
                activeTab === 2 && (
                    <PaperLikeTornContainer>
                        two
                    </PaperLikeTornContainer>
                )
            }

        </PaperLikeMainContainer>
    )



    return (
        <Container>
            <Title>Home Page</Title>

            <StickyPostCard
                design="default"
                rotation="toright"
                titleVariant='default'
                title='asdasd'
                titleBadge='asdasd'
                containsListTable={[
                    {
                        name: "Burger",
                        quantity: 2,
                    },
                    {
                        name: "Fries",
                        quantity: 1,
                    },
                    {
                        name: "Soda",
                        quantity: 1,
                    },
                ]}
            >

            </StickyPostCard>

            <StickyPostCard
                design="green"
                rotation="default"
                titleVariant="textcenter"
                title='Daily Order Summary'
                titleBadge='12/15/2025'
                containsOrderTable={[
                    {
                        name: "Burger",
                        quantity: 2,
                        price: 10,
                    },
                    {
                        name: "Fries",
                        quantity: 1,
                        price: 5,
                    },
                    {
                        name: "Soda",
                        quantity: 1,
                        price: 2,
                    },
                ]}
            />

        </Container>
    );
}
