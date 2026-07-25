import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TodayPage from "./pages/TodayPage";
import UpcomingPage from "./pages/UpcomingPage";
import KanbanPage from "./pages/KanbanPage";
import AISummaryPage from "./pages/AISummaryPage";1
import AnalyticsPage from "./pages/AnalyticsPage";
import CalendarPage from "./pages/CalendarPage";
import NotificationsPage from "./pages/NotificationsPage";
import TrashPage from "./pages/TrashPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import CategoryPage from "./pages/CategoryPage";
import CompletedPage from "./pages/CompletedPage";
import NotFoundPage from "./pages/NotFoundPage";
import PaymentPage from './pages/PaymentPage';
const App = () => (
  
    <Routes>

      <Route path="/" element={<LandingPage />} />
       
      <Route path="/home" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/payment" element={<PaymentPage />} />

      <Route element={<ProtectedRoute />}>

        <Route path="/app" element={<AppLayout />}>

          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="today"
            element={<TodayPage />}
          />

          <Route
            path="upcoming"
            element={<UpcomingPage />}
          />

          <Route
            path="kanban"
            element={<KanbanPage />}
          />

          <Route
            path="ai-summary"
            element={<AISummaryPage />}
          />

          <Route
            path="analytics"
            element={<AnalyticsPage />}
          />

          <Route
            path="calendar"
            element={<CalendarPage />}
          />

          <Route
            path="notifications"
            element={<NotificationsPage />}
          />

          <Route
            path="trash"
            element={<TrashPage />}
          />

          <Route
            path="settings"
            element={<SettingsPage />}
          />

          <Route
            path="profile"
            element={<ProfilePage />}
          />

          <Route
            path="category/:slug"
            element={<CategoryPage />}
          />

          <Route
            path="completed"
            element={<CompletedPage />}
          />

        </Route>

      </Route>

      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  
);

export default App;