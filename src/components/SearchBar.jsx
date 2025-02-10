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
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by job title or company..."
        value={searchText}
        onChange={handleSearch}
        className="w-full p-2 border rounded-lg"
      />

      <select
        value={statusFilter}
        onChange={handleFilter}
        className="p-2 border rounded-lg"
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
