import type {Article} from '../types/article'

export const MockArticles: Article[] = [
    {
        id: 1,
        headline: 'Article 1',
        body: 'Body 1',
        author: 'Author 1',
        publicationDate: '2022-01-01',
        published: true,
        createdAt: '2022-01-01',
        updatedAt: '2022-01-01',
    },
    {
        id: 2,
        headline: 'Article 2',
        body: 'Body 2',
        author: 'Author 2',
        publicationDate: '2022-01-02',
        published: false,
        createdAt: '2022-01-02',
        updatedAt: '2022-01-02',
    },
    {
        id: 3,
        headline: 'Article 3',
        body: 'Body 3',
        author: 'Author 3',
        publicationDate: '2022-01-03',
        published: true,
        createdAt: '2022-01-03',
        updatedAt: '2022-01-03',
    },
];