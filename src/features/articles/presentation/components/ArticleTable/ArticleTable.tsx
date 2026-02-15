
import { Pagination } from '@/shared/components/molecules/Pagination';
import type { DropdownOption } from '@/shared/components/atoms/Dropdown';
import type { Article } from '@/features/articles/types/article';
import { ArticleTableView } from '../ArticleViews/ArticleTableView';
import { ArticleCardListView } from '../ArticleViews/ArticleCardListView';
import { ArticleEmptyState } from '../ArticleEmptyState/ArticleEmptyState';

export interface ArticleTableProps {
    articles: Article[];
    mobileArticles?: Article[];
    hasMoreMobile?: boolean;
    onLoadMore?: () => void;
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
    mobileArticles,
    hasMoreMobile,
    onLoadMore,
    totalArticles,
    currentPage,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
    onArticleClick,
    onTogglePublished,
    getRowActions
}: ArticleTableProps) => {
    const displayMobileArticles = mobileArticles || articles;

    if (articles.length === 0 && displayMobileArticles.length === 0) {
        return <ArticleEmptyState />;
    }

    return (
        <div className="flex flex-col gap-4">
            <ArticleTableView
                articles={articles}
                onArticleClick={onArticleClick}
                onTogglePublished={onTogglePublished}
                getRowActions={getRowActions}
            />

            <ArticleCardListView
                articles={displayMobileArticles}
                onArticleClick={onArticleClick}
                onTogglePublished={onTogglePublished}
                getRowActions={getRowActions}
                hasMore={hasMoreMobile}
                onLoadMore={onLoadMore}
            />

            <div className="sticky left-0 bg-[rgb(var(--color-bg-main))] border md:border-t-0 border-[rgb(var(--color-border-subtle))] rounded-lg md:rounded-t-none p-2 md:p-0 md:block hidden">
                <Pagination
                    totalItems={totalArticles}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={onPageChange}
                    onItemsPerPageChange={onItemsPerPageChange}
                />
            </div>
        </div>
    );
};
