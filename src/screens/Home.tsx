import { Play, ArrowRight, Lock } from "lucide-react";
import { motion } from "motion/react";
import { GAMES_REGISTRY } from "../registry/games";
import { GameMetadata } from "../registry/types";

interface HomeProps {
  onSelectGame: (id: string, view: "game" | "rules") => void;
}

export default function Home({ onSelectGame }: HomeProps) {
  const featuredGameIds = ["peg-solitaire", "boggle"];
  const featuredGames = GAMES_REGISTRY.filter(g => featuredGameIds.includes(g.id));
  const otherGames = GAMES_REGISTRY.filter(g => !featuredGameIds.includes(g.id));

  return (
    <div className="px-6 py-10 space-y-16">
      {/* Hero Section */}
      <section className="space-y-8">
        <div className="space-y-2">
          <p className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] font-manrope">Featured Selection</p>
          <h2 className="text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-100 italic transition-colors">The Spotlight</h2>
        </div>

        <div className="space-y-8">
          {featuredGames.map(game => (
            <motion.div 
              key={game.id}
              className="relative group rounded-[2.5rem] overflow-hidden bg-white dark:bg-surface-high border border-black/5 dark:border-white/5 shadow-2xl transition-colors"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="grid md:grid-cols-2">
                <div className="aspect-square md:aspect-auto md:h-[400px] bg-zinc-200 dark:bg-black overflow-hidden relative transition-colors">
                  <img 
                    src={game.thumbnail} 
                    alt={game.title}
                    className="w-full h-full object-cover opacity-90 dark:opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-bg-dark/80 via-transparent to-transparent md:hidden transition-colors" />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center gap-6 bg-gradient-to-br from-white to-zinc-50 dark:from-surface-high dark:to-surface-dark transition-colors">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      {game.category.map(cat => (
                        <span key={cat} className="text-[10px] h-5 flex items-center px-2 bg-primary/10 dark:bg-primary/20 text-primary border border-primary/20 rounded-full font-bold uppercase tracking-wider transition-colors">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <div>
                      <h3 className="text-4xl md:text-5xl font-serif text-zinc-900 dark:text-white transition-colors">{game.title}</h3>
                      <p className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] mt-2">
                        {game.id === 'boggle' ? 'Standard 4x4 & 5x5' : 'Solo Puzzle Experience'}
                      </p>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed transition-colors max-w-md">
                      {game.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <button 
                      onClick={() => onSelectGame(game.id, "game")}
                      className="px-10 py-4 bg-primary dark:bg-primary text-white dark:text-bg-dark rounded-full font-bold flex items-center gap-3 hover:brightness-110 active:scale-95 transition-all shadow-lg"
                    >
                      <Play size={20} fill="currentColor" />
                      Play Now
                    </button>
                    <button 
                      onClick={() => onSelectGame(game.id, "rules")}
                      className="px-10 py-4 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white rounded-full font-bold hover:bg-zinc-50 dark:hover:bg-white/5 active:scale-95 transition-all transition-colors"
                    >
                      Rules
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Library Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4 transition-colors">
          <h3 className="font-serif text-2xl text-zinc-900 dark:text-zinc-100 transition-colors">The Library</h3>
          <button className="text-primary dark:text-primary flex items-center gap-1 font-bold text-xs uppercase tracking-widest hover:translate-x-1 transition-transform group">
            View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherGames.map(game => (
            <GameCard key={game.id} game={game} onClick={() => game.status === 'playable' && onSelectGame(game.id, "game")} />
          ))}
          <div className="border-2 border-dashed border-black/5 dark:border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default group">
            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-primary text-4xl">+</span>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-lg text-zinc-900 dark:text-white transition-colors">Next Addition</p>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">What should we play next?</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function GameCard({ game, onClick }: { game: GameMetadata; onClick: () => void; key?: string | number }) {
  const isComingSoon = game.status === "coming-soon";
  
  return (
    <div 
      onClick={onClick}
      className={`group space-y-4 ${game.status === 'playable' ? 'cursor-pointer' : ''}`}
    >
      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white dark:bg-surface-high border border-black/5 dark:border-white/10 relative shadow-xl transition-colors">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover opacity-90 dark:opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
        />
        {isComingSoon && (
          <div className="absolute inset-0 bg-white/60 dark:bg-bg-dark/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 transition-colors">
             <div className="p-3 bg-white/80 dark:bg-bg-dark/80 rounded-full border border-black/5 dark:border-white/10 transition-colors">
               <Lock size={20} className="text-primary" />
             </div>
             <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary">Coming Soon</span>
          </div>
        )}
      </div>
      <div>
        <h4 className="text-lg font-serif text-zinc-900 dark:text-white group-hover:text-primary transition-colors">{game.title}</h4>
        <p className="text-zinc-500 text-sm line-clamp-1">{game.subtitle}</p>
        <div className="flex items-center gap-4 mt-2">
            {game.players && (
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold font-manrope">{game.players}</span>
            )}
            {game.duration && (
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold font-manrope">{game.duration}</span>
            )}
        </div>
      </div>
    </div>
  );
}
