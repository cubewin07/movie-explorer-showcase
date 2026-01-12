import Section from "../Section";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Cohesion() {
  return (
    <Section 
      id="cohesion" 
      eyebrow="Start Your Journey" 
      heading="Ready to explore?"
    >
      <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 p-8 sm:p-16 text-center shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Join thousands of movie lovers today.
            </h3>
            <p className="text-indigo-100 text-lg leading-relaxed">
                Create your account, build your watchlist, and start discussing your favorite films with friends.
            </p>
            
            <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                <motion.a
                    href="https://cubewin07.github.io/movie-explorer"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold bg-white text-indigo-600 shadow-xl hover:shadow-2xl transition-all"
                >
                    <span>Launch App</span>
                    <ArrowRight className="w-5 h-5" />
                </motion.a>
            </motion.div>
        </div>
      </div>
    </Section>
  );
}
