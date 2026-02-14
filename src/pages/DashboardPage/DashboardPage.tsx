import { DashboardTemplate } from '@/components/templates/DashboardTemplate';
import { ArticleTable } from '@/components/organisms/ArticleTable';
import { FilterBar } from '@/components/molecules/FilterBar';
import { AsidePanel } from '@/components/organisms/AsidePanel';
import { ArticleForm } from '@/components/organisms/ArticleForm';
import { ArticleDetails } from '@/components/organisms/ArticleDetails';
import type { DropdownOption } from '@/components/atoms/Dropdown';
import type { Article } from '@/types/article';
import { ViewIcon, EditIcon, DeleteIcon } from '@/components/atoms/icons';
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
                    title={
                        panelMode === 'create' ? 'New article' :
                            panelMode === 'edit' ? 'Edit article' :
                                'Article'
                    }
                >
                    {(panelMode === 'create' || panelMode === 'edit') && (
                        <ArticleForm
                            onSubmit={handleFormSubmit}
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
