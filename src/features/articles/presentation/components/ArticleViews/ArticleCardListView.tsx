
import type { DropdownOption } from '@/shared/components/atoms/Dropdown';
import type { Article } from '@/features/articles/types/article';
import { ArticleCard } from '../ArticleCard/ArticleCard';
import { Button } from '@/shared/components/atoms/Button';

interface ArticleCardListViewProps {
    articles: Article[];
    onArticleClick: (id: string) => void;
    onTogglePublished: (id: string) => void;
    getRowActions?: (article: Article) => DropdownOption[];
    hasMore?: boolean;
    onLoadMore?: () => void;
}

export const ArticleCardListView = ({
    articles,
    onArticleClick,
    onTogglePublished,
    getRowActions,
    hasMore,
    onLoadMore
}: ArticleCardListViewProps) => {
    return (
        <div className="md:hidden flex flex-col gap-4 pb-10">
            {articles.map((article) => (
                <ArticleCard
                    key={article.id}
                    article={article}
                    onClick={onArticleClick}
                    onTogglePublished={onTogglePublished}
                    dropdownOptions={getRowActions?.(article)}
                />
            ))}
            {hasMore && onLoadMore && (
                <div className="flex justify-center pt-2">
                    <Button
                        variant="primary"
                        onClick={onLoadMore}
                        className="w-full"
                    >
                        Load More
                    </Button>
                </div>
            )}
        </div>
    );
};
