import { DashboardTemplate } from '@/features/dashboard/presentation/templates/DashboardTemplate';
import { ArticleTable } from '@/features/articles/presentation/components/ArticleTable';
import { FilterBar } from '@/shared/components/molecules/FilterBar';
import { AsidePanel } from '@/shared/components/organisms/AsidePanel';
import { ArticleForm } from '@/features/articles/presentation/components/ArticleForm';
import { ArticleDetails } from '@/features/articles/presentation/components/ArticleDetails';
import type { DropdownOption } from '@/shared/components/atoms/Dropdown';
import type { Article } from '@/types/article';
import { ViewIcon, EditIcon, DeleteIcon } from '@/shared/icons';
import { useDashboardLogic } from '@/pages/DashboardPage/useDashboardLogic';

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
                    {(panelMode === 'create' || panelMode === 'edit') && (
                        <ArticleForm
                            onSubmit={handleFormSubmit}
                            title={panelMode === 'create' ? 'New article' : 'Edit article'}
                            submitLabel={panelMode === 'create' ? 'SAVE' : 'UPDATE'}
                            initialData={
                                panelMode === 'edit' && selectedArticleId
                                    ? getArticleById(selectedArticleId)
                                    : undefined
                            }
                        />
                    )}

                    {panelMode === 'view' && selectedArticleId && (
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
