import { create } from 'zustand';
import { createSelectors } from './_selector';

interface CartStore {
    cart: Array<any>;
    setCart: (cart: any) => void;
}

const cartStore = create<CartStore>()((set) => ({
    cart: [],
    setCart: (cart: any) => set(() => ({ cart })),
}));
const useCartStore = createSelectors(cartStore);
export default useCartStore;
