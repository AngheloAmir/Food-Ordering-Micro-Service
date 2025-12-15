
import { Container, Title } from '@mantine/core';
import StickyPostCard from '../components/StickyPostCard/StickyPostCard';

export default function Home() {
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
