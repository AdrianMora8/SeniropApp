import { SearchBar } from '@/shared/components/molecules/SearchBar';

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
        <header className="flex items-center justify-between gap-8 border-b h-25 border-gray-200 bg-white px-6 py-4">
            <span className="text-xl text-gray-400">{label}</span>
            {onSearchChange && (
                <div className="min-w-350">
                    <SearchBar value={searchValue} onChange={onSearchChange} />
                </div>
            )}
        </header>
    );
};
