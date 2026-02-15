import { describe, it, expect } from 'vitest';
import { formatDate } from '@/shared/utils/dateFormatter';

describe('formatDate', () => {
    it('formats a valid ISO date string correctly', () => {
        expect(formatDate('2024-02-14')).toBe('14/02/2024');
        expect(formatDate('2024-02-14T10:00:00Z')).toBe('14/02/2024');
    });

    it('returns empty string for empty input', () => {
        expect(formatDate('')).toBe('');
    });

    it('returns original string for invalid date string', () => {
        expect(formatDate('invalid-date')).toBe('invalid-date');
    });

    it('handles null or undefined gracefully if passed (though types prevent it)', () => {
        // @ts-ignore
        expect(formatDate(null)).toBe('');
        // @ts-ignore
        expect(formatDate(undefined)).toBe('');
    });
});
