import type { Article } from '@/types/article';
import { Switch } from '@/components/atoms/Switch';
import { Button } from '@/components/atoms/Button';
import { formatDate } from '@/utils/dateFormatter';

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
    if (!article) {
        return (
            <p className="text-gray-500">Article not found</p>
        );
    }

    return (
        <div className="space-y-30">
            <h2 className="text-xl font-bold text-gray-900">{article.headline}</h2>

            <div>
                <p className="text-sm font-bold text-gray-900">Author</p>
                <p className="mt-1 text-gray-900">{article.author}</p>
            </div>

            <div>
                <p className="text-sm font-bold text-gray-900">Body</p>
                <p className="mt-1 text-gray-900 whitespace-pre-wrap">{article.body}</p>
            </div>

            <div>
                <p className="text-sm font-bold text-gray-900">Publish Date</p>
                <p className="mt-1 text-gray-900">{formatDate(article.publicationDate)}</p>
            </div>

            <div className="flex gap-2 ">
                <span className="text-sm font-medium text-gray-900">Publish</span>
                {onTogglePublished ? (
                    <Switch
                        checked={article.published}
                        onChange={() => onTogglePublished()}
                        label=""
                    />
                ) : (
                    <span className="text-sm text-gray-600">
                        {article.published ? 'Published' : 'Unpublished'}
                    </span>
                )}
            </div>

            {onEdit && (
                <div className="flex justify-end">
                    <Button variant="primary" onClick={onEdit}>
                        UPDATE
                    </Button>
                </div>
            )}
        </div>
    );
};
