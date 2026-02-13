import type { Article } from "../../../types/article";
import { Switch } from "../../atoms/Switch";


export interface ArticleItemProps {
    article: Article;
    onTogglePublished: (id: string) => void;
    onClick: (id: string) => void;
}


export const ArticleItem = ({
    article,
    onTogglePublished,
    onClick
}: ArticleItemProps) => {
    return (
        <tr
            key={article.id}
            className="cursor-pointer hover:bg-gray-100"
            onClick={() => onClick(article.id)}
        >
            <td className="px-4 py-2">
                <div className="flex items-center gap-2">
                    {article.headline}
                </div>
            </td>
            <td className="px-4 py-2">
                <div className="flex items-center gap-2">
                    {article.author}
                </div>
            </td>
            <td className="px-4 py-2">
                <div className="flex items-center gap-2">
                    {new Date(article.publicationDate).toLocaleDateString()}
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
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-gray-400 hover:text-gray-600">
                    ⋮
                </button>
            </td>
        </tr>
    )
}
