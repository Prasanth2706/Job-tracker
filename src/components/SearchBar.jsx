import { useState } from "react";

function SearchBar({ onSearch, onFilter }) {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilter = (e) => {
    setStatusFilter(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by job title or company..."
        value={searchText}
        onChange={handleSearch}
        className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Status Filter Dropdown */}
      <select
        value={statusFilter}
        onChange={handleFilter}
        className="w-full sm:w-auto p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
  );
}

export default SearchBar;