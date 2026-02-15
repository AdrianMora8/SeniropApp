import { Pagination } from '@/shared/components/molecules/Pagination';
import type { DropdownOption } from '@/shared/components/atoms/Dropdown';
import type { Article } from '@/features/articles/types/article';
import { ArticleItem } from '../ArticleItem';

export interface ArticleTableProps {
    articles: Article[];
    totalArticles: number;
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
    onArticleClick: (id: string) => void;
    onTogglePublished: (id: string) => void;
    getRowActions?: (article: Article) => DropdownOption[];
}

export const ArticleTable = ({
    articles,
    totalArticles,
    currentPage,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
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
            <table>
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
            <Pagination
                totalItems={totalArticles}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={onPageChange}
                onItemsPerPageChange={onItemsPerPageChange}
            />
        </div>
    );
};
