import { useState } from 'react';
import { SearchIcon } from '../../atoms/Icon';

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
                className="w-full rounded-md border border-gray-300 bg-white py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1"
            />
        </div>
    );
};

