import Section from "../Section";
import MockMovieCard from "../ui/MockMovieCard";
import { motion } from "framer-motion";

const MOVIES = [
  { title: "Dune: Part Two", year: "2024", rating: "8.9", image: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg", genre: "Sci-Fi" },
  { title: "Poor Things", year: "2023", rating: "8.1", image: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg", genre: "Comedy" },
  { title: "Oppenheimer", year: "2023", rating: "8.6", image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", genre: "Drama" },
  { title: "Civil War", year: "2024", rating: "7.8", image: "https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg", genre: "Action" },
];

export default function Orientation() {
  return (
    <Section 
      id="orientation" 
      eyebrow="Smart Discovery" 
      heading="Explore a universe of cinema tailored to your taste"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {MOVIES.map((movie, i) => (
          <motion.div
            key={movie.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <MockMovieCard {...movie} />
          </motion.div>
        ))}
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
