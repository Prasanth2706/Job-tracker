import { useEffect, useState } from "react";
import { Bell, User, Search, X } from "lucide-react";

function Navbar({ jobs }) {
  const [showProfile, setShowProfile] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });

  // ✅ Load user data from localStorage on mount

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  // Categorizing job applications
  const appliedJobs = jobs.filter(
    (job) => job.status.toLowerCase() === "applied"
  );
  const interviewJobs = jobs.filter(
    (job) => job.status.toLowerCase() === "interview"
  );
  const rejectedJobs = jobs.filter(
    (job) => job.status.toLowerCase() === "rejected"
  );
  const offerJobs = jobs.filter((job) => job.status.toLowerCase() === "offer");

  // Handle user input changes
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* ✅ Navbar Always Visible */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-50">
        {/* Left - App Title */}
        <h1 className="text-xl font-semibold text-gray-800">Job Tracker</h1>

        {/* Center - Search Bar */}
        {/* <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md w-64">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search jobs..."
            className="bg-transparent outline-none px-2 text-gray-700 w-full"
          />
        </div> */}

        {/* Right - Notifications & Profile */}
        <div className="flex items-center gap-4 relative">
          <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-500" />

          {/* Profile Icon - Clicking Opens Profile Popup */}
          <User
            className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-500"
            onClick={() => setShowProfile(true)}
          />
        </div>
      </nav>

      {/* ✅ Profile Modal with Editable Name & Email */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
              <X
                className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setShowProfile(false)}
              />
            </div>

            {/* User Info - Editable */}
            <div className="mb-4">
              <h2 className="text-gray-800 font-medium">Name: {userInfo.name}</h2>
              <p className="text-gray-800">Email: {userInfo.email}</p>
            </div>

            {/* Applications Summary */}
            <div className="bg-gray-100 p-3 rounded-lg mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Applications Summary
              </h3>
              <ul className="list-none text-gray-700">
                <li>📤 Applied: {appliedJobs.length}</li>
                <li>📅 Interviews: {interviewJobs.length}</li>
                <li>❌ Rejected: {rejectedJobs.length}</li>
                <li>🏆 Offers: {offerJobs.length}</li>
              </ul>
            </div>

            {/* Job Applications List - Scrollable */}
            <div className="max-h-48 overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Recent Applications
              </h3>
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <div
                    key={job.id}
                    className="border p-3 rounded-md mb-2 bg-gray-50"
                  >
                    <p className="text-gray-800">
                      <strong>Company:</strong> {job.company}
                    </p>
                    <p className="text-gray-800">
                      <strong>Title:</strong> {job.title}
                    </p>
                    <p className="text-gray-700">
                      <strong>Status:</strong> {job.status}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Date:</strong> {job.date}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No job applications found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
