import Section from "../Section";
import { motion } from "framer-motion";
import { Star, Clock, Calendar, Globe } from "lucide-react";

export default function Discovery() {
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
          style={{ backgroundImage: 'url(https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg)' }} // Dune 2 Backdrop
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
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">Dune: Part Two</h3>
            <div className="flex flex-wrap gap-4 text-slate-300 mb-6 text-sm md:text-base">
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /> 8.9</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 2h 46m</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> 2024</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-xs uppercase tracking-wider">Sci-Fi</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-xs uppercase tracking-wider">Adventure</span>
            </div>
            <p className="text-slate-200 leading-relaxed line-clamp-3 md:line-clamp-none">
              Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.
            </p>
          </motion.div>
        </div>

        {/* Interactive Cast Pills (Mock) */}
        <div className="absolute top-6 right-6 flex flex-col gap-2">
            {["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"].map((actor, i) => (
                <motion.div
                    key={actor}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full border border-white/10"
                >
                    {actor}
                </motion.div>
            ))}
        </div>
      </div>
    </Section>
  );
}
