/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BrowserRouter, Routes, Route, useParams, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "./components/Layout.tsx";
import Home from "./screens/Home.tsx";
import { GAMES_REGISTRY } from "./registry/games.ts";
import PegSolitaireUI from "./games/peg-solitaire/UI.tsx";
import PegSolitaireRules from "./games/peg-solitaire/Rules.tsx";
import BoggleUI from "./games/boggle/UI.tsx";
import BoggleRules from "./games/boggle/Rules.tsx";
import WordWheelUI from "./games/word-wheel/UI.tsx";
import WordWheelRules from "./games/word-wheel/Rules.tsx";
import { UI as StretchyCatUI, Rules as StretchyCatRules } from "./games/stretchy-cat/index.ts";
import { UI as MankalaRunnerUI, Rules as MankalaRunnerRules } from "./games/mankala-runner/index.ts";

function GameWrapper() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  
  if (gameId === "peg-solitaire") {
    return (
      <>
        <Helmet>
          <title>Peg Solitaire - The Mankala Arcade</title>
          <meta name="description" content="Play the classic Peg Solitaire board game. Strategy and logic in a premium parlor theme." />
          <meta property="og:title" content="Peg Solitaire - The Mankala Arcade" />
          <meta property="og:description" content="Play the classic Peg Solitaire board game. Strategy and logic in a premium parlor theme." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://play.mankala.space/${gameId}`} />
          <link rel="canonical" href={`https://play.mankala.space/${gameId}`} />
        </Helmet>
        <PegSolitaireUI onShowRules={() => navigate(`/peg-solitaire/rules`)} />
      </>
    );
  }

  if (gameId === "boggle") {
    return (
      <>
        <Helmet>
          <title>Boggle - The Mankala Arcade</title>
          <meta name="description" content="Play the fast-paced word discovery game. Hunt for words in a scrambled grid." />
          <meta property="og:title" content="Boggle - The Mankala Arcade" />
          <meta property="og:description" content="Play the fast-paced word discovery game. Hunt for words in a scrambled grid." />
          <meta property="og:image" content="https://play.mankala.space/boggle-thumb.png" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://play.mankala.space/${gameId}`} />
          <link rel="canonical" href={`https://play.mankala.space/${gameId}`} />
        </Helmet>
        <BoggleUI onShowRules={() => navigate(`/boggle/rules`)} />
      </>
    );
  }

  if (gameId === "word-wheel") {
    return (
      <>
        <Helmet>
          <title>Wordwheel Cross - The Mankala Arcade</title>
          <meta name="description" content="Spin to find, place to cross. A hybrid word discovery and crossword experience." />
          <meta property="og:title" content="Wordwheel Cross - The Mankala Arcade" />
          <meta property="og:description" content="Spin to find, place to cross. A hybrid word discovery and crossword experience." />
          <meta property="og:image" content="https://play.mankala.space/word-wheel-thumb.png" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://play.mankala.space/${gameId}`} />
          <link rel="canonical" href={`https://play.mankala.space/${gameId}`} />
        </Helmet>
        <WordWheelUI />
      </>
    );
  }

  if (gameId === "stretchy-cat") {
    return (
      <>
        <Helmet>
          <title>Stretchy Cat - The Mankala Arcade</title>
          <meta name="description" content="Stretch the cat to fill the board. A tactile path-finding puzzle." />
          <meta property="og:title" content="Stretchy Cat - The Mankala Arcade" />
          <meta property="og:description" content="Stretch the cat to fill the board. A tactile path-finding puzzle." />
          <meta property="og:image" content="https://play.mankala.space/stretchy-cat-thumb.png" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://play.mankala.space/${gameId}`} />
          <link rel="canonical" href={`https://play.mankala.space/${gameId}`} />
        </Helmet>
        <StretchyCatUI />
      </>
    );
  }

  if (gameId === "mankala-runner") {
    return (
      <>
        <Helmet>
          <title>Mankala Runner - The Mankala Arcade</title>
          <meta name="description" content="Race through a stunning synthwave cosmos. High-speed 3D arcade action." />
          <meta property="og:title" content="Mankala Runner - The Mankala Arcade" />
          <meta property="og:description" content="Race through a stunning synthwave cosmos. High-speed 3D arcade action." />
          <meta property="og:image" content="https://play.mankala.space/mankala-runner-thumb.png" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://play.mankala.space/${gameId}`} />
          <link rel="canonical" href={`https://play.mankala.space/${gameId}`} />
        </Helmet>
        <MankalaRunnerUI />
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-20 text-center gap-4">
      <p className="text-zinc-500 font-serif text-xl italic">Game not found.</p>
      <button onClick={() => navigate("/")} className="text-primary font-bold uppercase tracking-widest text-xs">Go to Shelf</button>
    </div>
  );
}

