import { useState } from 'react';
import { articleService } from '../../domain/articleService';
import { articleStorage } from '../../infrastructure/articleStorage';
import type { ArticleFormData } from '../../validation';
import type { Article as ArticleType } from '../../types/article';


export const useArticles = () => {
    const [articles, setArticles] = useState<ArticleType[]>(() => articleStorage.get());

    const createArticle = (articleData: ArticleFormData) => {
        const newArticle = articleService.createArticle(articleData);
        const updatedArticles = [newArticle, ...articles];
        setArticles(updatedArticles);
        articleStorage.save(updatedArticles);
        return newArticle;
    };

    const updateArticle = (id: string, articleData: Partial<ArticleType>) => {
        const updatedArticles = articles.map((article) =>
            article.id === id
                ? articleService.updateArticle(article, articleData)
                : article
        );
        setArticles(updatedArticles);
        articleStorage.save(updatedArticles);
    };

    const deleteArticle = (id: string) => {
        const updatedArticles = articles.filter((article) => article.id !== id);
        setArticles(updatedArticles);
        articleStorage.save(updatedArticles);
    };

    const togglePublished = (id: string) => {
        const updatedArticles = articles.map((article) =>
            article.id === id
                ? articleService.togglePublished(article)
                : article
        );
        setArticles(updatedArticles);
        articleStorage.save(updatedArticles);
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
