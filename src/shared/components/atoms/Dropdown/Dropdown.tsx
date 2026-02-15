import { useState, useEffect, useRef } from 'react';

export interface DropdownOption {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
}

export interface DropdownProps {
    trigger: React.ReactNode;
    options: DropdownOption[];
}

export const Dropdown = ({ trigger, options }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer"
                role="button"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {trigger}
            </div>

            {isOpen && (
                <div
                    className="absolute right-0 top-full mt-2 w-48 rounded-md border border-[rgb(var(--color-border-subtle))] bg-[rgb(var(--color-bg-main))] py-1 shadow-lg z-50 overflow-hidden"
                    role="menu"
                >
                    {options.map((option, index) => (
                        <button
                            key={`${option.label}-${index}`}
                            onClick={() => {
                                option.onClick();
                                setIsOpen(false);
                            }}
                            role="menuitem"
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-[rgb(var(--color-text-secondary))] transition-colors hover:bg-[rgb(var(--color-bg-secondary))] cursor-pointer border-none bg-transparent"
                        >
                            {option.icon && (
                                <span className="flex shrink-0 items-center justify-center w-5 h-5">
                                    {option.icon}
                                </span>
                            )}
                            <span className="flex-1">{option.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};