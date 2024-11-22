import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const searchMovies = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search`, { 
            params: { query },
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};

export const recommendMovies = async (movieId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/recommend`, { 
            params: { movie_id: movieId },
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        console.error('Error getting recommendations:', error);
        throw error;
    }
};