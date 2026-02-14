import { Header } from '@/components/organisms/Header';

export interface DashboardTemplateProps {
    filterBar: React.ReactNode;
    articleTable: React.ReactNode;
    asidePanel?: React.ReactNode;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
}

export const DashboardTemplate = ({
    filterBar,
    articleTable,
    asidePanel,
    searchValue = '',
    onSearchChange
}: DashboardTemplateProps) => {
    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <Header
                searchValue={searchValue}
                onSearchChange={onSearchChange}
            />

            {/* Content area */}
            <div className="flex-1 overflow-auto">
                <div className="p-9">
                    <div className="mb-6">
                        {filterBar}
                    </div>
                    <div>
                        {articleTable}
                    </div>
                </div>
            </div>

            {/* Aside Panel (fixed overlay) */}
            {asidePanel}
        </div>
    );
};
