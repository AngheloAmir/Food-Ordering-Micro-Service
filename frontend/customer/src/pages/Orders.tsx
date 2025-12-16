import { Container } from '@mantine/core';
import PostCardBody from '../components/ui/StickyPostCard/stickypostcard/PostCardBody';
import TitleVariant2 from '../components/ui/StickyPostCard/stickypostcard/TitleVariant2';

import OrderStatus from '../components/OrderStatus';
import OrderDetails from '../components/OrderDetails';

export default function Orders() {
    return (
        <Container className='mt-10'>
            <PostCardBody design="green" rotation="default">
                <TitleVariant2 title="Order Summary" badge="12/15/2025" />
                <OrderStatus />
                <OrderDetails />
            </PostCardBody>
        </Container>
    );
}
