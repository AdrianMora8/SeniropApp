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
        primary: 'px-10 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed shadow-sm',
        active: 'px-10 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed shadow-sm',
        disabled: 'px-10 py-3 rounded-md bg-gray-300 text-gray-500 cursor-not-allowed',
        sidebar: 'h-15 w-full bg-[#15012E] text-white hover:bg-[#1a0140] rounded-none text-base font-normal focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed'
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