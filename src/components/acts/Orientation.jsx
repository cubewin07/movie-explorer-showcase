import Section from "../Section";
import MockMovieCard from "../ui/MockMovieCard";
import { motion } from "framer-motion";
import { useTrendingMovies } from "../../hooks/useMovies";
import { Loader2 } from "lucide-react";

export default function Orientation() {
  const { data: movies, isLoading, isError } = useTrendingMovies();

  // Helper to map TMDB genre IDs to strings (simplified for showcase)
  const getGenre = (genreIds) => {
    if (!genreIds || genreIds.length === 0) return "Movie";
    const genres = {
      28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
      80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
      14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
      9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV Movie",
      53: "Thriller", 10752: "War", 37: "Western"
    };
    return genres[genreIds[0]] || "Movie";
  };

  return (
    <Section 
      id="orientation" 
      eyebrow="Smart Discovery" 
      heading="Explore a universe of cinema tailored to your taste"
    >
      <div className="min-h-[400px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
             <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          </div>
        ) : isError ? (
          <div className="text-center text-red-500">Failed to load trending movies</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {movies?.map((movie, i) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <MockMovieCard 
                    title={movie.title}
                    year={movie.release_date?.split('-')[0] || "2024"}
                    rating={movie.vote_average?.toFixed(1)}
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    genre={getGenre(movie.genre_ids)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Our advanced filtering and search algorithms help you find exactly what you're looking for, 
          from trending blockbusters to hidden indie gems.
        </p>
      </div>
    </Section>
  );
}
