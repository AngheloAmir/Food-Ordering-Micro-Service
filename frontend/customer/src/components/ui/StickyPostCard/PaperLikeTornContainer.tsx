
interface PaperLikeTornContainerProps {
    children?: React.ReactNode;
}

export default function PaperLikeTornContainer(props: PaperLikeTornContainerProps) {
    return (
        <div className="relative filter drop-shadow-xl">
            <div
                className="h-[18px] w-full relative z-10 text-gray-100 dark:text-[#242424] drop-shadow-[0_-4px_0_#d6d3d1] dark:drop-shadow-[0_-4px_0_#292524]"
                style={{
                    background: `
                        linear-gradient(45deg, transparent 33.333%, currentColor 33.333%, currentColor 66.667%, transparent 66.667%),
                        linear-gradient(-45deg, transparent 33.333%, currentColor 33.333%, currentColor 66.667%, transparent 66.667%)
                    `,
                    backgroundSize: '12px 24px',
                    backgroundPosition: '0 5px',
                    backgroundRepeat: 'repeat-x',
                }}
            />

            <div className="bg-gray-100 dark:bg-[#242424] relative z-0 px-8 pt-4 pb-8 min-h-[400px] shadow-yellow-900/10 dark:shadow-yellow-900/50 px-4 border-b-1 border-x-1 border-stone-300 dark:border-stone-800">
                <div className="dark:text-stone-900">
                    {props.children ? props.children : (
                        <div className="text-center text-stone-500 italic mt-10">
                            Select a tab to view content...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}