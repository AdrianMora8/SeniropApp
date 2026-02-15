import { DashboardTemplate } from '@/features/dashboard/presentation/templates/DashboardTemplate';
import { ArticleTable } from '@/features/articles/presentation/components/ArticleTable';
import { FilterBar } from '@/shared/components/molecules/FilterBar';
import { AsidePanel } from '@/shared/components/organisms/AsidePanel';
import { ArticleForm } from '@/features/articles/presentation/components/ArticleForm';
import { ArticleDetails } from '@/features/articles/presentation/components/ArticleDetails';
import { useDashboardLogic } from '@/features/dashboard/application/hooks/useDashboardLogic';
import { DASHBOARD_PANEL_MODES } from '@/features/dashboard/application/constants/dashboardConstants';
import { useArticleActions } from '@/features/dashboard/presentation/hooks/useArticleActions';

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
        handleTogglePublished,
        mobileArticles,
        hasMoreMobile,
        handleLoadMore
    } = useDashboardLogic();

    const { getArticleActions } = useArticleActions({
        onView: (id) => handleArticleClick(id),
        onEdit: (id) => handleEdit(id),
        onDelete: (id) => handleDelete(id)
    });

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
                    mobileArticles={mobileArticles}
                    hasMoreMobile={hasMoreMobile}
                    onLoadMore={handleLoadMore}
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
