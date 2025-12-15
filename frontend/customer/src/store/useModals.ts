import { create } from 'zustand';
import { createSelectors } from './_selector';

interface ModalStore {
    isLoginOpen: boolean;
    openLogin: () => void;

    closeAll: () => void;
}

const modalStore = create<ModalStore>()((set) => ({
    isLoginOpen: false,
    openLogin: () => set(() => ({ isLoginOpen: true })),
    closeAll: () => set(() => ({ isLoginOpen: false })),
}));
const useModalStore = createSelectors(modalStore);
export default useModalStore;
