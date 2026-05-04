import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Clock, Fish, Star, Goal } from 'lucide-react';

const Rules: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-12 px-6 text-white/80">
      <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-8">How to Play</h2>
      
      <div className="space-y-8">
        <section>
          <h3 className="text-indigo-400 font-bold uppercase text-xs tracking-widest mb-3 flex items-center gap-2">
            <Goal size={16} />
            Primary Objective
          </h3>
          <p className="leading-relaxed">
            Direct the cat to stretch and fill every single empty square on the grid. Once the board is entirely covered, reach the finish flag to complete the level.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
              <Fish size={18} className="text-blue-400" />
              Collect Treats
            </h4>
            <p className="text-sm">Grab fish and treats to earn bonus points and extra time. They disappear after a few seconds!</p>
          </div>
          
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
              <Clock size={18} className="text-yellow-400" />
              Watch the Clock
            </h4>
            <p className="text-sm">Complete levels before the timer runs out. Collecting items adds precious seconds back to your bank.</p>
          </div>
        </section>

        <section>
          <h3 className="text-indigo-400 font-bold uppercase text-xs tracking-widest mb-3">Controls</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-4">
              <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded font-mono text-[10px]">WASD / Arrows</kbd>
              <span>Move and stretch the cat</span>
            </li>
            <li className="flex items-center gap-4">
              <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded font-mono text-[10px]">Space / Enter</kbd>
              <span>Action / Restart Level</span>
            </li>
            <li className="flex items-center gap-4">
              <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded font-mono text-[10px]">ESC</kbd>
              <span>Pause / Exit to Menu</span>
            </li>
          </ul>
        </section>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 p-8 bg-indigo-600/20 border border-indigo-500/30 rounded-3xl text-center"
      >
        <p className="text-lg font-medium text-white mb-2 italic">Ready for the challenge?</p>
        <p className="text-sm opacity-60">The clock is ticking, but the cat is ready.</p>
      </motion.div>
    </div>
  );
};

export default Rules;
