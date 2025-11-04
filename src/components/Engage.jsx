import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const Engage = () => {
  const [focus, setFocus] = useState('');
  const pinRef = useRef(null);

  return (
    <section id="engage" className="relative bg-gradient-to-b from-slate-950 to-slate-900 py-20 text-emerald-50">
      <div className="absolute inset-0 opacity-10" aria-hidden>
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 20%, rgba(251,191,36,0.15), transparent 40%), radial-gradient(circle at 70% 80%, rgba(16,185,129,0.25), transparent 40%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Donation */}
        <div id="donate" className="rounded-2xl border border-emerald-300/20 bg-emerald-900/20 p-8 shadow-lg backdrop-blur">
          <h3 className="font-serif text-2xl text-emerald-100 md:text-3xl">Support our mosque for a better ummah</h3>
          <p className="mt-2 text-emerald-100/80">Your generosity sustains our programs, classes, and community outreach.</p>
          <div className="mt-6 flex flex-wrap gap-4">
            {[
              { label: 'Donate $10', amount: 10 },
              { label: 'Donate $25', amount: 25 },
              { label: 'Donate $50', amount: 50 },
              { label: 'Custom', amount: 0 },
            ].map((d, i) => (
              <motion.button
                key={d.label}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-xl border border-amber-300/40 bg-gradient-to-br from-amber-300 to-emerald-300 px-5 py-3 font-semibold text-slate-900 shadow-md transition-colors hover:from-amber-200 hover:to-emerald-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
                onClick={() => alert(d.amount ? `Thank you for choosing $${d.amount}!` : 'Thank you! Enter your custom amount on our donation page.')}
              >
                {d.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div id="contact" className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-900/20 p-6">
            <h4 className="font-serif text-xl text-emerald-100">Visit Us</h4>
            <p className="mt-2 text-emerald-100/80">123 Serenity Road, Your City</p>
            <div className="relative mt-4 h-64 overflow-hidden rounded-xl">
              <iframe
                title="Masjid location"
                className="h-full w-full"
                src="https://www.openstreetmap.org/export/embed.html?bbox=72.80%2C18.90%2C72.90%2C19.00&layer=mapnik"
                style={{ border: 0 }}
                loading="lazy"
              />
              <motion.div
                ref={pinRef}
                initial={{ y: -10 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <MapPin size={36} className="text-amber-300 drop-shadow" />
              </motion.div>
            </div>
          </div>

          <form
            className="rounded-2xl border border-emerald-300/20 bg-emerald-900/20 p-6"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for reaching out! We will get back to you soon.');
            }}
          >
            <h4 className="font-serif text-xl text-emerald-100">Contact Us</h4>
            <div className="mt-4 grid gap-4">
              {[
                { name: 'name', type: 'text', placeholder: 'Your Name' },
                { name: 'email', type: 'email', placeholder: 'Email Address' },
              ].map((f) => (
                <div
                  key={f.name}
                  className={`rounded-xl border ${
                    focus === f.name ? 'border-amber-300/70' : 'border-emerald-300/20'
                  } bg-emerald-950/40 px-3 py-2 shadow-inner transition-colors`}
                >
                  <input
                    name={f.name}
                    type={f.type}
                    placeholder={f.placeholder}
                    onFocus={() => setFocus(f.name)}
                    onBlur={() => setFocus('')}
                    className="w-full bg-transparent outline-none placeholder:text-emerald-200/60"
                  />
                </div>
              ))}
              <div
                className={`rounded-xl border ${
                  focus === 'message' ? 'border-amber-300/70' : 'border-emerald-300/20'
                } bg-emerald-950/40 px-3 py-2 shadow-inner transition-colors`}
              >
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Your Message"
                  onFocus={() => setFocus('message')}
                  onBlur={() => setFocus('')}
                  className="w-full resize-none bg-transparent outline-none placeholder:text-emerald-200/60"
                />
              </div>
              <button
                className="mt-2 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-amber-400 px-6 py-3 font-semibold text-slate-900 shadow focus:outline-none focus:ring-2 focus:ring-amber-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Engage;
