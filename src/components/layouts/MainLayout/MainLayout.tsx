import { Sidebar } from '@/components/organisms/Sidebar';

export interface MainLayoutProps {
    children?: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-1 flex-col bg-gray-50">
                {children}
            </div>
        </div>
    );
};
