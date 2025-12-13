import { Button, Center, PasswordInput, Stack, Text, TextInput, Title, Container } from '@mantine/core';
import { IconCookie, IconLogin } from '@tabler/icons-react';
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
        <Center h="100vh" className="bg-orange-50 dark:bg-gray-900">
            <Container size="xs" w={400}>
                <Stack align="center" gap="xl" mb="xl">
                    <div className="bg-orange-100 p-4 rounded-full">
                        <IconCookie size={48} color="orange" />
                    </div>
                    <Title order={1} ta="center" className="text-gray-800 dark:text-white">TastyBites</Title>
                    <Text c="dimmed" size="sm" ta="center">Order your favorite food in seconds</Text>
                </Stack>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <Title order={3} mb="xl" ta="center">Welcome Back</Title>
                    {error && (
                        <Text c="red" size="sm" mb="md" ta="center">{error}</Text>
                    )}
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        <Stack>
                            <TextInput
                                label="Username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(event) => setUsername(event.currentTarget.value)}
                                error={!!error}
                                radius="md"
                            />

                            <PasswordInput
                                label="Password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(event) => setPassword(event.currentTarget.value)}
                                error={!!error}
                                radius="md"
                            />

                            <Button
                                fullWidth
                                onClick={handleSubmit}
                                color="orange"
                                size="md"
                                radius="md"
                                mt="md"
                                rightSection={<IconLogin size={18} />}
                            >
                                Sign In
                            </Button>
                        </Stack>
                    </form>
                    <Center mt="xl">
                        <Text size="xs" c="dimmed">Use <b>admin</b> / <b>admin</b> to login</Text>
                    </Center>
                </div>
            </Container>
        </Center>
    );
}
