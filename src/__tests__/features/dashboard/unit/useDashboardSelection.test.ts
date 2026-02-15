import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useDashboardSelection } from '@/features/dashboard/application/hooks/useDashboardSelection';
import { DASHBOARD_PANEL_MODES } from '@/features/dashboard/application/constants/dashboardConstants';

describe('useDashboardSelection', () => {
    it('should initialize with null values', () => {
        const { result } = renderHook(() => useDashboardSelection());

        expect(result.current.panelMode).toBeNull();
        expect(result.current.selectedArticleId).toBeNull();
    });

    it('should handle article click', () => {
        const { result } = renderHook(() => useDashboardSelection());

        act(() => {
            result.current.handleArticleClick('123');
        });

        expect(result.current.selectedArticleId).toBe('123');
        expect(result.current.panelMode).toBe(DASHBOARD_PANEL_MODES.VIEW);
    });

    it('should handle edit article', () => {
        const { result } = renderHook(() => useDashboardSelection());

        act(() => {
            result.current.handleEdit('456');
        });

        expect(result.current.selectedArticleId).toBe('456');
        expect(result.current.panelMode).toBe(DASHBOARD_PANEL_MODES.EDIT);
    });

    it('should handle add article', () => {
        const { result } = renderHook(() => useDashboardSelection());

        act(() => {
            result.current.handleArticleClick('123');
        });

        act(() => {
            result.current.handleAddArticle();
        });

        expect(result.current.selectedArticleId).toBeNull();
        expect(result.current.panelMode).toBe(DASHBOARD_PANEL_MODES.CREATE);
    });

    it('should handle close panel', () => {
        const { result } = renderHook(() => useDashboardSelection());

        act(() => {
            result.current.handleArticleClick('123');
        });

        expect(result.current.panelMode).not.toBeNull();

        act(() => {
            result.current.handleClosePanel();
        });

        expect(result.current.panelMode).toBeNull();
        expect(result.current.selectedArticleId).toBeNull();
    });
});
