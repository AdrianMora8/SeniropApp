import { MenuIcon } from '@/shared/icons';
import logo from '@/assets/img/SeniropLogo.png';

interface SidebarTriggerProps {
    onTrigger: () => void;
}

export const SidebarTrigger = ({ onTrigger }: SidebarTriggerProps) => {
    return (
        <div className="flex items-center justify-between p-4 border-b border-[rgb(var(--color-border-subtle))] md:hidden bg-[rgb(var(--color-bg-sidebar-dark))]">
            <div className="w-32">
                <img src={logo} alt="Senirop Logo" className="w-full" />
            </div>
            <button
                onClick={onTrigger}
                className="p-2 text-white hover:bg-white/10 rounded-md transition-colors"
                aria-label="Open sidebar"
            >
                <MenuIcon size={24} />
            </button>
        </div>
    );
};
