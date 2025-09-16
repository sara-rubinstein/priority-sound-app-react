import React from 'react';
import { Play, ChevronRight } from 'lucide-react';

export default function SearchResults({
  searchResults,
  viewMode,
  animatingTrack,
  getTrackImage,
  handleTrackClick,
  loading
}) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto"></div>
        <p className="mt-2 text-gray-300">Searching...</p>
      </div>
    );
  }
  if (!searchResults.length) return null;

  return viewMode === 'list' ? (
    <div className="space-y-4">
      {searchResults.map((track) => (
        <div
          key={track.key}
          onClick={() => handleTrackClick(track)}
          className={`flex items-center gap-4 p-4 bg-white/20 rounded-xl cursor-pointer hover:bg-cyan-500/30 transition-all duration-300 border border-white/10 hover:border-cyan-400/50 shadow-md hover:shadow-xl ${
            animatingTrack?.key === track.key ? 'animate-pulse bg-cyan-400/20' : ''
          }`}
        >
          <img
            src={getTrackImage(track)}
            alt={track.name}
            className="w-16 h-16 rounded-lg object-cover shadow"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-lg truncate">{track.name}</h3>
            <p className="text-sm text-cyan-100 truncate">{track.user?.name}</p>
          </div>
          <ChevronRight size={24} className="text-cyan-300" />
        </div>
      ))}
    </div>
  ) : (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {searchResults.map((track) => (
        <div
          key={track.key}
          onClick={() => handleTrackClick(track)}
          className={`aspect-square cursor-pointer rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl ${
            animatingTrack?.key === track.key ? 'animate-pulse' : ''
          }`}
        >
          <div className="relative group h-full">
            <img
              src={getTrackImage(track)}
              alt={track.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Play size={32} className="text-white" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <h3 className="text-base font-semibold text-white truncate">{track.name}</h3>
              <p className="text-xs text-cyan-100 truncate">{track.user?.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
