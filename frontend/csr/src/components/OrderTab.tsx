import { Grid, Stack, Text, Button, Select, NumberInput, Group, TextInput, ScrollArea, ActionIcon } from '@mantine/core';
import { IconSend, IconPlus, IconTrash, IconReceipt } from '@tabler/icons-react';
import { useState } from 'react';
import { menuItems, mockChatHistory } from '../data/mockData';

export function OrderTab() {
    const [cart, setCart] = useState<{ id: string, name: string, price: number, qty: number }[]>([]);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number | string>(1);
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState(mockChatHistory);

    const addToOrder = () => {
        if (!selectedItem) return;
        const item = menuItems.find(i => i.id === selectedItem);
        if (item) {
            setCart([...cart, { ...item, qty: Number(quantity) }]);
            setSelectedItem(null);
            setQuantity(1);
        }
    };

    const removeFromCart = (index: number) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    const handleSendMessage = () => {
        if (!chatMessage.trim()) return;
        setChatHistory([...chatHistory, { sender: 'You', message: chatMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        setChatMessage('');
    };

    const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    return (
        <Grid gutter="xl">
            {/* Order Entry Section */}
            <Grid.Col span={{ base: 12, md: 7 }}>
                <div className="relative p-6 pt-12 bg-white dark:bg-stone-800 shadow-xl border border-stone-200 dark:border-stone-700 min-h-[500px]">
                    {/* Clip Visual */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-stone-700 dark:bg-black rounded-lg shadow-md z-10 flex items-center justify-center border-b-2 border-stone-500">
                        <div className="w-20 h-1 bg-stone-400 rounded-full"></div>
                    </div>

                    <Stack gap="md">
                        <Group justify="space-between" align="center" className="border-b-2 border-dashed border-stone-300 dark:border-stone-600 pb-4 mb-2">
                            <Group gap="xs">
                                <IconReceipt size={24} className="text-stone-500" />
                                <Text fz="xl" fw={900} ff="monospace" tt="uppercase">New Order Entry</Text>
                            </Group>
                            <Text ff="monospace" c="dimmed">{new Date().toLocaleDateString()}</Text>
                        </Group>

                        <Group align="end">
                            <Select
                                label={<Text ff="monospace" size="xs" tt="uppercase" fw={700}>Select Item</Text>}
                                placeholder="Choose from menu..."
                                data={menuItems.map(item => ({ value: item.id, label: `${item.name} ($${item.price.toFixed(2)})` }))}
                                value={selectedItem}
                                onChange={setSelectedItem}
                                searchable
                                style={{ flex: 1 }}
                                classNames={{ input: "font-mono" }}
                            />
                            <NumberInput
                                label={<Text ff="monospace" size="xs" tt="uppercase" fw={700}>Qty</Text>}
                                value={quantity}
                                onChange={setQuantity}
                                min={1}
                                max={20}
                                w={80}
                                classNames={{ input: "font-mono" }}
                            />
                            <Button color="dark" onClick={addToOrder} disabled={!selectedItem} leftSection={<IconPlus size={16} />} className="bg-stone-800 hover:bg-stone-900 font-mono uppercase">
                                Add
                            </Button>
                        </Group>

                        <div className="border-t-2 border-b-2 border-stone-200 dark:border-stone-700 min-h-[200px] mt-4 p-2 bg-stone-50 dark:bg-stone-900/30">
                            {cart.length === 0 ? (
                                <Text c="dimmed" fs="italic" ff="monospace" ta="center" pt="xl">Order is empty.</Text>
                            ) : (
                                <Stack gap="xs">
                                    {cart.map((item, index) => (
                                        <Group key={index} justify="space-between" className="border-b border-stone-200 dark:border-stone-800 pb-2">
                                            <div className="flex-1">
                                                <Text ff="monospace" fw={600}>{item.name}</Text>
                                                <Text ff="monospace" size="xs" c="dimmed">${item.price.toFixed(2)} x {item.qty}</Text>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <Text ff="monospace" fw={700}>${(item.price * item.qty).toFixed(2)}</Text>
                                                <ActionIcon variant="subtle" color="red" size="sm" onClick={() => removeFromCart(index)}>
                                                    <IconTrash size={14} />
                                                </ActionIcon>
                                            </div>
                                        </Group>
                                    ))}
                                </Stack>
                            )}
                        </div>

                        <Group justify="space-between" className="pt-2">
                            <Text ff="monospace" fw={700} tt="uppercase" size="lg">Total Due:</Text>
                            <Text ff="monospace" fw={900} size="xl" className="text-stone-800 dark:text-stone-100">${total.toFixed(2)}</Text>
                        </Group>

                        <Button fullWidth size="md" color="blue" disabled={cart.length === 0} className="mt-4 uppercase font-mono tracking-widest bg-blue-700 hover:bg-blue-800">
                            Transmit to Kitchen
                        </Button>
                    </Stack>
                </div>
            </Grid.Col>

            {/* Chat Support Section */}
            <Grid.Col span={{ base: 12, md: 5 }}>
                <div className="relative p-4 bg-yellow-100 dark:bg-yellow-700/20 shadow-lg border-l-4 border-yellow-400 dark:border-yellow-600 h-full flex flex-col rotate-[1deg]">
                    <div className="absolute -top-3 right-10 w-24 h-6 bg-yellow-200/50 backdrop-blur-sm shadow-sm rotate-[2deg] z-10"></div>

                    <Text ff="monospace" fw={700} tt="uppercase" className="mb-4 text-yellow-900 dark:text-yellow-100 border-b-2 border-yellow-200 dark:border-yellow-600/30 pb-2">
                        Support Channel
                    </Text>

                    <ScrollArea className="flex-1 bg-white/50 dark:bg-black/20 p-4 rounded-md mb-4 border border-yellow-200 dark:border-yellow-600/30">
                        <Stack gap="sm">
                            {chatHistory.map((msg, idx) => (
                                <div key={idx} className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                                    <div className={`max-w-[80%] p-2 rounded-md ${msg.sender === 'You' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100' : 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-200'}`}>
                                        <Text size="xs" fw={700} ff="monospace" className="opacity-70 mb-1">{msg.sender}</Text>
                                        <Text size="sm" ff="monospace">{msg.message}</Text>
                                    </div>
                                    <Text fz={10} c="dimmed" ff="monospace" className="mt-1">{msg.time}</Text>
                                </div>
                            ))}
                        </Stack>
                    </ScrollArea>

                    <Group gap="xs">
                        <TextInput
                            placeholder="Type message..."
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.currentTarget.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            style={{ flex: 1 }}
                            classNames={{ input: "font-mono bg-white dark:bg-stone-900" }}
                        />
                        <Button onClick={handleSendMessage} color="yellow" variant="filled" className="text-yellow-900 bg-yellow-400 hover:bg-yellow-500">
                            <IconSend size={18} />
                        </Button>
                    </Group>
                </div>
            </Grid.Col>
        </Grid>
    );
}
