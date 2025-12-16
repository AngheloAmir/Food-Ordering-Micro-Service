import { Container, Grid, } from '@mantine/core';
import CartOrderSummary from '../components/CartOrderSummary';
import CartItems from '../components/CartItems';
import CartHeading from '../components/Cart/CartHeading';

export default function Cart() {
    return (
        <Container size="xl" className="pb-10">
            <div className="w-full h-[calc(100vh-130px)]">
                <CartHeading />
                <Grid gutter="xl" className="w-full">
                    <div className="w-[65%]">
                        <CartItems />
                    </div>
                    <CartOrderSummary />
                </Grid>
            </div>

        </Container>
    );
}
