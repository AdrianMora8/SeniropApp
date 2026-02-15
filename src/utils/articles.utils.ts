import type { Article } from '@/types/article';
import type { ArticleFormData } from '@/features/articles/validation';

export const filterArticles = (
    articles: Article[],
    status: 'all' | 'published' | 'unpublished'
): Article[] => {
    if (status === 'all') return articles;
    if (status === 'published') return articles.filter(a => a.published);
    return articles.filter(a => !a.published);
};

export const searchArticles = (
    articles: Article[],
    query: string
): Article[] => {
    return articles.filter(a =>
        a.headline.toLowerCase().includes(query.toLowerCase())
    );
};

export const togglePublished = (article: Article): Article => {
    return { ...article, published: !article.published };
};

export const validateArticle = (article: Partial<ArticleFormData>): boolean => {
    return !!(
        article.headline &&
        article.author &&
        article.body &&
        article.publicationDate
    );
};

export const updateArticle = (
    article: Article,
    updates: Partial<Article>
): Article => {
    return { ...article, ...updates, updatedAt: new Date().toISOString() };
};

export const createArticle = (data: ArticleFormData): Article => {
    return {
        id: crypto.randomUUID(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
};
