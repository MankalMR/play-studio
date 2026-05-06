import React, { useState, useCallback, useMemo } from "react";
import { Undo, RotateCcw, Lightbulb, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import * as Engine from "./engine";
import { useImmersiveMode } from "../../hooks/useImmersiveMode";

interface UIProps {
  onShowRules: () => void;
}

export default function PegSolitaireUI({ onShowRules }: UIProps) {
  const [board, setBoard] = useState<Engine.CellState[][]>(Engine.INITIAL_BOARD);
  const [history, setHistory] = useState<Engine.CellState[][][]>([]);
  const [selected, setSelected] = useState<Engine.Position | null>(null);
  const [hint, setHint] = useState<Engine.Position[]>([]);

  const pegCount = useMemo(() => Engine.countPegs(board), [board]);
  const hasMoves = useMemo(() => Engine.hasAnyLegalMoves(board), [board]);
  const isWon = pegCount === 1 && board[3][3] === "peg";
  const isStuck = !hasMoves && !isWon;

  const legalMoves = useMemo(() => {
    return Engine.getLegalMoves(board, selected);
  }, [board, selected]);

  useImmersiveMode(!isWon && !isStuck);

  const handleCellClick = (r: number, c: number) => {
    if (isWon || isStuck) return;
    setHint([]);

    const state = board[r][c];
    if (state === "peg") {
      setSelected({ r, c });
    } else if (state === "empty" && selected) {
      const move = legalMoves.find(m => m.r === r && m.c === c);
      if (move) {
        setHistory(prev => [...prev, board]);
        const nextBoard = Engine.makeMove(board, selected, move);
        setBoard(nextBoard);
        setSelected(null);
      } else {
        setSelected(null);
      }
    } else {
      setSelected(null);
    }
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setBoard(prev);
    setHistory(prev => prev.slice(0, -1));
    setSelected(null);
    setHint([]);
  };

  const handleRestart = () => {
    setBoard(Engine.INITIAL_BOARD);
    setHistory([]);
    setSelected(null);
    setHint([]);
  };

  const showHint = () => {
    for (let r = 0; r < Engine.BOARD_SIZE; r++) {
      for (let c = 0; c < Engine.BOARD_SIZE; c++) {
        if (board[r][c] === "peg") {
          const moves = Engine.getLegalMoves(board, { r, c });
          if (moves.length > 0) {
            setHint([{ r, c }]);
            return;
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 py-8 md:py-12 px-4 h-full relative">
      {/* HUD */}
      <div className="flex flex-col items-center gap-2">
         <div className="bg-white dark:bg-surface-high border border-black/5 dark:border-white/10 px-6 py-2 rounded-full flex gap-4 items-center shadow-xl transition-colors">
           <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 font-manrope">Pegs Remaining</span>
           <span className="text-2xl font-serif font-bold text-primary tabular-nums transition-colors">{pegCount}</span>
         </div>
      </div>

      {/* The Board */}
      <div className="relative p-4 md:p-8 rounded-full bg-zinc-100 dark:bg-surface-dark shadow-[20px_20px_60px_rgba(0,0,0,0.1),-2px_-2px_10px_rgba(255,255,255,0.02)] dark:shadow-[20px_20px_60px_rgba(0,0,0,1),-2px_-2px_10px_rgba(255,255,255,0.02)] border border-black/5 dark:border-white/5 aspect-square w-full max-w-[500px] transition-all">
        {/* Wood Texture Mock */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,#fdfbf7_0%,#f1e9df_100%)] dark:bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#0e0e0e_100%)] opacity-50 pointer-events-none transition-all" />
        
        <div className="relative grid grid-cols-7 gap-1 md:gap-2 h-full">
          {board.flatMap((row, r) => row.map((cell, c) => (
            <Cell 
              key={`${r}-${c}`}
              state={cell}
              isSelected={selected?.r === r && selected?.c === c}
              isTarget={legalMoves.some(m => m.r === r && m.c === c)}
              isHint={hint.some(h => h.r === r && h.c === c)}
              onClick={() => handleCellClick(r, c)}
            />
          )))}
        </div>

        {/* Win/Loss Screens */}
        <AnimatePresence>
          {isWon && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
               className="absolute inset-0 bg-white/80 dark:bg-bg-dark/80 backdrop-blur-md rounded-full flex flex-col items-center justify-center p-8 text-center z-20"
             >
               <h3 className="text-3xl font-serif text-primary mb-2">Master Solution</h3>
               <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 font-manrope">You have achieved the ultimate victory. Only the center peg remains.</p>
               <button onClick={handleRestart} className="px-8 py-3 bg-primary text-white dark:text-bg-dark font-bold rounded-xl active:scale-95 transition-all shadow-lg">Play Again</button>
             </motion.div>
          )}
          {isStuck && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
               className="absolute inset-0 bg-white/80 dark:bg-bg-dark/80 backdrop-blur-md rounded-full flex flex-col items-center justify-center p-8 text-center z-20"
             >
               <h3 className="text-2xl font-serif text-zinc-900 dark:text-zinc-100 mb-2">No Moves Remaining</h3>
               <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 font-manrope">{pegCount} pegs remain on the board. A challenging outcome.</p>
               <div className="flex gap-4">
                 <button onClick={handleUndo} className="px-6 py-2 border border-black/10 dark:border-white/10 rounded-lg text-sm font-bold text-zinc-900 dark:text-white">Undo</button>
                 <button onClick={handleRestart} className="px-6 py-2 bg-primary text-white dark:text-bg-dark rounded-lg text-sm font-bold shadow-md">Try Again</button>
               </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls Container (Mobile Tabs style implicitly handled by App.tsx, but these are game-specific actions) */}
      <div className="hidden md:flex gap-4 items-center bg-white/80 dark:bg-surface-high/50 backdrop-blur-md p-2 rounded-2xl border border-black/5 dark:border-white/5 shadow-xl transition-all">
        <ActionButton icon={<Undo size={20} />} label="Undo" onClick={handleUndo} disabled={history.length === 0} />
        <ActionButton icon={<RotateCcw size={20} />} label="Restart" onClick={handleRestart} />
        <ActionButton icon={<Lightbulb size={20} />} label="Hint" onClick={showHint} />
        <div className="w-px h-8 bg-black/5 dark:bg-white/5 mx-2" />
        <ActionButton icon={<BookOpen size={20} />} label="Rules" onClick={onShowRules} />
      </div>


      {/* Invisible mobile buttons for bottom nav wiring */}
      <div id="game-controls" className="hidden">
        <button id="btn-undo" onClick={handleUndo} />
        <button id="btn-restart" onClick={handleRestart} />
        <button id="btn-hint" onClick={showHint} />
        <button id="btn-rules" onClick={onShowRules} />
      </div>
    </div>
  );
}

function Cell({ state, isSelected, isTarget, isHint, onClick }: { 
  state: Engine.CellState; isSelected: boolean; isTarget: boolean; isHint: boolean; onClick: () => void;
  key?: string;
}) {
  if (state === "invalid") return <div className="aspect-square opacity-0" />;

  return (
    <div 
      onClick={onClick}
      className={`relative aspect-square flex items-center justify-center cursor-pointer transition-all duration-300`}
    >
      {/* The Hole */}
      <div className="absolute w-[80%] h-[80%] rounded-full bg-zinc-200 dark:bg-black shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),inset_0_-1px_1px_rgba(255,255,255,0.1)] dark:shadow-[inset_0_4px_8px_rgba(0,0,0,0.8),inset_0_-1px_1px_rgba(255,255,255,0.1)] transition-colors" />
      
      {/* The Peg */}
      {state === "peg" && (
        <motion.div
          className={`relative w-[65%] h-[65%] rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.3)] dark:shadow-[0_8px_16px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.3)] z-10 transition-all
            ${isSelected ? 'bg-primary dark:bg-primary scale-110 !shadow-primary/30 shadow-[0_0_20px_rgba(233,193,118,0.4)]' : 
              isHint ? 'bg-zinc-800 dark:bg-zinc-100' : 'bg-zinc-400 dark:bg-zinc-300'}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 300 }}
        >
          {/* Shine effect */}
          <div className="absolute top-[15%] left-[15%] w-[30%] h-[30%] rounded-full bg-white/30 blur-[2px]" />
        </motion.div>
      )}

      {/* Target Marker */}
      {isTarget && (
        <div className="absolute w-[30%] h-[30%] rounded-full bg-primary/40 animate-pulse z-0 transition-colors" />
      )}
    </div>
  );
}

function ActionButton({ icon, label, onClick, disabled }: { icon: any; label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-center gap-1 p-4 rounded-xl transition-all
        ${disabled ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white/5 hover:text-primary text-zinc-400'}`}
    >
      {icon}
      <span className="text-[10px] uppercase font-bold tracking-widest font-manrope">{label}</span>
    </button>
  );
}
