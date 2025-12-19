import { Tabs } from "@mantine/core";
import { useState } from "react";
import PaperLikeContainer from "../ui/StickyPostCard/PaperLikeContainer";

const TABS = ['All', 'Burgers', 'Pizza', 'Pasta', 'Desserts', 'Drinks', 'Vegetables', 'Sweets'];

export default function FoodTags() {
    const [activeTab, setActiveTab] = useState<string | null>('All');

    return (
        <PaperLikeContainer className="mb-4 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                <Tabs
                    value={activeTab}
                    onChange={setActiveTab}
                    variant="pills"
                    color="yellow"
                    classNames={{
                        tab: 'font-bold data-[active]:bg-stone-800 data-[active]:text-white text-stone-600 hover:bg-stone-100'
                    }}
                >
                    <Tabs.List>
                        {TABS.map(tab => (
                            <Tabs.Tab key={tab} value={tab}>{tab}</Tabs.Tab>
                        ))}
                    </Tabs.List>
                </Tabs>
            </div>
        </PaperLikeContainer>
    )
}