import React, { useState } from 'react';
import { searchMovies, recommendMovies } from './services/api';

const SearchAndRecommend = () => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    const handleSearch = async (e) => {
        setQuery(e.target.value);
        if (e.target.value.length > 2) {
            const response = await searchMovies(e.target.value);
            setSearchResults(response.data);
        } else {
            setSearchResults([]);
        }
    };

    const handleRecommend = async (movieId) => {
        const response = await recommendMovies(movieId);
        setRecommendations(response.data);
    };

    return (
        <div>
            <h1>Movie Recommendation System</h1>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search for a movie..."
            />
            <ul>
                {searchResults.map((movie) => (
                    <li key={movie.movieId} onClick={() => handleRecommend(movie.movieId)}>
                        {movie.title}
                    </li>
                ))}
            </ul>
            <h2>Recommendations</h2>
            <ul>
                {recommendations.map((movie) => (
                    <li key={movie.movieId}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchAndRecommend;
