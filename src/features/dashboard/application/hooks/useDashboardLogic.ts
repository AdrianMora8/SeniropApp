import { useState, useMemo, useEffect } from 'react';
import { useArticles } from '@/features/articles/application/hooks/useArticles';
import { articleService } from '@/features/articles/domain/articleService';
import type { ArticleFormData } from '@/features/articles/validation';
import { DASHBOARD_PANEL_MODES, type DashboardPanelMode } from '../constants/dashboardConstants';

export const useDashboardLogic = () => {
    const { articles, togglePublished, deleteArticle, createArticle, updateArticle, getArticleById } = useArticles();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'unpublished'>('all');

    const [panelMode, setPanelMode] = useState<DashboardPanelMode | null>(null);
    const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const filteredArticles = useMemo(() => {
        const searched = articleService.searchArticles(articles, searchQuery);
        return articleService.filterArticles(searched, filterStatus);
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
        setPanelMode(DASHBOARD_PANEL_MODES.VIEW);
    };

    const handleEdit = (id: string) => {
        setSelectedArticleId(id);
        setPanelMode(DASHBOARD_PANEL_MODES.EDIT);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('¿Eliminar este artículo?')) {
            deleteArticle(id);
        }
    };

    const handleAddArticle = () => {
        setSelectedArticleId(null);
        setPanelMode(DASHBOARD_PANEL_MODES.CREATE);
    };

    const handleClosePanel = () => {
        setPanelMode(null);
        setSelectedArticleId(null);
    };

    const handleFormSubmit = (data: ArticleFormData) => {
        if (panelMode === DASHBOARD_PANEL_MODES.CREATE) {
            createArticle(data);
        } else if (panelMode === DASHBOARD_PANEL_MODES.EDIT && selectedArticleId) {
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
