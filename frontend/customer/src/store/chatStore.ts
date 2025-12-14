import { create } from 'zustand';
import { createSelectors } from './_selector';

interface UserStore {
    user: any;
    setUser: (user: any) => void;
}

const userStore = create<UserStore>()((set) => ({
    user: null,
    setUser: (user: any) => set(() => ({ user })),
}));
const useUserStore = createSelectors(userStore);
export default useUserStore;
