import { FiSearch, FiBell } from "react-icons/fi";
import { useLocation } from "react-router-dom";


// Accept search props from MainLayout
function Navbar({ searchQuery, setSearchQuery }) {
  const location = useLocation();

  const pageTitles = {
    "/": "Dashboard",
    "/projects": "Projects",
    "/tasks": "Tasks",
    "/settings": "Settings",
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          {pageTitles[location.pathname]}
        </h2>

        <p className="text-sm text-slate-500">
          Welcome back 
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <FiSearch className="text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            // Bind value to the layout's state
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-sm"
          />
        </div>

        {/* Notifications */}
        <button className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-100">
          <FiBell size={18} />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white">
            A
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-900">
              ASA
            </p>

            <p className="text-xs text-slate-500">
              Developer
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;