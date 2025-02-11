import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import JobList from "./components/JobList";
import JobForm from "./components/JobForm";
import SearchBar from "./components/SearchBar";
import Stats from "./components/Stats";
import Profile from "./components/Profile"; // ✅ Import Profile Component

function App() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard"); // ✅ Track active section
  const [userInfo, setUserInfo] = useState({ name: "Guest", email: "No Mail" });
  const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ Sidebar state

  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs");
    if (storedJobs) {
      try {
        const parsedJobs = JSON.parse(storedJobs);
        if (Array.isArray(parsedJobs)) {
          setJobs(parsedJobs);
          setFilteredJobs(parsedJobs);
        } else {
          console.error("Invalid jobs data in local storage.");
        }
      } catch (error) {
        console.error("Error parsing jobs from local storage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (jobs.length > 0) {
      localStorage.setItem("jobs", JSON.stringify(jobs));
    }
  }, [jobs]);

  const addJob = (newJob) => {
    const updatedJobs = [
      ...jobs,
      { ...newJob, id: Date.now(), status: newJob.status || "applied" },
    ];
    setJobs(updatedJobs);
    setFilteredJobs(updatedJobs);
  };

  const deleteJob = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
    setFilteredJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  const updateJob = (id, updatedJob) => {
    const updatedJobs = jobs.map((job) =>
      job.id === id ? { ...job, ...updatedJob } : job
    );
    setJobs(updatedJobs);
    setFilteredJobs(updatedJobs);
  };

  useEffect(() => {
    let updatedJobs = jobs;
    if (searchText) {
      updatedJobs = updatedJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchText.toLowerCase()) ||
          job.company.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (statusFilter) {
      updatedJobs = updatedJobs.filter((job) => job.status === statusFilter);
    }
    setFilteredJobs(updatedJobs);
  }, [searchText, statusFilter, jobs]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-60" : "ml-0"
        } sm:ml-60 p-6 mt-16 overflow-auto`}
      >
        {/* Navbar */}
        <Navbar
          jobs={jobs}
          userInfo={userInfo}
          setActiveSection={setActiveSection}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Conditional Rendering of Sections */}
        {activeSection === "dashboard" && (
          <>
            <div className="mb-4">
              <SearchBar onSearch={setSearchText} onFilter={setStatusFilter} />
            </div>

            {/* Form + Job List Section */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Form */}
              <div className="w-full lg:w-1/2 bg-white p-4 rounded-lg shadow-md">
                <JobForm addJob={addJob} />
              </div>

              {/* Job List */}
              <div className="w-full lg:w-2/3">
                <JobList
                  jobs={filteredJobs}
                  deleteJob={deleteJob}
                  updateJob={updateJob}
                />
              </div>
            </div>
          </>
        )}
        {activeSection === "stats" && <Stats jobs={jobs} />}
        {activeSection === "profile" && (
          <Profile userInfo={userInfo} setUserInfo={setUserInfo} />
        )}
      </div>
    </div>
  );
}

export default App;
