
import { memo, useMemo } from 'react';
import type { Article } from "@/features/articles/types/article";
import { Switch } from "@/shared/components/atoms/Switch";
import { Dropdown, type DropdownOption } from "@/shared/components/atoms/Dropdown";
import { DotsIcon } from "@/shared/icons";
import { formatDate } from "@/shared/utils/dateFormatter";

export interface ArticleCardProps {
    article: Article;
    onTogglePublished: (id: string) => void;
    onClick: (id: string) => void;
    dropdownOptions?: DropdownOption[];
}

export const ArticleCard = memo(({
    article,
    onTogglePublished,
    onClick,
    dropdownOptions
}: ArticleCardProps) => {

    const formattedDate = useMemo(() => formatDate(article.publicationDate), [article.publicationDate]);

    return (
        <div
            className="bg-[rgb(var(--color-bg-main))] border border-[rgb(var(--color-border-subtle))] rounded-lg p-4 flex flex-col gap-3 shadow-sm"
            onClick={() => onClick(article.id)}
        >
            <div className="flex justify-between items-start gap-2">
                <div className="font-medium text-[rgb(var(--color-text-main))] line-clamp-2">
                    {article.headline}
                </div>
                {dropdownOptions && dropdownOptions.length > 0 && (
                    <div onClick={(e) => e.stopPropagation()}>
                        <Dropdown
                            trigger={
                                <button className="flex items-center justify-center p-1 -mr-2 hover:bg-[rgb(var(--color-bg-tertiary))] rounded-full transition-all cursor-pointer border-none bg-transparent outline-none">
                                    <DotsIcon className="text-[rgb(var(--color-text-muted))]" />
                                </button>
                            }
                            options={dropdownOptions}
                        />
                    </div>
                )}
            </div>

            <div className="text-sm text-[rgb(var(--color-text-tertiary))] flex flex-col gap-1">
                <span>By {article.author}</span>
                <span>{formattedDate}</span>
            </div>

            <div className="mt-2 pt-3 border-t border-[rgb(var(--color-border-subtle))] flex items-center justify-between">
                <span className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">Published</span>
                <div onClick={(e) => e.stopPropagation()}>
                    <Switch
                        checked={article.published}
                        onChange={() => onTogglePublished(article.id)}
                        label=""
                    />
                </div>
            </div>
        </div>
    );
});

ArticleCard.displayName = 'ArticleCard';
