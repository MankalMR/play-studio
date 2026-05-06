import React from "react";
import { motion } from "motion/react";
import { Zap, Shield, ArrowRight, Gauge, Rocket } from "lucide-react";

interface RulesProps {
  onStart: () => void;
}

const MankalaRunnerRules: React.FC<RulesProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans flex flex-col items-center justify-center overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full z-10"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-block px-4 py-1 rounded-full border border-purple-500/50 bg-purple-500/10 text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-4"
          >
            Cosmic Arcade
          </motion.div>
          <h1 className="text-6xl font-black italic tracking-tighter mb-4 font-serif">
            MANKALA <span className="text-purple-500">RUNNER</span>
          </h1>
          <p className="text-zinc-400 text-lg font-medium tracking-wide">
            Master the synthwave cosmos at breakneck speeds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
              <Zap className="text-purple-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 font-serif">The Objective</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Race through the procedurally generated synthwave tracks, collecting orbs to gain speed while dodging lethal obstacles.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
              <Shield className="text-blue-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 font-serif">Navigation</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Use <span className="text-white font-mono bg-zinc-800 px-1.5 py-0.5 rounded">A/D</span> or <span className="text-white font-mono bg-zinc-800 px-1.5 py-0.5 rounded">LEFT/RIGHT</span> keys to switch lanes. Press <span className="text-white font-mono bg-zinc-800 px-1.5 py-0.5 rounded">SPACE</span> to restart on crash.
            </p>
          </motion.div>
        </div>

        <div className="space-y-4 mb-12">
          <div className="flex items-center gap-4 text-zinc-300">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <p className="text-sm tracking-wide uppercase font-bold">Collect <span className="text-white underline decoration-purple-500/50 underline-offset-4">Blue Orbs</span> to increase your speed multiplier.</p>
          </div>
          <div className="flex items-center gap-4 text-zinc-300">
            <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            <p className="text-sm tracking-wide uppercase font-bold">Avoid <span className="text-red-400 underline decoration-red-500/50 underline-offset-4">Red Barriers</span>—one hit ends your run.</p>
          </div>
          <div className="flex items-center gap-4 text-zinc-300">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <p className="text-sm tracking-wide uppercase font-bold">The further you go, the faster the <span className="text-cyan-400 underline decoration-cyan-400/50 underline-offset-4">Cosmos</span> moves.</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="w-full md:w-auto px-12 py-4 bg-white text-black rounded-full font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-colors"
          >
            Engage Engines <Rocket className="w-4 h-4" />
          </motion.button>
          
          <div className="flex items-center gap-8 text-zinc-500">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">3D / 60FPS</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="text-purple-500 w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Procedural</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MankalaRunnerRules;
