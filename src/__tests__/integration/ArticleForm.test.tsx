import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { ArticleForm } from '@/features/articles/presentation/components/ArticleForm';

describe('ArticleForm', () => {
    const mockOnSubmit = vi.fn();

    const defaultProps = {
        onSubmit: mockOnSubmit,
        submitLabel: 'SAVE',
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('save button is disabled when form is empty', () => {
        render(<ArticleForm {...defaultProps} />);

        const saveButton = screen.getByRole('button', { name: /save/i });
        expect(saveButton).toBeDisabled();
    });

    it('save button is enabled when all required fields are filled', async () => {
        const user = userEvent.setup();
        render(<ArticleForm {...defaultProps} />);

        // Fill all required fields using placeholders
        await user.type(screen.getByPlaceholderText(/enter article headline/i), 'Test Headline');
        await user.type(screen.getByPlaceholderText(/enter author name/i), 'Test Author');
        await user.type(screen.getByPlaceholderText(/enter article content/i), 'Test Body Content');

        // Find date input by type
        const dateInput = screen.getByDisplayValue('');
        await user.type(dateInput, '2024-02-14');

        // Wait for validation
        await waitFor(() => {
            const saveButton = screen.getByRole('button', { name: /save/i });
            expect(saveButton).toBeEnabled();
        }, { timeout: 3000 });
    });

    it('calls onSubmit with form data when submitted', async () => {
        const user = userEvent.setup();
        render(<ArticleForm {...defaultProps} />);

        // Fill form using placeholders
        await user.type(screen.getByPlaceholderText(/enter article headline/i), 'Test Headline');
        await user.type(screen.getByPlaceholderText(/enter author name/i), 'Test Author');
        await user.type(screen.getByPlaceholderText(/enter article content/i), 'Test Body');

        const dateInput = screen.getByDisplayValue('');
        await user.type(dateInput, '2024-02-14');

        // Submit form
        await waitFor(async () => {
            const saveButton = screen.getByRole('button', { name: /save/i });
            expect(saveButton).toBeEnabled();
            await user.click(saveButton);
        }, { timeout: 3000 });

        // Verify onSubmit called with correct data
        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith(
                expect.objectContaining({
                    headline: 'Test Headline',
                    author: 'Test Author',
                    body: 'Test Body',
                    publicationDate: '2024-02-14',
                })
            );
        }, { timeout: 3000 });
    });
});
