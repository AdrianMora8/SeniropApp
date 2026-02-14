import { ArticleItem } from '@/components/molecules/ArticleItem';
import type { DropdownOption } from '@/components/atoms/Dropdown';
import type { Article } from '@/types/article';

export interface ArticleTableProps {
    articles: Article[];
    onArticleClick: (id: string) => void;
    onTogglePublished: (id: string) => void;
    getRowActions?: (article: Article) => DropdownOption[];
}

export const ArticleTable = ({
    articles,
    onArticleClick,
    onTogglePublished,
    getRowActions
}: ArticleTableProps) => {
    if (articles.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No articles found</p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg">
            <table >
                <thead className="font-bold ">
                    <tr>
                        <th className="p-6 text-left text-black tracking-wider">
                            Article Headline
                        </th>
                        <th className="p-6 text-left text-black tracking-wider">
                            Author
                        </th>
                        <th className="p-6 text-left text-black tracking-wider">
                            Publish Date
                        </th>
                        <th className="p-6 text-left text-black tracking-wider">
                            Published
                        </th>
                        <th className="p-6"></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {articles.map((article) => (
                        <ArticleItem
                            key={article.id}
                            article={article}
                            onClick={onArticleClick}
                            onTogglePublished={onTogglePublished}
                            dropdownOptions={getRowActions?.(article)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
