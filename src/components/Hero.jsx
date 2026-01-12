import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import MockMovieCard from "./ui/MockMovieCard";
import MockChatInterface from "./ui/MockChatInterface";
import { useTrendingMovies } from "../hooks/useMovies";

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const { data: movies } = useTrendingMovies();

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

  const movie1 = movies?.[0] || {
    title: "Dune: Part Two",
    release_date: "2024",
    vote_average: 8.9,
    poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    genre_ids: [878]
  };

  const movie2 = movies?.[1] || {
    title: "Oppenheimer",
    release_date: "2023",
    vote_average: 8.6,
    poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    genre_ids: [18]
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50 dark:bg-slate-950 selection:bg-indigo-500/30">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-pink-500/10 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6 max-w-2xl"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm w-fit"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                v2.0 Now Available
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Cinema meets <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                Connection
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              Discover movies, create watchlists, and chat with friends in real-time. 
              The ultimate social platform for film enthusiasts.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <motion.a
                href="https://cubewin07.github.io/movie-explorer"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl hover:shadow-2xl transition-all"
              >
                <span>Start Exploring</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              
              <motion.button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all"
              >
                <span>See Features</span>
                <PlayCircle className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">10K+</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Movies Indexed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">Real-time</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Chat & Status</p>
              </div>
            </div>
          </motion.div>

          {/* Visual Content - 3D Composition */}
          <div className="relative h-[600px] hidden lg:block perspective-1000">
            {/* Floating Chat Interface */}
            <motion.div 
              style={{ y: y1, rotateY: -10, rotateX: 5 }}
              className="absolute top-10 right-10 z-20 w-[350px]"
            >
               <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                  <MockChatInterface />
               </div>
            </motion.div>

            {/* Floating Movie Cards */}
            <motion.div 
              style={{ y: y2, x: -50, rotateY: 10, rotateX: -5 }}
              className="absolute top-40 left-0 z-10"
            >
              <div className="space-y-6">
                <MockMovieCard 
                  title={movie1.title}
                  year={movie1.release_date?.split('-')[0]}
                  rating={movie1.vote_average?.toFixed(1)}
                  image={`https://image.tmdb.org/t/p/w500${movie1.poster_path}`}
                  genre={getGenre(movie1.genre_ids)}
                />
                <div className="translate-x-12">
                   <MockMovieCard 
                    title={movie2.title}
                    year={movie2.release_date?.split('-')[0]}
                    rating={movie2.vote_average?.toFixed(1)}
                    image={`https://image.tmdb.org/t/p/w500${movie2.poster_path}`}
                    genre={getGenre(movie2.genre_ids)}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-1 h-12 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-1/2 bg-indigo-500 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
