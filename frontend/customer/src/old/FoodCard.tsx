import { Card, Image, Text, Badge, Button, Group, ActionIcon } from '@mantine/core';
import { IconShoppingCart, IconPlus, IconMinus, IconFlame } from '@tabler/icons-react';
import type { FoodItem } from '../types';
import { useState } from 'react';

interface FoodCardProps {
    food: FoodItem;
    onAddToCart: (food: FoodItem, quantity: number) => void;
}

export function FoodCard({ food, onAddToCart }: FoodCardProps) {
    const [quantity, setQuantity] = useState(1);

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder className="h-full flex flex-col">
            <Card.Section>
                <Image
                    src={food.image}
                    height={160}
                    alt={food.name}
                    fallbackSrc="https://placehold.co/600x400?text=Food"
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500} lineClamp={1} title={food.name}>{food.name}</Text>
                <Badge color="pink" variant="light">
                    ${food.price.toFixed(2)}
                </Badge>
            </Group>

            <Text size="sm" c="dimmed" lineClamp={2} mb="sm" className="flex-grow">
                {food.description}
            </Text>

            <Group gap="xs" mb="md">
                <IconFlame size={16} color="orange" />
                <Text size="xs" c="dimmed">{food.calories} kcal</Text>
            </Group>

            <Group justify='space-between' mt="auto">
                <Group gap={5}>
                    <ActionIcon size="sm" variant="default" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                        <IconMinus size={12} />
                    </ActionIcon>
                    <Text size="sm" w={20} ta="center">{quantity}</Text>
                    <ActionIcon size="sm" variant="default" onClick={() => setQuantity(quantity + 1)}>
                        <IconPlus size={12} />
                    </ActionIcon>
                </Group>

                <Button
                    variant="light"
                    color="blue"
                    leftSection={<IconShoppingCart size={14} />}
                    radius="md"
                    onClick={() => onAddToCart(food, quantity)}
                >
                    Add
                </Button>
            </Group>
        </Card>
    );
}
