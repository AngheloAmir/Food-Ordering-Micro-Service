import { create } from 'zustand';
import { createSelectors } from './_selector';

interface UserStore {
    user: any;
    setUser: (user: any) => void;

    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const userStore = create<UserStore>()((set) => ({
    user: null,
    setUser: (user: any) => set(() => ({ user })),
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated: boolean) => set(() => ({ isAuthenticated })),
}));
const useUserStore = createSelectors(userStore);
export default useUserStore;
