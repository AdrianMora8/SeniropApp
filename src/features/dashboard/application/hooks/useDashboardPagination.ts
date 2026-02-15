import { useState, useMemo } from 'react';
import type { Article } from '@/features/articles/types/article';

interface UseDashboardPaginationProps {
    articles: Article[];
}

export const useDashboardPagination = ({ articles }: UseDashboardPaginationProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [mobilePage, setMobilePage] = useState(1);

    const paginatedArticles = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return articles.slice(startIndex, startIndex + itemsPerPage);
    }, [articles, currentPage, itemsPerPage]);

    const mobileArticles = useMemo(() => {
        return articles.slice(0, mobilePage * itemsPerPage);
    }, [articles, mobilePage, itemsPerPage]);

    const hasMoreMobile = mobileArticles.length < articles.length;

    const handleLoadMore = () => {
        setMobilePage((prev) => prev + 1);
    };

    const resetPagination = () => {
        setCurrentPage(1);
        setMobilePage(1);
    };

    return {
        currentPage,
        itemsPerPage,
        mobilePage,
        paginatedArticles,
        mobileArticles,
        hasMoreMobile,
        setCurrentPage,
        setItemsPerPage,
        handleLoadMore,
        resetPagination
    };
};
