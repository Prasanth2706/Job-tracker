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
    // console.log(newJob, "new");
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
    <div className="flex">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="ml-60 w-full p-6 mt-16 overflow-auto">
        {" "}
        {/* Ensures content doesn't overlap navbar */}
        <Navbar setActiveSection={setActiveSection} jobs={jobs} />
        {activeSection === "dashboard" && (
          <>
            <div className="mb-4">
              <SearchBar onSearch={setSearchText} onFilter={setStatusFilter} />
            </div>
            <JobForm addJob={addJob} />
            <JobList
              jobs={filteredJobs}
              deleteJob={deleteJob}
              updateJob={updateJob}
            />
          </>
        )}
        {activeSection === "stats" && <Stats jobs={jobs} />}
        {activeSection === "profile" && <Profile />}
      </div>
    </div>
  );
}

export default App;
