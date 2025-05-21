import React, { useState } from "react";
import { Input } from "@/components/ui/input";
// import SearchModal from "./SearchModal";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  // const [isOpen, setIsOpen] = useState(false);

  // const handleSearch = () => {
  //   if (query.trim() !== "") {
  //     setIsOpen(true);
  //   }
  // };

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     handleSearch();
  //   }
  // };

  return (
    <div className="flex items-center lg:w-lg">
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
        </span>
        <Input
          type="text"
          placeholder="Search for properties"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          // onKeyDown={handleKeyDown}
          className="w-full max-w-sm text-white md:text-input placeholder:text-gray-400 border-primary pl-10"
        />
      </div>

      {/* <SearchModal query={query} isOpen={isOpen} setIsOpen={setIsOpen} /> */}
    </div>
  );
};

export default SearchBar;
