import { useState, useRef, useEffect } from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Send, Smile, Paperclip, MoreVertical, Phone, Video, MousePointer2 } from 'lucide-react';

const INITIAL_MESSAGES = [
    { id: 1, text: "Hey! Have you seen the new Dune movie?", sender: 'them', time: '10:23 AM' },
    { id: 2, text: "Yeah, watched it yesterday! The cinematography is insane.", sender: 'me', time: '10:24 AM' },
    { id: 3, text: "Right? I'm thinking of rewatching it in IMAX.", sender: 'them', time: '10:25 AM' },
];

function TypingText({ progress, text, start, end }) {
    const [displayedText, setDisplayedText] = useState("");
    
    useEffect(() => {
        const unsubscribe = progress.on("change", (latest) => {
            if (latest < start) {
                setDisplayedText("");
            } else if (latest >= end) {
                setDisplayedText(text);
            } else {
                const p = (latest - start) / (end - start);
                const charIndex = Math.floor(p * text.length);
                setDisplayedText(text.slice(0, charIndex));
            }
        });
        return unsubscribe;
    }, [progress, text, start, end]);

    return (
        <span className="text-slate-900 dark:text-white">
            {displayedText || <span className="text-slate-500 opacity-0">Type a message...</span>}
        </span>
    );
}

export default function AutoDemoChat({ scrollProgress }) {
    // Fallback motion value if prop is missing
    const fallbackProgress = useMotionValue(0);
    const progress = scrollProgress || fallbackProgress;
    const scrollRef = useRef(null);

    // Smooth the progress for smoother cursor movement
    const smoothProgress = useSpring(progress, { stiffness: 500, damping: 50, mass: 0.5 });

    // Cursor Animation
    const cursorX = useTransform(smoothProgress, 
        [0, 0.1, 0.2, 0.6, 0.7, 0.9, 1], 
        ['80%', '80%', '50%', '50%', '92%', '92%', '100%']
    );
    const cursorY = useTransform(smoothProgress, 
        [0, 0.1, 0.2, 0.6, 0.7, 0.9, 1], 
        ['80%', '80%', '90%', '90%', '90%', '90%', '100%']
    );
    const cursorScale = useTransform(smoothProgress, 
        [0.2, 0.22, 0.25, 0.7, 0.72, 0.75], 
        [1, 0.8, 1, 1, 0.8, 1]
    );

    // Elements Opacity/Transform
    const userMsgOpacity = useTransform(progress, [0.74, 0.75], [0, 1]);
    const userMsgY = useTransform(progress, [0.74, 0.75], [20, 0]);
    const userMsgScale = useTransform(progress, [0.74, 0.75], [0.9, 1]);
    
    const replyMsgOpacity = useTransform(progress, [0.89, 0.9], [0, 1]);
    const replyMsgY = useTransform(progress, [0.89, 0.9], [20, 0]);
    
    const typingIndicatorOpacity = useTransform(progress, [0.75, 0.76, 0.89, 0.9], [0, 1, 1, 0]);
    const typingIndicatorY = useTransform(progress, [0.75, 0.76], [10, 0]);

    // Send Button Color
    const sendBtnBg = useTransform(progress, [0.25, 0.3], ["rgba(79, 70, 229, 0.5)", "rgb(79, 70, 229)"]);
    const sendBtnColor = useTransform(progress, [0.25, 0.3], ["rgba(255, 255, 255, 0.5)", "rgb(255, 255, 255)"]);

    // Auto scroll to bottom
    useEffect(() => {
        const unsubscribe = progress.on("change", (latest) => {
             if (scrollRef.current && latest > 0.7) {
                 scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
             }
        });
        return unsubscribe;
    }, [progress]);

    return (
        <div className="w-full max-w-md mx-auto bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col h-[600px] relative">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-[2px]">
                            <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 p-[2px]">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full rounded-full bg-slate-100" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Sarah Jenkin</h4>
                        <p className="text-xs text-green-500 font-medium">Online</p>
                    </div>
                </div>
                <div className="flex gap-2 text-slate-400">
                    <Phone className="w-5 h-5" />
                    <Video className="w-5 h-5" />
                    <MoreVertical className="w-5 h-5" />
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/50 scroll-smooth" ref={scrollRef}>
                {INITIAL_MESSAGES.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm ${
                            msg.sender === 'me'
                                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-sm'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-sm border border-slate-100 dark:border-slate-700'
                        }`}>
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                            <p className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-indigo-100' : 'text-slate-400'}`}>
                                {msg.time}
                            </p>
                        </div>
                    </div>
                ))}
                
                {/* User New Message */}
                <motion.div 
                    style={{ opacity: userMsgOpacity, y: userMsgY, scale: userMsgScale }}
                    className="flex justify-end"
                >
                    <div className="max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-sm">
                        <p className="text-sm leading-relaxed">That sounds amazing! Let's watch it.</p>
                        <p className="text-[10px] mt-1 text-right text-indigo-100">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </motion.div>

                {/* Typing Indicator */}
                <motion.div
                    style={{ opacity: typingIndicatorOpacity, y: typingIndicatorY }}
                    className="flex justify-start absolute" 
                >
                    <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-slate-100 dark:border-slate-700 flex gap-1">
                        <motion.span className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} />
                        <motion.span className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                        <motion.span className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                    </div>
                </motion.div>

                {/* Reply Message */}
                <motion.div
                    style={{ opacity: replyMsgOpacity, y: replyMsgY }}
                    className="flex justify-start"
                >
                    <div className="max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-sm border border-slate-100 dark:border-slate-700">
                        <p className="text-sm leading-relaxed">Awesome! I'll book the tickets. 🍿</p>
                        <p className="text-[10px] mt-1 text-right text-slate-400">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Input */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                    <button type="button" className="p-2 text-slate-400">
                        <Paperclip className="w-5 h-5" />
                    </button>
                    <div className="flex-1 relative">
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2.5 text-sm min-h-[40px] flex items-center">
                            <TypingText 
                                progress={progress} 
                                text="That sounds amazing! Let's watch it." 
                                start={0.25} 
                                end={0.6} 
                            />
                        </div>
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <Smile className="w-4 h-4" />
                        </button>
                    </div>
                    <motion.button 
                        type="button"
                        style={{ backgroundColor: sendBtnBg, color: sendBtnColor }}
                        className="p-2.5 rounded-full shadow-lg transition-all"
                    >
                        <Send className="w-4 h-4" />
                    </motion.button>
                </div>
            </div>

            {/* Fake Cursor */}
            <motion.div
                className="absolute z-50 pointer-events-none drop-shadow-xl"
                style={{ 
                    left: cursorX, 
                    top: cursorY,
                    scale: cursorScale,
                    translateX: "-10%", 
                    translateY: "-10%"
                }}
            >
                <MousePointer2 className="w-6 h-6 text-slate-900 dark:text-white fill-slate-900 dark:fill-white" />
            </motion.div>
        </div>
    );
}
