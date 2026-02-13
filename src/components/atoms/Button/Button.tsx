export interface ButtonProps{
    variant: 'active' | 'disabled';
    children: React.ReactNode;
    onClick?: () => void;    
}

export const Button = ({variant, children, onClick}: ButtonProps) => {
    return (
        <button
        disabled={variant === 'disabled'}
        onClick={onClick}
        className={`px-4 py-2 rounded-md transition-colors ${
        variant === 'active'
            ? 'bg-(--color-save-active) text-white hover:bg-blue-700'
            : 'bg-(--color-save-disabled) text-gray-400 cursor-not-allowed'
        }`}   
        >
            {children}
        </button>
    );
};