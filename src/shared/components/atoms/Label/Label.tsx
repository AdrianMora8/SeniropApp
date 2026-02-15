interface LabelProps {
    htmlFor: string;
    children: React.ReactNode;
    className?: string;
}

export const Label = ({
    htmlFor,
    children,
    className = ''
}: LabelProps) => {
    return (
        <label
            htmlFor={htmlFor}
            className={`text-sm font-medium text-[rgb(var(--color-text-secondary))] ${className}`}
        >
            {children}
        </label>
    );
};