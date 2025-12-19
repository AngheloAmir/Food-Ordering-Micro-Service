import CartItemCard from './Cart/CartItemCard';
import { useState } from 'react';
import PaperLikeContainer from './ui/StickyPostCard/PaperLikeContainer';

export default function CartItems() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "name asd asd",
            description: "description",
            price: 10,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 2,
            name: "name asd asd",
            description: "description",
            price: 10,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 3,
            name: "name asd asd",
            description: "description",
            price: 10,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 4,
            name: "name asd asd",
            description: "description",
            price: 10,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 5,
            name: "name asd asd",
            description: "description",
            price: 10,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
        }
    ]);


    return (
        <PaperLikeContainer className="scrollContainer w-100% overflow-y-auto">
            <div>
                {cartItems.map((item) => (
                    <CartItemCard
                        className='mb-4'
                        id={item.id}
                        title={item.name}
                        description={item.description}
                        image={item.image}
                        price={item.price * item.quantity}
                        quantity={item.quantity}
                        onDelete={() => { }}
                        onQuantityChange={(quantity, itemid) => {
                            setCartItems((prev) => {
                                return prev.map((item) => {
                                    if (item.id === itemid) {
                                        return { ...item, quantity };
                                    }
                                    return item;
                                });
                            });
                        }}
                    />
                ))}

                {/* {cartItems.length === 0 && (
                        <Paper className="p-10 text-center bg-stone-100 dark:bg-stone-900 border-2 border-dashed border-stone-300 dark:border-stone-800 rounded-xl">
                            <Text className="text-stone-500 dark:text-stone-400 text-lg font-medium">
                                Your tray is empty. Time to add some delicious food!
                            </Text>
                        </Paper>
                    )} */}


            </div>
        </PaperLikeContainer>

    );
}