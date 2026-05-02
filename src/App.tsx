/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Layout from "./components/Layout";
import Home from "./screens/Home";
import PegSolitaireUI from "./games/peg-solitaire/UI";
import PegSolitaireRules from "./games/peg-solitaire/Rules";

type View = "home" | "game" | "rules";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [activeGameId, setActiveGameId] = useState<string | null>(null);

  const handleSelectGame = (id: string, view: "game" | "rules" = "game") => {
    setActiveGameId(id);
    setCurrentView(view);
  };

  const handleTabChange = (view: View) => {
    setCurrentView(view);
  };

  return (
    <Layout 
      activeTab={currentView} 
      onTabChange={handleTabChange}
      title={activeGameId === "peg-solitaire" && currentView !== "home" ? "Peg Solitaire" : "Family Game Shelf"}
    >
      {currentView === "home" && <Home onSelectGame={handleSelectGame} />}
      
      {currentView === "game" && activeGameId === "peg-solitaire" && (
        <PegSolitaireUI onShowRules={() => setCurrentView("rules")} />
      )}

      {currentView === "rules" && activeGameId === "peg-solitaire" && (
        <PegSolitaireRules onStart={() => setCurrentView("game")} />
      )}

      {/* Fallback for unselected game */}
      {currentView !== "home" && !activeGameId && (
        <div className="flex flex-col items-center justify-center p-20 text-center gap-4">
          <p className="text-zinc-500 font-serif text-xl italic">Select a game from the shelf to begin.</p>
          <button 
            onClick={() => setCurrentView("home")}
            className="text-primary font-bold uppercase tracking-widest text-xs"
          >
            Go to Shelf
          </button>
        </div>
      )}
    </Layout>
  );
}

