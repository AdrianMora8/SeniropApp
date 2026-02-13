import { DashboardTemplate } from '../../components/templates/DashboardTemplate';
import { ArticleTable } from '../../components/organisms/ArticleTable';
import { Header } from '../../components/organisms/Header';
import { FilterBar } from '../../components/molecules/FilterBar';
import { AsidePanel } from '../../components/organisms/AsidePanel';
import { ArticleForm } from '../../components/organisms/ArticleForm';
import type { DropdownOption } from '../../components/atoms/Dropdown';
import type { Article } from '../../types/article';
import { useDashboardLogic } from './useDashboardLogic';

export const DashboardPage = () => {
    const {
        articles,
        filterStatus,
        setFilterStatus,
        searchQuery,
        setSearchQuery,
        panelMode,
        selectedArticleId,
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
            icon: '👁️',
            onClick: () => handleArticleClick(article.id)
        },
        {
            label: 'Edit',
            icon: '✏️',
            onClick: () => handleEdit(article.id)
        },
        {
            label: 'Delete',
            icon: '🗑️',
            variant: 'danger',
            onClick: () => handleDelete(article.id)
        }
    ];

    return (
        <DashboardTemplate
            header={
                <Header
                    searchValue={searchQuery}
                    onSearchChange={setSearchQuery}
                />
            }
            filterBar={
                <FilterBar
                    filterStatus={filterStatus}
                    onFilterChange={setFilterStatus}
                    onAddClick={handleAddArticle}
                />
            }
            articleList={
                <ArticleTable
                    articles={articles}
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

                    {panelMode === 'view' && (
                        <div className="text-gray-500">
                            Article detail view - To be implemented
                        </div>
                    )}
                </AsidePanel>
            }
        />
    );
};
