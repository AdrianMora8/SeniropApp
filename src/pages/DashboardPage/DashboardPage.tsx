import { DashboardTemplate } from '@/features/dashboard/presentation/templates/DashboardTemplate';
import { ArticleTable } from '@/features/articles/presentation/components/ArticleTable';
import { FilterBar } from '@/shared/components/molecules/FilterBar';
import { AsidePanel } from '@/shared/components/organisms/AsidePanel';
import { ArticleForm } from '@/features/articles/presentation/components/ArticleForm';
import { ArticleDetails } from '@/features/articles/presentation/components/ArticleDetails';
import type { DropdownOption } from '@/shared/components/atoms/Dropdown';
import type { Article } from '@/features/articles/types/article';
import { ViewIcon, EditIcon, DeleteIcon } from '@/shared/icons';
import { useDashboardLogic } from '@/features/dashboard/application/hooks/useDashboardLogic';
import { DASHBOARD_PANEL_MODES } from '@/features/dashboard/application/constants/dashboardConstants';

export const DashboardPage = () => {
    const {
        selectedArticleId,
        filterStatus,
        searchQuery,
        panelMode,
        articles,
        totalArticles,
        currentPage,
        itemsPerPage,
        setCurrentPage,
        setItemsPerPage,
        setFilterStatus,
        setSearchQuery,
        getArticleById,
        handleArticleClick,
        handleEdit,
        handleDelete,
        handleAddArticle,
        handleClosePanel,
        handleFormSubmit,
        handleTogglePublished
    } = useDashboardLogic();

    const getArticleActions = (article: Article): DropdownOption[] => [
        {
            label: 'View',
            icon: <ViewIcon
                size={16}
                className="text-gray-600"
            />,
            onClick: () => handleArticleClick(article.id)
        },
        {
            label: 'Edit',
            icon: <EditIcon
                size={16}
                className="text-gray-600"
            />,
            onClick: () => handleEdit(article.id)
        },
        {
            label: 'Delete',
            icon: <DeleteIcon
                size={16}
                className="text-gray-600"
            />,
            onClick: () => handleDelete(article.id)
        }
    ];

    return (
        <DashboardTemplate
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            filterBar={
                <FilterBar
                    filterStatus={filterStatus}
                    onFilterChange={setFilterStatus}
                    onAddClick={handleAddArticle}
                />
            }
            articleTable={
                <ArticleTable
                    articles={articles}
                    totalArticles={totalArticles}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={setItemsPerPage}
                    onArticleClick={handleArticleClick}
                    onTogglePublished={handleTogglePublished}
                    getRowActions={getArticleActions}
                />
            }
            asidePanel={
                <AsidePanel
                    isOpen={panelMode !== null}
                    onClose={handleClosePanel}
                >
                    {(panelMode === DASHBOARD_PANEL_MODES.CREATE || panelMode === DASHBOARD_PANEL_MODES.EDIT) && (
                        <ArticleForm
                            onSubmit={handleFormSubmit}
                            title={panelMode === DASHBOARD_PANEL_MODES.CREATE ? 'New article' : 'Edit article'}
                            submitLabel={panelMode === DASHBOARD_PANEL_MODES.CREATE ? 'SAVE' : 'UPDATE'}
                            initialData={
                                panelMode === DASHBOARD_PANEL_MODES.EDIT && selectedArticleId
                                    ? getArticleById(selectedArticleId)
                                    : undefined
                            }
                        />
                    )}

                    {panelMode === DASHBOARD_PANEL_MODES.VIEW && selectedArticleId && (
                        <ArticleDetails
                            article={getArticleById(selectedArticleId)}
                            onTogglePublished={() => handleTogglePublished(selectedArticleId)}
                            onEdit={() => handleEdit(selectedArticleId)}
                        />
                    )}
                </AsidePanel>
            }
        />

    );
};
