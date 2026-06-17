// src/components/TaskCard.jsx
import { FiTrash2 } from "react-icons/fi";

function TaskCard({ task, onDelete, onUpdateStatus }) {
  const priorityColors = {
    Critical: "bg-red-100 text-red-800",
    High: "bg-orange-100 text-orange-800",
    Medium: "bg-amber-100 text-amber-800",
    Low: "bg-green-100 text-green-800",
  };

  const statusColors = {
    "Pending": "bg-slate-100 text-slate-700",
    "In Progress": "bg-blue-100 text-blue-700",
    "Completed": "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between space-y-4 relative">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {task.project}
          </span>
          <div className="flex space-x-1.5">
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
            <select
              value={task.status}
              onChange={(e) => onUpdateStatus(task.id, e.target.value)} // 👈 3. Fire the parent state action
              className={`text-xs px-2 py-0.5 rounded-full font-medium border-0 cursor-pointer outline-hidden focus:ring-2 focus:ring-blue-500/20 ${statusColors[task.status]}`}
            >
              <option value="Pending" className="bg-white text-slate-700">Pending</option>
              <option value="In Progress" className="bg-white text-blue-700">In Progress</option>
              <option value="Completed" className="bg-white text-emerald-700">Completed</option>
            </select>
          </div>
        </div>

        <h3 className="text-base font-semibold text-slate-800 line-clamp-1">
          {task.title}
        </h3>
        <p className="text-sm text-slate-500 mt-1 line-clamp-2">
          {task.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
        <span>Due Date:</span>
        <span className="text-slate-600">{task.dueDate}</span>
        
        {/* Interactive Delete Button */}
        <button 
          onClick={() => onDelete(task.id)} 
          className="text-slate-400 hover:text-red-600 p-1 rounded-lg transition-colors cursor-pointer"
          title="Delete Task"
        >
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default TaskCard;