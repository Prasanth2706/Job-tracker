import { useState } from "react";
import { Search, Filter, X } from "lucide-react";

function SearchBar({ onSearch, onFilter }) {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilter = (e) => {
    setStatusFilter(e.target.value);
    onFilter(e.target.value);
  };

  const clearSearch = () => {
    setSearchText("");
    onSearch("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied": return "text-blue-600 bg-blue-50 border-blue-100";
      case "Interview": return "text-yellow-600 bg-yellow-50 border-yellow-100";
      case "Rejected": return "text-red-600 bg-red-50 border-red-100";
      case "Offer": return "text-green-600 bg-green-50 border-green-100";
      default: return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Enhanced Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search jobs by title, company, or location..."
            value={searchText}
            onChange={handleSearch}
            className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-all duration-200 placeholder-gray-400 hover:bg-white"
          />
          {searchText && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
            </button>
          )}
        </div>

        {/* Enhanced Filter Section */}
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all duration-200
              ${statusFilter 
                ? 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100' 
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}
          >
            <Filter className="w-5 h-5" />
            <span className="font-medium">
              {statusFilter || "All Statuses"}
            </span>
          </button>

          {/* Filter Dropdown */}
          {isFilterOpen && (
            <div className="absolute top-full mt-2 right-0 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10">
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Filter by Status</h3>
              </div>
              <div className="p-2 space-y-1">
                {["", "Applied", "Interview", "Rejected", "Offer"].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      handleFilter({ target: { value: status } });
                      setIsFilterOpen(false);
                    }}
                    className={`w-full px-3 py-2 rounded-lg text-left transition-colors duration-200 flex items-center justify-between
                      ${status === statusFilter ? getStatusColor(status) : 'hover:bg-gray-50'}`}
                  >
                    <span>{status || "All Statuses"}</span>
                    {status === statusFilter && (
                      <div className={`w-2 h-2 rounded-full ${status ? getStatusColor(status) : 'bg-gray-400'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {statusFilter && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-gray-500">Active filters:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(statusFilter)}`}>
            {statusFilter}
            <button
              onClick={() => {
                setStatusFilter("");
                onFilter("");
              }}
              className="ml-2 hover:text-gray-700"
            >
              ×
            </button>
          </span>
        </div>
      )}
    </div>
  );
}

export default SearchBar;