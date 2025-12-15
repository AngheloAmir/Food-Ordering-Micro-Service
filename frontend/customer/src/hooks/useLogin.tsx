import useModalStore from "../store/useModals";
import useUserStore from "../store/userStore";

export default function useLogin() {
    const closeAll = useModalStore.use.closeAll();
    const setIsAuthenticated = useUserStore.use.setIsAuthenticated();

    return {
        login: async (username: string, password: string) => {
            if (username === 'test' && password === 'test') {
                closeAll();
                setIsAuthenticated(true);
                return true;
            }
            return false;
        }
    }
}

