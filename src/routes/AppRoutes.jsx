
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";
import Projects from "../pages/Projects";
import Settings from "../pages/Settings";

function AppRoutes() {
  return (
    <Routes>
      {/* MainLayout acts as the parent wrapper for all these routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;