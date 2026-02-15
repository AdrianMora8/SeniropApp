import type { Article } from '../types/article';
import type { ArticleFormData } from '../validation';
import { articleSchema } from '../validation';

export const validateArticle = (data: unknown): boolean => {
    return articleSchema.safeParse(data).success;
};

export const createArticle = (data: ArticleFormData): Article => {
    const now = new Date().toISOString();
    return {
        ...data,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
    };
};

export const updateArticle = (article: Article, updates: Partial<Article>): Article => {
    return {
        ...article,
        ...updates,
        updatedAt: new Date().toISOString(),
    };
};

export const togglePublished = (article: Article): Article => {
    return {
        ...article,
        published: !article.published,
        updatedAt: new Date().toISOString(),
    };
};

export const filterArticles = (
    articles: Article[],
    status: 'all' | 'published' | 'unpublished'
): Article[] => {
    if (status === 'all') return articles;
    if (status === 'published') return articles.filter((a) => a.published);
    return articles.filter((a) => !a.published);
};

export const searchArticles = (articles: Article[], query: string): Article[] => {
    if (!query.trim()) return articles;
    const normalizedQuery = query.toLowerCase();
    return articles.filter((a) =>
        a.headline.toLowerCase().includes(normalizedQuery)
    );
};



export const articleService = {
    createArticle,
    updateArticle,
    togglePublished,
    filterArticles,
    searchArticles,

};

