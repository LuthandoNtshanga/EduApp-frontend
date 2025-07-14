import PrivateRoute from "../components/common/PrivateRoute";
import Header from "../components/common/Header";
import Layout from '../components/common/Layout';

export default function Profile() {
  return (
    <PrivateRoute>
      <Header />
      <Layout>
        <h1 className="text-3xl font-bold text-blue-900 mb-4">User Profile</h1>
      </Layout>
    </PrivateRoute>
  );
} 