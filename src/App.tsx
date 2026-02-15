import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './shared/components/layouts/MainLayout';
import { DashboardPage } from './pages/DashboardPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<DashboardPage />} />

                    {/* <Route path="settings" element={<SettingsPage />} /> */}
                    {/* <Route path="users" element={<UsersPage />} /> */}
                    {/* <Route path="documents" element={<DocumentsPage />} /> */}
                    {/* <Route path="statistics" element={<StatisticsPage />} /> */}

                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
