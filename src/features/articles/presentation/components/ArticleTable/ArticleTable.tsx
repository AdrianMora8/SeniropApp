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
                <p className="text-[rgb(var(--color-text-muted))]">No articles found</p>
            </div>
        );
    }

    return (
        <div className="bg-[rgb(var(--color-bg-main))] border border-[rgb(var(--color-border-subtle))] rounded-lg">
            <table>
                <thead className="font-bold ">
                    <tr>
                        <th className="p-6 text-left text-[rgb(var(--color-text-main))] tracking-wider">
                            Article Headline
                        </th>
                        <th className="p-6 text-left text-[rgb(var(--color-text-main))] tracking-wider">
                            Author
                        </th>
                        <th className="p-6 text-left text-[rgb(var(--color-text-main))] tracking-wider">
                            Publish Date
                        </th>
                        <th className="p-6 text-left text-[rgb(var(--color-text-main))] tracking-wider">
                            Published
                        </th>
                        <th className="p-6"></th>
                    </tr>
                </thead>
                <tbody className="bg-[rgb(var(--color-bg-main))] divide-y divide-[rgb(var(--color-border-subtle))]">
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
