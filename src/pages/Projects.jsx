// src/pages/Projects.jsx
import { useState } from "react";
import { initialTasks } from "../data/mockTasks";
import { FiFolder, FiCheckCircle, FiClock } from "react-icons/fi";

function Projects() {
  const [tasks] = useState(() => {
    const savedTasks = localStorage.getItem("taskforge_tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  // Extract unique project titles
  const projectNames = [...new Set(tasks.map((t) => t.project))];

  return (
    <div className="space-y-6 w-full block">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Tracked Projects</h1>
        <p className="text-slate-500 text-sm">High-level operational overview of active development initiatives.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectNames.map((name, idx) => {
          const projectTasks = tasks.filter((t) => t.project === name);
          const completedCount = projectTasks.filter((t) => t.status === "Completed").length;
          const pendingCount = projectTasks.filter((t) => t.status !== "Completed").length;
          const completionPercentage = Math.round((completedCount / projectTasks.length) * 100) || 0;

          return (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-xs transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <FiFolder size={20} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-800">{name}</h2>
                    <p className="text-xs text-slate-400">{projectTasks.length} Total Allocations</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg">
                  {completionPercentage}% Done
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="space-y-4">
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>

                {/* Micro Sub-counters */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-50 text-xs font-medium">
                  <div className="flex items-center gap-2 text-amber-600">
                    <FiClock size={14} />
                    <span>{pendingCount} Active Targets</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <FiCheckCircle size={14} />
                    <span>{completedCount} Finalized</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Projects;