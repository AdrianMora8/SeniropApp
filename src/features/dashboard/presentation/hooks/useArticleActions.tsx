import { useCallback } from 'react';
import { ViewIcon, EditIcon, DeleteIcon } from '@/shared/icons';
import type { DropdownOption } from '@/shared/components/atoms/Dropdown';
import type { Article } from '@/features/articles/types/article';

interface UseArticleActionsProps {
    onView: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export const useArticleActions = ({ onView, onEdit, onDelete }: UseArticleActionsProps) => {
    const getArticleActions = useCallback((article: Article): DropdownOption[] => [
        {
            label: 'View',
            icon: <ViewIcon
                size={16}
                className="text-[rgb(var(--color-text-tertiary))]"
            />,
            onClick: () => onView(article.id)
        },
        {
            label: 'Edit',
            icon: <EditIcon
                size={16}
                className="text-[rgb(var(--color-text-tertiary))]"
            />,
            onClick: () => onEdit(article.id)
        },
        {
            label: 'Delete',
            icon: <DeleteIcon
                size={16}
                className="text-[rgb(var(--color-text-tertiary))]"
            />,
            onClick: () => onDelete(article.id)
        }
    ], [onView, onEdit, onDelete]);

    return { getArticleActions };
};
