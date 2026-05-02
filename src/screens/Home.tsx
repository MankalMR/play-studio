import { Play, ArrowRight, Lock } from "lucide-react";
import { motion } from "motion/react";
import { GAMES_REGISTRY } from "../registry/games";
import { GameMetadata } from "../registry/types";

interface HomeProps {
  onSelectGame: (id: string, view: "game" | "rules") => void;
}

export default function Home({ onSelectGame }: HomeProps) {
  const featuredGame = GAMES_REGISTRY.find(g => g.id === "peg-solitaire")!;
  const otherGames = GAMES_REGISTRY.filter(g => g.id !== "peg-solitaire");

  return (
    <div className="px-6 py-10 space-y-16">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-primary font-bold uppercase tracking-[0.2em] text-xs font-manrope">Featured Selection</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-zinc-100">The Midnight Study</h2>
        </div>
        
        <motion.div 
          className="relative group rounded-3xl overflow-hidden bg-surface-high border border-white/5 shadow-2xl"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="grid md:grid-cols-2">
            <div className="aspect-square bg-black overflow-hidden relative">
              <img 
                src={featuredGame.thumbnail} 
                alt={featuredGame.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent md:hidden" />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center gap-6">
              <div className="space-y-2">
                <div className="flex gap-2">
                  {featuredGame.category.map(cat => (
                    <span key={cat} className="text-[10px] h-5 flex items-center px-2 bg-primary/20 text-primary border border-primary/20 rounded-full font-bold uppercase tracking-wider">
                      {cat}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl font-serif text-white">{featuredGame.title}</h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                  {featuredGame.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => onSelectGame(featuredGame.id, "game")}
                  className="px-8 py-3 bg-primary text-bg-dark rounded-full font-bold flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg"
                >
                  <Play size={18} fill="currentColor" />
                  Play Now
                </button>
                <button 
                  onClick={() => onSelectGame(featuredGame.id, "rules")}
                  className="px-8 py-3 border border-white/10 text-white rounded-full font-bold hover:bg-white/5 active:scale-95 transition-all"
                >
                  Rules
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Library Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h3 className="font-serif text-2xl text-zinc-100">The Library</h3>
          <button className="text-primary flex items-center gap-1 font-bold text-xs uppercase tracking-widest hover:translate-x-1 transition-transform group">
            View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
          <div className="border-2 border-dashed border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default group">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-primary text-4xl">+</span>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-lg text-white">Next Addition</p>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">What should we play next?</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function GameCard({ game }: { game: GameMetadata; key?: string }) {
  const isComingSoon = game.status === "coming-soon";
  
  return (
    <div className="group space-y-4">
      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-surface-high border border-white/5 relative shadow-xl">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
        />
        {isComingSoon && (
          <div className="absolute inset-0 bg-bg-dark/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3">
             <div className="p-3 bg-bg-dark/80 rounded-full border border-white/10">
               <Lock size={20} className="text-primary" />
             </div>
             <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary">Coming Soon</span>
          </div>
        )}
      </div>
      <div>
        <h4 className="text-lg font-serif text-white group-hover:text-primary transition-colors">{game.title}</h4>
        <p className="text-zinc-500 text-sm line-clamp-1">{game.subtitle}</p>
        <div className="flex items-center gap-4 mt-2">
            {game.players && (
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold font-manrope">{game.players}</span>
            )}
            {game.duration && (
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold font-manrope">{game.duration}</span>
            )}
        </div>
      </div>
    </div>
  );
}
