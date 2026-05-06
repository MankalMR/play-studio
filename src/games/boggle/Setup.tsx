import React from "react";
import { motion } from "motion/react";
import { BoardSize } from "./types";
import { LayoutGrid, Grid3X3 } from "lucide-react";

interface BoggleSetupProps {
  onStart: (size: BoardSize, minWordLength: number, duration: number) => void;
}

export default function BoggleSetup({ onStart }: BoggleSetupProps) {
  const [size, setSize] = React.useState<BoardSize>(4);
  const [minLen, setMinLen] = React.useState<number>(3);
  const [duration, setDuration] = React.useState<number>(120); // Default 2 mins

  return (
    <div className="flex flex-col items-center justify-center p-8 pb-32 min-h-full gap-12 text-center">
      <div className="space-y-4">
        <h2 className="text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-100 italic transition-colors">Setup Your Hunt</h2>
        <p className="text-zinc-500 max-w-sm mx-auto">Customize your grid and challenge level.</p>
      </div>

      <div className="w-full max-w-2xl space-y-12">
        {/* Grid Size Selection */}
        <div className="space-y-6">
          <h3 className="text-xs uppercase font-black tracking-widest text-primary">1. Select Grid Size</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SizeOption 
              active={size === 4}
              size={4} 
              label="Classic" 
              description="16 letters" 
              icon={<LayoutGrid className="w-8 h-8" />}
              onClick={() => setSize(4)} 
            />
            <SizeOption 
              active={size === 5}
              size={5} 
              label="Big Boggle" 
              description="25 letters" 
              icon={<Grid3X3 className="w-8 h-8" />}
              onClick={() => setSize(5)} 
            />
          </div>
        </div>

        {/* Min Word Length & Timer Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-xs uppercase font-black tracking-widest text-primary">2. Min Word Length</h3>
            <div className="flex justify-center gap-3">
              {[3, 4].map(len => (
                <button 
                  key={len}
                  onClick={() => setMinLen(len)}
                  className={`flex-grow py-4 rounded-2xl font-bold border transition-all ${minLen === len 
                    ? 'bg-primary text-zinc-950 border-primary scale-105 shadow-lg' 
                    : 'bg-white dark:bg-zinc-800 border-black/5 dark:border-white/10 text-zinc-500'}`}
                >
                  {len}+ Letters
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs uppercase font-black tracking-widest text-primary">3. Round Timer</h3>
            <div className="flex justify-center gap-3">
              {[60, 120, 180].map(sec => (
                <button 
                  key={sec}
                  onClick={() => setDuration(sec)}
                  className={`flex-grow py-4 rounded-2xl font-bold border transition-all ${duration === sec 
                    ? 'bg-primary text-zinc-950 border-primary scale-105 shadow-lg' 
                    : 'bg-white dark:bg-zinc-800 border-black/5 dark:border-white/10 text-zinc-500'}`}
                >
                  {sec / 60}m
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => onStart(size, minLen, duration)}
          className="w-full py-5 bg-primary text-zinc-950 font-black text-xl rounded-[2rem] shadow-2xl hover:brightness-110 active:scale-95 transition-all mt-4"
        >
          START GAME
        </button>
      </div>
    </div>
  );
}

function SizeOption({ size, label, description, icon, onClick, active }: { 
  size: BoardSize; 
  label: string; 
  description: string; 
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative group flex flex-col items-start p-6 rounded-3xl border transition-all text-left overflow-hidden 
        ${active 
          ? 'bg-primary/5 border-primary shadow-xl ring-2 ring-primary/20' 
          : 'bg-white dark:bg-surface-high border-black/5 dark:border-white/5 shadow-lg'}`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${active ? 'bg-primary text-white dark:text-bg-dark' : 'bg-primary/10 text-primary'}`}>
        {icon}
      </div>
      <div className="z-10">
        <h3 className={`text-xl font-serif font-bold transition-colors ${active ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`}>{label}</h3>
        <p className="text-zinc-400 font-manrope text-xs">{description}</p>
      </div>
      
      {/* Decorative Grid */}
      <div className={`absolute -right-4 -bottom-4 opacity-[0.03] rotate-12 transition-all ${active ? 'scale-110 opacity-[0.07]' : ''}`}>
        <div className={`grid gap-1 ${size === 4 ? 'grid-cols-4' : 'grid-cols-5'}`}>
          {Array.from({ length: size * size }).map((_, i) => (
            <div key={i} className="w-8 h-8 rounded-sm bg-primary" />
          ))}
        </div>
      </div>
    </motion.button>
  );
}
