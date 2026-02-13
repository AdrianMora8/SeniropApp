import { useState, useEffect } from 'react';
import type { Article } from '../../types/article';
import { MOCK_ARTICLES } from '../../store/constants';

export const useArticles = () => {
    const [articles, setArticles] = useState<Article[]>(() => {
        const saved = localStorage.getItem('articles');
        return saved ? JSON.parse(saved) : MOCK_ARTICLES;
    });

    useEffect(() => {
        localStorage.setItem('articles', JSON.stringify(articles));
    }, [articles]);

    const createArticle = (articleData: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) => {
        const newArticle: Article = {
            ...articleData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setArticles((prev) => [newArticle, ...prev]);
        return newArticle;
    };

    const updateArticle = (id: string, articleData: Partial<Article>) => {
        setArticles((prev) =>
            prev.map((article) =>
                article.id === id
                    ? { ...article, ...articleData, updatedAt: new Date().toISOString() }
                    : article
            )
        );
    };

    const deleteArticle = (id: string) => {
        setArticles((prev) => prev.filter((article) => article.id !== id));
    };

    const togglePublished = (id: string) => {
        setArticles((prev) =>
            prev.map((article) =>
                article.id === id
                    ? { ...article, published: !article.published, updatedAt: new Date().toISOString() }
                    : article
            )
        );
    };

    const getArticleById = (id: string) => {
        return articles.find((article) => article.id === id);
    };

    return {
        articles,
        createArticle,
        updateArticle,
        deleteArticle,
        togglePublished,
        getArticleById,
    };
};
