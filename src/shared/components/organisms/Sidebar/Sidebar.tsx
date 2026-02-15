import { useLocation } from 'react-router-dom';
import { Button } from '@/shared/components/atoms/Button';
import { SidebarItem } from '@/shared/components/molecules/SidebarItem';
import logo from '@/assets/img/SeniropLogo.png';

const NAV_ITEMS = [
    { label: 'Dashboard', path: '/' },
    { label: 'User management', path: '/users' },
    { label: 'Documents', path: '/documents' },
    { label: 'Statistics', path: '/statistics' },
    { label: 'Settings', path: '/settings' }
] as const;

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const location = useLocation();

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`
                fixed inset-y-0 left-0 z-50 flex h-full w-68 shrink-0 flex-col bg-[rgb(var(--color-bg-sidebar-dark))] transition-transform duration-300 ease-in-out
                md:translate-x-0 md:static
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-1 flex-col gap-15 p-10 overflow-auto">
                    <div className="flex items-center justify-between">
                        <img src={logo} alt="Senirop Logo" className='w-full' />
                    </div>
                    {NAV_ITEMS.map((item) => (
                        <SidebarItem
                            key={item.label}
                            label={item.label}
                            active={location.pathname === item.path || (item.path === '/' && location.pathname === '/dashboard')}
                        />
                    ))}
                </div>
                <div className="w-full">
                    <Button variant="sidebar" onClick={() => { }}>
                        Logout
                    </Button>
                </div>
            </aside>
        </>
    );
};
