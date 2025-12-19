import { Container, Grid, Stack } from "@mantine/core";
import PaperLikeContainer from "./PaperLikeContainer";
import type { NavButtonProps } from "./paperlike/NavButtons";
import NavButton from "./paperlike/NavButtons";

interface PaperLikeContainerProps {
    className?: string;
    children?: React.ReactNode;
    navigation?: NavButtonProps[];
}

/**
 * 
 * @example
 * <PaperLikeMainContainer
 *         navigation={[
 *             {
 *                 label: "Profile",
 *                 icon: IconUser,
 *                 active: true,
 *                 onClick: () => { }
 *             },
 *         ]}
 *     >
 *         <PaperLikeTornContainer>
 *             asd
 *         </PaperLikeTornContainer>
 *     </PaperLikeMainContainer>
 */
export default function PaperLikeMainContainer(props: PaperLikeContainerProps) {
    return (
        <Container size="xl" className={props.className}>
            <Grid gutter="xl">
                {/* Left Navigation Sidebar */}
                <Grid.Col span={{ base: 12, md: 3 }}>
                    <PaperLikeContainer>
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
                    </PaperLikeContainer>
                </Grid.Col>

                {/* Right Content Area */}
                <Grid.Col span={{ base: 12, md: 9 }}>
                    {props.children}
                </Grid.Col>
            </Grid>
        </Container>
    );
}



