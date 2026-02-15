import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/shared/components/organisms/Sidebar';

export const MainLayout = () => {
    return (
        <div className="h-screen flex overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-auto bg-[rgb(var(--color-bg-secondary))]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};