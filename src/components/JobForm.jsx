import { useState } from "react";
import { Briefcase, Building2, Calendar, ListChecks, Loader2 } from 'lucide-react';

function JobForm({ addJob }) {
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    status: "Applied",
    date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobData.title || !jobData.company || !jobData.date) {
      alert("Please fill in all fields.");
      return;
    }
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 600)); // Simulate API call
    
    addJob(jobData);
    setJobData({ title: "", company: "", status: "Applied", date: "" });
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied": return "text-blue-600";
      case "Interview": return "text-yellow-600";
      case "Rejected": return "text-red-600";
      case "Offer": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="relative overflow-hidden bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      {/* Success Message */}
      <div
        className={`absolute top-4 right-4 bg-green-50 text-green-700 px-4 py-2 rounded-lg 
          transform transition-all duration-300 flex items-center gap-2
          ${showSuccess ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        ✓ Job added successfully!
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 rounded-xl shadow-lg">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Add a New Job
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Job Title */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2 group-hover:text-blue-600 transition-colors duration-200">
              <Briefcase className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors duration-200" />
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition-all duration-200 hover:border-gray-400 bg-gray-50 hover:bg-white"
              placeholder="e.g. Frontend Developer"
              required
            />
          </div>

          {/* Company Name */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2 group-hover:text-blue-600 transition-colors duration-200">
              <Building2 className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors duration-200" />
              Company Name
            </label>
            <input
              type="text"
              name="company"
              value={jobData.company}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition-all duration-200 hover:border-gray-400 bg-gray-50 hover:bg-white"
              placeholder="e.g. Google"
              required
            />
          </div>

          {/* Status */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2 group-hover:text-blue-600 transition-colors duration-200">
              <ListChecks className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors duration-200" />
              Status
            </label>
            <select
              name="status"
              value={jobData.status}
              onChange={handleChange}
              className={`w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition-all duration-200 hover:border-gray-400 bg-gray-50 hover:bg-white ${getStatusColor(jobData.status)}`}
            >
              <option value="Applied" className="text-blue-600">Applied</option>
              <option value="Interview" className="text-yellow-600">Interview</option>
              <option value="Rejected" className="text-red-600">Rejected</option>
              <option value="Offer" className="text-green-600">Offer</option>
            </select>
          </div>

          {/* Date Applied */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2 group-hover:text-blue-600 transition-colors duration-200">
              <Calendar className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors duration-200" />
              Date Applied
            </label>
            <input
              type="date"
              name="date"
              value={jobData.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition-all duration-200 hover:border-gray-400 bg-gray-50 hover:bg-white"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-xl
              transition-all duration-300 flex items-center justify-center gap-2 font-medium
              shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:scale-[0.99]
              ${isSubmitting ? 'opacity-90 cursor-not-allowed' : 'hover:from-blue-700 hover:to-blue-800'}`}
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Briefcase className="w-5 h-5" />
            )}
            {isSubmitting ? 'Adding Job...' : 'Add Job Application'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
