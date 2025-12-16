import { SimpleGrid, Text } from "@mantine/core";
import { IconUser, IconMapPin, IconPhone, IconMail } from '@tabler/icons-react';
import type { ReactNode } from 'react';

export default function UserDetails() {
    return (
        <>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                <InputWrapper label="Full Name" icon={IconUser}>
                    <input type="text" defaultValue="John Doe" className="w-full bg-transparent outline-none font-bold text-stone-700 dark:text-white" />
                </InputWrapper>
                <InputWrapper label="Email Address" icon={IconMail}>
                    <input type="email" defaultValue="john.doe@example.com" className="w-full bg-transparent outline-none font-bold text-stone-700 dark:text-white" />
                </InputWrapper>
                <InputWrapper label="Phone Number" icon={IconPhone}>
                    <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full bg-transparent outline-none font-bold text-stone-700 dark:text-white" />
                </InputWrapper>
                <InputWrapper label="Default Address" icon={IconMapPin}>
                    <input type="text" defaultValue="1234 Main St, Springfield, IL" className="w-full bg-transparent outline-none font-bold text-stone-700 dark:text-white" />
                </InputWrapper>
            </SimpleGrid>
        </>
    );
}

function InputWrapper({ label, icon: Icon, children }: { label: string, icon?: any, children: ReactNode }) {
    return (
        <div className="bg-stone-50 dark:bg-stone-800 px-4 py-3 rounded-md border border-stone-200 dark:border-stone-700 focus-within:border-stone-800  transition-colors">
            <Text size="xs" fw={700} mb={4} className="uppercase tracking-wider flex items-center gap-1 dark:text-white">
                {Icon && <Icon size={14} />}
                {label}
            </Text>
            {children}
        </div>
    )
}
