import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const Hero = ({ onScrollTo, audioRef, isMuted, setIsMuted }) => {
  const heroRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setOffset(y * 0.2); // gentle parallax
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-emerald-900 via-sky-900 to-slate-900 text-white"
    >
      {/* Subtle geometric pattern overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-soft-light"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.08) 2px, transparent 3px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Crescent moon glow */}
      <motion.div
        className="absolute right-10 top-16 h-36 w-36 rounded-full bg-sky-200/20 blur-2xl"
        style={{ y: -offset * 0.3 }}
        aria-hidden
      />
      <motion.div
        className="absolute right-16 top-20 h-24 w-24 rounded-full bg-sky-100 shadow-inner"
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ y: -offset * 0.2 }}
        aria-label="crescent-moon"
      />

      {/* Mosque silhouette */}
      <motion.svg
        viewBox="0 0 1440 400"
        className="absolute bottom-0 left-0 w-[150%] max-w-none text-emerald-700/40"
        style={{ x: -offset * 0.3 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0,320L40,304C80,288,160,256,240,250.7C320,245,400,267,480,277.3C560,288,640,288,720,250.7C800,213,880,139,960,112C1040,85,1120,107,1200,128C1280,149,1360,171,1400,181.3L1440,192L1440,400L1400,400C1360,400,1280,400,1200,400C1120,400,1040,400,960,400C880,400,800,400,720,400C640,400,560,400,480,400C400,400,320,400,240,400C160,400,80,400,40,400L0,400Z"
        />
      </motion.svg>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <motion.h1
          className="font-serif text-4xl leading-tight tracking-tight text-emerald-100 drop-shadow md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          مرحبًا بكم
          <span className="block font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-emerald-100">
            Welcome to Masjid At-Taqwa
          </span>
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl text-emerald-100/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          A place of worship and unity, dedicated to spreading peace, faith, and knowledge.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
        >
          <button
            onClick={() => onScrollTo('about')}
            className="rounded-full bg-gradient-to-r from-emerald-500 to-amber-400 px-6 py-3 font-semibold text-slate-900 shadow-lg shadow-emerald-900/30 transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-300"
          >
            Join Our Community
          </button>

          <button
            onClick={() => {
              if (!audioRef.current) return;
              if (audioRef.current.paused) {
                audioRef.current.play();
                setIsMuted(false);
              } else {
                audioRef.current.pause();
                setIsMuted(true);
              }
            }}
            className="flex items-center gap-2 rounded-full border border-emerald-300/40 px-5 py-3 text-emerald-100 transition-colors hover:bg-emerald-800/30 focus:outline-none focus:ring-2 focus:ring-emerald-300/50"
            aria-label="Toggle background sound"
          >
            {isMuted ? <Play size={18} /> : <Pause size={18} />}
            <span className="text-sm">{isMuted ? 'Play ambient' : 'Pause ambient'}</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
