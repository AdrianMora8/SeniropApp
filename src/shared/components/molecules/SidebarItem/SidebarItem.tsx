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
            className={`w-full p-3 text-left text-lg text-[rgb(var(--color-text-inverse))]
                ${active ? 'font-semibold' : ''
                }`}
        >
            {label}
        </button>
    );
};
