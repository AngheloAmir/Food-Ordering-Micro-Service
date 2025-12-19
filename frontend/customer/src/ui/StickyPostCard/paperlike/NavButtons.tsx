

export interface NavButtonProps {
    label: string;
    icon: any;
    active: boolean;
    onClick: () => void;
}

export default function NavButton(props: NavButtonProps) {
    return (
        <button
            onClick={props.onClick}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg border-[3px] transition-all duration-200
                ${props.active
                    ? 'bg-yellow-200 dark:bg-yellow-800 translate-x-1 -translate-y-1 border-stone-300 dark:border-stone-600 shadow-[2px_2px_0px_0px_#d6d3d1] dark:shadow-[2px_2px_0px_0px_#57534E]'
                    : 'cursor-pointer bg-stone-200 dark:bg-stone-900 border-transparent hover:border-stone-400 text-stone-600 hover:text-stone-900'}
            `}
        >
            <props.icon size={22} stroke={2} className={props.active ? 'text-stone-900' : 'text-stone-500'} />
            <span className={`font-bold text-lg ${props.active ? 'text-stone-900' : 'text-stone-600'}`}>{props.label}</span>
        </button>
    );
}
