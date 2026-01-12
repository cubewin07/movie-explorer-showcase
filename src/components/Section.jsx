import { motion } from "framer-motion";

export default function Section({ id, heading, eyebrow, children, className = "" }) {
  return (
    <section id={id} className={`py-24 border-b border-slate-200/60 dark:border-slate-800/60 ${className}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center max-w-3xl mx-auto"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs font-bold tracking-widest uppercase mb-4">
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            {heading}
          </h2>
        </motion.div>
        
        <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 0.6, delay: 0.2 }}
        >
            {children}
        </motion.div>
      </div>
    </section>
  );
}
