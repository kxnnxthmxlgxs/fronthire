import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ApplicationsPage from "../pages/ApplicationsPage";
import DashboardPage from "../pages/DashboardPage";
import InterviewsPage from "../pages/InterviewsPage";
import SettingsPage from "../pages/SettingsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/interviews" element={<InterviewsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;