import { AppShell, Container, Tabs } from '@mantine/core';
import Header from './components/Header';
import { IconChartBar, IconShoppingCart, IconTag, IconUsers, IconKey } from '@tabler/icons-react';
import { DashboardTab } from './components/DashboardTab';
import { ProcurementTab } from './components/ProcurementTab';
import { ProductsTab } from './components/ProductsTab';
import { EmployeesTab } from './components/EmployeesTab';
import { AccessTab } from './components/AccessTab';
import { useState } from 'react';
import { Login } from './components/Login';

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

      <AppShell.Main className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300 min-h-screen">
        <Container size="xl" py="xl">
          <Tabs defaultValue="dashboard" variant="pills" radius="md" orientation="vertical" className="gap-6">
            <Tabs.List className="bg-white dark:bg-gray-900 rounded-lg p-2 border border-gray-200 dark:border-gray-800 min-w-[240px] h-fit sticky top-4">
              <Tabs.Tab value="dashboard" leftSection={<IconChartBar size={16} />} className="mb-1 justify-start">
                Dashboard
              </Tabs.Tab>
              <Tabs.Tab value="procurement" leftSection={<IconShoppingCart size={16} />} className="mb-1 justify-start">
                Procurement
              </Tabs.Tab>
              <Tabs.Tab value="products" leftSection={<IconTag size={16} />} className="mb-1 justify-start">
                Products
              </Tabs.Tab>
              <Tabs.Tab value="employees" leftSection={<IconUsers size={16} />} className="justify-start">
                Employees
              </Tabs.Tab>
              <Tabs.Tab value="access" leftSection={<IconKey size={16} />} className="justify-start">
                Access
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="dashboard" className="flex-1">
              <DashboardTab />
            </Tabs.Panel>

            <Tabs.Panel value="procurement" className="flex-1">
              <ProcurementTab />
            </Tabs.Panel>

            <Tabs.Panel value="products" className="flex-1">
              <ProductsTab />
            </Tabs.Panel>

            <Tabs.Panel value="employees" className="flex-1">
              <EmployeesTab />
            </Tabs.Panel>

            <Tabs.Panel value="access" className="flex-1">
              <AccessTab />
            </Tabs.Panel>
          </Tabs>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
