export interface Account {
    id: string;
    code: string;
    name: string;
    type: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
    balance: number;
}

export const chartOfAccounts: Account[] = [
    { id: '1', code: '1000', name: 'Cash', type: 'Asset', balance: 15000.00 },
    { id: '2', code: '1100', name: 'Accounts Receivable', type: 'Asset', balance: 5200.50 },
    { id: '3', code: '2000', name: 'Accounts Payable', type: 'Liability', balance: 3400.00 },
    { id: '4', code: '3000', name: 'Owner\'s Equity', type: 'Equity', balance: 10000.00 },
    { id: '5', code: '4000', name: 'Sales Revenue', type: 'Revenue', balance: 25000.00 },
    { id: '6', code: '5000', name: 'Rent Expense', type: 'Expense', balance: 2000.00 },
    { id: '7', code: '5100', name: 'Utilities Expense', type: 'Expense', balance: 450.00 },
    { id: '8', code: '1200', name: 'Inventory', type: 'Asset', balance: 8000.00 },
];

export interface JournalEntry {
    id: string;
    date: string;
    description: string;
    debit: number;
    credit: number;
    accountId: string;
}

export const journalEntries: JournalEntry[] = [
    { id: 'j1', date: '2024-10-01', description: 'Initial Investment', debit: 10000, credit: 0, accountId: '1' },
    { id: 'j2', date: '2024-10-01', description: 'Initial Investment', debit: 0, credit: 10000, accountId: '4' },
    { id: 'j3', date: '2024-10-05', description: 'Rent Payment', debit: 0, credit: 2000, accountId: '1' },
    { id: 'j4', date: '2024-10-05', description: 'Rent Payment', debit: 2000, credit: 0, accountId: '6' },
];
