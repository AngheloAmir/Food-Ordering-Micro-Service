import { Stack, Group, Badge } from "@mantine/core";
import PaperLikeTornContainer from "../ui/StickyPostCard/PaperLikeTornContainer";

export default function UserOrderHistory() {
    return (
        <PaperLikeTornContainer>
            <Stack gap="md">
                <OrderHistoryItem
                    id="#ORD-9921"
                    date="Oct 24, 2024"
                    items="Spicy Burger, French Fries, Coke"
                    total="$24.50"
                    status="Delivered"
                />
                <OrderHistoryItem
                    id="#ORD-9918"
                    date="Oct 20, 2024"
                    items="Pepperoni Pizza, Garlic Knots"
                    total="$32.00"
                    status="Delivered"
                />
                <OrderHistoryItem
                    id="#ORD-9882"
                    date="Oct 12, 2024"
                    items="Caesar Salad, Iced Tea"
                    total="$14.25"
                    status="Cancelled"
                />
            </Stack>
        </PaperLikeTornContainer>
    );
}

function OrderHistoryItem({ id, date, items, status }: any) {
    const isCancelled = status === 'Cancelled';
    return (
        <div className="p-4 border-2 border-stone-200 rounded-lg hover:border-stone-800 hover:bg-stone-50 transition-all group dark:border-stone-800 dark:hover:border-stone-200 dark:hover:bg-stone-900">
            <Group justify="space-between" mb="xs">
                <p className="font-extrabold text-stone-800 dark:text-stone-200">{id}</p>
                <Badge color={isCancelled ? 'red' : 'green'} variant="light" size="lg">{status}</Badge>
            </Group>
            <Group justify="space-between" align="flex-end">
                <div>
                    <p className="text-stone-600 mb-1 dark:text-white">{items}</p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">{date}</p>
                </div>
            </Group>
        </div>
    )
}