import { Grid, Text } from '@mantine/core';

// Import images
import burgerImg from '../assets/food/burger.png';
import pizzaImg from '../assets/food/pizza.png';
import pastaImg from '../assets/food/pasta.png';
import dessertImg from '../assets/food/dessert.png';
import FoodTags from './FoodMenu/FoodTags';
import FoodCard, { type FoodItem } from './FoodMenu/FoodCard';



const FOOD_ITEMS: FoodItem[] = [
    {
        id: '1',
        name: 'Classic Cheeseburger',
        description: 'Juicy beef patty with melted cheddar, fresh lettuce, and tomato.',
        ingredients: ['Beef Patty', 'Cheddar Cheese', 'Lettuce', 'Tomato', 'Brioche Bun'],
        price: 12.99,
        available: true,
        category: 'Burgers',
        image: burgerImg
    },
    {
        id: '2',
        name: 'Double Bacon Burger',
        description: 'Double beef patty with crispy bacon and smoky BBQ sauce.',
        ingredients: ['2x Beef Patty', 'Bacon', 'BBQ Sauce', 'Onion Rings'],
        price: 15.99,
        available: true,
        category: 'Burgers',
        image: burgerImg
    },
    {
        id: '3',
        name: 'Pepperoni Feast',
        description: 'Loaded with spicy pepperoni and extra mozzarella.',
        ingredients: ['Pepperoni', 'Mozzarella', 'Tomato Sauce', 'Basil'],
        price: 18.50,
        available: true,
        category: 'Pizza',
        image: pizzaImg
    },
    {
        id: '4',
        name: 'Veggie Supreme',
        description: 'A mix of bell peppers, onions, mushrooms, and olives.',
        ingredients: ['Bell Peppers', 'Onions', 'Mushrooms', 'Olives', 'Mozzarella'],
        price: 16.50,
        available: true,
        category: 'Pizza',
        image: pizzaImg
    },
    {
        id: '5',
        name: 'Carbonara',
        description: 'Classic creamy pasta with pancetta and parmesan.',
        ingredients: ['Spaghetti', 'Pancetta', 'Eggs', 'Parmesan', 'Black Pepper'],
        price: 14.99,
        available: true,
        category: 'Pasta',
        image: pastaImg
    },
    {
        id: '6',
        name: 'Pesto Penne',
        description: 'Fresh basil pesto with pine nuts and cherry tomatoes.',
        ingredients: ['Penne', 'Basil Pesto', 'Pine Nuts', 'Cherry Tomatoes'],
        price: 13.99,
        available: true,
        category: 'Pasta',
        image: pastaImg
    },
    {
        id: '7',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a gooey molten center.',
        ingredients: ['Chocolate', 'Butter', 'Eggs', 'Flour', 'Vanilla Ice Cream'],
        price: 8.99,
        available: true,
        category: 'Desserts',
        image: dessertImg
    },
    {
        id: '8',
        name: 'Tiramisu',
        description: 'Classic Italian dessert with coffee-soaked ladyfingers.',
        ingredients: ['Mascarpone', 'Coffee', 'Ladyfingers', 'Cocoa Powder'],
        price: 9.50,
        available: false,
        category: 'Desserts',
        image: dessertImg
    },
    {
        id: '9',
        name: 'Coca Cola',
        description: 'Refreshing classic cola drink.',
        ingredients: ['Carbonated Water', 'Sugar', 'Caffeine', 'Flavoring'],
        price: 2.50,
        available: true,
        category: 'Drinks',
        image: dessertImg // Placeholder logic, maybe should have a drink image but this is fine for now
    }
];


export default function FoodMenu() {
    //const [searchQuery] = useState('');

    // const filteredItems = FOOD_ITEMS.filter(item => {
    //     const matchesTab = activeTab === 'All' || item.category === activeTab || (activeTab === 'Sweets' && item.category === 'Desserts'); // Mapping Sweets to Desserts for demo
    //     const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    //     return matchesTab && matchesSearch;
    // });

    return (
        <div className="w-full">
            <FoodTags />

            <Grid gutter="xl">
                {FOOD_ITEMS.map(item => (
                    <Grid.Col key={item.id} span={{ base: 12, sm: 6, lg: 4 }}>
                        <FoodCard item={item} />
                    </Grid.Col>
                ))}
            </Grid>

            {FOOD_ITEMS.length === 0 && (
                <div className="text-center py-20">
                    <Text size="xl" fw={700} c="dimmed">No food items found matching your criteria.</Text>
                </div>
            )}
        </div>
    );
}

