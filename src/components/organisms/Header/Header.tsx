import { SearchBar } from '@/components/molecules/SearchBar';

export interface HeaderProps {
    label?: string;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
}

export const Header = ({
    label = 'Dashboard overview',
    searchValue = '',
    onSearchChange
}: HeaderProps) => {
    return (
        <header className="flex items-center justify-between gap-4 border-b border-gray-200 bg-white px-6 py-4">
            <span className="shrink-0 text-sm font-medium text-gray-600">{label}</span>
            {onSearchChange && (
                <div className="min-w-0 flex-1">
                    <SearchBar value={searchValue} onChange={onSearchChange} />
                </div>
            )}
        </header>
    );
};
