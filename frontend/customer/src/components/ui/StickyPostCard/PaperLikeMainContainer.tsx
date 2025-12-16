import { Container, Grid, Stack } from "@mantine/core";
import PaperLikeTornContainer from "./PaperLikeTornContainer";

interface NavButtonProps {
    label: string;
    icon: any;
    active: boolean;
    onClick: () => void;
}

interface PaperLikeContainerProps {
    children?: React.ReactNode;
    navigation?: NavButtonProps[];
}


export default function PaperLikeMainContainer(props: PaperLikeContainerProps) {
    return (
        <Container size="xl" className='mt-10 mb-20'>
            <Grid gutter="xl">
                {/* Left Navigation Sidebar */}
                <Grid.Col span={{ base: 12, md: 3 }}>
                    <Stack gap="sm">
                        {props.navigation?.map((item, index) => (
                            <NavButton
                                key={index}
                                label={item.label}
                                icon={item.icon}
                                active={item.active}
                                onClick={item.onClick}
                            />
                        ))}
                    </Stack>
                </Grid.Col>

                {/* Right Content Area */}
                <Grid.Col span={{ base: 12, md: 9 }}>
                    <PaperLikeTornContainer>

                    </PaperLikeTornContainer>
                </Grid.Col>
            </Grid>
        </Container>
    );
}



function NavButton(props: NavButtonProps) {
    return (
        <button
            onClick={props.onClick}
            className={`
                w-full flex items-center gap-3 px-5 py-4 rounded-lg border-[3px] transition-all duration-200
                ${props.active
                    ? 'bg-yellow-200 border-stone-800 translate-x-1 -translate-y-1 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]'
                    : 'bg-stone -100 border-transparent hover:border-stone-800 hover:bg-white text-stone-600 hover:text-stone-900'}
            `}
        >
            <props.icon size={22} stroke={2} className={props.active ? 'text-stone-900' : 'text-stone-500'} />
            <span className={`font-bold text-lg ${props.active ? 'text-stone-900' : 'text-stone-600'}`}>{props.label}</span>
        </button>
    );
}
