export interface DashboardTemplateProps {
    filterBar: React.ReactNode;
    articleTable: React.ReactNode;
    asidePanel?: React.ReactNode;
}

export const DashboardTemplate = ({
    filterBar,
    articleTable,
    asidePanel
}: DashboardTemplateProps) => {
    return (
        <>
            <div className="p-5 max-w-auto" >
                <div className="mb-6">
                    {filterBar}
                </div>
                <div>
                    {articleTable}
                </div>
            </div>
            {asidePanel}
        </>
    );
};
