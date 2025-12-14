import { Button } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";

export default function ProfileButton() {
    return (
        <Button variant="subtle" leftSection={<IconUser className="text-yellow-900 dark:text-white" size={30} stroke={1.5} />}>
            <p className="text-yellow-900 dark:text-white">
                Profile
            </p>
        </Button>
    );
}