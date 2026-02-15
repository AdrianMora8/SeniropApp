export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'active' | 'disabled' | 'primary' | 'sidebar';
    fullWidth?: boolean;
    children: React.ReactNode;
}

export const Button = ({
    variant = 'active',
    fullWidth = false,
    children,
    className = '',
    disabled,
    ...props
}: ButtonProps) => {
    const isDisabled = variant === 'disabled' || disabled;

    const baseStyles = 'transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center';
    const widthStyle = fullWidth ? 'w-full' : 'w-auto min-w-[140px]';

    const variantStyles = {
        primary: 'px-10 py-3 rounded-md bg-[rgb(var(--color-primary))] text-[rgb(var(--color-text-inverse))] hover:bg-[rgb(var(--color-primary-hover))] focus:ring-[rgb(var(--color-border-focus))] disabled:bg-[rgb(var(--color-disabled-bg))] disabled:text-[rgb(var(--color-disabled-text))] disabled:cursor-not-allowed shadow-sm',
        active: 'px-10 py-3 rounded-md bg-[rgb(var(--color-primary))] text-[rgb(var(--color-text-inverse))] hover:bg-[rgb(var(--color-primary-hover))] focus:ring-[rgb(var(--color-border-focus))] disabled:bg-[rgb(var(--color-disabled-bg))] disabled:text-[rgb(var(--color-disabled-text))] disabled:cursor-not-allowed shadow-sm',
        disabled: 'px-10 py-3 rounded-md bg-[rgb(var(--color-disabled-bg))] text-[rgb(var(--color-disabled-text))] cursor-not-allowed',
        sidebar: 'h-15 w-full bg-[rgb(var(--color-bg-sidebar-btn))] text-[rgb(var(--color-text-inverse))] hover:bg-[rgb(var(--color-bg-sidebar-btn-hover))] rounded-none text-base font-normal focus:ring-[rgb(var(--color-border-focus))] disabled:opacity-50 disabled:cursor-not-allowed'
    };

    return (
        <button
            disabled={isDisabled}
            className={`${baseStyles} ${widthStyle} ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};