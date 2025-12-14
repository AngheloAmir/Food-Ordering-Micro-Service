import { Table, Badge } from '@mantine/core';
import { chartOfAccounts } from '../data/mockData';
import { StickyNoteContainer } from './StickyNoteContainer';

export function ChartOfAccounts() {
    const rows = chartOfAccounts.map((account) => (
        <Table.Tr key={account.id}>
            <Table.Td className="font-mono">{account.code}</Table.Td>
            <Table.Td className="font-mono font-bold">{account.name}</Table.Td>
            <Table.Td>
                <Badge
                    color={
                        account.type === 'Asset' ? 'teal' :
                            account.type === 'Liability' ? 'red' :
                                account.type === 'Equity' ? 'blue' :
                                    account.type === 'Revenue' ? 'green' : 'orange'
                    }
                    variant="light"
                >
                    {account.type}
                </Badge>
            </Table.Td>
            <Table.Td className="font-mono text-right">${account.balance.toFixed(2)}</Table.Td>
        </Table.Tr>
    ));

    return (
        <StickyNoteContainer title="Chart of Accounts">
            <Table striped highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th className="font-mono text-xs uppercase">Code</Table.Th>
                        <Table.Th className="font-mono text-xs uppercase">Account Name</Table.Th>
                        <Table.Th className="font-mono text-xs uppercase">Type</Table.Th>
                        <Table.Th className="font-mono text-xs uppercase text-right">Balance</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </StickyNoteContainer>
    );
}
