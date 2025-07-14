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
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Dashboard Overview</h1>
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main dashboard widgets */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
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
          <div className="flex flex-col">
            <Card title="Tutor Assistant">
              <ChatBox />
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </PrivateRoute>
  );
}
