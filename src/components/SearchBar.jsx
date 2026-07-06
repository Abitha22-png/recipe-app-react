import { Search } from "lucide-react";

function SearchBar({ onSearch }) {
  return (
    <div className="relative w-full max-w-sm">
      <Search
        size={20}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />

      <input
        type="text"
        placeholder="Search recipes..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full rounded-full border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
}

export default SearchBar;