import { useState, useRef, useEffect } from 'react';

export interface DropdownOption {
    label: string;
    onClick: () => void;
    icon?: string;
    variant?: 'default' | 'danger';
}

export interface DropdownProps {
    trigger: React.ReactNode;
    options: DropdownOption[];
}

export const Dropdown = ({ trigger, options }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div className="relative" ref={ref}>
            <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg z-50">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                option.onClick();
                                setIsOpen(false);
                            }}
                            className={`
                                flex w-full items-center gap-2 px-4 py-2 text-left text-sm
                                transition-colors hover:bg-gray-100
                                ${option.variant === 'danger' ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'}
                            `}
                        >
                            {option.icon && <span>{option.icon}</span>}
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
