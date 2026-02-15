import type { Article } from '../types/article';
import { MOCK_ARTICLES } from '@/features/articles/infrastructure/articleMocks';

const STORAGE_KEY = 'articles';

export const articleStorage = {
    get: (): Article[] => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : MOCK_ARTICLES;
        } catch (error) {
            console.error('Error reading from localStorage', error);
            return MOCK_ARTICLES;
        }
    },

    save: (articles: Article[]): void => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
        } catch (error) {
            console.error('Error saving to localStorage', error);
        }
    },
};
