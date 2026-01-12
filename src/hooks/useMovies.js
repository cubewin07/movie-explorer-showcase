import axiosInstance from '../lib/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export const useTrendingMovies = () => {
    return useQuery({
        queryKey: ['trendingMovies'],
        queryFn: async ({ signal }) => {
            const { data } = await axiosInstance.get('/trending/movie/week', {
                params: { language: 'en-US' },
                signal,
            });
            return data.results.slice(0, 4); // Get top 4 for Orientation
        },
        staleTime: 1000 * 60 * 10,
    });
};

export const useFeaturedMovie = () => {
    return useQuery({
        queryKey: ['featuredMovie'],
        queryFn: async ({ signal }) => {
            // Fetch Dune: Part Two specifically or fallback to top trending
            // Dune 2 ID: 693134
            try {
                const { data } = await axiosInstance.get('/movie/693134', {
                    params: { language: 'en-US', append_to_response: 'credits' },
                    signal,
                });
                return data;
            } catch (e) {
                // Fallback to top trending if Dune 2 fails
                const { data } = await axiosInstance.get('/trending/movie/week', {
                    params: { language: 'en-US' },
                    signal,
                });
                const topMovie = data.results[0];
                const { data: details } = await axiosInstance.get(`/movie/${topMovie.id}`, {
                    params: { language: 'en-US', append_to_response: 'credits' },
                    signal,
                });
                return details;
            }
        },
        staleTime: 1000 * 60 * 60,
    });
};
