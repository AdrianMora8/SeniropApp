import { Header } from '@/shared/components/organisms/Header';

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
            <Header
                searchValue={searchValue}
                onSearchChange={onSearchChange}
            />

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

            {asidePanel}
        </div>
    );
};
