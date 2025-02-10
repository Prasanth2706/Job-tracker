import { useState } from "react";

function JobList({ jobs, deleteJob, updateJob }) {
  const [editingId, setEditingId] = useState(null);
  const [editedJob, setEditedJob] = useState({ title: "", company: "", status: "", date: "" });

  const handleEdit = (job) => {
    setEditingId(job.id);
    setEditedJob(job);
  };

  const handleUpdate = () => {
    updateJob(editingId, editedJob);
    setEditingId(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Job List</h2>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id} className="border-b p-2 flex justify-between items-center">
              {editingId === job.id ? (
                <>
                  <input
                    type="text"
                    value={editedJob.title}
                    onChange={(e) => setEditedJob({ ...editedJob, title: e.target.value })}
                    className="border p-1"
                  />
                  <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1">Save</button>
                </>
              ) : (
                <>
                  <div>
                    <p><strong>{job.title}</strong> at {job.company}</p>
                    <p>Status: {job.status} | Applied on: {job.date}</p>
                  </div>
                  <div>
                    <button onClick={() => handleEdit(job)} className="bg-yellow-500 text-white px-2 py-1 mr-2">Edit</button>
                    <button onClick={() => deleteJob(job.id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
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
