import { Avatar, Badge, Group, Text } from "@mantine/core";


export default function Profile() {
    return (
        <Group align="flex-start" justify='space-between'>
            <Group>
                <Avatar
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&q=80"
                    size={100}
                    radius={100}
                    className="border-4 border-stone-800"
                />
                <div>
                    <Text className="text-3xl font-black text-stone-800 tracking-tight">John Doe</Text>
                    <Text c="dimmed" fw={500}>Foodie Member since 2024</Text>
                    <Badge variant="filled" color="yellow" size="lg" radius="sm" className="mt-2 border-2 border-stone-800 text-stone-900 font-bold">
                        Gold Member
                    </Badge>
                </div>
            </Group>
        </Group>
    );
}