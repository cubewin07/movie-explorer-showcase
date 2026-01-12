import Section from "../Section";
import { motion } from "framer-motion";
import { Zap, Shield, Wifi, Smartphone } from "lucide-react";

const FEATURES = [
    { icon: Zap, title: "Lightning Fast", desc: "Optimized React performance with code-splitting and efficient rendering." },
    { icon: Shield, title: "Secure", desc: "JWT Authentication and protected routes keep your data safe." },
    { icon: Wifi, title: "Offline Ready", desc: "Graceful handling of network loss with local caching." },
    { icon: Smartphone, title: "Responsive", desc: "A fluid experience across all devices, from mobile to desktop." }
];

export default function Resilience() {
  return (
    <Section 
      id="resilience" 
      eyebrow="Technical Excellence" 
      heading="Engineered for reliability"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {FEATURES.map((feature, i) => (
            <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-3xl bg-slate-100 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-500/20">
                    <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {feature.desc}
                </p>
            </motion.div>
        ))}
      </div>
    </Section>
  );
}
