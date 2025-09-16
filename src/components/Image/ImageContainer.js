import React from 'react';
import { Play } from 'lucide-react';

export default function ImageContainer({ selectedTrack, isPlaying, getTrackImage, getEmbedUrl, handleImageClick }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <h2 className="text-xl font-semibold mb-4">Now Playing</h2>
      <div className="aspect-square bg-white/5 rounded-lg overflow-hidden mb-4">
        {selectedTrack ? (
          <div
            className="relative group cursor-pointer h-full"
            onClick={handleImageClick}
          >
            <img
              src={getTrackImage(selectedTrack)}
              alt={selectedTrack.name}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/20 rounded-full p-4">
                <Play size={32} className="text-white" />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            <p>Click on a track to preview</p>
          </div>
        )}
      </div>
      {selectedTrack && (
        <div className="text-center">
          <h3 className="font-semibold text-white">{selectedTrack.name}</h3>
          <p className="text-sm text-gray-300">{selectedTrack.user?.name}</p>
        </div>
      )}
      {selectedTrack && isPlaying && (
        <div className="mt-4">
          <iframe
            width="100%"
            height="120"
            src={getEmbedUrl(selectedTrack)}
            className="rounded-lg"
            title={`Mixcloud player for ${selectedTrack.name}`}
          ></iframe>
        </div>
      )}
    </div>
  );
}
