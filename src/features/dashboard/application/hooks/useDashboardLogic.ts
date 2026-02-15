import { useState, useMemo, useEffect } from 'react';
import { useArticles } from '@/features/articles/application/hooks/useArticles';
import { articleService } from '@/features/articles/domain/articleService';
import type { ArticleFormData } from '@/features/articles/validation';
import { DASHBOARD_PANEL_MODES } from '../constants/dashboardConstants';
import { useDashboardPagination } from './useDashboardPagination';
import { useDashboardSelection } from './useDashboardSelection';

export const useDashboardLogic = () => {
    const { articles, togglePublished, deleteArticle, createArticle, updateArticle, getArticleById } = useArticles();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'unpublished'>('all');

    const filteredArticles = useMemo(() => {
        const searched = articleService.searchArticles(articles, searchQuery);
        return articleService.filterArticles(searched, filterStatus);
    }, [articles, searchQuery, filterStatus]);

    const {
        currentPage,
        itemsPerPage,
        paginatedArticles,
        mobileArticles,
        hasMoreMobile,
        setCurrentPage,
        setItemsPerPage,
        handleLoadMore,
        resetPagination
    } = useDashboardPagination({ articles: filteredArticles });

    const {
        panelMode,
        selectedArticleId,
        handleArticleClick,
        handleEdit,
        handleAddArticle,
        handleClosePanel
    } = useDashboardSelection();

    useEffect(() => {
        resetPagination();
    }, [searchQuery, filterStatus]);

    const handleDelete = (id: string) => {
        if (window.confirm('Delete this article?')) {
            deleteArticle(id);
        }
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
        mobileArticles,
        hasMoreMobile,
        handleLoadMore,
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
