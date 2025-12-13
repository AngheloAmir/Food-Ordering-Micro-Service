import { AppShell, Container, Tabs, Text } from '@mantine/core';
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
            <Tabs.List className="bg-stone-200 dark:bg-stone-900 rounded-sm p-4 border-2 border-stone-300 dark:border-stone-700 min-w-[260px] h-fit sticky top-4 shadow-lg">

              <div className="mb-4 pb-2 border-b-2 border-stone-300 dark:border-stone-700">
                <Text fz="xs" fw={900} c="dimmed" tt="uppercase" ff="monospace" className="tracking-widest">
                  System Content
                </Text>
              </div>

              <Tabs.Tab
                value="dashboard"
                leftSection={<IconChartBar size={18} />}
                className="mb-2 justify-start font-mono uppercase tracking-wide data-[active]:bg-stone-300 dark:data-[active]:bg-stone-800 data-[active]:text-stone-900 dark:data-[active]:text-stone-100 text-stone-500 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-all border-none data-[active]:shadow-sm rounded-sm"
              >
                Dashboard
              </Tabs.Tab>

              <div className="my-2 h-px bg-stone-300 dark:bg-stone-700/50 border-t border-dashed border-stone-400/30"></div>

              <Text fz={10} fw={700} c="dimmed" tt="uppercase" ff="monospace" className="mb-2 mt-1 px-3 opacity-60">
                Operational
              </Text>

              <Tabs.Tab
                value="procurement"
                leftSection={<IconShoppingCart size={18} />}
                className="mb-1 justify-start font-mono text-sm data-[active]:bg-stone-300 dark:data-[active]:bg-stone-800 data-[active]:text-stone-900 dark:data-[active]:text-stone-100 text-stone-500 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-all border-none rounded-sm"
              >
                Procurement
              </Tabs.Tab>
              <Tabs.Tab
                value="products"
                leftSection={<IconTag size={18} />}
                className="mb-1 justify-start font-mono text-sm data-[active]:bg-stone-300 dark:data-[active]:bg-stone-800 data-[active]:text-stone-900 dark:data-[active]:text-stone-100 text-stone-500 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-all border-none rounded-sm"
              >
                Products
              </Tabs.Tab>

              <div className="my-2 h-px bg-stone-300 dark:bg-stone-700/50 border-t border-dashed border-stone-400/30"></div>

              <Text fz={10} fw={700} c="dimmed" tt="uppercase" ff="monospace" className="mb-2 mt-1 px-3 opacity-60">
                Administration
              </Text>

              <Tabs.Tab
                value="employees"
                leftSection={<IconUsers size={18} />}
                className="mb-1 justify-start font-mono text-sm data-[active]:bg-stone-300 dark:data-[active]:bg-stone-800 data-[active]:text-stone-900 dark:data-[active]:text-stone-100 text-stone-500 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-all border-none rounded-sm"
              >
                Employees
              </Tabs.Tab>
              <Tabs.Tab
                value="access"
                leftSection={<IconKey size={18} />}
                className="justify-start font-mono text-sm data-[active]:bg-stone-300 dark:data-[active]:bg-stone-800 data-[active]:text-stone-900 dark:data-[active]:text-stone-100 text-stone-500 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-all border-none rounded-sm"
              >
                Access Control
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
      </AppShell.Main >
    </AppShell >
  );
}
