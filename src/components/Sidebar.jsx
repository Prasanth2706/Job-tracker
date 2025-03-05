import { LayoutDashboard, BarChart, User, X } from "lucide-react";

function Sidebar({ setActiveSection, sidebarOpen, setSidebarOpen }) {
  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "stats", name: "Stats", icon: BarChart },
    { id: "profile", name: "Profile", icon: User },
  ];

  return (
    <>
      {/* Backdrop overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[998] lg:hidden
          transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      />
      

      {/* Enhanced Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-[280px] bg-gradient-to-b from-gray-900 to-gray-800 
          shadow-2xl backdrop-blur-lg backdrop-filter
          transition-all duration-300 ease-out z-[999] transform
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
          border-r border-white/10`}
      >
        {/* Logo and Close Button */}
        <div className="flex justify-between items-center h-[73px] px-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Job Tracker
            </h2>
          </div>
          <button
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 group"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
          </button>
        </div>

        {/* Enhanced Menu Items */}
        <div className="px-4 py-8">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className="group relative"
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
              >
                <div className="absolute inset-0 bg-white/[0.08] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div
                  className="relative flex items-center gap-3 p-4 rounded-xl cursor-pointer
                    hover:scale-[0.98] active:scale-[0.97] transition-all duration-200"
                >
                  <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors duration-200">
                    <item.icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-200" />
                  </div>
                  <span className="font-medium text-gray-200 group-hover:text-white transition-colors duration-200">
                    {item.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Profile Section at Bottom */}
        {/* <div className="absolute bottom-8 left-4 right-4">
          <div className="p-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] transition-colors duration-200 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Your Profile</p>
                <p className="text-xs text-gray-400">View settings</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Sidebar;
