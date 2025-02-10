import { useState } from "react";

function JobForm({ addJob }) {
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    status: "Applied",
    date: "",
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!jobData.title || !jobData.company || !jobData.date) {
      alert("Please fill in all fields.");
      return;
    }

    addJob(jobData);

    // ✅ Clear input fields after adding a job
    setJobData({ title: "", company: "", status: "Applied", date: "" });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Job Title</label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Company Name</label>
          <input
            type="text"
            name="company"
            value={jobData.company}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Status</label>
          <select
            name="status"
            value={jobData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">offer</option>
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700">Date Applied</label>
          <input
            type="date"
            name="date"
            value={jobData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Add Job
        </button>
      </form>
    </div>
  );
}

export default JobForm;
