import type { ReactNode } from 'react';

interface StickyNoteContainerProps {
    children: ReactNode;
    color?: 'white' | 'yellow' | 'blue';
    className?: string;
    title?: string;
}

export function StickyNoteContainer({ children, color = 'white', className = '', title }: StickyNoteContainerProps) {
    const bgColors = {
        white: 'bg-white dark:bg-stone-800',
        yellow: 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700',
        blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700',
    };

    const borderColor = color === 'white' ? 'border-stone-200 dark:border-stone-700' : bgColors[color];

    return (
        <div className={`relative p-6 pt-12 ${bgColors[color]} shadow-xl border ${borderColor} rounded-sm ${className}`}>
            {/* Clip Visual */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-stone-700 dark:bg-black rounded-lg shadow-md z-10 flex items-center justify-center border-b-2 border-stone-500">
                <div className="w-20 h-1 bg-stone-400 rounded-full"></div>
            </div>

            {title && (
                <div className="mb-6 border-b-2 border-dashed border-stone-300 dark:border-stone-600 pb-2">
                    <h2 className="font-mono text-xl font-black uppercase text-stone-700 dark:text-stone-300">{title}</h2>
                </div>
            )}

            {children}
        </div>
    );
}
