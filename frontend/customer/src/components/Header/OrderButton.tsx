import { Button, Indicator } from "@mantine/core";
import { IconReceipt } from "@tabler/icons-react";


export default function OrderButton() {
    return (
        <Indicator inline label="3" size={24} color="red" offset={5}>
            <Button variant="subtle" leftSection={<IconReceipt className="text-yellow-900 dark:text-white" size={30} stroke={1.5} />}>
                <p className="text-yellow-900 dark:text-white">
                    Orders
                </p>
            </Button>
        </Indicator>
    );
}