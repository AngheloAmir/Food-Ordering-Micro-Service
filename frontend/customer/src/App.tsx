import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/Modals/LoginForm';
import useLogin from './hooks/useLogin';
import useModalStore from './store/useModals';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Chats from './pages/Chats';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  //Login related functions===================================================
  const { login } = useLogin();
  const isLoginOpen = useModalStore.use.isLoginOpen();
  const hideLogin = useModalStore.use.closeAll();

  // Determine the basename dynamically based on where the app is served
  const basename = window.location.pathname.startsWith('/customer') ? '/customer' : '/';

  return (
    <BrowserRouter basename={basename}>
      <div className='relative w-full min-h-screen bg-stone-50 dark:bg-neutral-950 text-stone-900 dark:text-white'>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/chats" element={<Chats />} />
          </Route>
        </Routes>
        <LoginForm showLogin={isLoginOpen} hide={hideLogin} onLogin={login} />
      </div>
    </BrowserRouter>
  );
}
