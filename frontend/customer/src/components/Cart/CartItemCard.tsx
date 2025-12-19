import { Image, Text, Group, ActionIcon, Paper } from '@mantine/core';
import { IconTrash, IconMinus, IconPlus } from '@tabler/icons-react';

//transition-all hover:shadow-md hover:scale-[1.1] duration-200

interface CartItemCardProps {
    key?: number;
    id?: number;
    title?: string;
    description?: string;
    price?: number;
    quantity?: number;
    image?: string;

    onDelete?: () => void;
    onQuantityChange?: (quantity: number, id: number) => void;

    className?: string;
}

export default function CartItemCard(props: CartItemCardProps) {
    return (
        <Paper key={props.key} className={`overflow-hidden border-2 border-dashed border-stone-300 dark:border-stone-700 shadow-sm ${props.className}`} radius="md">
            <div className="flex flex-col sm:flex-row h-full">
                <div className="w-full sm:w-40 h-40 sm:h-auto shrink-0 relative">
                    <Image
                        src={props.image}
                        h="100%"
                        w="100%"
                        fit="cover"
                        className="absolute inset-0"
                        fallbackSrc="https://placehold.co/600x400?text=Food+Image"
                    />
                </div>
                <div className="flex-1 p-5 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-3">
                        <div>
                            <Text size="xl" className="font-bold text-stone-800 dark:text-stone-100 leading-tight mb-1">
                                {props.title}
                            </Text>
                            <Text size="md" className="opacity-70 text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                                {props.description}
                            </Text>
                        </div>

                        <ActionIcon
                            variant="transparent"
                            onClick={props.onDelete}
                            className="transition-all hover:scale-[1.1] duration-200"
                        >
                            <IconTrash size={32} className="text-red-500 dark:text-red-400" />
                        </ActionIcon>
                    </div>

                    <Group justify="space-between" align="end" mt="md" className="w-full">
                        <Text size="xl" className="font-bold text-xl text-yellow-700 dark:text-yellow-400">
                            ${props.price}
                        </Text>

                        <Group gap="xs" className=" bg-white dark:bg-stone-800 p-1 rounded-lg border border-stone-200 dark:border-stone-700 shadow-sm transition-all hover:shadow-md hover:scale-[1.1] duration-200">
                            <ActionIcon
                                size="sm"
                                variant="transparent"
                                color="gray"
                                onClick={() => props.quantity && props.id && props.quantity > 1 && props.onQuantityChange?.(props.quantity - 1, props.id)}
                            >
                                <IconMinus size={14} />
                            </ActionIcon>
                            <Text className="w-8 text-center font-bold text-sm text-stone-700 dark:text-stone-200 select-none">
                                {props.quantity}
                            </Text>
                            <ActionIcon
                                size="sm"
                                variant="transparent"
                                color="gray"
                                onClick={() => props.quantity && props.id && props.onQuantityChange?.(props.quantity + 1, props.id)}
                            >
                                <IconPlus size={14} />
                            </ActionIcon>
                        </Group>
                    </Group>
                </div>
            </div>
        </Paper>
    );
}