import { useState } from 'react';
import { Container, Grid, Stack, Text, Textarea, Group, Button, Badge, SimpleGrid, Paper, ThemeIcon } from '@mantine/core';
import { IconUser, IconTruckDelivery, IconHistory, IconMapPin, IconPhone, IconMail, IconDeviceFloppy, IconReceipt } from '@tabler/icons-react';
import Profile from '../components/Profile/Profile';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <Container size="xl" className='mt-10 mb-20'>
            <Grid gutter="xl">
                {/* Left Navigation Sidebar */}
                <Grid.Col span={{ base: 12, md: 3 }}>
                    <Stack gap="sm">
                        <NavButton
                            label="Profile"
                            icon={IconUser}
                            active={activeTab === 'profile'}
                            onClick={() => setActiveTab('profile')}
                        />
                        <NavButton
                            label="Delivery Instructions"
                            icon={IconTruckDelivery}
                            active={activeTab === 'delivery'}
                            onClick={() => setActiveTab('delivery')}
                        />
                        <NavButton
                            label="Order History"
                            icon={IconHistory}
                            active={activeTab === 'history'}
                            onClick={() => setActiveTab('history')}
                        />
                    </Stack>
                </Grid.Col>

                {/* Right Content Area */}
                <Grid.Col span={{ base: 12, md: 9 }}>
                    <Paper
                        radius="md"
                        p="xl"
                        className="border-[3px] border-stone-800 bg-white shadow-[8px_8px_0px_0px_rgba(28,25,23,1)]"
                    >
                        {activeTab === 'profile' && <ProfileTab />}
                        {activeTab === 'delivery' && <DeliveryTab />}
                        {activeTab === 'history' && <HistoryTab />}
                    </Paper>
                </Grid.Col>
            </Grid>
        </Container>
    );
}

// --- Navigation Button Component ---
function NavButton({ label, icon: Icon, active, onClick }: { label: string, icon: any, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`
                w-full flex items-center gap-3 px-5 py-4 rounded-lg border-[3px] transition-all duration-200
                ${active
                    ? 'bg-yellow-200 border-stone-800 translate-x-1 -translate-y-1 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]'
                    : 'bg-stone-100 border-transparent hover:border-stone-800 hover:bg-white text-stone-600 hover:text-stone-900'}
            `}
        >
            <Icon size={22} stroke={2} className={active ? 'text-stone-900' : 'text-stone-500'} />
            <span className={`font-bold text-lg ${active ? 'text-stone-900' : 'text-stone-600'}`}>{label}</span>
        </button>
    );
}

// --- Tab Contents ---

function ProfileTab() {
    return (
        <Stack gap="xl">
            <Profile />

            <div className="w-full h-0.5 bg-stone-200" />

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                <InputWrapper label="Full Name" icon={IconUser}>
                    <input type="text" defaultValue="John Doe" className="w-full bg-transparent outline-none font-bold text-stone-700" />
                </InputWrapper>
                <InputWrapper label="Email Address" icon={IconMail}>
                    <input type="email" defaultValue="john.doe@example.com" className="w-full bg-transparent outline-none font-bold text-stone-700" />
                </InputWrapper>
                <InputWrapper label="Phone Number" icon={IconPhone}>
                    <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full bg-transparent outline-none font-bold text-stone-700" />
                </InputWrapper>
                <InputWrapper label="Default Address" icon={IconMapPin}>
                    <input type="text" defaultValue="1234 Main St, Springfield, IL" className="w-full bg-transparent outline-none font-bold text-stone-700" />
                </InputWrapper>
            </SimpleGrid>

            <Group justify="flex-end" mt="md">
                <Button
                    size="md"
                    color="dark"
                    leftSection={<IconDeviceFloppy size={20} />}
                    className="border-2 border-stone-800 bg-stone-900 hover:bg-stone-800 text-yellow-50 shadow-[4px_4px_0px_0px_rgba(28,25,23,0.5)] transition-transform active:translate-y-1 active:shadow-none"
                    radius="md"
                >
                    Save Profile
                </Button>
            </Group>
        </Stack>
    );
}

