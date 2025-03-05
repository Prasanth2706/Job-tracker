import { useState } from "react";
import { Pencil, Trash2, Save, X, ClipboardList, AlertCircle } from 'lucide-react';

function JobList({ jobs, deleteJob, updateJob }) {
  const [editingId, setEditingId] = useState(null);
  const [editedJob, setEditedJob] = useState({
    title: "",
    company: "",
    status: "",
    date: "",
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const handleEdit = (job) => {
    setEditingId(job.id);
    setEditedJob(job);
  };

  const handleUpdate = () => {
    updateJob(editingId, editedJob);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setShowDeleteConfirm(null);
    deleteJob(id);
  };

  const getStatusBadgeClass = (status) => {
    const baseClass = "px-3 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-1.5";
    switch (status.toLowerCase()) {
      case "applied":
        return `${baseClass} bg-blue-100 text-blue-700 border border-blue-200`;
      case "interview":
        return `${baseClass} bg-yellow-100 text-yellow-700 border border-yellow-200`;
      case "rejected":
        return `${baseClass} bg-red-100 text-red-700 border border-red-200`;
      case "offer":
        return `${baseClass} bg-green-100 text-green-700 border border-green-200`;
      default:
        return `${baseClass} bg-gray-100 text-gray-700 border border-gray-200`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2.5 rounded-xl shadow-lg">
            <ClipboardList className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Job Applications
          </h2>
          <span className="ml-auto bg-purple-100 px-3 py-1 rounded-full text-sm font-medium text-purple-700 border border-purple-200">
            {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'}
          </span>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
            <ClipboardList className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No job applications yet</p>
            <p className="text-sm text-gray-500 mt-1">Add your first job application above!</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li
                key={job.id}
                className={`group border rounded-xl p-5 transition-all duration-200 
                  ${editingId === job.id 
                    ? 'bg-purple-50 border-purple-200 shadow-md' 
                    : 'bg-white hover:border-gray-300 hover:shadow-md'}`}
              >
                {editingId === job.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={editedJob.title}
                        onChange={(e) =>
                          setEditedJob({ ...editedJob, title: e.target.value })
                        }
                        className="p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                        placeholder="Job Title"
                      />
                      <input
                        type="text"
                        value={editedJob.company}
                        onChange={(e) =>
                          setEditedJob({ ...editedJob, company: e.target.value })
                        }
                        className="p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                        placeholder="Company"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <select
                        value={editedJob.status}
                        onChange={(e) =>
                          setEditedJob({ ...editedJob, status: e.target.value })
                        }
                        className="p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                      >
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Offer">Offer</option>
                      </select>
                      <input
                        type="date"
                        value={editedJob.date}
                        onChange={(e) =>
                          setEditedJob({ ...editedJob, date: e.target.value })
                        }
                        className="p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 
                          transition-all duration-200 flex items-center gap-2 hover:border-gray-400"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg 
                          hover:from-purple-700 hover:to-purple-800 transition-all duration-200 flex items-center gap-2
                          shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40"
                      >
                        <Save className="w-4 h-4" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-gray-900">{job.title}</h3>
                        <span className="text-gray-400">at</span>
                        <span className="font-medium text-gray-900">{job.company}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={getStatusBadgeClass(job.status)}>
                          {job.status}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center gap-1.5">
                          Applied on {new Date(job.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => handleEdit(job)}
                        className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg 
                          transition-colors duration-200"
                        title="Edit application"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(job.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg 
                          transition-colors duration-200"
                        title="Delete application"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

                      {/* Delete Confirmation */}
                      {showDeleteConfirm === job.id && (
                        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 p-4 transform translate-y-2">
                          <div className="flex items-center gap-3 text-red-600 mb-3">
                            <AlertCircle className="w-5 h-5" />
                            <span className="font-medium">Confirm Delete</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">
                            Are you sure you want to delete this job application? This action cannot be undone.
                          </p>
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setShowDeleteConfirm(null)}
                              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-700 transition-colors duration-200"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleDelete(job.id)}
                              className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default JobList;