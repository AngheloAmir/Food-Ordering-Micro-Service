import { Group, Title } from "@mantine/core";
import { IconReceipt } from "@tabler/icons-react";


export default function CartHeading() {
    return (
        <Group mb="xl" align="center" mt="20">
            <div className="bg-yellow-200 dark:bg-yellow-900 p-3 rounded-full shadow-md">
                <IconReceipt size={24} className="text-yellow-900 dark:text-yellow-100" />
            </div>
            <div>
                <Title className="font-sans text-stone-800 dark:text-stone-100 font-black tracking-tight">
                    Your Order
                </Title>
            </div>
        </Group>
    );
}