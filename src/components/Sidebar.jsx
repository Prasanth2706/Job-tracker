import { LayoutDashboard, BarChart, User } from "lucide-react";

function Sidebar({ setActiveSection,sidebarOpen, setSidebarOpen  }) {
  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "stats", name: "Stats", icon: BarChart },
    { id: "profile", name: "Profile", icon: User },
  ];

  return (
    <div className="w-60 h-screen bg-gray-900 text-white p-6 flex flex-col fixed left-0 top-0">
      <h2 className="text-lg font-semibold mb-6">Job Tracker</h2>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-gray-700 transition max-w-full"
            onClick={() => setActiveSection(item.id)}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
