import { Button, Indicator } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import useCartStore from "../../store/cartStore";

export default function CartButton() {
    const cart = useCartStore.use.cart();

    if (cart.length === 0) return (
        <Button variant="subtle" leftSection={<IconShoppingCart className="text-yellow-900 dark:text-white" size={30} stroke={1.5} />}>
            <p className="text-yellow-900 dark:text-white">
                Cart
            </p>
        </Button>
    );

    return (
        <Indicator inline label={cart.length} size={24} offset={5}>
            <Button variant="subtle" leftSection={<IconShoppingCart className="text-yellow-900 dark:text-white" size={30} stroke={1.5} />}>
                <p className="text-yellow-900 dark:text-white">
                    Cart
                </p>
            </Button>
        </Indicator>
    );
}