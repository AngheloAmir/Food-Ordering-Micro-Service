import { AppShell, Text, Container, Tabs } from '@mantine/core';
import Header from './components/Header';
import { useState } from 'react';
import { Login } from './components/Login';
import { OrderTab } from './components/OrderTab';
import { CustomerInfoTab } from './components/CustomerInfoTab';
import { IconShoppingCart, IconUserSearch } from '@tabler/icons-react';

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

      <AppShell.Main className="bg-white dark:bg-stone-950 transition-colors duration-300 min-h-screen">
        <Container fluid py="xl" px="lg">
          <Tabs defaultValue="order" variant="pills" radius="md" orientation="vertical" className="gap-6">
            <Tabs.List className="bg-stone-200 dark:bg-stone-900 rounded-sm p-4 border-2 border-stone-300 dark:border-stone-700 min-w-[260px] h-fit sticky top-24 shadow-lg z-0">
              <div className="mb-4 pb-2 border-b-2 border-stone-300 dark:border-stone-700">
                <Text fz={10} fw={900} c="dimmed" tt="uppercase" ff="monospace" className="tracking-widest">
                  CSR Desk
                </Text>
              </div>

              <Tabs.Tab
                value="order"
                leftSection={<IconShoppingCart size={18} />}
                className="mb-2 justify-start font-mono uppercase tracking-wide data-[active]:bg-stone-300 dark:data-[active]:bg-stone-800 data-[active]:text-stone-900 dark:data-[active]:text-stone-100 text-stone-500 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-all border-none data-[active]:shadow-sm rounded-sm"
              >
                Order Making
              </Tabs.Tab>

              <div className="my-2 h-px bg-stone-300 dark:bg-stone-700/50 border-t border-dashed border-stone-400/30"></div>

              <Text fz={10} fw={700} c="dimmed" tt="uppercase" ff="monospace" className="mb-2 mt-1 px-3 opacity-60">
                CRM
              </Text>

              <Tabs.Tab
                value="customer"
                leftSection={<IconUserSearch size={18} />}
                className="mb-1 justify-start font-mono text-sm data-[active]:bg-stone-300 dark:data-[active]:bg-stone-800 data-[active]:text-stone-900 dark:data-[active]:text-stone-100 text-stone-500 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-all border-none rounded-sm"
              >
                Customer Info
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="order" className="flex-1">
              <OrderTab />
            </Tabs.Panel>

            <Tabs.Panel value="customer" className="flex-1">
              <CustomerInfoTab />
            </Tabs.Panel>
          </Tabs>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
