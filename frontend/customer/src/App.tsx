import Header from './components/Header';
import LoginForm from './components/Modals/LoginForm';
import useLogin from './hooks/useLogin';
import useModalStore from './store/useModals';

export default function App() {
  //Login related functions===================================================
  const { login } = useLogin();
  const isLoginOpen = useModalStore.use.isLoginOpen();
  const hideLogin = useModalStore.use.closeAll();


  return (
    <div className='relative w-full h-full bg-red-500'>
      <Header />
      <LoginForm showLogin={isLoginOpen} hide={hideLogin} onLogin={login} />
    </div>
  );
}
