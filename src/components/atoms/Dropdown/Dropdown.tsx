import { useState } from 'react';

export interface DropdownOption {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode | string;
}

export interface DropdownProps {
    trigger: React.ReactNode;
    options: DropdownOption[];
}

export const Dropdown = ({ trigger, options }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative inline-block text-left outline-none"
            tabIndex={-1}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setIsOpen(false);
                }
            }}
        >
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {trigger}
            </div>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg z-50 overflow-hidden">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                option.onClick();
                                setIsOpen(false);
                            }}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 cursor-pointer border-none bg-transparent"
                        >
                            {option.icon && (
                                <span className="flex shrink-0 items-center justify-center w-5 h-5 opacity-70">
                                    {typeof option.icon === 'string' ? (
                                        <img src={option.icon} alt="" className="w-full h-full object-contain" />
                                    ) : (
                                        option.icon
                                    )}
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


