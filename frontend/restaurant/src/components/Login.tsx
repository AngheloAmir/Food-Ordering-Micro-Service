import { Button, Card, Center, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
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
        <Center h="100vh" className="bg-gray-100 dark:bg-gray-900">
            <Card withBorder shadow="md" p="xl" radius="md" w={400} className="bg-white dark:bg-gray-800">
                <Stack>
                    <Title order={2} ta="center" className="text-red-600 dark:text-blue-400">
                        Top Chef Login
                    </Title>
                    <Text size="sm" ta="center" c="dimmed" mb="md">
                        Please enter your credentials to access the kitchen dashboard.
                    </Text>

                    {error && (
                        <Text c="red" size="sm" ta="center">
                            {error}
                        </Text>
                    )}

                    <TextInput
                        label="Username"
                        placeholder="Your username"
                        value={username}
                        onChange={(event) => setUsername(event.currentTarget.value)}
                        error={error ? true : false}
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        value={password}
                        onChange={(event) => setPassword(event.currentTarget.value)}
                        error={error ? true : false}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSubmit();
                        }}
                    />

                    <Button fullWidth onClick={handleSubmit} color="red" mt="md">
                        Login to Kitchen
                    </Button>
                </Stack>
            </Card>
        </Center>
    );
}
