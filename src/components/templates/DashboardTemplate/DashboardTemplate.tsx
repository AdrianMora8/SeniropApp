export interface DashboardTemplateProps {
    filterBar: React.ReactNode;
    articleList: React.ReactNode;
    asidePanel?: React.ReactNode;
}

export const DashboardTemplate = ({
    filterBar,
    articleList,
    asidePanel
}: DashboardTemplateProps) => {
    return (
        <div className="min-h-screen bg-gray-50">

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
