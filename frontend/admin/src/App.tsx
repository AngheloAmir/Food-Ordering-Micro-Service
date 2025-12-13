import { AppShell, Container, Tabs } from '@mantine/core';
import Header from './components/Header';
import { IconChartBar, IconShoppingCart, IconTag, IconUsers } from '@tabler/icons-react';
import { DashboardTab } from './components/DashboardTab';
import { ProcurementTab } from './components/ProcurementTab';
import { ProductsTab } from './components/ProductsTab';
import { EmployeesTab } from './components/EmployeesTab';

export default function App() {
  return (
    <AppShell
      header={{ height: 100 }}
      padding="md"
    >
      <Header />

      <AppShell.Main className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300 min-h-screen">
        <Container size="xl" py="xl">
          <Tabs defaultValue="dashboard" variant="outline" radius="md" keepMounted={false}>
            <Tabs.List mb="md" className="bg-white dark:bg-gray-900 rounded-lg p-1 border border-gray-200 dark:border-gray-800">
              <Tabs.Tab value="dashboard" leftSection={<IconChartBar size={16} />}>
                Dashboard
              </Tabs.Tab>
              <Tabs.Tab value="procurement" leftSection={<IconShoppingCart size={16} />}>
                Procurement
              </Tabs.Tab>
              <Tabs.Tab value="products" leftSection={<IconTag size={16} />}>
                Products
              </Tabs.Tab>
              <Tabs.Tab value="employees" leftSection={<IconUsers size={16} />}>
                Employees
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="dashboard">
              <DashboardTab />
            </Tabs.Panel>

            <Tabs.Panel value="procurement">
              <ProcurementTab />
            </Tabs.Panel>

            <Tabs.Panel value="products">
              <ProductsTab />
            </Tabs.Panel>

            <Tabs.Panel value="employees">
              <EmployeesTab />
            </Tabs.Panel>
          </Tabs>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
