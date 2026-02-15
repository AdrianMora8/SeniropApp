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
        <header className="flex items-center justify-between gap-8 border-b h-25 border-[rgb(var(--color-border-subtle))] bg-[rgb(var(--color-bg-main))] px-6 py-4">
            <span className="text-xl text-[rgb(var(--color-text-disabled))]">{label}</span>
            {onSearchChange && (
                <div className="min-w-350">
                    <SearchBar value={searchValue} onChange={onSearchChange} />
                </div>
            )}
        </header>
    );
};
