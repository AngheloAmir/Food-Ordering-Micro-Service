import { useState, useEffect } from 'react';
import {
    Paper,
    Text,
    Group,
    Stack,
    Button,
    Grid,
    Badge,
    Avatar,
    ScrollArea,
    TextInput,
    ActionIcon
} from '@mantine/core';
import {
    IconCoffee,
    IconLogin,
    IconLogout,
    IconMessageCircle,
    IconSend,
    IconUsers,
    IconSpeakerphone
} from '@tabler/icons-react';

type ShiftStatus = 'off' | 'working' | 'break';

interface ChatMessage {
    id: string;
    sender: string;
    content: string;
    timestamp: string;
    avatar?: string;
    isMe?: boolean;
}

interface Channel {
    id: string;
    name: string;
    type: 'group' | 'announcement';
    icon?: React.ReactNode;
}

const MOCK_CHANNELS: Channel[] = [
    { id: '1', name: 'General', type: 'group', icon: <IconUsers size={16} /> },
    { id: '2', name: 'Kitchen Staff', type: 'group', icon: <IconUsers size={16} /> },
    { id: '3', name: 'Front of House', type: 'group', icon: <IconUsers size={16} /> },
    { id: '4', name: 'Announcements', type: 'announcement', icon: <IconSpeakerphone size={16} /> },
];

const MOCK_MESSAGES: Record<string, ChatMessage[]> = {
    '1': [
        { id: '1', sender: 'Manager', content: 'Welcome to the team everyone! efficient service today please.', timestamp: '09:00 AM', avatar: 'M' },
        { id: '2', sender: 'Chef John', content: 'Specials are up on the board.', timestamp: '09:15 AM', avatar: 'J' },
    ],
    '2': [
        { id: '3', sender: 'Chef John', content: 'Need more prep on station 3.', timestamp: '10:30 AM', avatar: 'J' },
    ],
    '4': [
        { id: '4', sender: 'Admin', content: 'Holiday schedule has been posted. Please check your emails.', timestamp: 'Yesterday', avatar: 'A' },
    ]
};

