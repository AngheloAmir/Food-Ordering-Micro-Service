import { AppShell, Title, Container } from '@mantine/core';
import Header from './components/Header';
import { useState } from 'react';
import { Login } from './components/Login';
import { EmployeeDashboard } from './components/EmployeeDashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <AppShell
      header={{ height: 100 }}
      padding="md"
    >
      <Header />

      <AppShell.Main className="bg-white dark:bg-gray-800 transition-colors duration-300 min-h-screen">
        <Container size="xl" py="xl">
          <Title order={2} mb="lg" fw={900} className="tracking-tight">EMPLOYEE PORTAL</Title>
          <EmployeeDashboard />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
