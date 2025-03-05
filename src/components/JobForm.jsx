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
    <div className="bg-white p-4 sm:p-6 rounded-lg ">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
        Add a New Job
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Title */}
        <div>
          <label className="block text-sm sm:text-base text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-sm sm:text-base text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            name="company"
            value={jobData.company}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm sm:text-base text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={jobData.status}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
          </select>
        </div>

        {/* Date Applied */}
        <div>
          <label className="block text-sm sm:text-base text-gray-700">
            Date Applied
          </label>
          <input
            type="date"
            name="date"
            value={jobData.date}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add Job
        </button>
      </form>
    </div>
  );
}

export default JobForm;
