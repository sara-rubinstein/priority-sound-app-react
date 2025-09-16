
import React, { useState, useEffect } from 'react';
import { List, Grid } from 'lucide-react';
import SearchBar from '../containers/Search/SearchBar';
import SearchResults from '../containers/Search/SearchResults';
import ImageContainer from '../containers/Image/ImageContainer';
import RecentSearches from '../containers/RecentSearch/RecentSearches';

const Home = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [recentSearches, setRecentSearches] = useState([]);
	const [selectedTrack, setSelectedTrack] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [viewMode, setViewMode] = useState('list'); // 'list' or 'tile'
	const [animatingTrack, setAnimatingTrack] = useState(null);

	// Load saved data on component mount
	useEffect(() => {
		const savedSearches = localStorage.getItem('recentSearches');
		const savedViewMode = localStorage.getItem('viewMode');
   
		if (savedSearches) {
			setRecentSearches(JSON.parse(savedSearches));
		}
		if (savedViewMode) {
			setViewMode(savedViewMode);
		}
	}, []);

	// Save recent searches to localStorage
	const saveRecentSearch = (term) => {
		const updatedSearches = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
		setRecentSearches(updatedSearches);
		localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
	};

	// Save view mode to localStorage
	const saveViewMode = (mode) => {
		setViewMode(mode);
		localStorage.setItem('viewMode', mode);
	};

	// Search function using Mixcloud API
	const performSearch = async (term, page = 0) => {
		if (!term.trim()) return;
   
		setLoading(true);
		try {
			const offset = page * 6;
			const response = await fetch(
				`https://api.mixcloud.com/search/?q=${encodeURIComponent(term)}&type=cloudcast&limit=6&offset=${offset}`
			);
			const data = await response.json();
     
			setSearchResults(data.data || []);
			setCurrentPage(page);
     
			if (page === 0) {
				saveRecentSearch(term);
			}
		} catch (error) {
			console.error('Search failed:', error);
			setSearchResults([]);
		}
		setLoading(false);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		setCurrentPage(0);
		performSearch(searchTerm, 0);
	};

	const handleNextPage = () => {
		performSearch(searchTerm, currentPage +1);
	};

	const handleRecentSearch = (term) => {
		setSearchTerm(term);
		setCurrentPage(0);
		performSearch(term, 0);
	};

	const handleTrackClick = (track) => {
		setAnimatingTrack(track);
   
		// Simulate the "fly to image container" animation
		setTimeout(() => {
			setSelectedTrack(track);
			setAnimatingTrack(null);
			setIsPlaying(false);
		}, 600);
	};

	const handleImageClick = () => {
		if (selectedTrack) {
			setIsPlaying(!isPlaying);
		}
	};

	const getTrackImage = (track) => {
		return track.pictures?.large || track.pictures?.medium || track.pictures?.small ||
					 'https://via.placeholder.com/300x300?text=No+Image';
	};

	const getEmbedUrl = (track) => {
		return `https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=${encodeURIComponent(track.url)}`;
	};

	return (
			<div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center font-sans">
				<div className="container mx-auto max-w-5xl p-8 bg-white/10 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-md">
					<h1 className="text-5xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 drop-shadow-lg tracking-tight">
						Sound Search
					</h1>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
					{/* Search Container */}
					<div className="lg:col-span-2 space-y-6">
						<div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
							<SearchBar
								searchTerm={searchTerm}
								setSearchTerm={setSearchTerm}
								handleSearch={handleSearch}
								loading={loading}
							/>

							{/* Search Results */}
							{searchTerm && !loading && searchResults.length === 0 ? (
								<div className="text-center py-8 text-gray-300">
									<p>No results found for "{searchTerm}"</p>
								</div>
							) : (
								<SearchResults
									searchResults={searchResults}
									viewMode={viewMode}
									animatingTrack={animatingTrack}
									getTrackImage={getTrackImage}
									handleTrackClick={handleTrackClick}
									loading={loading}
								/>
							)}

							{/* Control Buttons */}
							{searchResults.length > 0 && (
								<div className="flex justify-between items-center mt-6 pt-4 border-t border-white/20">
									<button
										onClick={handleNextPage}
										disabled={loading}
										className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200 disabled:opacity-50"
									>
										Next
									</button>
                 
									<div className="flex gap-2">
										<button
											onClick={() => saveViewMode('list')}
											className={`p-2 rounded-lg transition-all duration-200 ${
												viewMode === 'list'
													? 'bg-cyan-500 text-white'
													: 'bg-white/20 hover:bg-white/30'
											}`}
										>
											<List size={20} />
										</button>
										<button
											onClick={() => saveViewMode('tile')}
											className={`p-2 rounded-lg transition-all duration-200 ${
												viewMode === 'tile'
													? 'bg-cyan-500 text-white'
													: 'bg-white/20 hover:bg-white/30'
											}`}
										>
											<Grid size={20} />
										</button>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Right Column */}
					<div className="space-y-6">
						{/* Image Container */}
						<ImageContainer
							selectedTrack={selectedTrack}
							isPlaying={isPlaying}
							getTrackImage={getTrackImage}
							getEmbedUrl={getEmbedUrl}
							handleImageClick={handleImageClick}
						/>

						{/* Recent Searches */}
						<RecentSearches
							recentSearches={recentSearches}
							handleRecentSearch={handleRecentSearch}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
