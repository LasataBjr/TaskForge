// src/layouts/MainLayout.jsx
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom"; 

function MainLayout() { 
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet /> {/*  Sub-routes will render right here! */}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;