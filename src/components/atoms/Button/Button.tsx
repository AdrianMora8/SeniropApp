export interface ButtonProps {
    variant?: 'active' | 'disabled' | 'primary' | 'sidebar';
    children: React.ReactNode;
    onClick?: () => void;
}

export const Button = ({ variant = 'active', children, onClick }: ButtonProps) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
            case 'active':
                return 'px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700';
            case 'disabled':
                return 'px-4 py-2 rounded-md bg-gray-300 text-gray-400 cursor-not-allowed';
            case 'sidebar':
                return 'h-15 w-full bg-[#15012E] text-white hover:bg-[#1a0140] rounded-none text-base font-normal';
            default:
                return 'px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700';
        }
    };

    return (
        <button
            disabled={variant === 'disabled'}
            onClick={onClick}
            className={`transition-colors cursor-pointer ${getVariantStyles()}`}
        >
            {children}
        </button>
    );
};
