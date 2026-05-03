import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Undo, RotateCcw, Play, Clock, Trophy, X, Search, ChevronRight } from "lucide-react";
import { BoardSize, BoggleBoard, BoggleTile, WordPath } from "./types";
import { generateBoard, calculateScore, areAdjacent, generateSeed } from "./engine";
import { loadDictionary, isValidWord, isDictionaryReady } from "../../lib/wordEngine";
import BoggleSetup from "./Setup";

interface BoggleUIProps {
  onShowRules: () => void;
}

const ROUND_DURATION = 180; // 3 minutes

export default function BoggleUI({ onShowRules }: BoggleUIProps) {
  const [gameState, setGameState] = useState<"setup" | "playing" | "summary">("setup");
  const [boardSize, setBoardSize] = useState<BoardSize>(4);
  const [minWordLength, setMinWordLength] = useState<number>(3);
  const [board, setBoard] = useState<BoggleBoard | null>(null);
  const [timeLeft, setTimeLeft] = useState(ROUND_DURATION);
  
  const [currentPath, setCurrentPath] = useState<string[]>([]); // tile IDs
  const [foundWords, setFoundWords] = useState<WordPath[]>([]);
  const [invalidWords, setInvalidWords] = useState<string[]>([]);
  
  const isPointerDown = useRef(false);
  const timerRef = useRef<number | null>(null);

  // Initialize
  useEffect(() => {
    loadDictionary();
  }, []);

  // Timer logic
  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            setGameState("summary");
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameState, timeLeft]);

  const startNewGame = (size: BoardSize, minLen: number) => {
    const seed = generateSeed();
    const newBoard = generateBoard(size, seed);
    setBoard(newBoard);
    setBoardSize(size);
    setMinWordLength(minLen);
    setTimeLeft(ROUND_DURATION);
    setFoundWords([]);
    setInvalidWords([]);
    setCurrentPath([]);
    setGameState("playing");
  };

  const handlePointerDown = (tileId: string) => {
    if (gameState !== "playing") return;
    isPointerDown.current = true;
    setCurrentPath([tileId]);
  };

  const handlePointerEnter = (tileId: string) => {
    if (!isPointerDown.current || gameState !== "playing") return;
    
    // Check if tile is already in path
    const pathIndex = currentPath.indexOf(tileId);
    
    // Backtracking: if we move back to the previous tile, remove current
    if (pathIndex !== -1 && pathIndex === currentPath.length - 2) {
      setCurrentPath(prev => prev.slice(0, -1));
      return;
    }

    if (pathIndex !== -1) return; // Already in path, not backtracking

    // Check adjacency
    const lastTileId = currentPath[currentPath.length - 1];
    const lastTile = getTileById(lastTileId);
    const targetTile = getTileById(tileId);

    if (lastTile && targetTile && areAdjacent(lastTile.row, lastTile.col, targetTile.row, targetTile.col)) {
      setCurrentPath(prev => [...prev, tileId]);
    }
  };

  const handlePointerUp = () => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    submitCurrentWord();
  };

  const submitCurrentWord = () => {
    if (currentPath.length < minWordLength) {
      setCurrentPath([]);
      return;
    }

    const word = currentPath.map(id => getTileById(id)?.letter).join("").toUpperCase();
    
    // Check if already found
    if (foundWords.some(w => w.word === word)) {
      setCurrentPath([]);
      return;
    }

    if (isValidWord(word)) {
      setFoundWords(prev => [...prev, { word, path: [...currentPath] }]);
    } else {
      setInvalidWords(prev => [...prev, word]);
    }
    setCurrentPath([]);
  };

  const getTileById = (id: string): BoggleTile | undefined => {
    if (!board) return undefined;
    return board.tiles.flat().find(t => t.id === id);
  };

  const totalScore = foundWords.reduce((sum, w) => sum + calculateScore(w.word, boardSize, minWordLength), 0);

  if (gameState === "setup") {
    return <BoggleSetup onStart={startNewGame} />;
  }

  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden" 
         onPointerUp={handlePointerUp}>
      
      {/* HUD */}
      <header className="px-6 py-4 flex items-center justify-between bg-white/5 backdrop-blur-sm border-b border-black/5 dark:border-white/5">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${timeLeft < 30 ? 'bg-red-500/20 text-red-500' : 'bg-primary/20 text-primary'} transition-colors`}>
            <Clock size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500">Time Remaining</p>
            <p className={`text-xl font-mono font-bold ${timeLeft < 30 ? 'text-red-500 animate-pulse' : 'text-zinc-900 dark:text-zinc-100'}`}>
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-right">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500">Current Score</p>
            <p className="text-xl font-mono font-bold text-primary">{totalScore}</p>
          </div>
          <div className="p-3 rounded-2xl bg-primary/20 text-primary">
            <Trophy size={20} />
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <div className="flex-grow flex flex-col md:flex-row p-4 md:p-8 gap-8 overflow-hidden items-center justify-center">
        
        {/* Word Display Area */}
        <div className="w-full max-w-[200px] hidden md:flex flex-col gap-4 self-stretch">
          <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-zinc-500">Found Words ({foundWords.length})</h3>
          <div className="flex-grow overflow-y-auto scrollbar-hide space-y-2 pr-2">
            {[...foundWords].reverse().map((w, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                key={i} 
                className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5"
              >
                <span className="font-bold text-zinc-700 dark:text-zinc-200">{w.word}</span>
                <span className="text-xs text-primary font-mono">{calculateScore(w.word, boardSize, minWordLength)}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Board */}
        <div className="relative flex flex-col items-center gap-6">
           {/* Current Word Preview */}
           <div className="h-12 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {currentPath.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="px-6 py-2 rounded-full bg-primary text-white dark:text-bg-dark font-black tracking-[0.2em] text-xl shadow-xl border-2 border-white/20"
                  >
                    {currentPath.map(id => getTileById(id)?.letter).join("")}
                  </motion.div>
                )}
              </AnimatePresence>
           </div>

           <div 
             className={`grid gap-2 md:gap-3 p-2 md:p-3 rounded-3xl bg-zinc-200 dark:bg-surface-dark border-4 border-zinc-300 dark:border-white/5 shadow-2xl touch-none select-none
               ${boardSize === 4 ? 'grid-cols-4' : 'grid-cols-5'}`}
             style={{ width: 'min(90vw, 500px)', aspectRatio: '1/1' }}
           >
            {board?.tiles?.flat().map((tile) => (
               <Tile 
                 key={tile.id} 
                 tile={tile} 
                 isSelected={currentPath.includes(tile.id)}
                 isLast={currentPath[currentPath.length - 1] === tile.id}
                 onPointerDown={() => handlePointerDown(tile.id)}
                 onPointerEnter={() => handlePointerEnter(tile.id)}
               />
             ))}
           </div>
        </div>

        {/* Mobile Words Bar */}
        <div className="md:hidden w-full flex gap-2 overflow-x-auto py-2 scrollbar-hide shrink-0">
             {[...foundWords].reverse().slice(0, 5).map((w, i) => (
                <div key={i} className="whitespace-nowrap px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 text-sm font-bold">
                  {w.word} <span className="text-primary ml-1 text-xs">{calculateScore(w.word, boardSize, minWordLength)}</span>
                </div>
             ))}
        </div>
      </div>

      {/* Summary Modal */}
      <AnimatePresence>
        {gameState === "summary" && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/80 backdrop-blur-md"
             />
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="relative w-full max-w-xl bg-surface-high border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl max-h-[80vh] flex flex-col"
             >
                <div className="p-8 text-center bg-primary/10 border-b border-white/5">
                   <Trophy size={48} className="mx-auto text-primary mb-4" />
                   <h2 className="text-4xl font-serif text-white mb-2">Round Finished</h2>
                   <div className="flex items-center justify-center gap-8 mt-4">
                      <div className="text-center">
                         <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Total Score</p>
                         <p className="text-3xl font-mono font-black text-primary">{totalScore}</p>
                      </div>
                      <div className="text-center">
                         <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Words Found</p>
                         <p className="text-3xl font-mono font-black text-white">{foundWords.length}</p>
                      </div>
                   </div>
                </div>

                <div className="flex-grow overflow-y-auto p-8 grid grid-cols-2 gap-4">
                   {[...foundWords].sort((a,b) => (b.word?.length || 0) - (a.word?.length || 0)).map((w, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                         <span className="font-bold text-zinc-200">{w.word}</span>
                         <span className="text-primary font-mono font-bold">{calculateScore(w.word, boardSize, minWordLength)}</span>
                      </div>
                   ))}
                </div>

                <div className="p-8 border-t border-white/5 flex gap-4">
                   <button 
                     onClick={() => setGameState("setup")}
                     className="flex-grow py-4 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/5 transition-colors"
                   >
                     Menu
                   </button>
                   <button 
                     onClick={() => startNewGame(boardSize, minWordLength)}
                     className="flex-grow py-4 bg-primary text-bg-dark font-bold rounded-2xl hover:brightness-110 shadow-lg"
                   >
                     Play Again
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Tile({ tile, isSelected, isLast, onPointerDown, onPointerEnter }: { 
  tile: BoggleTile; 
  isSelected: boolean; 
  isLast: boolean;
  onPointerDown: () => void;
  onPointerEnter: () => void;
  key?: string | number;
}) {
  return (
    <div 
      onPointerDown={(e) => {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        onPointerDown();
      }}
      onPointerEnter={onPointerEnter}
      className={`relative rounded-xl md:rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300
        ${isSelected 
          ? 'bg-primary dark:bg-primary scale-[1.03] z-10 shadow-[0_0_25px_rgba(233,193,118,0.5)]' 
          : 'bg-white dark:bg-zinc-800 shadow-[4px_4px_0_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-[2px] active:shadow-none font-bold'}`}
    >
      <span className={`text-2xl md:text-4xl font-black select-none pointer-events-none drop-shadow-sm flex items-center justify-center min-w-[1ch] min-h-[1em]
        ${isSelected ? 'text-white dark:text-zinc-950' : 'text-zinc-800 dark:text-white'}
        ${tile.letter === "Qu" ? 'text-xl md:text-3xl' : ''}`}>
        {tile.letter || "?"}
      </span>
      
      {/* Visual Ripple for last selected */}
      {isLast && (
        <motion.div 
          layoutId="highlight"
          className="absolute inset-0 border-2 border-white/50 rounded-xl md:rounded-2xl"
        />
      )}
    </div>
  );
}
