import { motion } from 'framer-motion';
import { Star, Calendar, Play } from 'lucide-react';

export default function MockMovieCard({ title, year, rating, image, genre, type = 'movie' }) {
    const isTv = type === 'tv';
    
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className={`group relative w-64 bg-white dark:bg-slate-800 rounded-2xl p-3 shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden cursor-pointer
            ${isTv ? 'hover:shadow-purple-500/20 hover:border-purple-500/30' : 'hover:shadow-blue-500/20 hover:border-blue-500/30'}
            transition-colors duration-300`}
        >
            {/* Poster */}
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3">
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 dark:bg-slate-900/90 p-3 rounded-full shadow-lg backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-transform">
                        <Play className="w-6 h-6 text-slate-900 dark:text-white fill-current" />
                    </div>
                </div>

                {/* Rating */}
                <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{rating}</span>
                </div>
            </div>

            {/* Info */}
            <div className="space-y-1">
                <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">{title}</h3>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{year}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full font-medium ${
                        isTv 
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' 
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}>
                        {isTv ? 'TV Series' : 'Movie'}
                    </span>
                </div>
                {genre && (
                    <div className="pt-2">
                        <span className="inline-block px-2 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                            {genre}
                        </span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
