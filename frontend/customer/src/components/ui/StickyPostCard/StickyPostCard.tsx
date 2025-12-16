import { Button } from '@mantine/core';
import CardHr from './stickypostcard/CardHr';
import ListTable from './stickypostcard/ListTable';
import OrderTable from './stickypostcard/OrderTable';
import PostCardBody from './stickypostcard/PostCardBody';
import TitleVariant1 from './stickypostcard/TitleVariant1';
import TitleVariant2 from './stickypostcard/TitleVariant2';

interface StickyPostCardProps {
    children?: React.ReactNode;
    design?: "default" | "blue" | "green";
    rotation?: "default" | "toright" | "toleft";

    /** The default title variant is with a Title then a badge on the right side.
     * The "textcenter" variant is with a Title then a badge on the center.
     */
    titleVariant?: "default" | "textcenter";
    title?: string;
    titleBadge?: string;

    /**These are the contents */
    containsListTable?: Array<{ name?: string; quantity?: number, price?: number }>
    containsOrderTable?: Array<{ name?: string; quantity?: number, price?: number }>

    /**Buttons */
    buttonName?: string;
    onClickButton?: () => void;

}

export default function StickyPostCard(props: StickyPostCardProps) {
    return (
        <PostCardBody design={props.design} rotation={props.rotation}>
            {
                (!props.titleVariant || props.titleVariant === "default") &&
                <TitleVariant1 title={props.title} badge={props.titleBadge} />
            }
            {
                props.titleVariant === "textcenter" &&
                <TitleVariant2 title={props.title} badge={props.titleBadge} />
            }

            <CardHr />

            {props.containsListTable && <ListTable order={props.containsListTable} />}
            {props.containsOrderTable && <OrderTable order={props.containsOrderTable} />}
            {props.children && props.children}

            {props.buttonName && <Button
                fullWidth
                size="lg"
                mt="xl"
                className="bg-stone-900 hover:bg-stone-800 text-yellow-100 hover:text-white transition-all transform hover:scale-[1.02] shadow-lg"
            >
                {props.buttonName}
            </Button>
            }

        </PostCardBody>
    );

}
