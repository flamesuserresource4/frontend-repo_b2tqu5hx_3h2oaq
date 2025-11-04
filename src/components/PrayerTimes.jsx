import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';

const defaultCity = { city: 'Cairo', country: 'Egypt' };

const formatTime12h = (timeStr) => {
  // AlAdhan returns "HH:MM" 24h by default
  try {
    const [h, m] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(h, m, 0, 0);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return timeStr;
  }
};

const PrayerTimes = () => {
  const [city, setCity] = useState(defaultCity.city);
  const [country, setCountry] = useState(defaultCity.country);
  const [timings, setTimings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const query = useMemo(() => ({ city, country }), [city, country]);

  useEffect(() => {
    const fetchTimes = async () => {
      setLoading(true);
      setError('');
      try {
        const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
          query.city
        )}&country=${encodeURIComponent(query.country)}&method=2`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.code !== 200) throw new Error('Failed to fetch');
        setTimings(data.data.timings);
      } catch (e) {
        setError('Unable to load prayer times right now.');
      } finally {
        setLoading(false);
      }
    };
    fetchTimes();
  }, [query]);

  return (
    <section id="prayer" className="relative w-full bg-gradient-to-b from-slate-900 to-emerald-950 py-20 text-emerald-50">
      <div className="absolute inset-0 -z-0 opacity-20" aria-hidden>
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at top, rgba(16,185,129,0.25), transparent 50%), radial-gradient(ellipse at bottom, rgba(251,191,36,0.15), transparent 50%)',
          }}
        />
        <motion.div
          className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-amber-300/10 blur-xl"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-serif text-3xl text-emerald-100 md:text-4xl">Prayer Schedule</h2>
            <p className="mt-1 text-emerald-200/80">Real-time times by city with a gentle clock shimmer.</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // state is already bound; simply triggers useEffect via state updates
            }}
            className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
          >
            <div className="flex-1 rounded-lg border border-emerald-300/30 bg-emerald-900/30 px-3 py-2 shadow-inner focus-within:border-emerald-300/60">
              <label className="block text-xs text-emerald-200/70">City</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-transparent focus:outline-none"
                placeholder="City"
              />
            </div>
            <div className="flex-1 rounded-lg border border-emerald-300/30 bg-emerald-900/30 px-3 py-2 shadow-inner focus-within:border-emerald-300/60">
              <label className="block text-xs text-emerald-200/70">Country</label>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-transparent focus:outline-none"
                placeholder="Country"
              />
            </div>
            <button
              type="submit"
              className="whitespace-nowrap rounded-lg bg-gradient-to-r from-emerald-500 to-amber-400 px-4 py-2 font-semibold text-slate-900 shadow focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              <span className="inline-flex items-center gap-2"><MapPin size={16}/> Set</span>
            </button>
          </form>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
          {loading && (
            <div className="col-span-full text-center text-emerald-200">Loading...</div>
          )}
          {error && !loading && (
            <div className="col-span-full rounded-md border border-red-400/30 bg-red-900/20 p-3 text-center text-red-200">
              {error}
            </div>
          )}

          {timings && !loading && (
            <>
              {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((name, idx) => (
                <motion.div
                  key={name}
                  className="rounded-xl border border-emerald-300/20 bg-emerald-900/30 p-5 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-emerald-100">{name}</h3>
                    <Clock className="text-amber-300" size={18} />
                  </div>
                  <div className="mt-2 text-2xl font-bold text-amber-200">
                    {formatTime12h(timings[name])}
                  </div>
                  <div className="mt-1 text-xs text-emerald-200/70">Local time</div>
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PrayerTimes;
