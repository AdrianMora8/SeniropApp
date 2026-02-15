import type { Article } from "@/features/articles/types/article";
import { Switch } from "@/shared/components/atoms/Switch";
import { Dropdown, type DropdownOption } from "@/shared/components/atoms/Dropdown";
import { DotsIcon } from "@/shared/icons";
import { formatDate } from "@/shared/utils/dateFormatter";

export interface ArticleItemProps {
    article: Article;
    onTogglePublished: (id: string) => void;
    onClick: (id: string) => void;
    dropdownOptions?: DropdownOption[];
}

export const ArticleItem = ({
    article,
    onTogglePublished,
    onClick,
    dropdownOptions
}: ArticleItemProps) => {
    return (
        <tr className="hover:bg-[rgb(var(--color-bg-secondary))] transition-colors cursor-pointer">
            <td
                className="w-2/5 h-20 p-6"
                onClick={() => onClick(article.id)}
            >
                <div className="font-normal text-[rgb(var(--color-text-main))]">
                    {article.headline}
                </div>
            </td>
            <td className="w-1/5 p-6" onClick={() => onClick(article.id)}>
                <div className="font-normal text-[rgb(var(--color-text-tertiary))]">
                    {article.author}
                </div>
            </td>
            <td className="w-1/5 p-6" onClick={() => onClick(article.id)}>
                <div className="font-normal text-[rgb(var(--color-text-tertiary))]">
                    {formatDate(article.publicationDate)}
                </div>
            </td>
            <td className="w-1/5 p-6">
                <div onClick={(e) => e.stopPropagation()}>
                    <Switch
                        checked={article.published}
                        onChange={() => onTogglePublished(article.id)}
                        label=""
                    />
                </div>
            </td>
            <td className="w-1/10 p-6 text-right">
                {dropdownOptions && dropdownOptions.length > 0 && (
                    <div onClick={(e) => e.stopPropagation()} className="flex justify-end">
                        <Dropdown
                            trigger={
                                <button className="flex items-center justify-center p-2 hover:bg-[rgb(var(--color-bg-tertiary))] rounded-full transition-all cursor-pointer border-none bg-transparent outline-none">
                                    <DotsIcon className="text-[rgb(var(--color-text-muted))] group-hover:text-[rgb(var(--color-text-secondary))]" />
                                </button>
                            }
                            options={dropdownOptions}
                        />
                    </div>
                )}
            </td>
        </tr>
    );
};





