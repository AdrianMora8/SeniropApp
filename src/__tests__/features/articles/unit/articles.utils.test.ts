import { describe, it, expect } from 'vitest';
import {
    filterArticles,
    searchArticles,
    validateArticle,
    createArticle,
    togglePublished,
    updateArticle,
} from '@/features/articles/domain/articleService';

import type { Article } from '@/features/articles/types/article';
import type { ArticleFormData } from '@/features/articles/validation';

const mockArticles: Article[] = [
    {
        id: '1',
        headline: 'Published Article',
        author: 'John Doe',
        body: 'Content 1',
        publicationDate: '2024-02-14',
        published: true,
        createdAt: '2024-02-14T00:00:00Z',
        updatedAt: '2024-02-14T00:00:00Z',
    },
    {
        id: '2',
        headline: 'Unpublished Article',
        author: 'Jane Smith',
        body: 'Content 2',
        publicationDate: '2024-02-13',
        published: false,
        createdAt: '2024-02-13T00:00:00Z',
        updatedAt: '2024-02-13T00:00:00Z',
    },
];

describe('articles.utils', () => {
    it('filterArticles returns only published articles', () => {
        const result = filterArticles(mockArticles, 'published');
        expect(result).toHaveLength(1);
        expect(result[0].published).toBe(true);
    });

    it('searchArticles returns matching articles', () => {
        const result = searchArticles(mockArticles, 'Unpublished');
        expect(result).toHaveLength(1);
        expect(result[0].headline).toBe('Unpublished Article');
    });

    it('validateArticle returns true for valid article', () => {
        const validArticle: Partial<ArticleFormData> = {
            headline: 'Test',
            author: 'Author',
            body: 'Body',
            publicationDate: '2024-02-14',
        };
        expect(validateArticle(validArticle)).toBe(true);
    });

    it('validateArticle returns false when fields are missing', () => {
        const invalidArticle: Partial<ArticleFormData> = {
            headline: 'Test',
        };
        expect(validateArticle(invalidArticle)).toBe(false);
    });

    it('createArticle generates a unique ID', () => {
        const formData: ArticleFormData = {
            headline: 'New Article',
            author: 'Author',
            body: 'Body',
            publicationDate: '2024-02-14',
            published: false,
        };

        const article1 = createArticle(formData);
        const article2 = createArticle(formData);

        expect(article1.id).toBeDefined();
        expect(article2.id).toBeDefined();
        expect(article1.id).not.toBe(article2.id);
    });

    it('togglePublished changes published from true to false', () => {
        const article = mockArticles[0];
        const result = togglePublished(article);

        expect(result.published).toBe(false);
        expect(result.id).toBe(article.id);
        expect(result.headline).toBe(article.headline);
    });

    it('togglePublished changes published from false to true', () => {
        const article = mockArticles[1];
        const result = togglePublished(article);

        expect(result.published).toBe(true);
        expect(result.id).toBe(article.id);
    });

    it('togglePublished does not mutate original article', () => {
        const article = { ...mockArticles[0] };
        const originalPublished = article.published;

        togglePublished(article);

        expect(article.published).toBe(originalPublished);
    });

    it('updateArticle updates headline', () => {
        const article = mockArticles[0];
        const result = updateArticle(article, { headline: 'Updated Headline' });

        expect(result.headline).toBe('Updated Headline');
        expect(result.id).toBe(article.id);
        expect(result.author).toBe(article.author);
    });

    it('updateArticle updates multiple fields', () => {
        const article = mockArticles[0];
        const updates = {
            headline: 'New Headline',
            author: 'New Author',
            published: false,
        };

        const result = updateArticle(article, updates);

        expect(result.headline).toBe('New Headline');
        expect(result.author).toBe('New Author');
        expect(result.published).toBe(false);
    });

    it('updateArticle updates the updatedAt timestamp', () => {
        const article = mockArticles[0];
        const result = updateArticle(article, { headline: 'Updated' });

        expect(result.updatedAt).not.toBe(article.updatedAt);
        expect(new Date(result.updatedAt).getTime()).toBeGreaterThan(
            new Date(article.updatedAt).getTime()
        );
    });

    it('updateArticle does not mutate original article', () => {
        const article = { ...mockArticles[0] };
        const originalHeadline = article.headline;

        updateArticle(article, { headline: 'New Headline' });

        expect(article.headline).toBe(originalHeadline);
    });
});
