import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Bell,
  User,
  Search,
  X,
  Menu,
  Briefcase,
  ChevronDown,
} from "lucide-react";

function Navbar({ jobs, userInfo, setSidebarOpen }) {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [lastSeenJobs, setLastSeenJobs] = useState(() => {
    const saved = localStorage.getItem("lastSeenJobs");
    return saved ? JSON.parse(saved) : [];
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const [quote, setQuote] = useState("");
  const [showQuote, setShowQuote] = useState(false);

  // Fetch a random quote from the Quotable API
   
  const notificationRef = useRef(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://dummyjson.com/quotes");
        const data = await response.json();
        // Get a random quote from the array
        const randomIndex = Math.floor(Math.random() * data.quotes.length);
        setQuote(data.quotes[randomIndex].quote);
        setShowQuote(true);
        setTimeout(() => setShowQuote(false), 3000);

      } catch (error) {
        console.error("Error fetching quote:", error);
        setQuote(
          "Success is not final, failure is not fatal: it is the courage to continue that counts."
        );
      }
    };

    fetchQuote();
  }, []);

  // Handle click outside notifications
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check for new jobs
  useEffect(() => {
    if (jobs.length > 0) {
      const lastSeenJobIds = new Set(lastSeenJobs.map((job) => job.id));
      const hasNewJobs = jobs.some((job) => !lastSeenJobIds.has(job.id));
      setHasUnreadNotifications(hasNewJobs);
    }
  }, [jobs, lastSeenJobs]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset unread notifications when viewing them
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setHasUnreadNotifications(false);
      // Update lastSeenJobs with current jobs
      setLastSeenJobs(jobs);
      localStorage.setItem("lastSeenJobs", JSON.stringify(jobs));
    }
  };

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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "applied":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "interview":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      case "offer":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <>
      {/* Enhanced Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg border-b border-gray-100 py-3 px-4 flex justify-between items-center z-50">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {isMobile ? (
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="group relative p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Menu className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Job Tracker
                </h2>
              </div>
              <div className="absolute inset-0 border border-gray-200 rounded-xl scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200" />
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2.5 rounded-xl shadow-lg">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Job Tracker
              </h1>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={handleNotificationClick}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200 relative"
            >
              <Bell className="w-6 h-6 text-gray-600" />
              {hasUnreadNotifications && jobs.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 transform origin-top-right transition-all duration-200">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">
                    Recent Activity
                  </h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {jobs
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 5)
                    .map((job) => (
                      <div
                        key={job.id}
                        className="px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${getStatusColor(
                              job.status
                            )}`}
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {job.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {job.company}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {new Date(job.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Button */}
          <button
            onClick={() => setShowProfile(true)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center ring-2 ring-white">
              <User className="w-4 h-4 text-white" />
            </div>
            {!isMobile && (
              <>
                <span className="text-sm font-medium text-gray-700">
                  {userInfo.name}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Enhanced Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className={`bg-white rounded-xl shadow-2xl ${
              isMobile ? "w-[90%]" : "w-[450px]"
            } max-h-[90vh] overflow-hidden`}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {userInfo.name}
                  </h2>
                  <p className="text-sm text-gray-500">{userInfo.email}</p>
                </div>
              </div>
              <button
                onClick={() => setShowProfile(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Applications Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-sm text-blue-600 font-medium">Applied</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {appliedJobs.length}
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                  <p className="text-sm text-yellow-600 font-medium">
                    Interviews
                  </p>
                  <p className="text-2xl font-bold text-yellow-700">
                    {interviewJobs.length}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                  <p className="text-sm text-red-600 font-medium">Rejected</p>
                  <p className="text-2xl font-bold text-red-700">
                    {rejectedJobs.length}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                  <p className="text-sm text-green-600 font-medium">Offers</p>
                  <p className="text-2xl font-bold text-green-700">
                    {offerJobs.length}
                  </p>
                </div>
              </div>

              {/* Recent Applications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Applications
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {jobs.length > 0 ? (
                    jobs
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .slice(0, 5)
                      .map((job) => (
                        <div
                          key={job.id}
                          className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors duration-200"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">
                              {job.title}
                            </h4>
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                job.status
                              )}`}
                            >
                              {job.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{job.company}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            Applied on {new Date(job.date).toLocaleDateString()}
                          </p>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No job applications found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Display the fetched quote */}
      {showQuote &&  <div className="fixed bottom-4 left-4 right-4 md:left-4 md:right-auto md:w-96 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-7.636 6.03-8.188l.893 1.378c-3.335.801-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 1.905 1.831 1.831 3.01 0 1.89-1.078 5.087-1.078 5.087s-1.078-2.584-1.078-5.087c0-1.179.101-2.843 1.905-3.01 1.021-.094 1.923.14 2.76.577 1.56.799 2.924 2.312 3.612 4.025 1.19 2.97 1.19 6.207 0 9.177-.688 1.713-2.052 3.226-3.612 4.025-1.56.799-3.366.799-4.926 0-1.56-.799-2.924-2.312-3.612-4.025z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-700 text-sm leading-relaxed italic">
              "{quote}"
            </p>
            <p className="text-xs text-gray-400 mt-1">Daily Motivation</p>
          </div>
        </div>
      </div>}
    </>
  );
}

export default Navbar;
