import '@mantine/core/styles.css';


import { AppShell, Container, Tabs, Text, Stack } from '@mantine/core';
import { Header } from './components/Header';
import { ChartOfAccounts } from './components/ChartOfAccounts';
import { JournalEntry } from './components/JournalEntry';
import { LedgerMaintenance } from './components/LedgerMaintenance';
import { Reporting } from './components/Reporting';
import { IconBook, IconSettings, IconList, IconWriting, IconReportAnalytics } from '@tabler/icons-react';
import { useState } from 'react';

function AppContent() {
  // Main module selection
  const [activeModule, setActiveModule] = useState<string | null>('ledger');

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
      className="bg-stone-100 dark:bg-stone-950 min-h-screen"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Container fluid>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Sidebar Navigation */}
            <nav className="w-full md:w-[260px] flex-shrink-0">
              <div className="bg-white dark:bg-stone-900 rounded-sm border border-stone-200 dark:border-stone-800 shadow-sm sticky top-24 p-2">
                <div className="mb-4 px-3 pt-3 pb-2 border-b border-stone-200 dark:border-stone-800">
                  <Text size="xs" fw={900} c="dimmed" tt="uppercase" className="font-mono tracking-widest">
                    System Navigation
                  </Text>
                </div>

                <Stack gap="xs">
                  <NavButton
                    active={activeModule === 'ledger'}
                    icon={<IconBook size={18} />}
                    label="Ledger System"
                    onClick={() => setActiveModule('ledger')}
                  />
                  <NavButton
                    active={activeModule === 'acct_func'}
                    icon={<IconSettings size={18} />}
                    label="Accounting Sys. Func"
                    onClick={() => setActiveModule('acct_func')}
                  />
                </Stack>
              </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0">
              {activeModule === 'ledger' && (
                <LedgerSystemView />
              )}
              {activeModule === 'acct_func' && (
                <EmptySystemView />
              )}
            </main>
          </div>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

function NavButton({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-sm transition-all text-sm font-mono uppercase tracking-wide
             ${active
          ? 'bg-stone-800 text-stone-100 shadow-md'
          : 'text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-200'
        }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

function LedgerSystemView() {
  return (
    <Tabs defaultValue="chart" variant="outline" radius="xs" classNames={{
      list: 'mb-4 border-b-2 border-stone-300 dark:border-stone-700 bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm p-1 rounded-t-sm',
      tab: 'font-mono uppercase font-bold text-xs tracking-wide border-0 data-[active]:bg-stone-200 dark:data-[active]:bg-stone-800 data-[active]:text-stone-900 hover:bg-stone-100/50'
    }}>
      <Tabs.List>
        <Tabs.Tab value="chart" leftSection={<IconList size={14} />}>Chart of Accounts</Tabs.Tab>
        <Tabs.Tab value="journal" leftSection={<IconWriting size={14} />}>Journal Entry</Tabs.Tab>
        <Tabs.Tab value="maintenance" leftSection={<IconSettings size={14} />}>Ledger Maintenance</Tabs.Tab>
        <Tabs.Tab value="reporting" leftSection={<IconReportAnalytics size={14} />}>Reporting</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="chart" className="animate-fade-in">
        <ChartOfAccounts />
      </Tabs.Panel>
      <Tabs.Panel value="journal" className="animate-fade-in">
        <JournalEntry />
      </Tabs.Panel>
      <Tabs.Panel value="maintenance" className="animate-fade-in">
        <LedgerMaintenance />
      </Tabs.Panel>
      <Tabs.Panel value="reporting" className="animate-fade-in">
        <Reporting />
      </Tabs.Panel>
    </Tabs>
  )
}

function EmptySystemView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-lg p-10 bg-stone-50/50 dark:bg-stone-900/20">
      <IconSettings size={48} className="text-stone-300 mb-4" />
      <Text className="font-mono text-xl uppercase font-bold text-stone-400">Accounting Functionality</Text>
      <Text c="dimmed" className="font-mono mt-2">Module under development.</Text>
    </div>
  )
}

export default AppContent;
