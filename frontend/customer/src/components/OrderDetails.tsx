import { SimpleGrid, Stack, Group, Badge, Text } from "@mantine/core";
import { IconCash, IconMapPin, IconNote } from "@tabler/icons-react";
import CardHr from "./ui/StickyPostCard/stickypostcard/CardHr";
import OrderTable from "./ui/StickyPostCard/stickypostcard/OrderTable";
import PostCardBody from "./ui/StickyPostCard/stickypostcard/PostCardBody";


export default function OrderDetails() {
    return (
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="30">
            <PostCardBody design="default" rotation="default">
                <OrderTable order={[
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
                ]} />
            </PostCardBody>
            <PostCardBody design="default" rotation="default">
                <Stack gap="md">
                    <div>
                        <Group gap="xs" mb="xs">
                            <IconCash size={20} />
                            <Text fw={700}>Payment Method</Text>
                        </Group>
                        <Badge color="gray" variant="filled" size="lg" radius="md" className='border-2 border-stone-800 text-stone-800 bg-white'>
                            Cash on Delivery
                        </Badge>
                    </div>

                    <CardHr />

                    <div>
                        <Group gap="xs" mb="xs">
                            <IconMapPin size={20} />
                            <Text fw={700}>Delivery Address</Text>
                        </Group>
                        <Text size="sm" fw={500} className='text-stone-600'>
                            1234 Main St, Apt 101, Springfield, IL 62704
                        </Text>
                    </div>

                    <CardHr />

                    <div>
                        <Group gap="xs" mb="xs">
                            <IconNote size={20} />
                            <Text fw={700}>Delivery Instructions</Text>
                        </Group>
                        <Text size="sm" fw={500} className='text-stone-600'>
                            Please leave at the front door. Ring the doorbell.
                        </Text>
                    </div>
                </Stack>
            </PostCardBody>
        </SimpleGrid>
    )
}