import { Button } from '@/shared/components/atoms/Button';

export interface FilterBarProps {
    filterStatus: 'all' | 'published' | 'unpublished';
    onFilterChange: (value: 'all' | 'published' | 'unpublished') => void;
    onAddClick: () => void;
}

export const FilterBar = ({
    filterStatus,
    onFilterChange,
    onAddClick
}: FilterBarProps) => {
    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">

                    <select
                        value={filterStatus}
                        onChange={(e) => onFilterChange(e.target.value as 'all' | 'published' | 'unpublished')}
                        className="rounded-md border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-main))] px-4 py-2 text-normal w-full md:w-50 h-15 p-2"
                    >
                        <option value="all">All</option>
                        <option value="published">Published</option>
                        <option value="unpublished">Unpublished</option>
                    </select>
                </div>
                <Button onClick={onAddClick} variant="primary" fullWidth className="md:w-auto">
                    + Add Article
                </Button>
            </div>
        </div>
    );
};

