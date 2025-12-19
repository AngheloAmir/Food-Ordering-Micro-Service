import { create } from 'zustand';
import { createSelectors } from './_selector';

type NavTab = "menu" | "profile" | "orderHistory" | "none";

interface NavStore {
    activeTab: NavTab;
    setActiveTab: (activeTab: NavTab) => void;
}

const navStore = create<NavStore>()((set) => ({
    activeTab: "menu",
    setActiveTab: (activeTab: NavTab) => set(() => ({ activeTab })),
}));
const useNavStore = createSelectors(navStore);
export default useNavStore;
