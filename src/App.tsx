import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import FormPage from './pages/FormPage';
import HistoryPage from './pages/HistoryPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/historique" element={<HistoryPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Layout>
      <Toaster position="bottom-right" />
    </>
  );
}
