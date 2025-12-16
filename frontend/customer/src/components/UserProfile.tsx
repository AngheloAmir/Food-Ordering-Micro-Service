import { Button, Group, Stack } from "@mantine/core";
import PaperLikeContainer from "../ui/StickyPostCard/PaperLikeContainer";
import Profile from "./Profile/Profile";
import UserDetails from "./Profile/UserDetails";
import { IconDeviceFloppy } from "@tabler/icons-react";

export default function UserProfile() {
    return (
        <PaperLikeContainer>
            <Stack gap="xl" className="p-4">
                <Profile />
                <UserDetails />

                <Group justify="flex-start" mt="md">
                    <Button
                        size="md"
                        color="dark"
                        leftSection={<IconDeviceFloppy size={20} />}
                        className="border-2 border-stone-800 bg-stone-900 dark:bg-stone-500 hover:bg-stone-800 dark:hover:bg-stone-600 text-yellow-50 dark:text-yellow-50 shadow-[4px_4px_0px_0px_rgba(28,25,23,0.5)] transition-transform active:translate-y-1 active:shadow-none"
                        radius="md"
                    >
                        Update Profile
                    </Button>
                </Group>
            </Stack>
        </PaperLikeContainer>
    );
}
