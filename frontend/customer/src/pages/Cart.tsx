import { Container, Grid, } from '@mantine/core';
import CartOrderSummary from '../components/CartOrderSummary';
import CartItems from '../components/CartItems';
import CartHeading from '../components/Cart/CartHeading';

export default function Cart() {
    return (
        <Container size="xl" className="pb-10">
            <CartHeading />

            <Grid gutter="xl">
                <CartItems />
                <CartOrderSummary />
            </Grid>
        </Container>
    );
}
