import type { Article } from '@/features/articles/types/article'

export const MOCK_ARTICLES: Article[] = [
    {
        id: '1',
        headline: 'Breaking: Local Hero Saves Cat from Tree',
        body: 'In an extraordinary display of courage, a local firefighter rescued a cat stuck in a tree for three days. The community gathered to watch the dramatic rescue.',
        author: 'John Smith',
        publicationDate: '2026-02-10',
        published: true,
        createdAt: '2026-02-10T10:00:00Z',
        updatedAt: '2026-02-10T10:00:00Z',
    },
    {
        id: '2',
        headline: 'City Council Approves New Park Development',
        body: 'The city council unanimously voted to approve the construction of a new community park in the downtown area. Construction is expected to begin next month.',
        author: 'Jane Doe',
        publicationDate: '2026-02-11',
        published: false,
        createdAt: '2026-02-11T14:30:00Z',
        updatedAt: '2026-02-11T14:30:00Z',
    },
    {
        id: '3',
        headline: 'Local School Wins State Championship',
        body: 'Lincoln High School basketball team won the state championship after a thrilling overtime victory. This is their first championship in 20 years.',
        author: 'Mike Johnson',
        publicationDate: '2026-02-12',
        published: true,
        createdAt: '2026-02-12T09:15:00Z',
        updatedAt: '2026-02-12T09:15:00Z',
    },
];