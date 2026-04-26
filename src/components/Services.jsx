import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Share2, Megaphone, Globe, Palette, Search, Film, Box, ArrowRight } from 'lucide-react';
import { useLocale } from '../LocaleContext';

const directions = [
  { x: -80,  y: 60  },  // 0 — bottom-left
  { x: 0,   y: 80  },  // 1 — bottom
  { x: 80,  y: 60  },  // 2 — bottom-right
  { x: -80, y: 60  },  // 3 — bottom-left
  { x: 0,   y: 80  },  // 4 — bottom
  { x: 80,  y: 60  },  // 5 — bottom-right
  { x: -40, y: 80  },  // 6 — bottom
];

function ServiceCard({ s, index, scrollYProgress }) {
  const { t } = useLocale();
  const start   = (index / 7) * 0.72;
  const end     = start + 0.28;

  const dir  = directions[index];
  const rawY = useTransform(scrollYProgress, [start, end], [dir.y, 0]);
  const rawX = useTransform(scrollYProgress, [start, end], [dir.x, 0]);
  const rawO = useTransform(scrollYProgress, [start, start + 0.12], [0, 1]);
  const rawS = useTransform(scrollYProgress, [start, end], [0.82, 1]);

  const y = useSpring(rawY, { stiffness: 200, damping: 28, restDelta: 0.01 });
  const x = useSpring(rawX, { stiffness: 200, damping: 28, restDelta: 0.01 });
  const sc= useSpring(rawS, { stiffness: 200, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      style={{ y, x, opacity: rawO, scale: sc }}
      className="group glass rounded-3xl overflow-hidden border border-border cursor-default"
    >
      {/* image */}
      <div className="relative h-44 overflow-hidden">
        <img src={s.img} alt={t(s.titleKey)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020209] via-[#020209]/25 to-transparent" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-400"
          style={{ background:`linear-gradient(135deg,${s.color}50,transparent)` }} />
      </div>

      <div className="p-6">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
          style={{ background:`linear-gradient(135deg,${s.color},${s.color}90)`, boxShadow:`0 6px 20px ${s.color}35` }}>
          <s.icon size={20} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">{t(s.titleKey)}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{t(s.descKey)}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {s.tags.map(tag => (
            <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-secondary border border-border text-foreground/70">{tag}</span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold" style={{ color:s.color }}>
          {t('learnMore')} <ArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const { t } = useLocale();
  const sectionRef = useRef(null);

  const services = [
    { icon: Share2,    titleKey: 'svcSocialMedia',    descKey: 'svcSocialMediaDesc',       color: '#FF6B35', tags: ['Instagram','TikTok','LinkedIn'],    img:'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&q=75' },
    { icon: Megaphone, titleKey: 'svcPerformanceAds', descKey: 'svcPerformanceAdsDesc',    color: '#FF4B6E', tags: ['Google Ads','Meta Ads','TikTok Ads'],  img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=75' },
    { icon: Globe,     titleKey: 'svcWebDesign',      descKey: 'svcWebDesignDesc',      color: '#9B51E0', tags: ['UI/UX','React','WordPress'],          img:'https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&q=75' },
    { icon: Palette,   titleKey: 'svcBranding',        descKey: 'svcBrandingDesc',               color: '#FF6B35', tags: ['Logo','Identity','Guidelines'],       img:'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&q=75' },
    { icon: Search,    titleKey: 'svcSEO',             descKey: 'svcSEODesc',             color: '#FF4B6E', tags: ['On-Page','Technical','Link Building'], img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=75' },
    { icon: Film,      titleKey: 'svcMotionDesign',   descKey: 'svcMotionDesignDesc',    color: '#9B51E0', tags: ['Animation','Reels','Video'],           img:'https://images.unsplash.com/photo-1492724724894-7464c27d0ceb?w=500&q=75' },
    { icon: Box,       titleKey: 'svc3DAnimation',    descKey: 'svc3DAnimationDesc',     color: '#FF6B35', tags: ['3D Render','Product Viz','VFX'],       img:'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=75' },
  ];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end center'],
  });

  const headerY  = useSpring(useTransform(scrollYProgress, [0, 0.15], [50, 0]),  { stiffness:250, damping:30 });
  const headerOp = useTransform(scrollYProgress, [0, 0.12], [0, 1]);

  return (
    <section id="services" ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">

        {/* header */}
        <motion.div style={{ y: headerY, opacity: headerOp }} className="text-center mb-20">
          <span className="inline-block text-sm font-semibold px-4 py-2 rounded-full border mb-4"
            style={{ borderColor:'rgba(255,107,53,0.3)', background:'rgba(255,107,53,0.08)', color:'#FF8C5A' }}>
            {t('ourServices')}
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4">
            {t('servicesTitle1')}
            <span style={{ background:'linear-gradient(135deg,#FF6B35,#FF4B6E,#9B51E0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{t('servicesTitle2')}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            {t('servicesDesc')}
          </p>
        </motion.div>

        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={s.titleKey} className={i === services.length - 1 ? 'md:col-span-2 lg:col-span-3' : ''}>
              <ServiceCard s={s} index={i} scrollYProgress={scrollYProgress} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
