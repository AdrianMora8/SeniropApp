import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useDashboardPagination } from '@/features/dashboard/application/hooks/useDashboardPagination';
import type { Article } from '@/features/articles/types/article';

describe('useDashboardPagination', () => {
    const mockArticles: Article[] = Array.from({ length: 12 }, (_, i) => ({
        id: `${i + 1}`,
        headline: `Article ${i + 1}`,
        body: 'Body',
        author: 'Author',
        publicationDate: new Date().toISOString(),
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }));

    it('should initialize with default values', () => {
        const { result } = renderHook(() => useDashboardPagination({ articles: mockArticles }));

        expect(result.current.currentPage).toBe(1);
        expect(result.current.itemsPerPage).toBe(5);
        expect(result.current.mobilePage).toBe(1);
    });

    it('should return correct paginated articles for desktop', () => {
        const { result } = renderHook(() => useDashboardPagination({ articles: mockArticles }));

        expect(result.current.paginatedArticles).toHaveLength(5);
        expect(result.current.paginatedArticles[0].id).toBe('1');
        expect(result.current.paginatedArticles[4].id).toBe('5');
    });

    it('should change pages correctly', () => {
        const { result } = renderHook(() => useDashboardPagination({ articles: mockArticles }));

        act(() => {
            result.current.setCurrentPage(2);
        });

        expect(result.current.paginatedArticles).toHaveLength(5);
        expect(result.current.paginatedArticles[0].id).toBe('6');
        expect(result.current.paginatedArticles[4].id).toBe('10');

        act(() => {
            result.current.setCurrentPage(3);
        });

        expect(result.current.paginatedArticles).toHaveLength(2);
        expect(result.current.paginatedArticles[0].id).toBe('11');
    });

    it('should handle mobile pagination (load more)', () => {
        const { result } = renderHook(() => useDashboardPagination({ articles: mockArticles }));

        expect(result.current.mobileArticles).toHaveLength(5);
        expect(result.current.hasMoreMobile).toBe(true);

        act(() => {
            result.current.handleLoadMore();
        });

        expect(result.current.mobileArticles).toHaveLength(10);
        expect(result.current.hasMoreMobile).toBe(true);

        act(() => {
            result.current.handleLoadMore();
        });

        expect(result.current.mobileArticles).toHaveLength(12);
        expect(result.current.hasMoreMobile).toBe(false);
    });

    it('should reset pagination', () => {
        const { result } = renderHook(() => useDashboardPagination({ articles: mockArticles }));

        act(() => {
            result.current.setCurrentPage(3);
            result.current.handleLoadMore();
        });

        expect(result.current.currentPage).toBe(3);
        expect(result.current.mobilePage).toBe(2);

        act(() => {
            result.current.resetPagination();
        });

        expect(result.current.currentPage).toBe(1);
        expect(result.current.mobilePage).toBe(1);
    });
});
