import type { Article } from '@/types/article';
import { Switch } from '@/shared/components/atoms/Switch';
import { Button } from '@/shared/components/atoms/Button';
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

        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col gap-12">
                    <div className="pb-4 border-b border-gray-100">
                        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                            {article.headline}
                        </h1>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                            Author
                        </span>
                        <div className="h-10 flex items-center">
                            <p className="truncate">
                                {article.author}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                            Body
                        </span>

                        <div className="h-68 overflow-y-auto">
                            <p className="whitespace-pre-wrap">
                                {article.body}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                            Publish Date
                        </span>

                        <div className="h-10 flex items-center">
                            <p>
                                {formatDate(article.publicationDate)}
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
                    <div className="pt-8 pb-4 flex justify-end">
                        <Button
                            variant="primary"
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