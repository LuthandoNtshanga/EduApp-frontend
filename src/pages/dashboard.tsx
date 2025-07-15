import PrivateRoute from "../components/common/PrivateRoute";
import Header from "../components/common/Header";
import DashboardLayout from "../components/layouts/DashboardLayout";
import Card from '../components/common/Card';
import ChatBox from '../components/common/ChatBox';

export default function Dashboard() {
  return (
    <PrivateRoute>
      <Header />
      <DashboardLayout>
        <section>
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <div className="dashboard-grid">
            {/* Main dashboard widgets */}
            <div className="dashboard-main">
              <Card title="Courses In Progress">
                <div>Continue your current learning paths and track your progress.</div>
              </Card>
              <Card title="Completed Lessons">
                <div>Review lessons you have finished and revisit key concepts.</div>
              </Card>
              <Card title="AI Suggestions">
                <div>Get personalized recommendations and next steps from the AI assistant.</div>
              </Card>
            </div>
            {/* ChatBox as a tutor assistant */}
            <aside className="dashboard-aside">
              <Card title="Tutor Assistant">
                <ChatBox />
              </Card>
            </aside>
          </div>
        </section>
      </DashboardLayout>
    </PrivateRoute>
  );
}
