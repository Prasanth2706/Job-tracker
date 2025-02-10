import { useEffect, useState } from "react";

function Stats({ jobs }) {
  const [stats, setStats] = useState({
    totalJobs: 0,
    applied: 0,
    interviews: 0,
    rejected: 0,
    offers: 0,
  });

  useEffect(() => {
    if (!jobs || jobs.length === 0) return;

    setStats({
      totalJobs: jobs.length,
      applied: jobs.filter((job) => job.status.toLowerCase() === "applied").length,
      interviews: jobs.filter((job) => job.status.toLowerCase() === "interview").length,
      rejected: jobs.filter((job) => job.status.toLowerCase() === "rejected").length,
      offers: jobs.filter((job) => job.status.toLowerCase() === "offer").length,
    });
  }, [jobs]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Job Application Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 rounded-md">
          <h3 className="text-lg font-medium">Total Jobs</h3>
          <p className="text-2xl font-bold">{stats.totalJobs}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-md">
          <h3 className="text-lg font-medium">Applied</h3>
          <p className="text-2xl font-bold">{stats.applied}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-md">
          <h3 className="text-lg font-medium">Interviews</h3>
          <p className="text-2xl font-bold">{stats.interviews}</p>
        </div>
        <div className="p-4 bg-red-100 rounded-md">
          <h3 className="text-lg font-medium">Rejected</h3>
          <p className="text-2xl font-bold">{stats.rejected}</p>
        </div>
        <div className="p-4 bg-purple-100 rounded-md">
          <h3 className="text-lg font-medium">Offers</h3>
          <p className="text-2xl font-bold">{stats.offers}</p>
        </div>
      </div>
    </div>
  );
}

export default Stats;
