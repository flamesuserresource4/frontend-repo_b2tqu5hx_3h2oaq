import React, { useEffect, useRef, useState } from 'react';
import Hero from './components/Hero.jsx';
import PrayerTimes from './components/PrayerTimes.jsx';
import Community from './components/Community.jsx';
import Engage from './components/Engage.jsx';
import { Moon, Sun } from 'lucide-react';

const App = () => {
  const [dark, setDark] = useState(true);
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

  useEffect(() => {
    // preload audio
    if (audioRef.current) {
      audioRef.current.volume = 0.25;
    }
  }, []);

  const onScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="scroll-smooth bg-slate-950 text-slate-100">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 border-b border-emerald-300/10 bg-slate-950/70 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div onClick={() => onScrollTo('home')} className="cursor-pointer select-none text-lg font-extrabold tracking-tight text-emerald-200">
            Masjid At-Taqwa
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <button onClick={() => onScrollTo('about')} className="text-emerald-100/80 hover:text-emerald-100">About</button>
            <button onClick={() => onScrollTo('prayer')} className="text-emerald-100/80 hover:text-emerald-100">Prayer</button>
            <button onClick={() => onScrollTo('events')} className="text-emerald-100/80 hover:text-emerald-100">Events</button>
            <button onClick={() => onScrollTo('gallery')} className="text-emerald-100/80 hover:text-emerald-100">Gallery</button>
            <button onClick={() => onScrollTo('donate')} className="text-emerald-100/80 hover:text-emerald-100">Donate</button>
            <button onClick={() => onScrollTo('contact')} className="text-emerald-100/80 hover:text-emerald-100">Contact</button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDark((d) => !d)}
              className="rounded-full border border-emerald-300/30 p-2 text-emerald-100 transition-colors hover:bg-emerald-900/30 focus:outline-none focus:ring-2 focus:ring-emerald-300/50"
              aria-label="Toggle color theme"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="#donate"
              onClick={(e) => {
                e.preventDefault();
                onScrollTo('donate');
              }}
              className="rounded-full bg-gradient-to-r from-emerald-500 to-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow hover:opacity-95"
            >
              Donate
            </a>
          </div>
        </nav>
      </header>

      {/* Ambient audio (soft instrumental) */}
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/07/30/audio_7dc5b9f0a6.mp3?filename=oriental-ambience-113467.mp3"
        loop
        muted={isMuted}
      />

      <Hero onScrollTo={onScrollTo} audioRef={audioRef} isMuted={isMuted} setIsMuted={setIsMuted} />
      <Community />
      <PrayerTimes />
      <Engage />

      <footer className="border-t border-emerald-300/10 bg-slate-950 py-8 text-center text-emerald-100/70">
        © {new Date().getFullYear()} Masjid At-Taqwa. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
