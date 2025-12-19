import { Container, Grid, } from '@mantine/core';
import CartOrderSummary from '../components/CartOrderSummary';
import CartItems from '../components/CartItems';
import CartHeading from '../components/Cart/CartHeading';

export default function Cart() {
    return (
        <div className='w-full h-full'>
            <Container size="xl" className="pb-10 pt-5">
                <div className="w-full md:h-[calc(100vh-130px)] h-auto flex flex-col">
                    <CartHeading />
                    <Grid gutter="xl" className="w-full flex-1">

                        {/* Cart Items: Second on mobile, First on Desktop */}
                        <Grid.Col span={{ base: 12, md: 8 }} order={{ base: 2, md: 1 }} className="h-full">
                            <CartItems className="h-full md:overflow-y-auto overflow-visible" />
                        </Grid.Col>

                        {/* Order Summary: First on mobile, Second on Desktop */}
                        <Grid.Col span={{ base: 12, md: 4 }} order={{ base: 1, md: 2 }}>
                            <CartOrderSummary />
                        </Grid.Col>
                    </Grid>
                </div>
            </Container>
        </div>
    );
}
