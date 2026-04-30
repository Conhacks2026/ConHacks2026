import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wind,
  Cloud,
  Sun,
  Moon,
  BarChart2,
  MapPin,
  Calendar,
  Clock,
  Search,
  Menu,
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

const navLinks = [
  { href: '#conditions', label: 'Conditions' },
  { href: '#visibility', label: 'Visibility' },
  { href: '#locations', label: 'Locations' },
  { href: '#events', label: 'Events' },
  { href: '#forecast', label: 'Forecast' },
];

function ModuleShell({ icon: Icon, kicker, title, children }) {
  return (
    <div className="glass-panel relative overflow-hidden rounded-2xl p-6 md:p-8">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-primary/80 via-secondary/40 to-transparent opacity-90"
        aria-hidden
      />
      <div className="relative flex items-start gap-3 border-b border-white/10 pb-4 mb-6">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
          <Icon className="h-4 w-4 text-[var(--color-primary)]" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-white/45">{kicker}</p>
          <h2 className="font-display mt-1 text-sm font-semibold tracking-wide text-white md:text-base">{title}</h2>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function Overlay() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [toast, setToast] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    window.setTimeout(() => {
      setIsSearching(false);
      setToast({
        tone: 'success',
        title: 'Query staged',
        body: `Observation context loaded for “${searchQuery.trim()}”. Connect API when backend is wired.`,
      });
      window.setTimeout(() => setToast(null), 5200);
    }, 900);
  };

  const conditions = [
    { label: 'Air quality (AQI)', value: '24', desc: 'Optimal' },
    { label: 'Light pollution index', value: 'Class 3', desc: 'Bortle scale' },
    { label: 'Cloud forecast', value: '12%', desc: 'Clear' },
    { label: 'Moon illumination', value: '15%', desc: 'Waxing crescent' },
    { label: 'Atmospheric clarity', value: '92%', desc: 'Excellent' },
  ];

  const visibilityRows = [
    { label: 'Stellar visibility probability', value: 94 },
    { label: 'Milky Way visibility', value: 85 },
    { label: 'Aurora probability', value: 12 },
  ];

  const locations = [
    { name: 'Dark Sky Preserve A', elevation: '420 m', openness: 'High', score: 92, distance: '24 km', tier: 'Prime' },
    { name: 'Observatory Ridge', elevation: '510 m', openness: 'Medium', score: 85, distance: '45 km', tier: 'Strong' },
    { name: 'Lake Solitude', elevation: '310 m', openness: 'High', score: 78, distance: '12 km', tier: 'Good' },
  ];

  const events = [
    { event: 'Northern lights probability', value: '12% · Low' },
    { event: 'Perseid meteor shower', value: 'Peak in 14 days' },
    { event: 'Lunar eclipse', value: 'Oct 28 (partial)' },
  ];

  return (
    <>
      <div className="noise-overlay" aria-hidden />

      <div className="relative z-10 min-h-screen w-full font-sans text-white selection:bg-[var(--color-primary)]/25 selection:text-white">
        {/* Nav */}
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] glass-panel-strong">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
            <a href="#" className="group flex items-center gap-3 focus-ring rounded-lg outline-none">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)]/25 to-[var(--color-secondary)]/20 ring-1 ring-white/15">
                <Sparkles className="h-4 w-4 text-[var(--color-primary)] transition-transform group-hover:scale-110" aria-hidden />
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              </span>
              <div className="leading-tight">
                <p className="font-display text-xs font-bold tracking-[0.18em] text-white/90 md:text-sm">NIGHTOWL</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Sky observatory console</p>
              </div>
            </a>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="focus-ring rounded-lg px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white/55 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/50 sm:flex">
                <span className="text-white/35">Sys</span>
                <span className="font-semibold text-emerald-400">Nominal</span>
              </div>
              <button
                type="button"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 md:hidden"
                aria-expanded={mobileNavOpen}
                aria-controls="mobile-nav"
                onClick={() => setMobileNavOpen((o) => !o)}
              >
                {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobileNavOpen && (
              <motion.div
                id="mobile-nav"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="overflow-hidden border-t border-white/[0.06] md:hidden"
              >
                <nav className="flex flex-col gap-1 px-4 py-3 font-mono text-xs uppercase tracking-widest" aria-label="Mobile">
                  {navLinks.map(({ href, label }) => (
                    <a
                      key={href}
                      href={href}
                      className="rounded-lg px-3 py-3 text-white/70 hover:bg-white/5 hover:text-white"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      {label}
                    </a>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              role="status"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="pointer-events-none fixed left-1/2 top-20 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 px-4"
            >
              <div className="glass-panel-strong pointer-events-auto rounded-xl border border-emerald-500/25 px-4 py-3 shadow-xl shadow-emerald-900/20">
                <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-300">{toast.title}</p>
                <p className="mt-1 text-sm text-white/80">{toast.body}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="mx-auto flex max-w-6xl flex-col gap-20 px-4 pb-24 pt-28 md:gap-28 md:px-6 md:pb-32 md:pt-32">
          {/* Hero */}
          <section className="flex min-h-[78vh] flex-col justify-center">
            <motion.div {...fadeInUp} className="mx-auto w-full max-w-3xl text-center">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-[var(--color-primary)]/90">
                Live sky intelligence
              </p>
              <h1 className="font-display mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-gradient-hero sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                Find the clearest window tonight
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
                Search a coordinate or place name. Rank nearby zones by weather clarity, visibility, and observation windows —
                tuned for astrophotography runs.
              </p>

              <form onSubmit={handleSearch} className="relative mx-auto mt-10 max-w-xl">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[var(--color-primary)]/40 via-white/15 to-[var(--color-secondary)]/35 opacity-70 blur-sm" aria-hidden />
                <div className="relative flex items-center rounded-2xl border border-white/15 bg-black/50 p-1.5 shadow-2xl backdrop-blur-xl">
                  <Search className="pointer-events-none absolute left-5 h-5 w-5 text-white/35" aria-hidden />
                  <label htmlFor="sky-search" className="sr-only">
                    Location or coordinates
                  </label>
                  <input
                    id="sky-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="City, dark-sky site, or lat · lon…"
                    autoComplete="off"
                    className="focus-ring w-full rounded-xl bg-transparent py-4 pl-14 pr-36 text-sm text-white placeholder:text-white/35 outline-none md:text-[15px]"
                  />
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-cyan-400 px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider text-black shadow-lg shadow-cyan-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSearching ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                        Scan
                      </>
                    ) : (
                      <>
                        Search
                        <ArrowRight className="h-4 w-4 opacity-70" aria-hidden />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-widest text-white/35">
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">Open‑Meteo ready</span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">Three.js backdrop</span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">Hackathon MVP</span>
              </div>
            </motion.div>
          </section>

          {/* Conditions */}
          <section id="conditions" className="scroll-mt-28">
            <motion.div {...fadeInUp}>
              <ModuleShell icon={Wind} kicker="Module 01" title="Atmospheric conditions">
                <ul className="divide-y divide-white/[0.06] font-mono text-xs">
                  {conditions.map((item) => (
                    <li key={item.label} className="flex flex-wrap items-center justify-between gap-4 py-4 first:pt-0 transition-colors hover:bg-white/[0.02]">
                      <span className="text-white/45">{item.label}</span>
                      <div className="text-right">
                        <span className="text-base font-bold text-white">{item.value}</span>
                        <span className="mt-0.5 block text-[10px] uppercase tracking-wider text-white/35">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </ModuleShell>
            </motion.div>
          </section>

          {/* Visibility */}
          <section id="visibility" className="scroll-mt-28">
            <motion.div {...fadeInUp}>
              <ModuleShell icon={BarChart2} kicker="Module 02" title="Visibility computation">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Composite score</p>
                    <p className="font-display mt-1 text-5xl font-bold tabular-nums text-white glow-text-cyan md:text-6xl">88</p>
                  </div>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                    Optimal band
                  </span>
                </div>
                <div className="space-y-6">
                  {visibilityRows.map((row) => (
                    <div key={row.label}>
                      <div className="mb-2 flex justify-between gap-4 font-mono text-[11px]">
                        <span className="text-white/45">{row.label}</span>
                        <span className="font-bold tabular-nums text-white">{row.value}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/[0.06] ring-1 ring-white/[0.06]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${row.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] via-cyan-300 to-[var(--color-secondary)]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </ModuleShell>
            </motion.div>
          </section>

          {/* Locations */}
          <section id="locations" className="scroll-mt-28">
            <motion.div {...fadeInUp}>
              <ModuleShell icon={MapPin} kicker="Module 03" title="Optimal locations nearby">
                <div className="grid gap-4">
                  {locations.map((loc, index) => (
                    <motion.article
                      key={loc.name}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06, duration: 0.45 }}
                      className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 transition-colors hover:border-[var(--color-primary)]/25 hover:bg-white/[0.05] md:flex md:items-center md:justify-between md:p-5"
                    >
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[var(--color-primary)]/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                      <div className="relative flex items-start gap-4 md:items-center">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black/40 font-display text-sm font-bold text-[var(--color-primary)] ring-1 ring-white/10">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-display text-base font-semibold text-white">{loc.name}</h3>
                          <p className="mt-1 font-mono text-[11px] text-white/40">
                            Elev {loc.elevation} · Horizon {loc.openness}
                          </p>
                        </div>
                      </div>
                      <div className="relative mt-4 flex items-center justify-between gap-4 border-t border-white/[0.06] pt-4 font-mono text-[11px] md:mt-0 md:border-t-0 md:pt-0">
                        <span className="rounded-md border border-white/10 bg-black/30 px-2 py-1 uppercase tracking-wider text-white/45">{loc.tier}</span>
                        <div className="text-right">
                          <span className="block text-2xl font-bold tabular-nums text-white">{loc.score}</span>
                          <span className="text-[10px] uppercase tracking-wider text-white/35">{loc.distance}</span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </ModuleShell>
            </motion.div>
          </section>

          {/* Events */}
          <section id="events" className="scroll-mt-28">
            <motion.div {...fadeInUp}>
              <ModuleShell icon={Calendar} kicker="Module 04" title="Celestial events">
                <ul className="space-y-1 font-mono text-xs">
                  {events.map((evt) => (
                    <li key={evt.event} className="flex flex-wrap justify-between gap-4 border-b border-white/[0.05] py-4 last:border-0">
                      <span className="text-white/45">{evt.event}</span>
                      <span className="font-semibold text-white">{evt.value}</span>
                    </li>
                  ))}
                </ul>
              </ModuleShell>
            </motion.div>
          </section>

          {/* Forecast */}
          <section id="forecast" className="scroll-mt-28">
            <motion.div {...fadeInUp}>
              <ModuleShell icon={Clock} kicker="Module 05" title="Observation forecast">
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: 'Best time tonight', value: '23:00 — 02:30 UTC', icon: Moon },
                    { label: 'Best night this week', value: 'Thu · Sky score 94', icon: Cloud },
                    { label: 'Recommended window', value: 'Next 48 hours', icon: Sun },
                  ].map(({ label, value, icon: IconCmp }) => (
                    <div
                      key={label}
                      className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 transition hover:border-white/15 hover:bg-white/[0.05]"
                    >
                      <IconCmp className="mb-3 h-4 w-4 text-[var(--color-primary)]/80" aria-hidden />
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">{label}</p>
                      <p className="mt-2 font-display text-sm font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </ModuleShell>
            </motion.div>
          </section>
        </main>

        <footer className="border-t border-white/[0.08] bg-black/40 py-10 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 md:flex-row md:text-left md:px-6">
            <span>© {new Date().getFullYear()} NightOwl observatory</span>
            <span className="max-w-md md:text-right">Built for clarity under dark skies · Demo data shown until APIs connect</span>
          </div>
        </footer>
      </div>
    </>
  );
}
