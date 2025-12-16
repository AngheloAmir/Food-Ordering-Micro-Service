
export default function PaperLikeContainer(props: { children: React.ReactNode, className?: string }) {
    return (
        <div
            className={`w-100% p-4 rounded-lg dark:bg-[#242424] border-4 border-dashed border-stone-300 dark:border-stone-700 ${props.className}`}
        >
            {props.children}
        </div>
    );
}