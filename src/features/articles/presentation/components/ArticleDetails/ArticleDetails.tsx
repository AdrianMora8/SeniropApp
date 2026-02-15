import { useMemo } from 'react';
import type { Article } from '@/features/articles/types/article';
import { Switch } from '@/shared/components/atoms/Switch';
import { Button } from '@/shared/components/atoms/Button';
import { formatDate } from '@/shared/utils/dateFormatter';
import { ArticleEmptyState } from '../ArticleEmptyState';

export interface ArticleDetailsProps {
    article: Article | undefined;
    onTogglePublished?: () => void;
    onEdit?: () => void;
}
export const ArticleDetails = ({
    article,
    onTogglePublished,
    onEdit
}: ArticleDetailsProps) => {

    const formattedDate = useMemo(() => article ? formatDate(article.publicationDate) : '', [article]);

    if (!article) {
        return <ArticleEmptyState />;
    }

    return (

        <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1">
                <div className="flex flex-col h-full gap-4">
                    <div className="pb-4 border-b border-[rgb(var(--color-border-subtle))]">
                        <h1 className="text-2xl font-bold text-[rgb(var(--color-text-main))] leading-tight break-all line-clamp-4">
                            {article.headline}
                        </h1>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-[rgb(var(--color-text-main))]">
                            Author
                        </span>
                        <div className="h-10 flex items-center">
                            <p className="truncate break-all">
                                {article.author}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col flex-1">
                        <span className="text-sm font-medium text-[rgb(var(--color-text-main))]">
                            Body
                        </span>

                        <div className="flex-1 overflow-hidden">
                            <p className="whitespace-pre-wrap break-all line-clamp-15">
                                {article.body}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-[rgb(var(--color-text-main))]">
                            Publish Date
                        </span>

                        <div className="h-10 flex items-center">
                            <p>
                                {formattedDate}
                            </p>
                        </div>
                    </div>

                    <div className="h-10 flex items-center">
                        <Switch
                            checked={article.published}
                            onChange={() => onTogglePublished?.()}
                            label="Publish"
                        />
                    </div>
                </div>
            </div>

            {
                onEdit && (
                    <div className="pt-4 pb-4 min-h-25 min-w-24 flex justify-end">
                        <Button
                            variant="active"
                            onClick={onEdit}
                        >
                            UPDATE
                        </Button>
                    </div>
                )
            }
        </div >
    );

};