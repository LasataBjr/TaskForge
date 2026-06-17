import { useState } from "react";
import { initialTasks } from "../data/mockTasks";
import { FiCheckCircle, FiClock, FiAlertCircle, FiLayers } from "react-icons/fi";

function Dashboard() {
  // Read our single source of truth from localStorage so the dashboard matches the tasks page!
  const [tasks] = useState(() => {
    const savedTasks = localStorage.getItem("taskforge_tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  // ANALYTICS DERIVED STATE CALCULATIONS
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((t) => t.status === "Pending").length;
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress").length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  
  // Track how many critical items need attention
  const criticalTasksCount = tasks.filter((t) => t.priority === "Critical").length;

  // Get a unique list of active projects being tracked
  const uniqueProjects = [...new Set(tasks.map((t) => t.project))];

  return (
    <div className="space-y-8 w-full block">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Workspace Insights</h1>
        <p className="text-slate-500 text-sm">Here is a real-time status snapshot of your active operations.</p>
      </div>

      {/* METRICS GRID BANNER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Total Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-2xs">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
            <FiLayers size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Tasks</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{totalTasks}</h3>
          </div>
        </div>

        {/* In Progress Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-2xs">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
            <FiClock size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">In Progress</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{inProgressTasks}</h3>
          </div>
        </div>

        {/* Completed Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-2xs">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <FiCheckCircle size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Completed</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{completedTasks}</h3>
          </div>
        </div>

        {/* Critical Warning Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-2xs">
          <div className={`p-3 rounded-xl ${criticalTasksCount > 0 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-slate-50 text-slate-400'}`}>
            <FiAlertCircle size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Critical Alerts</p>
            <h3 className={`text-2xl font-bold mt-0.5 ${criticalTasksCount > 0 ? 'text-red-600' : 'text-slate-800'}`}>
              {criticalTasksCount}
            </h3>
          </div>
        </div>
      </div>

      {/* LOWER LAYOUT: TWO COLUMNS FOR DEEPER METRICS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Tracker List */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2">
          <h2 className="text-base font-bold text-slate-800 mb-4">Tracked Initiatives</h2>
          <div className="space-y-3">
            {uniqueProjects.map((projectName, index) => {
              const projectTasks = tasks.filter((t) => t.project === projectName);
              const done = projectTasks.filter((t) => t.status === "Completed").length;
              const percent = Math.round((done / projectTasks.length) * 100) || 0;

              return (
                <div key={index} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                  <div className="flex justify-between items-center text-sm font-medium text-slate-700 mb-2">
                    <span>{projectName}</span>
                    <span className="text-xs text-slate-500">{percent}% Complete</span>
                  </div>
                  {/* Tailwind Progress Bar */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full transition-all duration-500" 
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Status Summary Circle Stand-in */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-800 mb-1">Queue Overview</h2>
            <p className="text-xs text-slate-400 mb-4">Lifecycle operational breakdown</p>
            
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-slate-300"/> Unassigned / Pending</span>
                <span className="font-bold text-slate-700">{pendingTasks}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"/> In Active Assembly</span>
                <span className="font-bold text-slate-700">{inProgressTasks}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"/> Finalized Actions</span>
                <span className="font-bold text-slate-700">{completedTasks}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 mt-6 text-center text-xs text-slate-400">
            Metrics auto-refresh with user profile adjustments
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;