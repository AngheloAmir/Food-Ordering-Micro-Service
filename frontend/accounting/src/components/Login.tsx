import { Button, Center, PasswordInput, Stack, Text, TextInput, Title, Group } from '@mantine/core';
import { IconCalculator, IconLock } from '@tabler/icons-react';
import { useState } from 'react';

interface LoginProps {
    onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (username === 'admin' && password === 'admin') {
            onLogin();
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <Center h="100vh" className="bg-stone-100 dark:bg-stone-950">
            <div className="w-[400px] relative">
                {/* Clip Visual */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-stone-700 dark:bg-black rounded-lg shadow-md z-10 flex items-center justify-center border-b-2 border-stone-500">
                    <div className="w-20 h-1 bg-stone-400 rounded-full"></div>
                </div>

                <div className="bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 shadow-2xl p-8 pt-12 relative overflow-hidden rounded-sm">

                    <Stack gap="lg">
                        <div className="text-center mb-4 border-b-2 border-dashed border-stone-200 dark:border-stone-800 pb-6">
                            <Center mb="md">
                                <div className="p-4 bg-stone-100 dark:bg-stone-800 rounded-md border-2 border-stone-200 dark:border-stone-700">
                                    <IconCalculator size={42} className="text-stone-700 dark:text-stone-300" stroke={1.5} />
                                </div>
                            </Center>
                            <Title order={2} ff="monospace" className="uppercase tracking-widest text-stone-800 dark:text-stone-100">
                                ACCOUNTING
                            </Title>
                            <Text size="sm" c="dimmed" ff="monospace" className="mt-2 tracking-widest">
                                AUTHORIZED ACCESS ONLY
                            </Text>
                        </div>

                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 p-3 border-l-4 border-red-500 text-red-700 dark:text-red-300 text-sm font-mono">
                                ERROR: {error}
                            </div>
                        )}

                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                            <Stack>
                                <TextInput
                                    label={<Text size="sm" ff="monospace" fw={700} className="uppercase text-stone-500">Employee ID</Text>}
                                    placeholder="Enter ID"
                                    value={username}
                                    onChange={(event) => setUsername(event.currentTarget.value)}
                                    error={!!error}
                                    size="md"
                                    radius="md"
                                    classNames={{
                                        input: "bg-stone-50 dark:bg-stone-950/50 border-stone-200 dark:border-stone-800 focus:border-stone-500 font-mono"
                                    }}
                                />

                                <PasswordInput
                                    label={<Text size="sm" ff="monospace" fw={700} className="uppercase text-stone-500">Secure Key</Text>}
                                    placeholder="Enter Key"
                                    value={password}
                                    onChange={(event) => setPassword(event.currentTarget.value)}
                                    error={!!error}
                                    size="md"
                                    radius="md"
                                    classNames={{
                                        input: "bg-stone-50 dark:bg-stone-950/50 border-stone-200 dark:border-stone-800 focus:border-stone-500 font-mono"
                                    }}
                                />

                                <Button
                                    fullWidth
                                    onClick={handleSubmit}
                                    color="blue"
                                    size="md"
                                    mt="md"
                                    className="bg-stone-800 hover:bg-stone-900 text-stone-100 uppercase tracking-wider font-mono transition-colors"
                                >
                                    <Group gap="xs">
                                        <IconLock size={16} />
                                        <span>Authentication</span>
                                    </Group>
                                </Button>
                            </Stack>
                        </form>

                        <div className="mt-4 pt-4 text-center">
                            <Text fz="xs" c="dimmed" ff="monospace">
                                SYSTEM SECURED BY 256-BIT ENCRYPTION
                            </Text>
                            <div className="inline-block relative mt-2">
                                <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-1 text-[10px] font-mono border border-yellow-200 dark:border-yellow-800/50 shadow-sm">
                                    <Text span fw={700}>DEV PASS:</Text> admin / admin
                                </div>
                            </div>
                        </div>
                    </Stack>
                </div>
            </div>
        </Center>
    );
}
