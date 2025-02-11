import { useState } from "react";

function JobList({ jobs, deleteJob, updateJob }) {
  const [editingId, setEditingId] = useState(null);
  const [editedJob, setEditedJob] = useState({
    title: "",
    company: "",
    status: "",
    date: "",
  });

  const handleEdit = (job) => {
    setEditingId(job.id);
    setEditedJob(job);
  };

  const handleUpdate = () => {
    updateJob(editingId, editedJob);
    setEditingId(null);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
        Job List
      </h2>
      {jobs.length === 0 ? (
        <p className="text-gray-600">No jobs found.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="border-b p-2 sm:p-3 flex flex-col sm:flex-row justify-between items-center"
            >
              {editingId === job.id ? (
                <>
                  {/* Edit Mode */}
                  <div className="w-full space-y-2">
                    <input
                      type="text"
                      value={editedJob.title}
                      onChange={(e) =>
                        setEditedJob({ ...editedJob, title: e.target.value })
                      }
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Job Title"
                    />
                    <button
                      onClick={handleUpdate}
                      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* View Mode */}
                  <div className="w-full">
                    <p className="text-sm sm:text-base font-medium text-gray-800">
                      <strong>{job.title}</strong> at {job.company}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Status: {job.status} | Applied on: {job.date}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => handleEdit(job)}
                      className="w-full sm:w-auto bg-yellow-500 text-white py-2 px-3 rounded-lg hover:bg-yellow-600 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteJob(job.id)}
                      className="w-full sm:w-auto bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default JobList;