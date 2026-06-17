import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom"; 

function MainLayout() { 
  //  Declare the search state globally in the layout wrapper
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Pass the value and setter function into the Navbar */}
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <main className="flex-1 overflow-y-auto p-6">
         {/* Pass the search query down to child routes using context */}
          <Outlet context={[searchQuery]} />
        </main>

      </div>
    </div>
  );
}

export default MainLayout;