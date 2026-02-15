
import type { DropdownOption } from '@/shared/components/atoms/Dropdown';
import type { Article } from '@/features/articles/types/article';
import { ArticleItem } from '../ArticleItem';

interface ArticleTableViewProps {
    articles: Article[];
    onArticleClick: (id: string) => void;
    onTogglePublished: (id: string) => void;
    getRowActions?: (article: Article) => DropdownOption[];
}

export const ArticleTableView = ({
    articles,
    onArticleClick,
    onTogglePublished,
    getRowActions
}: ArticleTableViewProps) => {
    return (
        <div className="hidden md:block bg-[rgb(var(--color-bg-main))] border border-[rgb(var(--color-border-subtle))] rounded-lg overflow-x-auto">
            <table className="min-w-5xl w-full">
                <thead className="font-bold ">
                    <tr>
                        <th className="p-6 text-left text-[rgb(var(--color-text-main))] tracking-wider w-2/5">
                            Article Headline
                        </th>
                        <th className="p-6 text-left text-[rgb(var(--color-text-main))] tracking-wider w-1/5">
                            Author
                        </th>
                        <th className="p-6 text-left text-[rgb(var(--color-text-main))] tracking-wider w-1/5">
                            Publish Date
                        </th>
                        <th className="p-6 text-left text-[rgb(var(--color-text-main))] tracking-wider w-1/5">
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
        </div>
    );
};
