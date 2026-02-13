import { ArticleItem } from '../../molecules/ArticleItem';
import type { Article } from '../../../types/article';

export interface ArticleTableProps {
    articles: Article[];
    onArticleClick: (id: string) => void;
    onTogglePublished: (id: string) => void;
}

export const ArticleTable = ({
    articles,
    onArticleClick,
    onTogglePublished
}: ArticleTableProps) => {
    if (articles.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No articles found</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Article Headline
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Author
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Publish Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Published
                        </th>
                        <th className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {articles.map((article) => (
                        <ArticleItem
                            key={article.id}
                            article={article}
                            onClick={onArticleClick}
                            onTogglePublished={onTogglePublished}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
