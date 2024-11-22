import React, { useState, useEffect } from 'react';
import { searchMovies, recommendMovies } from './services/api';
import { Search, Moon, Sun, Github } from 'lucide-react';

const App = () => {
  const [query, setQuery] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query && selectedMovie && query !== selectedMovie.title) {
      setSelectedMovie(null);
      setRecommendedMovies([]);
    }
  }, [query, selectedMovie]);

  const handleSearchChange = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    
    if (searchQuery) {
      try {
        const results = await searchMovies(searchQuery);
        setMovieList(results.data);
      } catch (error) {
        console.error('Error searching movies:', error);
        setMovieList([]);
      }
    } else {
      setMovieList([]);
    }
  };

  const handleMovieSelect = async (movie) => {
    try {
      setIsLoading(true);
      setQuery(movie.title);
      setSelectedMovie(movie);
      setMovieList([]);
      
      const recommendations = await recommendMovies(movie.movieId);
      setRecommendedMovies(recommendations.data);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setRecommendedMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Movie Recommender</h1>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </header>

        <div className="relative mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              className={`w-full pl-10 pr-4 py-3 rounded-lg outline-none ${
                isDarkMode 
                  ? 'bg-gray-800 focus:bg-gray-700 border-gray-700' 
                  : 'bg-white focus:bg-gray-50 border-gray-200'
              } border transition-colors`}
              placeholder="Search for a movie..."
            />
          </div>

          {movieList.length > 0 && !selectedMovie && (
            <ul className={`absolute z-10 w-full mt-2 rounded-lg shadow-lg overflow-hidden ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border`}>
              {movieList.map((movie) => (
                <li
                  key={movie.movieId}
                  onClick={() => handleMovieSelect(movie)}
                  className={`px-4 py-3 cursor-pointer ${
                    isDarkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-gray-50'
                  } transition-colors`}
                >
                  {movie.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {isLoading && (
          <div className="text-center py-4">
            <div className={`inline-block animate-spin rounded-full h-8 w-8 border-4 ${
              isDarkMode 
                ? 'border-gray-600 border-t-gray-200' 
                : 'border-gray-200 border-t-gray-800'
            }`}></div>
          </div>
        )}

        {selectedMovie && recommendedMovies.length > 0 && !isLoading && (
          <div className={`rounded-lg p-6 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}>
            <h2 className="text-xl font-semibold mb-4">
              Movies Similar to "{selectedMovie.title}"
            </h2>
            <ul className="space-y-3">
              {recommendedMovies.map((movie) => (
                <li key={movie.movieId} className="flex flex-col">
                  <span className="font-medium">{movie.title}</span>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {movie.genres}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <a href="https://github.com/Digital-Ibraheem/movie-recommender-backend" target='_blank' rel="noreferrer">
          <Github className="w-6 h-6" onCl/>
        </a>
        
      </div>
    </div>
  );
};

export default App;