import { Button, Stack, Text, Alert } from '@mantine/core';
import { StickyNoteContainer } from './StickyNoteContainer';
import { IconAlertCircle, IconSettings } from '@tabler/icons-react';

export function LedgerMaintenance() {
    return (
        <StickyNoteContainer title="Ledger Maintenance" color="white">
            <Stack>
                <Alert icon={<IconAlertCircle size={16} />} title="System Notice" color="gray" className="font-mono">
                    Maintenance functions are restricted to Admin users.
                </Alert>

                <Text className="font-mono text-sm leading-relaxed">
                    Use this panel to manage fiscal years, close reporting periods, and reconcile account anomalies. Current operational status: NORMAL.
                </Text>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <Button variant="outline" color="gray" className="font-mono uppercase border-stone-400 text-stone-600 hover:bg-stone-100">
                        Close Fiscal Period
                    </Button>
                    <Button variant="outline" color="gray" className="font-mono uppercase border-stone-400 text-stone-600 hover:bg-stone-100">
                        Reconcile All
                    </Button>
                    <Button variant="outline" color="gray" className="font-mono uppercase border-stone-400 text-stone-600 hover:bg-stone-100">
                        Backup Ledger Data
                    </Button>
                    <Button variant="outline" color="gray" className="font-mono uppercase border-stone-400 text-stone-600 hover:bg-stone-100">
                        <IconSettings size={16} className="mr-2" /> Configuration
                    </Button>
                </div>
            </Stack>
        </StickyNoteContainer>
    );
}
