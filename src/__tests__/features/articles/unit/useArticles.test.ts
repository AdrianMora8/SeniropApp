import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useArticles } from '@/features/articles/application/hooks/useArticles';
import { articleService } from '@/features/articles/domain/articleService';
import { articleStorage } from '@/features/articles/infrastructure/articleStorage';
import type { Article } from '@/features/articles/types/article';

vi.mock('@/features/articles/domain/articleService', () => ({
    articleService: {
        createArticle: vi.fn(),
        updateArticle: vi.fn(),
        togglePublished: vi.fn(),
    },
}));

vi.mock('@/features/articles/infrastructure/articleStorage', () => ({
    articleStorage: {
        get: vi.fn(),
        save: vi.fn(),
    },
}));

describe('useArticles', () => {
    const mockArticle: Article = {
        id: '1',
        headline: 'Test Article',
        body: 'Test Body',
        author: 'Test Author',
        publicationDate: new Date().toISOString(),
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    beforeEach(() => {
        vi.clearAllMocks();
        (articleStorage.get as any).mockReturnValue([mockArticle]);
    });

    it('should initialize with articles from storage', () => {
        const { result } = renderHook(() => useArticles());

        expect(articleStorage.get).toHaveBeenCalled();
        expect(result.current.articles).toEqual([mockArticle]);
    });

    it('should create an article', () => {
        const newArticleData = {
            headline: 'New Article',
            author: 'New Author',
            body: 'New Body',
            publicationDate: new Date().toISOString(),
            published: false,
        };

        const createdArticle = { ...mockArticle, id: '2', ...newArticleData };

        (articleService.createArticle as any).mockReturnValue(createdArticle);

        const { result } = renderHook(() => useArticles());

        act(() => {
            result.current.createArticle(newArticleData);
        });

        expect(articleService.createArticle).toHaveBeenCalledWith(newArticleData);
        expect(result.current.articles).toHaveLength(2);
        expect(result.current.articles[0]).toEqual(createdArticle);
        expect(articleStorage.save).toHaveBeenCalled();
    });

    it('should update an article', () => {
        const { result } = renderHook(() => useArticles());

        const updateData = { headline: 'Updated Headline' };
        const updatedArticle = { ...mockArticle, ...updateData };

        (articleService.updateArticle as any).mockReturnValue(updatedArticle);

        act(() => {
            result.current.updateArticle('1', updateData);
        });

        expect(articleService.updateArticle).toHaveBeenCalledWith(mockArticle, updateData);
        expect(result.current.articles[0].headline).toBe('Updated Headline');
        expect(articleStorage.save).toHaveBeenCalled();
    });

    it('should delete an article', () => {
        const { result } = renderHook(() => useArticles());

        act(() => {
            result.current.deleteArticle('1');
        });

        expect(result.current.articles).toHaveLength(0);
        expect(articleStorage.save).toHaveBeenCalledWith([]);
    });

    it('should toggle published status', () => {
        const { result } = renderHook(() => useArticles());

        const toggledArticle = { ...mockArticle, published: false };
        (articleService.togglePublished as any).mockReturnValue(toggledArticle);

        act(() => {
            result.current.togglePublished('1');
        });

        expect(articleService.togglePublished).toHaveBeenCalledWith(mockArticle);
        expect(result.current.articles[0].published).toBe(false);
        expect(articleStorage.save).toHaveBeenCalled();
    });

    it('should get article by id', () => {
        const { result } = renderHook(() => useArticles());

        const article = result.current.getArticleById('1');
        expect(article).toEqual(mockArticle);

        const notFound = result.current.getArticleById('999');
        expect(notFound).toBeUndefined();
    });
});
