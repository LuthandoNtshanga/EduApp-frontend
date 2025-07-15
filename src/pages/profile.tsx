import PrivateRoute from "../components/common/PrivateRoute";
import Header from "../components/common/Header";
import Layout from '../components/common/Layout';
import { useUser } from '../context/UserContext';

export default function Profile() {
  const { user } = useUser();
  return (
    <PrivateRoute>
      <Header />
      <Layout>
        <h1 className="text-3xl font-bold text-blue-900 mb-4">User Profile</h1>
        <div className="profile-container">
          <div className="profile-card card">
            <div className="profile-avatar">
              <span role="img" aria-label="avatar" className="avatar-icon">👤</span>
            </div>
            <div className="profile-info">
              <h2 className="profile-name">{user?.name || 'User Name'}</h2>
              <p className="profile-email">{user?.email || 'user@email.com'}</p>
            </div>
            <div className="profile-settings">
              <button className="btn btn-secondary">Edit Profile</button>
              <button className="btn btn-secondary">Settings</button>
            </div>
          </div>
        </div>
      </Layout>
    </PrivateRoute>
  );
} 