function DeliveryTab() {
    return (
        <Stack gap="xl">
            <div>
                <Text className="text-3xl font-black text-stone-800 tracking-tight">Delivery Preferences</Text>
                <Text c="dimmed" size="sm">Manage how you want your food delivered.</Text>
            </div>

            <SimpleGrid cols={1} spacing="lg">
                <InputWrapper label="Gate Access Code" icon={IconReceipt}>
                    <input type="text" placeholder="e.g. #1234" className="w-full bg-transparent outline-none font-bold text-stone-700" />
                </InputWrapper>

                <div className="bg-orange-50 p-4 rounded-lg border-2 border-stone-800 border-dashed">
                    <Text fw={700} className="text-stone-700 mb-2 flex items-center gap-2">
                        <IconTruckDelivery size={20} /> Default Instructions
                    </Text>
                    <Textarea
                        variant="unstyled"
                        minRows={4}
                        placeholder="Leave it at the front door, please knock..."
                        className="font-medium text-stone-600"
                        styles={{ input: { padding: 0 } }}
                    />
                </div>
            </SimpleGrid>

            <div className="bg-blue-50 p-4 rounded-lg border-2 border-stone-800">
                <Text fw={800} size="lg" className="text-blue-900 mb-2">Saved Addresses</Text>
                <Stack>
                    <div className="flex items-center justify-between bg-white p-3 rounded border border-stone-200 hover:border-stone-800 transition-colors cursor-pointer group">
                        <Group>
                            <ThemeIcon color="gray" variant="light"><IconMapPin size={18} /></ThemeIcon>
                            <div>
                                <Text fw={700} className="text-stone-800">Home</Text>
                                <Text size="xs" c="dimmed">1234 Main St, Springfield</Text>
                            </div>
                        </Group>
                        <Badge color="green" variant="light">Default</Badge>
                    </div>
                    <div className="flex items-center justify-between bg-white p-3 rounded border border-stone-200 hover:border-stone-800 transition-colors cursor-pointer group">
                        <Group>
                            <ThemeIcon color="gray" variant="light"><IconMapPin size={18} /></ThemeIcon>
                            <div>
                                <Text fw={700} className="text-stone-800">Work</Text>
                                <Text size="xs" c="dimmed">555 Corporate Blvd, Office 302</Text>
                            </div>
                        </Group>
                    </div>
                </Stack>
                <Button variant="subtle" color="dark" size="xs" fullWidth mt="sm" className="font-bold">+ Add New Address</Button>
            </div>


            <Group justify="flex-end" mt="md">
                <Button
                    size="md"
                    color="dark"
                    leftSection={<IconDeviceFloppy size={20} />}
                    className="border-2 border-stone-800 bg-stone-900 hover:bg-stone-800 text-yellow-50 shadow-[4px_4px_0px_0px_rgba(28,25,23,0.5)] transition-transform active:translate-y-1 active:shadow-none"
                    radius="md"
                >
                    Update Preferences
                </Button>
            </Group>
        </Stack>
    );
}

function HistoryTab() {
    return (
        <Stack gap="xl">
            <div>
                <Text className="text-3xl font-black text-stone-800 tracking-tight">Order History</Text>
                <Text c="dimmed" size="sm">Your past culinary adventures.</Text>
            </div>

            <Stack gap="md">
                <OrderHistoryItem
                    id="#ORD-9921"
                    date="Oct 24, 2024"
                    items="Spicy Burger, French Fries, Coke"
                    total="$24.50"
                    status="Delivered"
                />
                <OrderHistoryItem
                    id="#ORD-9918"
                    date="Oct 20, 2024"
                    items="Pepperoni Pizza, Garlic Knots"
                    total="$32.00"
                    status="Delivered"
                />
                <OrderHistoryItem
                    id="#ORD-9882"
                    date="Oct 12, 2024"
                    items="Caesar Salad, Iced Tea"
                    total="$14.25"
                    status="Cancelled"
                />
            </Stack>
        </Stack>
    )
}

function OrderHistoryItem({ id, date, items, total, status }: any) {
    const isCancelled = status === 'Cancelled';
    return (
        <div className="p-4 border-2 border-stone-200 rounded-lg hover:border-stone-800 hover:bg-stone-50 transition-all group">
            <Group justify="space-between" mb="xs">
                <Text fw={800} className="text-stone-800">{id}</Text>
                <Badge color={isCancelled ? 'red' : 'green'} variant="light" size="lg">{status}</Badge>
            </Group>
            <Group justify="space-between" align="flex-end">
                <div>
                    <Text size="sm" fw={600} className="text-stone-600 mb-1">{items}</Text>
                    <Text size="xs" c="dimmed">{date}</Text>
                </div>
                <div className="text-right">
                    <Text fw={800} size="lg" className="text-stone-900">{total}</Text>
                    <Group gap={4} justify="flex-end" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="compact-xs" variant="white" color="dark" className="border border-stone-300">Reorder</Button>
                        <Button size="compact-xs" variant="white" color="dark" className="border border-stone-300">View Receipt</Button>
                    </Group>
                </div>
            </Group>
        </div>
    )
}

// --- Helper Components ---
function InputWrapper({ label, icon: Icon, children }: any) {
    return (
        <div className="bg-stone-50 px-4 py-3 rounded-md border border-stone-200 focus-within:border-stone-800 focus-within:bg-white transition-colors">
            <Text size="xs" fw={700} c="dimmed" mb={4} className="uppercase tracking-wider flex items-center gap-1">
                {Icon && <Icon size={14} />}
                {label}
            </Text>
            {children}
        </div>
    )
}
