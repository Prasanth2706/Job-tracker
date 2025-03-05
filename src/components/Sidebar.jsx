import { LayoutDashboard, BarChart, User, X } from "lucide-react";

function Sidebar({ setActiveSection, sidebarOpen, setSidebarOpen }) {
  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "stats", name: "Stats", icon: BarChart },
    { id: "profile", name: "Profile", icon: User },
  ];

  return (
    <>
      {/* ✅ Sidebar - Opens/Closes Smoothly */}
      <div
        className={`fixed top-15 left-0 h-screen w-[240px] bg-gray-900 text-white p-6 flex flex-col transition-transform duration-300 ease-in-out z-[999] 
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
      >
        {/* ✅ Close Button (Only on Mobile) */}
        <div className="flex justify-between items-center mb-6 sm:hidden">
          <h2 className="text-lg font-semibold text-white">Job Tracker</h2>
          <X
            className="w-6 h-6 cursor-pointer text-white hover:text-gray-400"
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        {/* ✅ Sidebar Menu */}
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-gray-700 transition"
              onClick={() => {
                setActiveSection(item.id);
                setSidebarOpen(false); // Close sidebar on mobile when clicking
              }}
            >
              <item.icon className="w-5 h-5 text-white" />
              <span className="text-white">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Hamburger Menu Button (Mobile) */}
      {!sidebarOpen && (
        <button
          className="sm:hidden fixed top-4 left-4 z-[1000] bg-gray-900 text-white px-1 py-0 text-lg rounded-md"
          style={{ fontSize: "20px", top: "16px", left: "16px" }} // 🔹 Adjust position
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
      )}
    </>
  );
}

export default Sidebar;
