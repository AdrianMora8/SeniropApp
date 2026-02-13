import { Search } from 'lucide-react';

export interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const SearchBar = ({ value, onChange, placeholder = 'Search' }: SearchBarProps) => {
    return (
        <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-gray-400" aria-hidden />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-md border border-gray-300 bg-gray-50 py-2 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                aria-label="Search"
            />
        </div>
    );
};
