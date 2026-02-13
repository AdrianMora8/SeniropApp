import { useState, useMemo } from 'react';
import { useArticles } from '../../features/articles/useArticles';
import type { ArticleFormData } from '../../features/articles/validation';

export const useDashboardLogic = () => {
    const { articles, togglePublished, deleteArticle, createArticle, updateArticle, getArticleById } = useArticles();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'unpublished'>('all');

    const [panelMode, setPanelMode] = useState<'create' | 'edit' | 'view' | null>(null);
    const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

    const filteredArticles = useMemo(() => {
        return articles.filter((article) => {
            const matchesSearch = article.headline
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

            const matchesFilter =
                filterStatus === 'all' ||
                (filterStatus === 'published' && article.published) ||
                (filterStatus === 'unpublished' && !article.published);

            return matchesSearch && matchesFilter;
        });
    }, [articles, searchQuery, filterStatus]);

    const handleArticleClick = (id: string) => {
        setSelectedArticleId(id);
        setPanelMode('view');
    };

    const handleEdit = (id: string) => {
        setSelectedArticleId(id);
        setPanelMode('edit');
    };

    const handleDelete = (id: string) => {
        if (window.confirm('¿Eliminar este artículo?')) {
            deleteArticle(id);
        }
    };

    const handleAddArticle = () => {
        setSelectedArticleId(null);
        setPanelMode('create');
    };

    const handleClosePanel = () => {
        setPanelMode(null);
        setSelectedArticleId(null);
    };

    const handleFormSubmit = (data: ArticleFormData) => {
        if (panelMode === 'create') {
            createArticle(data);
        } else if (panelMode === 'edit' && selectedArticleId) {
            updateArticle(selectedArticleId, data);
        }
        handleClosePanel();
    };

    return {
        articles: filteredArticles,
        searchQuery,
        setSearchQuery,
        filterStatus,
        setFilterStatus,
        panelMode,
        selectedArticleId,
        getArticleById,
        handleArticleClick,
        handleEdit,
        handleDelete,
        handleAddArticle,
        handleClosePanel,
        handleFormSubmit,
        handleTogglePublished: togglePublished
    };
};
