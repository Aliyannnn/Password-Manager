import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="max-w-xl mx-auto mt-10 px-4 z-10 relative">
      <input
        type="text"
        placeholder="Search saved passwords..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 rounded-2xl bg-slate-800 text-white mt-15  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
    </div>
  );
};

export default SearchBar;
