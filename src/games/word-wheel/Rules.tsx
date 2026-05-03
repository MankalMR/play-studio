import { Play } from "lucide-react";
import { motion } from "motion/react";

interface RulesProps {
  onStart: () => void;
}

export default function WordWheelRules({ onStart }: RulesProps) {
  const steps = [
    {
      id: 1,
      title: "The Wheel",
      description: "Tap and drag between letters on the wheel to form words. Connect them in a single continuous line.",
    },
    {
      id: 2,
      title: "The Grid",
      description: "Successfully identified words will automatically populate the crossword grid above.",
    },
    {
      id: 3,
      title: "The Goal",
      description: "Clear the entire grid by finding all the words associated with the level's theme.",
    },
    {
      id: 4,
      title: "Hints",
      description: "Stuck? Use your accumulated points to buy a hint and reveal a word on the grid.",
    }
  ];

  return (
    <div className="px-6 py-8 max-w-2xl mx-auto space-y-12 pb-24">
      <div className="text-center space-y-4">
        <h2 className="font-serif text-4xl text-primary dark:text-primary tracking-tight transition-colors">How to Play Wordwheel</h2>
        <p className="text-zinc-500 dark:text-zinc-400 font-manrope transition-colors">Spin, connect, and solve the crossword puzzle.</p>
      </div>

      <div className="space-y-6">
        {steps.map((step, idx) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex gap-6 p-6 bg-white dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5 group hover:border-primary/20 transition-all shadow-sm dark:shadow-none transition-colors"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-zinc-50 dark:bg-bg-dark border border-primary/30 flex items-center justify-center text-primary font-serif text-xl transition-colors">
              {step.id}
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 transition-colors">{step.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed transition-colors">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 flex items-start gap-4 transition-colors">
        <div className="text-primary mt-1">💡</div>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 italic transition-colors">
          Pro tip: Longer words give you more points! Use those points wisely for hints on harder levels.
        </p>
      </div>

      <button
        onClick={onStart}
        className="w-full py-4 bg-primary text-white dark:text-bg-dark font-bold rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg"
      >
        <Play size={20} fill="currentColor" />
        Begin Game
      </button>
    </div>
  );
}
