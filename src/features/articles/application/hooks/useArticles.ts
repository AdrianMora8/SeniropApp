import { useState, useEffect } from 'react';
import { MOCK_ARTICLES } from '@/store/constants';
import type { Article } from '@/types/article';
import { createArticle as createArticleUtil, updateArticle as updateArticleUtil, togglePublished as togglePublishedUtil } from '@/utils/articles.utils';
import type { ArticleFormData } from '@/features/articles/validation';

export const useArticles = () => {
    const [articles, setArticles] = useState<Article[]>(() => {
        const saved = localStorage.getItem('articles');
        return saved ? JSON.parse(saved) : MOCK_ARTICLES;
    });

    useEffect(() => {
        localStorage.setItem('articles', JSON.stringify(articles));
    }, [articles]);

    const createArticle = (articleData: ArticleFormData) => {
        const newArticle = createArticleUtil(articleData);
        setArticles((prev) => [newArticle, ...prev]);
        return newArticle;
    };

    const updateArticle = (id: string, articleData: Partial<Article>) => {
        setArticles((prev) =>
            prev.map((article) =>
                article.id === id
                    ? updateArticleUtil(article, articleData)
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
                    ? togglePublishedUtil(article)
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
