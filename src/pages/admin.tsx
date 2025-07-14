import AdminRoute from '../components/common/AdminRoute';
import Header from '../components/common/Header';

export default function AdminPage() {
  return (
    <AdminRoute>
      <Header />
      <div className="p-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p>Welcome, admin! Here you can manage the platform.</p>
      </div>
    </AdminRoute>
  );
} 