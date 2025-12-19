import { Paper, Button, Image, Badge } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";

export interface FoodItem {
    id: string;
    name: string;
    description: string;
    ingredients: string[];
    price: number;
    available: boolean;
    category: string;
    image: string;
}

export default function FoodCard({ item }: { item: FoodItem }) {
    return (
        <Paper
            radius="md"
            className="relative flex flex-col overflow-hidden border-2 border-stone-200 dark:border-stone-800
             hover:border-stone-800 dark:hover:border-stone-400 transition-all duration-300
             hover:shadow-lg group bg-white dark:bg-stone-900"
        >
            <div className="flex flex-col h-[320px]">
                <div className="relative overflow-hidden h-[180px]">
                    <Image
                        src={item.image}
                        h="100%"
                        w="100%"
                        fit="cover"
                        alt={item.name}
                    />
                    <div className="absolute top-3 right-3 z-10">
                        <Badge color="yellow" size="lg" variant="filled" className="transform -rotate-12">
                            Best Selling
                        </Badge>

                        {/* <div className="absolute inset-0 bg-stone-900/60 flex items-center justify-center backdrop-blur-[2px]">
                            <Badge color="red" size="lg" variant="filled" className="shadow-lg transform -rotate-12">
                                SOLD OUT
                            </Badge>
                        </div> */}
                    </div>
                </div>

                <div className="px-4 py-2 flex justify-between items-start">
                    <p className="font-bold text-lg">{item.name}</p>
                    <p>${item.price.toFixed(2)}</p>
                </div>

                <div className="px-4 opacity-70">
                    <p>
                        {item.description}
                    </p>
                </div>

                <p className="mt-auto px-4 py-2">
                    <Button
                        fullWidth
                        leftSection={<IconShoppingCart size={20} />}
                        size="md"
                        className="bg-stone-900 hover:bg-stone-800 text-yellow-100 hover:text-white transition-all transform hover:scale-[1.02] shadow-lg"
                    >
                        Add To Cart
                    </Button>
                </p>
            </div>
        </Paper>
    )
}
