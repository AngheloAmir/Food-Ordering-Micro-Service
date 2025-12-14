import { Button } from "@mantine/core";
import { IconMessageCircle } from "@tabler/icons-react";

export default function ChatButton() {
    return (
        <Button variant="subtle" leftSection={<IconMessageCircle className="text-yellow-900 dark:text-white" size={30} stroke={1.5} />}>
            <p className="text-yellow-900 dark:text-white">
                Chats
            </p>
        </Button>
    );
}