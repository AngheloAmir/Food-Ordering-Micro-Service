import { SimpleGrid, Text, type SimpleGridProps } from "@mantine/core";
import type { Order, OrderStatus } from "../types";
import { OrderCard } from "./OrderCard";

export interface OrderProps {
    /** All of the orders */
    orders: Order[];
    /** What is looking for, like is this order should be here or not */
    whatLookingFor: OrderStatus;
    onStatusChange: (id: string, status: OrderStatus) => void;
    /** Grid columns configuration */
    cols?: SimpleGridProps['cols'];
}

export default function Orders({ orders, whatLookingFor, onStatusChange, cols }: OrderProps) {
    return (
        <>
            {
                orders.filter((o) => o.status === whatLookingFor).length > 0 ? (
                    <SimpleGrid cols={cols || { base: 1, sm: 2, lg: 3 }} spacing="lg">
                        {orders
                            .filter((order) => order.status === whatLookingFor)
                            .map((order) => (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    onStatusChange={onStatusChange}
                                />
                            ))}
                    </SimpleGrid>
                ) : (
                    <Text c="dimmed" fs="italic">No {whatLookingFor} orders to process.</Text>
                )
            }
        </>
    );
}