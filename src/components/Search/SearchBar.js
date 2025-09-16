import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ searchTerm, setSearchTerm, handleSearch, loading }) {
  return (
    <div className="flex gap-3 mb-6">
      <div className="flex-1 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
          placeholder="Search for tracks, artists, or mixes..."
          className="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
        />
      </div>
      <button
        onClick={handleSearch}
        disabled={loading}
        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
      >
        <Search size={20} />
        {loading ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
}
