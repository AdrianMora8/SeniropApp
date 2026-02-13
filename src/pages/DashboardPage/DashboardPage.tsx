import { useState, useMemo } from 'react';
import { DashboardTemplate } from '../../components/templates/DashboardTemplate';
import { ArticleTable } from '../../components/organisms/ArticleTable';
import { useArticles } from '../../features/articles/useArticles';

export const DashboardPage = () => {
    const { articles, togglePublished } = useArticles();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'unpublished'>('all');

    const filteredArticles = useMemo(() => {
        return articles.filter((article) => {
            const matchesSearch = article.headline
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

            const matchesFilter =
                filterStatus === 'all' ||
                (filterStatus === 'published' && article.published) ||
                (filterStatus === 'unpublished' && !article.published);

            return matchesSearch && matchesFilter;
        });
    }, [articles, searchQuery, filterStatus]);

    const handleArticleClick = (id: string) => {
        console.log('Article clicked:', id);
    };

    const handleTogglePublished = (id: string) => {
        togglePublished(id);
    };

    return (
        <DashboardTemplate
            filterBar={
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-500">
                        Filter Bar
                    </p>
                </div>
            }
            articleList={
                <ArticleTable
                    articles={filteredArticles}
                    onArticleClick={handleArticleClick}
                    onTogglePublished={handleTogglePublished}
                />
            }
        />
    );
};
