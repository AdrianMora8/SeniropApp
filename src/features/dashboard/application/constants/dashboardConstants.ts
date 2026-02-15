export const DASHBOARD_PANEL_MODES = {
    CREATE: 'create',
    EDIT: 'edit',
    VIEW: 'view',
} as const;

export type DashboardPanelMode = typeof DASHBOARD_PANEL_MODES[keyof typeof DASHBOARD_PANEL_MODES];
