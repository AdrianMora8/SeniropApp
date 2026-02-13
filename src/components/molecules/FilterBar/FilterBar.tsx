import { Button } from '@/components/atoms/Button';

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
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-gray-900">Articles</h2>

                    <select
                        value={filterStatus}
                        onChange={(e) => onFilterChange(e.target.value as 'all' | 'published' | 'unpublished')}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                    >
                        <option value="all">All</option>
                        <option value="published">Published</option>
                        <option value="unpublished">Unpublished</option>
                    </select>
                </div>

                <Button onClick={onAddClick} variant="primary">
                    + Add Article
                </Button>
            </div>
        </div>
    );
};

