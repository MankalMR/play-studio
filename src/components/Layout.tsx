import React, { useState, useEffect } from "react";
import { Settings, BookOpen, LayoutGrid, Play, X, Volume2, Moon, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useInterfaceStore } from "../store/interfaceStore";

interface LayoutProps {
  children: React.ReactNode;
  activeTab: "home" | "game" | "rules";
  onTabChange: (tab: "home" | "game" | "rules") => void;
  title?: string;
}

export default function Layout({ children, activeTab, onTabChange, title }: LayoutProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    sound: true,
    darkMode: true,
    highContrast: false
  });
  const { isImmersive } = useInterfaceStore();
  
  // Lock body scroll when a game is active
  useEffect(() => {
    if (activeTab === "game") {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [activeTab]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 texture-linen selection:bg-primary/30 
      ${settings.darkMode ? 'dark bg-bg-dark text-white' : 'bg-[#fff8f4] text-[#1f1b17]'}
      ${settings.highContrast ? 'contrast-125' : ''}`}>
      {/* Header */}
      {!isImmersive && (
        <header className={`sticky top-0 z-50 backdrop-blur-md border-b px-6 h-16 flex items-center justify-between transition-colors duration-300
          ${settings.darkMode ? 'bg-bg-dark/80 border-white/5' : 'bg-[#fff8f4]/80 border-black/5 shadow-sm'}`}>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className={`p-2 transition-colors ${settings.darkMode ? 'text-zinc-500 hover:text-primary' : 'text-zinc-400 hover:text-[#416352]'}`}
          >
            <Settings size={20} />
          </button>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="The Mankala Arcade" className="w-8 h-8 object-contain" />
            <h1 className={`font-serif italic text-lg font-bold tracking-tight transition-colors duration-300
              ${settings.darkMode ? 'text-primary' : 'text-[#416352]'}`}>
              {title || "The Mankala Arcade"}
            </h1>
          </div>
          <button 
            onClick={() => onTabChange("rules")}
            className={`p-2 transition-colors ${activeTab === 'rules' ? (settings.darkMode ? 'text-primary' : 'text-[#416352]') : 'text-zinc-500 hover:text-primary'}`}
          >
            <BookOpen size={20} />
          </button>
        </header>
      )}

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative w-full max-w-md border rounded-3xl overflow-hidden shadow-2xl transition-colors duration-300
                ${settings.darkMode ? 'bg-surface-high border-white/10' : 'bg-white border-black/5'}`}
            >
              <div className="p-6 border-b border-black/5 flex items-center justify-between">
                <h2 className={`font-serif text-xl ${settings.darkMode ? 'text-white' : 'text-zinc-900'}`}>Game Preferences</h2>
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-2 text-zinc-500 hover:text-primary transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <SettingRow 
                  icon={<Volume2 size={20} />} 
                  label="Sound Effects" 
                  description="Enable ambient sounds and tactile feedback"
                  active={settings.sound}
                  onToggle={() => setSettings(s => ({ ...s, sound: !s.sound }))}
                  darkMode={settings.darkMode}
                />
                <SettingRow 
                  icon={<Moon size={20} />} 
                  label="Midnight Mode" 
                  description="Optimize for late-night play"
                  active={settings.darkMode}
                  onToggle={() => setSettings(s => ({ ...s, darkMode: !s.darkMode }))}
                  darkMode={settings.darkMode}
                />
                <SettingRow 
                  icon={<Eye size={20} />} 
                  label="High Contrast" 
                  description="Increase readability of board elements"
                  active={settings.highContrast}
                  onToggle={() => setSettings(s => ({ ...s, highContrast: !s.highContrast }))}
                  darkMode={settings.darkMode}
                />
              </div>
              <div className={`${settings.darkMode ? 'bg-white/5' : 'bg-black/5'} p-6 text-center`}>
                <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 font-manrope">Version 1.0.4 • The Mankala Arcade</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`flex-grow w-full ${
        isImmersive 
          ? "h-screen overflow-hidden touch-none" 
          : activeTab === "game" 
            ? "h-[calc(100vh-theme(spacing.16))] overflow-hidden touch-none" 
            : "pb-32 max-w-7xl mx-auto"
      }`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={activeTab === "game" ? "h-full w-full" : ""}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav (Mobile/Desktop) */}
      {!isImmersive && (
        <nav className={`fixed bottom-0 left-0 w-full z-[999] backdrop-blur-lg border-t px-6 h-20 flex justify-around items-center transition-colors duration-300 pb-safe
          ${settings.darkMode ? 'bg-bg-dark/90 border-white/5' : 'bg-white/90 border-black/5 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]'}`}>
          <NavButton 
            active={activeTab === "home"} 
            onClick={() => onTabChange("home")}
            icon={<LayoutGrid size={24} />}
            label="Shelf"
            darkMode={settings.darkMode}
          />
          <NavButton 
            active={activeTab === "game"} 
            onClick={() => onTabChange("game")}
            icon={<Play size={24} />}
            label="Play"
            darkMode={settings.darkMode}
          />
          <NavButton 
            active={activeTab === "rules"} 
            onClick={() => onTabChange("rules")}
            icon={<BookOpen size={24} />}
            label="Rules"
            darkMode={settings.darkMode}
          />
        </nav>
      )}
    </div>
  );
}

function SettingRow({ icon, label, description, active, onToggle, disabled, darkMode }: { 
  icon: React.ReactNode; 
  label: string; 
  description: string; 
  active: boolean; 
  onToggle: () => void;
  disabled?: boolean;
  darkMode: boolean;
}) {
  const accent = darkMode ? 'text-primary' : 'text-[#416352]';
  const accentBg = darkMode ? 'bg-primary/20 border-primary/20' : 'bg-[#416352]/10 border-[#416352]/20';
  const toggleTrack = active ? (darkMode ? 'bg-primary' : 'bg-[#416352]') : (darkMode ? 'bg-zinc-800' : 'bg-zinc-200');

  return (
    <div className="flex items-center gap-6 group">
      <div className={`p-3 rounded-2xl border transition-all ${active ? `${accentBg} ${accent}` : 'bg-white/5 border-white/5 text-zinc-500'}`}>
        {icon}
      </div>
      <div className="flex-grow min-w-0">
        <h4 className={`${darkMode ? 'text-zinc-100' : 'text-zinc-800'} font-bold text-sm leading-none`}>{label}</h4>
        <p className="text-zinc-500 text-xs mt-1 leading-tight">{description}</p>
      </div>
      <button 
        onClick={onToggle}
        disabled={disabled}
        className={`relative w-12 h-6 rounded-full transition-all flex items-center px-1 shrink-0 ${toggleTrack} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <motion.div 
          animate={{ x: active ? 24 : 0 }}
          className="w-4 h-4 rounded-full bg-white shadow-sm"
        />
      </button>
    </div>
  );
}

function NavButton({ active, onClick, icon, label, darkMode }: { 
  active: boolean; 
  onClick: () => void; 
  icon: React.ReactNode; 
  label: string;
  darkMode: boolean;
}) {
  const activeColor = darkMode ? 'text-primary' : 'text-[#416352]';
  const activeBg = darkMode ? 'bg-primary/10' : 'bg-[#416352]/10';

  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? activeColor : 'text-zinc-500'}`}
    >
      <div className={`p-2 rounded-xl transition-all ${active ? activeBg : ''}`}>
        {icon}
      </div>
      <span className="text-[10px] uppercase tracking-widest font-bold font-manrope">{label}</span>
    </button>
  );
}
