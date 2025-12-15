

interface PostCardBodyProps {
    children: React.ReactNode;
    design?: "default" | "blue" | "green";
    rotation?: "default" | "toright" | "toleft";
}

export default function PostCardBody(props: PostCardBodyProps) {
    let defaultColorStyle = 'bg-yellow-200 dark:bg-yellow-600 text-yellow-900 dark:text-yellow-100 shadow-lg shadow-yellow-900/10 dark:shadow-yellow-900/50';
    switch (props.design) {
        case 'blue':
            defaultColorStyle = 'bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-100 shadow-lg shadow-blue-900/10 dark:shadow-blue-900/50';
            break;
        case 'green':
            defaultColorStyle = 'bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-100 shadow-lg shadow-green-900/10 dark:shadow-green-900/50';
            break;
    }

    let rotation = "rotate-0";
    switch (props.rotation) {
        case 'toleft':
            rotation = 'rotate-1';
            break;
        case 'toright':
            rotation = '-rotate-1';
            break;
    }

    return (
        <div className={`relative p-6 min-h-[320px] flex flex-col transition-all hover:-translate-y-1 duration-200 ${defaultColorStyle} ${rotation}`}>
            {/* Scotch Tape Visual */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-gray-200/80 backdrop-blur-sm rotate-[-2deg] shadow-sm z-10"></div>
            {props.children}
        </div>
    );
}