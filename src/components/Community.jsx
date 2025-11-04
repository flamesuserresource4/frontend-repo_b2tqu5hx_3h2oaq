import React from 'react';
import { motion } from 'framer-motion';

const events = [
  {
    title: "Weekly Qur'an Recitation",
    desc: 'Every Friday after Maghrib. Join us in the remembrance of Allah.',
  },
  {
    title: 'Islamic Studies Class',
    desc: 'Saturdays at 10 AM. Open to all levels and ages.',
  },
  {
    title: 'Charity & Community Drive',
    desc: 'Monthly food bank support — volunteers welcome.',
  },
];

const images = [
  'https://images.unsplash.com/photo-1549640356-6ec1d8a5d869?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529481411453-5b7f2e5c9b84?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1606577924006-bd0ddab55a3c?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1565552645632-d725f8bfc19f?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555252333-9f8b2c0b09e9?q=80&w=1200&auto=format&fit=crop',
];

const Community = () => {
  return (
    <section id="about" className="relative bg-gradient-to-b from-emerald-950 to-slate-950 py-20 text-emerald-50">
      <div className="absolute inset-0 opacity-10" aria-hidden>
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="geo" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geo)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* About */}
        <div className="grid items-center gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl text-emerald-100 md:text-4xl">About Masjid At-Taqwa</h2>
            <p className="mt-4 text-emerald-100/80">
              Masjid At-Taqwa is a place of worship and unity, dedicated to spreading peace, faith, and knowledge.
            </p>
          </motion.div>
          <motion.div
            className="relative aspect-video overflow-hidden rounded-xl border border-emerald-300/20 bg-emerald-900/30"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1529694157871-065d8fd84960?q=80&w=1400&auto=format&fit=crop"
              alt="Masjid exterior"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-950/60 to-transparent" />
          </motion.div>
        </div>

        {/* Events */}
        <div id="events" className="mt-20">
          <h3 className="font-serif text-2xl text-emerald-100 md:text-3xl">Events & Activities</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {events.map((e, i) => (
              <motion.div
                key={e.title}
                className="rounded-xl border border-emerald-300/20 bg-emerald-900/30 p-6 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h4 className="text-lg font-semibold text-amber-200">{e.title}</h4>
                <p className="mt-2 text-emerald-100/80">{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div id="gallery" className="mt-20">
          <h3 className="font-serif text-2xl text-emerald-100 md:text-3xl">Gallery</h3>
          <div className="mt-6 columns-1 gap-4 sm:columns-2 md:columns-3">
            {images.map((src, idx) => (
              <motion.div
                key={src}
                className="mb-4 overflow-hidden rounded-xl border border-emerald-300/20"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.07 }}
              >
                <img src={src} alt={`Mosque ${idx + 1}`} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
