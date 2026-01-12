import Section from "../Section";
import { motion } from "framer-motion";
import { Star, Clock, Calendar } from "lucide-react";
import { useFeaturedMovie } from "../../hooks/useMovies";
import { Loader2 } from "lucide-react";

export default function Discovery() {
  const { data: movie, isLoading, isError } = useFeaturedMovie();

  const getGenres = (genres) => {
      if (!genres) return [];
      return genres.slice(0, 3);
  };

  const getCast = (credits) => {
      if (!credits?.cast) return [];
      return credits.cast.slice(0, 3).map(person => person.name);
  };

  const formatRuntime = (minutes) => {
      if (!minutes) return "N/A";
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      return `${h}h ${m}m`;
  };

  if (isLoading) {
      return (
        <Section id="discovery" eyebrow="Immersive Details" heading="Deep dive into every story">
            <div className="flex justify-center items-center h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            </div>
        </Section>
      );
  }

  if (isError || !movie) return null;

  return (
    <Section 
      id="discovery" 
      eyebrow="Immersive Details" 
      heading="Deep dive into every story"
    >
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 aspect-video md:aspect-[21/9] group cursor-default">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-2/3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">{movie.title}</h3>
            <div className="flex flex-wrap gap-4 text-slate-300 mb-6 text-sm md:text-base">
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /> {movie.vote_average?.toFixed(1)}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {formatRuntime(movie.runtime)}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {movie.release_date?.split('-')[0]}</span>
              {getGenres(movie.genres).map(g => (
                  <span key={g.id} className="px-2 py-0.5 rounded bg-slate-800/80 backdrop-blur border border-slate-700 text-xs uppercase tracking-wider shadow-sm">
                      {g.name}
                  </span>
              ))}
            </div>
            <p className="text-slate-200 leading-relaxed line-clamp-3 md:line-clamp-4 drop-shadow-md">
              {movie.overview}
            </p>
          </motion.div>
        </div>

        {/* Interactive Cast Pills */}
        <div className="absolute top-6 right-6 flex flex-col gap-2 items-end">
            {getCast(movie.credits).map((actor, i) => (
                <motion.div
                    key={actor}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full border border-white/10 shadow-lg"
                >
                    {actor}
                </motion.div>
            ))}
        </div>
      </div>
    </Section>
  );
}