export function EmployeeDashboard() {
    const [status, setStatus] = useState<ShiftStatus>('off');
    const [shiftStartTime, setShiftStartTime] = useState<Date | null>(null);
    const [activeChannel, setActiveChannel] = useState<string>('1');
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(MOCK_MESSAGES);
    const [elapsedTime, setElapsedTime] = useState<string>('00:00:00');

    useEffect(() => {
        let interval: number;
        if (status === 'working' && shiftStartTime) {
            interval = setInterval(() => {
                const now = new Date();
                const diff = now.getTime() - shiftStartTime.getTime();
                const hours = Math.floor(diff / 3600000);
                const minutes = Math.floor((diff % 3600000) / 60000);
                const seconds = Math.floor((diff % 60000) / 1000);
                setElapsedTime(
                    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
                );
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [status, shiftStartTime]);

    const handleClockIn = () => {
        setStatus('working');
        setShiftStartTime(new Date());
    };

    const handleClockOut = () => {
        setStatus('off');
        setShiftStartTime(null);
        setElapsedTime('00:00:00');
    };

    const toggleBreak = () => {
        setStatus(status === 'working' ? 'break' : 'working');
    };

    const handleSendMessage = () => {
        if (!messageInput.trim()) return;

        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            sender: 'You',
            content: messageInput,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true
        };

        setMessages(prev => ({
            ...prev,
            [activeChannel]: [...(prev[activeChannel] || []), newMessage]
        }));
        setMessageInput('');
    };

    return (
        <Stack gap="lg">
            {/* Status Section */}
            <Paper p="xl" radius="md" withBorder className="bg-white dark:bg-stone-900 shadow-sm">
                <Grid align="center">
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Stack gap="xs">
                            <Text c="dimmed" tt="uppercase" size="xs" fw={700} style={{ letterSpacing: '1px' }}>Current Status</Text>
                            <Group>
                                <Badge
                                    size="xl"
                                    variant="filled"
                                    color={status === 'working' ? 'green' : status === 'break' ? 'yellow' : 'gray'}
                                    className="px-4 py-3 h-auto"
                                >
                                    {status === 'working' ? 'ON SHIFT' : status === 'break' ? 'ON BREAK' : 'CLOCKED OUT'}
                                </Badge>
                                {status !== 'off' && (
                                    <Text size="xl" ff="monospace" fw={700} c="dimmed">
                                        {elapsedTime}
                                    </Text>
                                )}
                            </Group>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Group justify="end">
                            {status === 'off' ? (
                                <Button
                                    size="lg"
                                    color="green"
                                    leftSection={<IconLogin size={20} />}
                                    onClick={handleClockIn}
                                    className="shadow-md transition-transform active:scale-95"
                                >
                                    CLOCK IN
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        variant="light"
                                        color="yellow"
                                        size="md"
                                        leftSection={<IconCoffee size={20} />}
                                        onClick={toggleBreak}
                                    >
                                        {status === 'working' ? 'TAKE BREAK' : 'RESUME WORK'}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        color="red"
                                        size="md"
                                        leftSection={<IconLogout size={20} />}
                                        onClick={handleClockOut}
                                    >
                                        CLOCK OUT
                                    </Button>
                                </>
                            )}
                        </Group>
                    </Grid.Col>
                </Grid>
            </Paper>

            {/* Communication Section */}
            <Grid gutter="md" className="h-[600px]">
                {/* Channels Sidebar */}
                <Grid.Col span={{ base: 12, sm: 4, md: 3 }} className="h-full">
                    <Paper h="100%" withBorder radius="md" className="overflow-hidden flex flex-col bg-stone-50 dark:bg-stone-900/50">
                        <div className="p-4 border-b border-stone-200 dark:border-stone-800">
                            <Text fw={700} size="sm" c="dimmed" tt="uppercase">Channels</Text>
                        </div>
                        <Stack gap={2} p="xs" className="flex-1 overflow-y-auto">
                            {MOCK_CHANNELS.map(channel => (
                                <Button
                                    key={channel.id}
                                    variant={activeChannel === channel.id ? "light" : "subtle"}
                                    color={activeChannel === channel.id ? "blue" : "gray"}
                                    fullWidth
                                    justify="start"
                                    leftSection={channel.icon}
                                    onClick={() => setActiveChannel(channel.id)}
                                    className="transition-colors"
                                >
                                    {channel.name}
                                </Button>
                            ))}
                        </Stack>
                    </Paper>
                </Grid.Col>

                {/* Chat Area */}
                <Grid.Col span={{ base: 12, sm: 8, md: 9 }} className="h-full">
                    <Paper h="100%" withBorder radius="md" className="flex flex-col overflow-hidden bg-white dark:bg-stone-900">
                        {/* Chat Header */}
                        <div className="p-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/80">
                            <Group>
                                <IconMessageCircle size={20} className="opacity-50" />
                                <Text fw={600}>
                                    {MOCK_CHANNELS.find(c => c.id === activeChannel)?.name}
                                </Text>
                            </Group>
                        </div>

                        {/* Messages */}
                        <ScrollArea className="flex-1 p-4 bg-stone-50/50 dark:bg-stone-900/50">
                            <Stack gap="md">
                                {(messages[activeChannel] || []).length === 0 ? (
                                    <Text c="dimmed" ta="center" size="sm" py="xl">No messages in this channel yet.</Text>
                                ) : (
                                    (messages[activeChannel] || []).map(msg => (
                                        <Group
                                            key={msg.id}
                                            align="start"
                                            justify={msg.isMe ? 'flex-end' : 'flex-start'}
                                            gap="xs"
                                        >
                                            {!msg.isMe && (
                                                <Avatar size="sm" radius="xl" color="blue">
                                                    {msg.avatar || msg.sender[0]}
                                                </Avatar>
                                            )}

                                            <Stack gap={2} className={`max-w-[70%] ${msg.isMe ? 'items-end' : 'items-start'}`}>
                                                {!msg.isMe && <Text size="xs" fw={700} c="dimmed">{msg.sender}</Text>}
                                                <Paper
                                                    p="sm"
                                                    radius="md"
                                                    withBorder={!msg.isMe}
                                                    className={msg.isMe
                                                        ? 'bg-blue-600 text-white rounded-tr-none'
                                                        : 'bg-white dark:bg-stone-800 rounded-tl-none border-stone-200 dark:border-stone-700'
                                                    }
                                                >
                                                    <Text size="sm">{msg.content}</Text>
                                                </Paper>
                                                <Text size="xs" c="dimmed" className="text-[10px] opacity-70">
                                                    {msg.timestamp}
                                                </Text>
                                            </Stack>
                                        </Group>
                                    ))
                                )}
                            </Stack>
                        </ScrollArea>

                        {/* Input Area */}
                        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
                            <Group gap="xs">
                                <TextInput
                                    placeholder={`Message #${MOCK_CHANNELS.find(c => c.id === activeChannel)?.name}...`}
                                    className="flex-1"
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.currentTarget.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSendMessage();
                                    }}
                                />
                                <ActionIcon
                                    variant="filled"
                                    color="blue"
                                    size="lg"
                                    onClick={handleSendMessage}
                                    disabled={!messageInput.trim()}
                                >
                                    <IconSend size={18} />
                                </ActionIcon>
                            </Group>
                        </div>
                    </Paper>
                </Grid.Col>
            </Grid>
        </Stack>
    );
}
