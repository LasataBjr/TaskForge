import {NavLink} from "react-router-dom";
import {
  FiGrid,
  FiFolder,
  FiCheckSquare,
  FiSettings,
} from "react-icons/fi";

function Sidebar(){
    const links = [
        {
        name: "Dashboard",
        path: "/",
        icon: <FiGrid size={18} />,
        },
        {
        name: "Projects",
        path: "/projects",
        icon: <FiFolder size={18} />,
        },
        {
        name: "Tasks",
        path: "/tasks",
        icon: <FiCheckSquare size={18} />,
        },
        {
        name: "Settings",
        path: "/settings",
        icon: <FiSettings size={18} />,
        },
    ];


    return(
        <aside className="w-64 border-r border-slate-200 bg-white">
        <div className="p-6">
            <h1 className="text-2xl font-bold text-slate-900">
            TaskForge
            </h1>

            <p className="mt-1 text-sm text-slate-500">
            Project Management
            </p>
        </div>

        <nav className="px-4">
            <ul className="space-y-2">
            {links.map((link) => ( 
                <li key={link.path}>
                <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`
                    }
                >
                    {link.icon}
                    {link.name}
                </NavLink>
                </li>
            ))}
            </ul>
        </nav>
        </aside>
    );
}

export default Sidebar;