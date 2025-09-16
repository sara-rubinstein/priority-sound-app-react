import React from 'react';

export default function RecentSearches({ recentSearches, handleRecentSearch }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <h2 className="text-xl font-semibold mb-4">Recent Searches</h2>
      {recentSearches.length > 0 ? (
        <div className="space-y-2">
          {recentSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => handleRecentSearch(search)}
              className="w-full text-left px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 text-sm"
            >
              {search}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm">No recent searches</p>
      )}
    </div>
  );
}
