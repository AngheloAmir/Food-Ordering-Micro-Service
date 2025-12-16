import { Container } from '@mantine/core';
import TitleVariant2 from '../components/ui/StickyPostCard/stickypostcard/TitleVariant2';

import OrderStatus from '../components/OrderStatus';
import OrderDetails from '../components/OrderDetails';
import PaperLikeTornContainer from '../components/ui/StickyPostCard/PaperLikeTornContainer';

export default function Orders() {
    return (
        <Container className='mt-10'>
            <PaperLikeTornContainer>
                <TitleVariant2 title="Order Summary" badge="12/15/2025" />
                <OrderStatus />
                <OrderDetails />
            </PaperLikeTornContainer>
        </Container>
    );
}
