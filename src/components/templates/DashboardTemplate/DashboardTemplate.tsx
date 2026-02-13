export interface DashboardTemplateProps {
    header?: React.ReactNode;
    filterBar: React.ReactNode;
    articleList: React.ReactNode;
    asidePanel?: React.ReactNode;
}

export const DashboardTemplate = ({
    header,
    filterBar,
    articleList,
    asidePanel
}: DashboardTemplateProps) => {
    return (
        <div className="min-h-screen bg-gray-50">
            {header}

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-6">
                    {filterBar}
                </div>

                <div>
                    {articleList}
                </div>
            </main>

            {asidePanel}
        </div>
    );
};
