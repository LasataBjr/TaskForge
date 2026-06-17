// src/pages/Settings.jsx
import { useOutletContext } from "react-router-dom";
import { useState } from "react";

function Settings() {
  // Grab the global layout contextual arrays
  const [, profile, setProfile] = useOutletContext();

  // Create local states to handle input field forms typing changes safely
  const [nameInput, setNameInput] = useState(profile.name);
  const [roleInput, setRoleInput] = useState(profile.role);
  const [showSaveNotice, setShowSaveNotice] = useState(false);

  const handleProfileSave = (e) => {
    e.preventDefault();
    if (!nameInput.trim() || !roleInput.trim()) return;

    // Mutate parent states global parameters
    setProfile({
      name: nameInput,
      role: roleInput
    });

    setShowSaveNotice(true);
    setTimeout(() => setShowSaveNotice(false), 3000); // clear banner automatically
  };

  return (
    <div className="space-y-6 w-full max-w-xl block">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">System Settings</h1>
        <p className="text-slate-500 text-sm">Personalize your administrative dashboard profiles parameters.</p>
      </div>

      {showSaveNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-medium transition-all animate-fade-in">
          ✓ Profile configuration parameters updated successfully!
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
        <h2 className="text-base font-bold text-slate-800 mb-4">Identity Profiles Parameters</h2>
        
        <form onSubmit={handleProfileSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Display Username</label>
            <input 
              type="text" 
              value={nameInput} 
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title Role Designation</label>
            <input 
              type="text" 
              value={roleInput} 
              onChange={(e) => setRoleInput(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white transition-all"
            />
          </div>

          <div className="pt-2">
            <button 
              type="submit"
              className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
            >
              Save Parameters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;