function RulesWrapper() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  if (gameId === "peg-solitaire") {
    return (
      <>
        <Helmet>
          <title>Rules: Peg Solitaire - The Mankala Arcade</title>
          <meta name="description" content="Learn how to play Peg Solitaire. Master the objective and moves of this classic strategy puzzle." />
          <link rel="canonical" href={`https://play.mankala.space/${gameId}/rules`} />
        </Helmet>
        <PegSolitaireRules onStart={() => navigate(`/peg-solitaire`)} />
      </>
    );
  }

  if (gameId === "boggle") {
    return (
      <>
        <Helmet>
          <title>Rules: Boggle - The Mankala Arcade</title>
          <meta name="description" content="Learn how to play Boggle. Find words, score points, and beat the clock." />
          <link rel="canonical" href={`https://play.mankala.space/${gameId}/rules`} />
        </Helmet>
        <BoggleRules onStart={() => navigate(`/boggle`)} />
      </>
    );
  }

  if (gameId === "word-wheel") {
    return (
      <>
        <Helmet>
          <title>Rules: Wordwheel Cross - The Mankala Arcade</title>
          <meta name="description" content="Learn how to play Wordwheel Cross. Master the spin and solve the grid." />
          <link rel="canonical" href={`https://play.mankala.space/${gameId}/rules`} />
        </Helmet>
        <WordWheelRules onStart={() => navigate(`/word-wheel`)} />
      </>
    );
  }

  if (gameId === "stretchy-cat") {
    return (
      <>
        <Helmet>
          <title>Rules: Stretchy Cat - The Mankala Arcade</title>
          <meta name="description" content="Learn how to play Stretchy Cat. Master the stretch and fill the grid." />
          <link rel="canonical" href={`https://play.mankala.space/${gameId}/rules`} />
        </Helmet>
        <StretchyCatRules onStart={() => navigate(`/stretchy-cat`)} />
      </>
    );
  }

  if (gameId === "mankala-runner") {
    return (
      <>
        <Helmet>
          <title>Rules: Mankala Runner - The Mankala Arcade</title>
          <meta name="description" content="Learn how to master the synthwave cosmos in Mankala Runner. Controls and objective guide." />
          <link rel="canonical" href={`https://play.mankala.space/${gameId}/rules`} />
        </Helmet>
        <MankalaRunnerRules onStart={() => navigate(`/mankala-runner`)} />
      </>
    );
  }

  return <div className="p-20 text-center text-zinc-500">Rules not found.</div>;
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const getActiveTab = (): "home" | "game" | "rules" => {
    if (location.pathname === "/") return "home";
    if (location.pathname.endsWith("/rules")) return "rules";
    return "game";
  };

  const getActiveGameTitle = (): string => {
    if (location.pathname === "/") return "The Mankala Arcade";
    const game = GAMES_REGISTRY.find(g => location.pathname.includes(g.id));
    return game ? game.title : "The Mankala Arcade";
  };

  return (
    <Layout 
      activeTab={getActiveTab()} 
      onTabChange={(tab) => {
        if (tab === "home") navigate("/");
        // Note: game/rules tab behavior depends on having a gameId, 
        // we'll default to the last played or home
      }}
      title={getActiveGameTitle()}
    >
      <Routes>
        <Route path="/" element={
          <>
            <Helmet>
              <title>The Mankala Arcade - Classic Game Collection</title>
              <meta name="description" content="A curated collection of classic tactile puzzles and board games. Play Peg Solitaire, Rummy, and more." />
              <meta property="og:title" content="The Mankala Arcade - Classic Game Collection" />
              <meta property="og:description" content="A curated collection of classic tactile puzzles and board games." />
              <meta property="og:image" content="https://play.mankala.space/logo.png" />
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://play.mankala.space/" />
              <link rel="canonical" href="https://play.mankala.space/" />
            </Helmet>
            <Home onSelectGame={(id, view) => navigate(view === "rules" ? `/${id}/rules` : `/${id}`)} />
          </>
        } />
        <Route path="/:gameId" element={<GameWrapper />} />
        <Route path="/:gameId/rules" element={<RulesWrapper />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

