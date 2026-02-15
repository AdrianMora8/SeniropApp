import { useState } from 'react';
import { DASHBOARD_PANEL_MODES, type DashboardPanelMode } from '../constants/dashboardConstants';

export const useDashboardSelection = () => {
    const [panelMode, setPanelMode] = useState<DashboardPanelMode | null>(null);
    const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

    const handleArticleClick = (id: string) => {
        setSelectedArticleId(id);
        setPanelMode(DASHBOARD_PANEL_MODES.VIEW);
    };

    const handleEdit = (id: string) => {
        setSelectedArticleId(id);
        setPanelMode(DASHBOARD_PANEL_MODES.EDIT);
    };

    const handleAddArticle = () => {
        setSelectedArticleId(null);
        setPanelMode(DASHBOARD_PANEL_MODES.CREATE);
    };

    const handleClosePanel = () => {
        setPanelMode(null);
        setSelectedArticleId(null);
    };

    return {
        panelMode,
        selectedArticleId,
        handleArticleClick,
        handleEdit,
        handleAddArticle,
        handleClosePanel,
        setPanelMode
    };
};
