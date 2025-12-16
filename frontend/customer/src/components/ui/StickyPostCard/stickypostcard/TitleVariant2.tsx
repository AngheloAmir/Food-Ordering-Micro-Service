interface TitleVariant2Props {
    title?: string;
    badge?: string;
}

export default function TitleVariant2(props: TitleVariant2Props) {

    return (
        <div className="text-center flex flex-col">
            <p className="font-bold text-xl text-[#242424] dark:text-[#e5e5e5] uppercase tracking-widest text-center">
                {props.title}
            </p>
            <p className="text-xs  text-lg text-[#242424] dark:text-[#e5e5e5] opacity-70">
                {props.badge}
            </p>
        </div>

    );
}