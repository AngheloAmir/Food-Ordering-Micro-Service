import { ActionIcon, Paper, Text, Timeline, ThemeIcon } from '@mantine/core';
import { StickyNoteContainer } from './StickyNoteContainer';
import { IconBuildingBank, IconCheck, IconExclamationCircle } from '@tabler/icons-react';

export function BankReconciliation() {
    return (
        <StickyNoteContainer title="Bank Reconciliation" color="yellow">
            <Paper p="md" className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <Text className="font-mono text-xs uppercase text-stone-500">Bank Balance</Text>
                        <Text className="font-mono text-2xl font-black text-stone-800 dark:text-stone-100">$54,230.00</Text>
                    </div>
                    <div className="text-right">
                        <Text className="font-mono text-xs uppercase text-stone-500">Book Balance</Text>
                        <Text className="font-mono text-2xl font-black text-stone-800 dark:text-stone-100">$53,890.00</Text>
                    </div>
                </div>
                <div className="mt-2 pt-2 border-t border-dashed border-stone-300 dark:border-stone-700 flex justify-center">
                    <Text className="font-mono text-sm text-red-500 font-bold uppercase">Unreconciled Difference: $340.00</Text>
                </div>
            </Paper>

            <Text className="font-mono text-sm uppercase font-bold text-stone-500 mb-4">Recent Transactions</Text>

            <Timeline active={1} bulletSize={24} lineWidth={2}>
                <Timeline.Item bullet={<IconCheck size={12} />} title="Check Deposit #445" color="teal">
                    <Text c="dimmed" size="xs" className="font-mono mt-1">Cleared • $1,200.00 • 2024-10-25</Text>
                </Timeline.Item>

                <Timeline.Item bullet={<IconExclamationCircle size={12} />} title="Vendor Payment - Sysco" color="red">
                    <Text c="dimmed" size="xs" className="font-mono mt-1">Pending Clearance • $340.00 • 2024-10-24</Text>
                    <Text size="xs" mt={4} className="font-mono text-red-500 bg-red-50 dark:bg-red-900/20 p-1 inline-block rounded">Action Required: Verify Check Number</Text>
                </Timeline.Item>

                <Timeline.Item title="Interest Income" bullet={<IconBuildingBank size={12} />}>
                    <Text c="dimmed" size="xs" className="font-mono mt-1">Cleared • $12.50 • 2024-10-20</Text>
                </Timeline.Item>
            </Timeline>
        </StickyNoteContainer>
    );
}
