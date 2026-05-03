import React from "react";
import { motion } from "motion/react";
import { Play, Sparkles, Clock, Target } from "lucide-react";

interface BoggleRulesProps {
  onStart: () => void;
}

export default function BoggleRules({ onStart }: BoggleRulesProps) {
  const rules = [
    {
      id: 1,
      icon: <Clock className="text-primary" />,
      title: "The Race Against Time",
      description: "You have 3 minutes to find as many words as possible. The clock starts when you say go."
    },
    {
      id: 2,
      icon: <Sparkles className="text-primary" />,
      title: "Connecting Letters",
      description: "Click and drag or tap through adjacent letters (horizontal, vertical, or diagonal) to form words."
    },
    {
      id: 3,
      icon: <Target className="text-primary" />,
      title: "No Double Dipping",
      description: "You cannot use the same letter tile twice within a single word path."
    },
    {
      id: 4,
      icon: <Play className="text-primary" />,
      title: "Dictionary Check",
      description: "Words are verified against an official tournament dictionary (ENABLE1). Names and abbreviations are generally excluded!"
    }
  ];

  return (
    <div className="px-6 py-8 max-w-2xl mx-auto space-y-12 pb-24">
      <div className="text-center space-y-4">
        <h2 className="font-serif text-4xl text-primary dark:text-primary tracking-tight transition-colors">Boggle: Word Hunt</h2>
        <p className="text-zinc-500 dark:text-zinc-400 font-manrope transition-colors">Sharpen your eyes and expand your vocabulary.</p>
      </div>

      <div className="space-y-6">
        {rules.map((rule, idx) => (
          <motion.div 
            key={rule.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex gap-6 p-6 bg-white dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5 group hover:border-primary/20 transition-all shadow-sm dark:shadow-none transition-colors"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-zinc-50 dark:bg-bg-dark border border-primary/30 flex items-center justify-center transition-colors">
              {rule.icon}
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 transition-colors">{rule.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{rule.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 flex items-start gap-4 transition-colors">
        <div className="text-primary mt-1">💡</div>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 italic transition-colors">
          Pro tip: Look for common suffixes like -ING, -ED, or -S. They can often double or triple your word count!
        </p>
      </div>

      <button
        onClick={onStart}
        className="w-full py-4 bg-primary text-white dark:text-bg-dark font-bold rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg"
      >
        <Play size={20} fill="currentColor" />
        Begin Hunt
      </button>
    </div>
  );
}
