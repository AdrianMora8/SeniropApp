export interface SidebarItemProps {
    label: string;
    active?: boolean;
    onClick?: () => void;
}

export const SidebarItem = ({ label, active = false, onClick }: SidebarItemProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full px-4 py-2.5 text-left text-sm text-white transition-colors ${
                active ? 'bg-gray-700' : 'hover:bg-gray-700/50'
            }`}
        >
            {label}
        </button>
    );
};
