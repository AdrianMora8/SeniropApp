import { useState, useMemo, useEffect } from 'react';
import { useArticles } from '@/features/articles/application/hooks/useArticles';
import type { ArticleFormData } from '@/features/articles/validation';

export const useDashboardLogic = () => {
    const { articles, togglePublished, deleteArticle, createArticle, updateArticle, getArticleById } = useArticles();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'unpublished'>('all');

    const [panelMode, setPanelMode] = useState<'create' | 'edit' | 'view' | null>(null);
    const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

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

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filterStatus]);

    const paginatedArticles = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredArticles.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredArticles, currentPage, itemsPerPage]);

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
        totalArticles: filteredArticles.length,
        articles: paginatedArticles,
        selectedArticleId,
        itemsPerPage,
        filterStatus,
        currentPage,
        searchQuery,
        panelMode,
        handleTogglePublished: togglePublished,
        handleArticleClick,
        handleAddArticle,
        handleClosePanel,
        handleFormSubmit,
        setItemsPerPage,
        setFilterStatus,
        setCurrentPage,
        setSearchQuery,
        getArticleById,
        handleDelete,
        handleEdit,
    };
};
