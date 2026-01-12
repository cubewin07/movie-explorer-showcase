import Section from "../Section";
import MockChatInterface from "../ui/MockChatInterface";
import { motion } from "framer-motion";

export default function Connection() {
  return (
    <Section 
      id="connection" 
      eyebrow="Real-time Community" 
      heading="Connect with friends instantly"
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
             <MockChatInterface />
          </motion.div>
        </div>
        
        <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Seamless Conversation</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Discuss plot twists, recommend hidden gems, and plan movie nights directly within the app. 
                    Our WebSocket-powered chat ensures your messages are delivered instantly.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                    { title: "Typing Indicators", desc: "See when friends are replying" },
                    { title: "Read Receipts", desc: "Know when your message is seen" },
                    { title: "Presence Status", desc: "Check who is online now" },
                    { title: "Group Chats", desc: "Create squads for genres" }
                ].map((feature, i) => (
                    <motion.div 
                        key={feature.title}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{feature.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{feature.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </Section>
  );
}
