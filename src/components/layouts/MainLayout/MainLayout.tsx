import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/organisms/Sidebar';

export const MainLayout = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-1 flex-col bg-gray-50">
                <Outlet />
            </div>
        </div>
    );
};
