import { Button } from '@/components/atoms/Button';
import { SidebarItem } from '@/components/molecules/SidebarItem';

const NAV_ITEMS = [
    { label: 'Dashboard', active: true },
    { label: 'User management', active: false },
    { label: 'Documents', active: false },
    { label: 'Statistics', active: false },
    { label: 'Settings', active: false }
] as const;

export const Sidebar = () => {
    return (
        <aside className="flex w-56 shrink-0 flex-col bg-gray-900">
            <div className="flex flex-col gap-1 p-4">
                <div className="mb-4 text-xl font-semibold text-white">senirop</div>
                {NAV_ITEMS.map((item) => (
                    <SidebarItem
                        key={item.label}
                        label={item.label}
                        active={item.active}
                    />
                ))}
            </div>
            <div className="mt-auto p-4">
                <Button variant="sidebar" onClick={() => {}}>
                    Logout
                </Button>
            </div>
        </aside>
    );
};
