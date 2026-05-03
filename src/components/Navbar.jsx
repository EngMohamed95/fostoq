import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Languages } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useLocale } from '../LocaleContext';

export default function Navbar({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();

  const links = [
    { label: t('navHome'),     id: 'home' },
    { label: t('navAbout'),    id: 'about' },
    { label: t('navServices'), id: 'services' },
    { label: t('navWork'),     id: 'work' },
    { label: t('navContact'),  id: 'contact' },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const toggleLocale = () => setLocale(locale === 'en' ? 'ar' : 'en');

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-background/85 backdrop-blur-2xl border-b border-white/5 dark:border-white/5 border-black/5 shadow-2xl' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ── Logo ── */}
        <motion.div 
          onClick={() => onNavigate('home')} 
          whileHover={{ scale: 1.04 }} 
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src="/logo (2).png"
            alt="FOSTQ Logo"
            className="h-10 md:h-14 w-auto object-contain drop-shadow-md"
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
          {/* fallback text logo */}
          <span className="hidden text-2xl font-black tracking-tight">
            <span className="gradient-text">FOST</span><span className="text-foreground">Q</span>
          </span>
        </motion.div>

        {/* ── Desktop links ── */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l, i) => (
            <motion.button 
              key={l.id} 
              onClick={() => onNavigate(l.id)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium">
              {l.label}
            </motion.button>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          {/* Language Toggle */}
          <motion.button
            onClick={toggleLocale}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold bg-secondary text-foreground border border-border hover:border-foreground/20 transition-colors"
            title={locale === 'en' ? 'العربية' : 'English'}
          >
            <Languages size={15} />
            {locale === 'en' ? 'عربي' : 'EN'}
          </motion.button>
          <motion.a
            href={`https://wa.me/971547772515?text=${encodeURIComponent(t('waMessage'))}`}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#FF6B35] via-[#FF4B6E] to-[#9B51E0] text-white shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300">
            {t('startProject')}
          </motion.a>
        </div>

        {/* ── Mobile toggle ── */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <motion.button
            onClick={toggleLocale}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-semibold bg-secondary text-foreground border border-border"
          >
            <Languages size={13} />
            {locale === 'en' ? 'عربي' : 'EN'}
          </motion.button>
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="text-muted-foreground hover:text-foreground transition-colors">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-popover/95 backdrop-blur-2xl border-b border-border shadow-lg">
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map(l => (
                <button 
                  key={l.id} 
                  onClick={() => {
                    setMenuOpen(false);
                    onNavigate(l.id);
                  }}
                  className="text-left text-muted-foreground hover:text-foreground transition-colors font-medium py-2">
                  {l.label}
                </button>
              ))}
              <a href={`https://wa.me/971547772515?text=${encodeURIComponent(t('waMessage'))}`}
                target="_blank" rel="noopener noreferrer"
                className="mt-2 px-5 py-3 rounded-xl text-sm font-semibold text-center bg-gradient-to-r from-[#FF6B35] via-[#FF4B6E] to-[#9B51E0] text-white">
                {t('startProject')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
