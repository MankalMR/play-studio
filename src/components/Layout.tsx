import React from "react";
import { Settings, BookOpen, LayoutGrid, Play } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LayoutProps {
  children: React.ReactNode;
  activeTab: "home" | "game" | "rules";
  onTabChange: (tab: "home" | "game" | "rules") => void;
  title?: string;
}

export default function Layout({ children, activeTab, onTabChange, title }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col texture-linen selection:bg-primary/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-bg-dark/80 backdrop-blur-md border-b border-white/5 px-6 h-16 flex items-center justify-between">
        <button className="p-2 text-zinc-500 hover:text-primary transition-colors">
          <Settings size={20} />
        </button>
        <h1 className="font-serif italic text-lg text-primary font-bold tracking-tight">
          {title || "Family Game Shelf"}
        </h1>
        <button 
          onClick={() => onTabChange("rules")}
          className={`p-2 transition-colors ${activeTab === 'rules' ? 'text-primary' : 'text-zinc-500 hover:text-primary'}`}
        >
          <BookOpen size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow pb-32 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-bg-dark/90 backdrop-blur-lg border-t border-white/5 px-6 h-20 flex justify-around items-center">
        <NavButton 
          active={activeTab === "home"} 
          onClick={() => onTabChange("home")}
          icon={<LayoutGrid size={24} />}
          label="Shelf"
        />
        <NavButton 
          active={activeTab === "game"} 
          onClick={() => onTabChange("game")}
          icon={<Play size={24} />}
          label="Play"
        />
        <NavButton 
          active={activeTab === "rules"} 
          onClick={() => onTabChange("rules")}
          icon={<BookOpen size={24} />}
          label="Rules"
        />
      </nav>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-primary' : 'text-zinc-500'}`}
    >
      <div className={`p-2 rounded-xl transition-all ${active ? 'bg-primary/10' : ''}`}>
        {icon}
      </div>
      <span className="text-[10px] uppercase tracking-widest font-bold font-manrope">{label}</span>
    </button>
  );
}
