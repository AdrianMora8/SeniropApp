import type { Article } from "../../../types/article";
import { Switch } from "../../atoms/Switch";
import { Dropdown, type DropdownOption } from "../../atoms/Dropdown";
import { DotsIcon } from "../../atoms/icons";
import { formatDate } from "../../../utils/dateFormatter";

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
        <tr className="hover:bg-gray-50 transition-colors cursor-pointer">
            <td
                className="w-2/5 h-20 p-6"
                onClick={() => onClick(article.id)}
            >
                <div className="font-normal text-gray-900">
                    {article.headline}
                </div>
            </td>
            <td className="w-1/5 p-6" onClick={() => onClick(article.id)}>
                <div className="font-normal text-gray-600">
                    {article.author}
                </div>
            </td>
            <td className="w-1/5 p-6" onClick={() => onClick(article.id)}>
                <div className="font-normal text-gray-600">
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
                                <button className="flex items-center justify-center p-2 hover:bg-gray-200 rounded-full transition-all cursor-pointer border-none bg-transparent outline-none">
                                    <DotsIcon className="text-gray-500 group-hover:text-gray-700" />
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





