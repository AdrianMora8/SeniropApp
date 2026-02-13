import type { Article } from "../../../types/article";
import { Switch } from "../../atoms/Switch";
import { Dropdown, type DropdownOption } from "../../atoms/Dropdown";

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
        <tr className="hover:bg-gray-50 transition-colors">
            <td
                className="px-6 py-4 cursor-pointer"
                onClick={() => onClick(article.id)}
            >
                <div className="text-sm font-medium text-gray-900">
                    {article.headline}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-gray-600">
                    {article.author}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-gray-600">
                    {article.publicationDate.split('T')[0].split('-').reverse().join('/')}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div onClick={(e) => e.stopPropagation()}>
                    <Switch
                        checked={article.published}
                        onChange={() => onTogglePublished(article.id)}
                        label=""
                    />
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
                {dropdownOptions && dropdownOptions.length > 0 && (
                    <div onClick={(e) => e.stopPropagation()}>
                        <Dropdown
                            trigger={
                                <button className="text-gray-400 hover:text-gray-600 p-2 rounded hover:bg-gray-100 transition-colors">
                                    ⋮
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
