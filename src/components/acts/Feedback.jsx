import Section from "../Section";
import { motion } from "framer-motion";
import { Star, ThumbsUp } from "lucide-react";

const REVIEWS = [
    { user: "Alex R.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", movie: "Dune: Part Two", rating: 5, text: "A masterpiece of visual storytelling. Villeneuve has done it again." },
    { user: "Sarah J.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", movie: "Poor Things", rating: 4, text: "Emma Stone is absolutely phenomenal. A weird, wonderful ride." },
    { user: "Mike T.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike", movie: "Oppenheimer", rating: 5, text: "Hauntingly beautiful score and intense performances." }
];

export default function Feedback() {
  return (
    <Section 
      id="feedback" 
      eyebrow="Active Engagement" 
      heading="Share your thoughts with the world"
    >
      <div className="grid md:grid-cols-3 gap-6">
        {REVIEWS.map((review, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg"
            >
                <div className="flex items-center gap-3 mb-4">
                    <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full bg-slate-100" />
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{review.user}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">watched {review.movie}</p>
                    </div>
                </div>
                
                <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, starI) => (
                        <Star key={starI} className={`w-4 h-4 ${starI < review.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-300 dark:text-slate-700'}`} />
                    ))}
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                    "{review.text}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Helpful</span>
                    </button>
                    <span className="text-xs text-slate-400">2h ago</span>
                </div>
            </motion.div>
        ))}
      </div>
    </Section>
  );
}
