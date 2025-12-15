import { Avatar, Button, Container, Group, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { IconDeviceFloppy, IconMail, IconMapPin, IconPhone, IconUser } from '@tabler/icons-react';
import StickyPostCard from '../components/StickyPostCard/StickyPostCard';
import CardHr from '../components/StickyPostCard/sub/CardHr';

export default function Profile() {
    return (
        <Container className='mt-10'>
            <StickyPostCard
                design="green"
                rotation="toright"
                titleVariant="textcenter"
                title='My Profile'
                titleBadge='Verified'
            >
                <Stack align="center" mt="md" mb="xl">
                    <Avatar
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
                        size={120}
                        radius={120}
                        className="border-4 border-stone-800 shadow-xl"
                    />
                    <Text fw={700} size="xl" ff="text" className="text-stone-800">John Doe</Text>
                    <Text c="dimmed" size="sm" mt="-xs">Member since Dec 2024</Text>
                </Stack>

                <CardHr />

                <Stack gap="lg" mt="lg">
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                        <TextInput
                            label="Full Name"
                            defaultValue="John Doe"
                            leftSection={<IconUser size={18} />}
                            radius="md"
                            styles={{
                                input: {
                                    border: '2px solid #292524',
                                    backgroundColor: 'rgba(255,255,255,0.5)',
                                    color: '#292524',
                                    fontWeight: 500
                                },
                                label: {
                                    marginBottom: '4px',
                                    fontWeight: 600,
                                    color: '#44403c'
                                }
                            }}
                        />
                        <TextInput
                            label="Email Address"
                            defaultValue="john.doe@example.com"
                            leftSection={<IconMail size={18} />}
                            radius="md"
                            styles={{
                                input: {
                                    border: '2px solid #292524',
                                    backgroundColor: 'rgba(255,255,255,0.5)',
                                    color: '#292524',
                                    fontWeight: 500
                                },
                                label: {
                                    marginBottom: '4px',
                                    fontWeight: 600,
                                    color: '#44403c'
                                }
                            }}
                        />
                        <TextInput
                            label="Phone Number"
                            defaultValue="+1 (555) 123-4567"
                            leftSection={<IconPhone size={18} />}
                            radius="md"
                            styles={{
                                input: {
                                    border: '2px solid #292524',
                                    backgroundColor: 'rgba(255,255,255,0.5)',
                                    color: '#292524',
                                    fontWeight: 500
                                },
                                label: {
                                    marginBottom: '4px',
                                    fontWeight: 600,
                                    color: '#44403c'
                                }
                            }}
                        />
                        <TextInput
                            label="Default Address"
                            defaultValue="1234 Main St, Springfield, IL"
                            leftSection={<IconMapPin size={18} />}
                            radius="md"
                            styles={{
                                input: {
                                    border: '2px solid #292524',
                                    backgroundColor: 'rgba(255,255,255,0.5)',
                                    color: '#292524',
                                    fontWeight: 500
                                },
                                label: {
                                    marginBottom: '4px',
                                    fontWeight: 600,
                                    color: '#44403c'
                                }
                            }}
                        />
                    </SimpleGrid>

                    <CardHr />

                    <Group justify="flex-end" mt="md">
                        <Button
                            variant="filled"
                            color="dark"
                            size="md"
                            leftSection={<IconDeviceFloppy size={20} />}
                            className="bg-stone-900 hover:bg-stone-800 text-yellow-100 shadow-md transition-transform hover:scale-105"
                        >
                            Save Changes
                        </Button>
                    </Group>
                </Stack>
            </StickyPostCard>
        </Container >
    );
}
