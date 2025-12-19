import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../store/userStore';
import useModalStore from '../store/useModals';

const ProtectedRoute = () => {
    const isAuthenticated = useUserStore.use.isAuthenticated();
    const openLogin = useModalStore.use.openLogin();

    useEffect(() => {
        if (!isAuthenticated) {
            openLogin();
        }
    }, [isAuthenticated, openLogin]);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
