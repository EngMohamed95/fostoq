import { motion } from 'framer-motion';
import { Zap, X, AtSign, Briefcase, Code2 } from 'lucide-react';

const footerLinks = {
  Services: ['Brand Identity', 'Web Development', 'Performance Marketing', 'Content Production', 'Social Media'],
  Company: ['About Us', 'Our Work', 'Careers', 'Press', 'Contact'],
  Resources: ['Blog', 'Case Studies', 'Free Tools', 'Privacy Policy', 'Terms of Service'],
};

const socials = [
  { icon: X, href: '#' },
  { icon: AtSign, href: '#' },
  { icon: Briefcase, href: '#' },
  { icon: Code2, href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Zap size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="gradient-text">Pixel</span>
                <span className="text-white">Forge</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              A full-service digital agency obsessed with helping ambitious brands dominate their markets.
            </p>
            <div className="flex gap-3">
              {socials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-purple-500/30 transition-colors duration-300"
                >
                  <s.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">© 2026 PixelForge Agency. All rights reserved.</p>
          <p className="text-sm text-white/20">Crafted with passion in New York City</p>
        </div>
      </div>
    </footer>
  );
}
