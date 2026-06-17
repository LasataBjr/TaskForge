// src/pages/Tasks.jsx
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom"; //Import the context hook
import { initialTasks } from "../data/mockTasks";
import TaskCard from "../components/TaskCard";

function Tasks() {
  // Dynamic Initialization Function
  // Instead of passing a raw array, we check localStorage first. If it's empty, we load initialTasks.
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("taskforge_tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Grab the real-time search text from the layout wrapper context
  const [searchQuery] = useOutletContext();

  // Blank template for a new task form
  const emptyFormState = {
    title: "",
    description: "",
    project: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  };
  const [formData, setFormData] = useState(emptyFormState);

  // The LocalStorage Sync Sync Hook
  // This runs automatically every single time the 'tasks' array changes!
  useEffect(() => {
    localStorage.setItem("taskforge_tasks", JSON.stringify(tasks));
  }, [tasks]); // The dependency array tells React to only run this when 'tasks' updates

  // Handle Deletion
  const handleDeleteTask = (taskId) => { 
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Handle typing inside input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Submitting Form
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Stop page from refreshing!

    // Safety validation
    if (!formData.title || !formData.project || !formData.dueDate) {
      alert("Please fill in Title, Project, and Due Date!");
      return;
    }

    const newTaskObj = {
      id: `task-${Date.now()}`, // Generate a unique timestamp id
      ...formData,
    };

    setTasks([newTaskObj, ...tasks]); // Put the new task at the top of the list!
    setFormData(emptyFormState);     // Reset form fields
    setIsModalOpen(false);           // Close the modal popup
  };

  //  DERIVED STATE CALCULATIONS (Runs automatically on every keystroke)
  const filteredTasks = tasks.filter((task) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      task.title.toLowerCase().includes(searchLower) ||
      task.project.toLowerCase().includes(searchLower) ||
      task.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6 w-full block relative">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Task Management</h1>
          <p className="text-slate-500 text-sm">Review, sort, and organize your active milestones.</p>
        </div>
        
        {/* Open Modal Button */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-xs cursor-pointer"
        >
          + Add Task
        </button>
      </div>

      {/* Grid Display using our derived array 'filteredTasks' */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12 bg-white border border-slate-200 rounded-xl">
          <p className="text-slate-500 font-medium">
            {searchQuery ? `No tasks found matching "${searchQuery}"` : "All clear! No tasks found."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} />
          ))}
        </div>
      )}

      {/* POPUP MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Create New Task</h2>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Title Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Task Title</label>
                <input 
                  type="text" name="title" value={formData.title} onChange={handleInputChange}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white transition-all"
                  placeholder="e.g., Fix Navigation Layout"
                />
              </div>

              {/* Project Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Project Name</label>
                <input 
                  type="text" name="project" value={formData.project} onChange={handleInputChange}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white transition-all"
                  placeholder="e.g., TaskForge Core"
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
                <textarea 
                  name="description" value={formData.description} onChange={handleInputChange} rows="2"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white transition-all resize-none"
                  placeholder="Provide brief task requirements..."
                />
              </div>

              {/* Dropdowns Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Priority</label>
                  <select 
                    name="priority" value={formData.priority} onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-hidden bg-slate-50 focus:border-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Due Date</label>
                  <input 
                    type="date" name="dueDate" value={formData.dueDate} onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-hidden bg-slate-50 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button 
                  type="button" onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 shadow-xs cursor-pointer"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks;