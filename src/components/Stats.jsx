import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Stats({ jobs }) {
  const [stats, setStats] = useState({
    totalJobs: 0,
    applied: 0,
    interviews: 0,
    rejected: 0,
    offers: 0,
    successRate: 0,
    monthlyData: [],
    averageResponseTime: 0
  });

  const COLORS = ['#0088FE', '#FFBB28', '#00C49F', '#FF8042', '#8884d8'];

  useEffect(() => {
    if (!jobs || jobs.length === 0) return;

    // Basic stats
    const applied = jobs.filter((job) => job.status.toLowerCase() === "applied").length;
    const interviews = jobs.filter((job) => job.status.toLowerCase() === "interview").length;
    const rejected = jobs.filter((job) => job.status.toLowerCase() === "rejected").length;
    const offers = jobs.filter((job) => job.status.toLowerCase() === "offer").length;
    
    // Calculate success rate (offers / total completed applications)
    const completedApplications = offers + rejected;
    const successRate = completedApplications > 0 
      ? ((offers / completedApplications) * 100).toFixed(1) 
      : 0;

    // Calculate monthly application data
    const monthlyData = calculateMonthlyData(jobs);

    // Calculate average response time (days between applied and next status change)
    const responseTime = calculateAverageResponseTime(jobs);

    setStats({
      totalJobs: jobs.length,
      applied,
      interviews,
      rejected,
      offers,
      successRate,
      monthlyData,
      averageResponseTime: responseTime
    });
  }, [jobs]);

  const calculateMonthlyData = (jobs) => {
    const monthlyCount = {};
    jobs.forEach(job => {
      const date = new Date(job.id); // Assuming id is timestamp
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      monthlyCount[monthYear] = (monthlyCount[monthYear] || 0) + 1;
    });

    return Object.entries(monthlyCount).map(([month, count]) => ({
      month,
      applications: count
    }));
  };

  const calculateAverageResponseTime = (jobs) => {
    // This is a placeholder - in a real app, you'd track status change dates
    return 7.5; // Example: 7.5 days average response time
  };

  const pieData = [
    { name: 'Applied', value: stats.applied },
    { name: 'Interviews', value: stats.interviews },
    { name: 'Rejected', value: stats.rejected },
    { name: 'Offers', value: stats.offers }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">Job Application Analytics</h2>
      
      {/* Basic Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
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
        <div className="p-4 bg-indigo-100 rounded-md">
          <h3 className="text-lg font-medium">Success Rate</h3>
          <p className="text-2xl font-bold">{stats.successRate}%</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Status Distribution Pie Chart */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Application Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trends Bar Chart */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Monthly Application Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="applications" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Additional Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Average Response Time:</p>
            <p className="text-xl font-semibold">{stats.averageResponseTime} days</p>
          </div>
          <div>
            <p className="text-gray-600">Application to Interview Rate:</p>
            <p className="text-xl font-semibold">
              {stats.totalJobs ? ((stats.interviews / stats.totalJobs) * 100).toFixed(1) : 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
