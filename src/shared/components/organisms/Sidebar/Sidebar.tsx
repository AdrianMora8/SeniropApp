import { Button } from '@/shared/components/atoms/Button';
import { SidebarItem } from '@/shared/components/molecules/SidebarItem';
import logo from '@/assets/img/SeniropLogo.png';

const NAV_ITEMS = [
    { label: 'Dashboard', active: true },
    { label: 'User management', active: false },
    { label: 'Documents', active: false },
    { label: 'Statistics', active: false },
    { label: 'Settings', active: false }
] as const;

export const Sidebar = () => {
    return (
        <aside className="flex h-full w-68 shrink-0 flex-col bg-[#424242]">
            <div className="flex flex-1 flex-col gap-15 p-10 overflow-auto">
                <div>
                    <img src={logo} alt="Senirop Logo" className='w-full' />
                </div>
                {NAV_ITEMS.map((item) => (
                    <SidebarItem
                        key={item.label}
                        label={item.label}
                        active={item.active}
                    />
                ))}
            </div>
            <div className="w-full">
                <Button variant="sidebar" onClick={() => { }}>
                    Logout
                </Button>
            </div>
        </aside>
    );
};
