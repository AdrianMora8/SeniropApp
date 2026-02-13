export interface ButtonProps {
    variant?: 'active' | 'disabled' | 'primary';
    children: React.ReactNode;
    onClick?: () => void;
}

export const Button = ({ variant = 'active', children, onClick }: ButtonProps) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return 'bg-blue-600 text-white hover:bg-blue-700';
            case 'active':
                return 'bg-blue-600 text-white hover:bg-blue-700';
            case 'disabled':
                return 'bg-gray-300 text-gray-400 cursor-not-allowed';
            default:
                return 'bg-blue-600 text-white hover:bg-blue-700';
        }
    };

    return (
        <button
            disabled={variant === 'disabled'}
            onClick={onClick}
            className={`px-4 py-2 rounded-md transition-colors ${getVariantStyles()}`}
        >
            {children}
        </button>
    );
};