import { ActionIcon, Avatar, Box, Container, Group, Paper, Stack, Text, TextInput } from '@mantine/core';
import { IconSend, IconHeadset } from '@tabler/icons-react';
import PaperLikeContainer from '../ui/StickyPostCard/PaperLikeContainer';

const MOCK_MESSAGES = [
    {
        id: 1,
        sender: 'support',
        message: 'Hello! How can I help you regarding your order today?',
        time: '10:00 AM'
    },
    {
        id: 2,
        sender: 'user',
        message: 'Hi, I was wondering how long the preparation usually takes?',
        time: '10:02 AM'
    },
    {
        id: 3,
        sender: 'support',
        message: 'Usually it takes about 15-20 minutes depending on the order size. Your burger is currently on the grill!',
        time: '10:03 AM'
    },
    {
        id: 4,
        sender: 'user',
        message: 'Great, thanks! Also, can I request extra napkins?',
        time: '10:05 AM'
    },
    {
        id: 5,
        sender: 'support',
        message: 'Absolutely! I have added a note to the kitchen. Anything else?',
        time: '10:06 AM'
    },
    {
        id: 6,
        sender: 'user',
        message: 'Great, thanks! Also, can I request extra napkins?',
        time: '10:05 AM'
    },
    {
        id: 7,
        sender: 'support',
        message: 'Absolutely! I have added a note to the kitchen. Anything else?',
        time: '10:06 AM'
    },
    {
        id: 8,
        sender: 'user',
        message: 'Great, thanks! Also, can I request extra napkins?',
        time: '10:05 AM'
    },
    {
        id: 9,
        sender: 'support',
        message: 'Absolutely! I have added a note to the kitchen. Anything else?',
        time: '10:06 AM'
    },
];

export default function Chats() {
    return (
        <Container className='mt-10'>
            <PaperLikeContainer className="flex flex-col h-[calc(100vh-170px)]" >
                <div className="scrollContainer h-full overflow-y-auto">
                    {MOCK_MESSAGES.map((msg) => {
                        const isUser = msg.sender === 'user';
                        return (
                            <Group
                                key={msg.id}
                                gap="xs"
                                justify={isUser ? 'flex-end' : 'flex-start'}
                                align="flex-end"
                            >

                                {!isUser && (
                                    <Avatar radius="xl" color="blue" size="md">
                                        <IconHeadset size={20} />
                                    </Avatar>
                                )}

                                <Stack gap={4} align={isUser ? 'flex-end' : 'flex-start'} style={{ maxWidth: '70%' }}>
                                    <Paper
                                        p="sm"
                                        radius="lg"
                                        className={`${isUser
                                            ? 'dark:text-white rounded-br-none'
                                            : 'text-stone-800 rounded-bl-none shadow-sm'
                                            }`}
                                    >
                                        <p className='text-sm font-medium dark:text-white'>{msg.message}</p>
                                    </Paper>
                                    <Text size="xs" c="dimmed" className="text-stone-600 font-medium">
                                        {msg.time}
                                    </Text>
                                </Stack>

                                {isUser && (
                                    <Avatar radius="xl" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80" size="md" />
                                )}
                            </Group>
                        );
                    })}
                </div>

                <Box mt="md">
                    <Group gap="xs">
                        <TextInput
                            placeholder="Type a message..."
                            radius="xl"
                            size="md"
                            className="flex-1"
                            styles={{
                                input: {
                                    border: '2px solid #292524', // stone-800
                                    backgroundColor: 'rgba(255,255,255,0.9)',
                                    color: '#292524',
                                }
                            }}
                        />
                        <ActionIcon
                            size={42}
                            radius="xl"
                            variant="filled"
                            color="dark"
                            className="bg-stone-800 hover:bg-stone-700 shadow-md"
                        >
                            <IconSend size={20} />
                        </ActionIcon>
                    </Group>
                </Box>
            </PaperLikeContainer >
        </Container >
    );
}
