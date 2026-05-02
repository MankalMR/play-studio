import { Play } from "lucide-react";
import { motion } from "motion/react";

interface RulesProps {
  onStart: () => void;
}

export default function PegSolitaireRules({ onStart }: RulesProps) {
  const steps = [
    {
      id: 1,
      title: "The Setup",
      description: "The game begins with the board fully populated with pegs, except for a single empty hole in the center.",
    },
    {
      id: 2,
      title: "The Move",
      description: "Jump a peg over an adjacent peg into an empty hole. Jumps must be horizontal or vertical.",
    },
    {
      id: 3,
      title: "The Capture",
      description: "The peg you jump over is removed from the board. Slowly clear the field one by one.",
    },
    {
      id: 4,
      title: "The Goal",
      description: "Continue until no more moves are possible. A perfect victory leaves exactly one peg in the center.",
    }
  ];

  return (
    <div className="px-6 py-8 max-w-2xl mx-auto space-y-12 pb-24">
      <div className="text-center space-y-4">
        <h2 className="font-serif text-4xl text-primary tracking-tight">The Rules of Engagement</h2>
        <p className="text-zinc-400 font-manrope">Master the classic puzzle of logic and patience.</p>
      </div>

      <div className="space-y-6">
        {steps.map((step, idx) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex gap-6 p-6 bg-white/5 rounded-2xl border border-white/5 group hover:border-primary/20 transition-all"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-bg-dark border border-primary/30 flex items-center justify-center text-primary font-serif text-xl">
              {step.id}
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-zinc-100">{step.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 flex items-start gap-4">
        <div className="text-primary mt-1">💡</div>
        <p className="text-sm text-zinc-300 italic">
          Pro tip: Try to keep your pegs clustered towards the center. Cornered pegs are much harder to capture!
        </p>
      </div>

      <button
        onClick={onStart}
        className="w-full py-4 bg-primary text-bg-dark font-bold rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all"
      >
        <Play size={20} fill="currentColor" />
        Begin Game
      </button>
    </div>
  );
}
