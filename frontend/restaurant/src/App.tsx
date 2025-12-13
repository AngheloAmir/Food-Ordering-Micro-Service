import { useState, Suspense, lazy } from 'react';
import { Loader, Center } from '@mantine/core';
import { Login } from './components/Login';

// Lazy load the Dashboard so its code (and data) isn't loaded until login
const Dashboard = lazy(() => import('./Dashboard'));

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Suspense
      fallback={
        <Center h="100vh">
          <Loader size="xl" type="dots" />
        </Center>
      }
    >
      <Dashboard />
    </Suspense>
  );
}
