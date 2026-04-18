import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Home',     href: '#hero' },
  { label: 'About',    href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#work' },
  { label: 'Contact',  href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#020209]/85 backdrop-blur-2xl border-b border-white/5 shadow-2xl' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ── Logo ── */}
        <motion.a href="#hero" whileHover={{ scale: 1.04 }} className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://fostq.com/wp-content/uploads/2024/10/%D8%AF%D9%84%D9%8A%D9%84-%D8%A7%D9%84%D9%87%D9%88%D9%8A%D8%A9-%D8%A7%D9%84%D8%A5%D8%B1%D8%B4%D8%A7%D8%AF%D9%8A-14.png"
            alt="FOSTQ"
            className="h-9 w-auto object-contain"
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
          {/* fallback text logo */}
          <span className="hidden text-2xl font-black tracking-tight">
            <span className="gradient-text">FOST</span><span className="text-white">Q</span>
          </span>
        </motion.a>

        {/* ── Desktop links ── */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l, i) => (
            <motion.a key={l.label} href={l.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              className="text-sm text-white/55 hover:text-white transition-colors duration-300 font-medium">
              {l.label}
            </motion.a>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="hidden md:flex items-center gap-3">
          <motion.a
            href={`https://wa.me/971547772515?text=${encodeURIComponent('Hello, I am interested in your services. I want to know more.')}`}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#FF6B35] via-[#FF4B6E] to-[#9B51E0] text-white shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300">
            Start Project
          </motion.a>
        </div>

        {/* ── Mobile toggle ── */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white/70 hover:text-white transition-colors">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a1a]/95 backdrop-blur-2xl border-b border-white/5">
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map(l => (
                <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                  className="text-white/70 hover:text-white transition-colors font-medium py-2">{l.label}</a>
              ))}
              <a href="https://wa.me/971547772515" target="_blank" rel="noopener noreferrer"
                className="mt-2 px-5 py-3 rounded-xl text-sm font-semibold text-center bg-gradient-to-r from-[#FF6B35] via-[#FF4B6E] to-[#9B51E0] text-white">
                Start Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
