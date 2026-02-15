import { useState } from 'react';
import { SearchIcon } from '../../../icons';

export interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const SearchBar = ({ value, onChange, placeholder = 'Search' }: SearchBarProps) => {

    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div className="relative flex items-center p-6">
            <SearchIcon isFocused={isFocused} className="absolute left-10" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder}
                className="w-full rounded-md border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-main))] py-3 pl-10 pr-3 text-[rgb(var(--color-text-main))] placeholder-[rgb(var(--color-text-disabled))] focus:outline-none focus:ring-1"
            />
        </div>
    );
};

