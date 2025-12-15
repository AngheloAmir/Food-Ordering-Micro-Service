import { Grid } from "@mantine/core";
import StickyPostCard from "./StickyPostCard/StickyPostCard";

export default function CartOrderSummary() {
    return (
        <Grid.Col span={{ base: 12, md: 4 }}>
            <StickyPostCard
                design="default"
                rotation="toright"
                titleVariant="textcenter"
                title='Order Summary'
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
        </Grid.Col>
    );
}