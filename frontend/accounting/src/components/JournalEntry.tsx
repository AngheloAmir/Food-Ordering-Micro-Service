import { TextInput, NumberInput, Select, Button, Stack, Group } from '@mantine/core';
import { useState } from 'react';
import { chartOfAccounts } from '../data/mockData';
import { StickyNoteContainer } from './StickyNoteContainer';
import { IconDeviceFloppy } from '@tabler/icons-react';

export function JournalEntry() {
    const [description, setDescription] = useState('');
    const [debit, setDebit] = useState<number | string>(0);
    const [credit, setCredit] = useState<number | string>(0);
    const [account, setAccount] = useState<string | null>(null);

    const handleSubmit = () => {
        alert('Mock Entry Submitted!');
        setDescription('');
        setDebit(0);
        setCredit(0);
        setAccount(null);
    };

    return (
        <StickyNoteContainer title="New Journal Entry" color="yellow">
            <Stack gap="md">
                <Group grow>
                    <TextInput
                        label="Date"
                        type="date"
                        classNames={{ input: 'font-mono' }}
                        defaultValue={new Date().toISOString().split('T')[0]}
                        labelProps={{ className: 'font-mono uppercase text-xs font-bold' }}
                    />
                    <Select
                        label="Account"
                        placeholder="Select Account"
                        data={chartOfAccounts.map(a => ({ value: a.id, label: `${a.code} - ${a.name}` }))}
                        value={account}
                        onChange={setAccount}
                        searchable
                        classNames={{ input: 'font-mono' }}
                        labelProps={{ className: 'font-mono uppercase text-xs font-bold' }}
                    />
                </Group>

                <TextInput
                    label="Description"
                    placeholder="Entry description..."
                    value={description}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                    classNames={{ input: 'font-mono' }}
                    labelProps={{ className: 'font-mono uppercase text-xs font-bold' }}
                />

                <Group grow>
                    <NumberInput
                        label="Debit"
                        prefix="$"
                        value={debit}
                        onChange={setDebit}
                        classNames={{ input: 'font-mono' }}
                        labelProps={{ className: 'font-mono uppercase text-xs font-bold' }}
                        min={0}
                    />
                    <NumberInput
                        label="Credit"
                        prefix="$"
                        value={credit}
                        onChange={setCredit}
                        classNames={{ input: 'font-mono' }}
                        labelProps={{ className: 'font-mono uppercase text-xs font-bold' }}
                        min={0}
                    />
                </Group>

                <Group justify="flex-end" className="mt-4">
                    <Button
                        leftSection={<IconDeviceFloppy size={18} />}
                        color="dark"
                        className="font-mono uppercase bg-stone-800 hover:bg-stone-900"
                        onClick={handleSubmit}
                    >
                        Post Entry
                    </Button>
                </Group>
            </Stack>
        </StickyNoteContainer>
    );
}
