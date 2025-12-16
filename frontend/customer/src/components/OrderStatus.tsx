import { Stepper } from "@mantine/core";
import { IconCircleCheck, IconReceipt, IconChefHat, IconTruckDelivery } from "@tabler/icons-react";


export default function OrderStatus() {
    return (
        <div className='mt-5 p-5 bg-white dark:bg-stone-700 rounded-xl'>
            <Stepper
                active={1}
                completedIcon={<IconCircleCheck size={18} />}
                size="xs"
                classNames={{
                    stepIcon: 'border-2 border-stone-700',
                    separator: 'bg-stone-700 h-[2px]',
                }}
            >
                <Stepper.Step
                    icon={<IconReceipt size={18} />}
                    label="In Queue"
                    description="Order received"
                />
                <Stepper.Step
                    icon={<IconChefHat size={18} />}
                    label="Cooking"
                    description="Kitchen is preparing"
                />
                <Stepper.Step
                    icon={<IconTruckDelivery size={18} />}
                    label="Delivering"
                    description="Rider is nearby"
                />
            </Stepper>
        </div>
    )
}