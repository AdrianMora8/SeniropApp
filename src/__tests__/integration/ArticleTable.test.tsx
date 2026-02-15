import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { ArticleTable } from '@/features/articles/presentation/components/ArticleTable';
import type { Article } from '@/types/article';

const mockArticles: Article[] = [
    {
        id: '1',
        headline: 'Test Article 1',
        author: 'John Doe',
        body: 'Test body 1',
        publicationDate: '2024-02-14',
        published: true,
        createdAt: '2024-02-14T00:00:00Z',
        updatedAt: '2024-02-14T00:00:00Z',
    },
    {
        id: '2',
        headline: 'Test Article 2',
        author: 'Jane Smith',
        body: 'Test body 2',
        publicationDate: '2024-02-13',
        published: false,
        createdAt: '2024-02-13T00:00:00Z',
        updatedAt: '2024-02-13T00:00:00Z',
    },
];

describe('ArticleTable', () => {
    const defaultProps = {
        articles: mockArticles,
        totalArticles: 2,
        currentPage: 1,
        itemsPerPage: 10,
        onPageChange: vi.fn(),
        onItemsPerPageChange: vi.fn(),
        onArticleClick: vi.fn(),
        onTogglePublished: vi.fn(),
        getRowActions: vi.fn(() => []),
    };

    it('renders articles correctly', () => {
        render(<ArticleTable {...defaultProps} />);

        expect(screen.getByText('Test Article 1')).toBeInTheDocument();
        expect(screen.getByText('Test Article 2')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    it('calls onArticleClick when article headline is clicked', async () => {
        const user = userEvent.setup();
        const onArticleClick = vi.fn();

        render(
            <ArticleTable
                {...defaultProps}
                onArticleClick={onArticleClick}
            />
        );

        // Click on the headline text (which is inside a td with onClick)
        await user.click(screen.getByText('Test Article 1'));

        expect(onArticleClick).toHaveBeenCalledWith('1');
    });
});
