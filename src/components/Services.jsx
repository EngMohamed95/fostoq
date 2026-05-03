import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, MessageCircle, Info, Send } from 'lucide-react';
import { useLocale } from '../LocaleContext';
import { services } from './AllServices';

const directions = [
  { x: -80, y: 60 }, { x: 0, y: 80 }, { x: 80, y: 60 },
  { x: -80, y: 60 }, { x: 0, y: 80 }, { x: 80, y: 60 },
  { x: -80, y: 60 }, { x: 0, y: 80 }, { x: 80, y: 60 },
];

function ServiceCard({ s, index, scrollYProgress, onNavigateService }) {
  const { t, locale } = useLocale();
  const start   = (index / 9) * 0.72;
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
      className="group glass rounded-3xl overflow-hidden border border-border cursor-default h-full flex flex-col"
    >
      <div className="relative h-44 overflow-hidden">
        <img src={s.img} alt={t(s.titleKey)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020209] via-[#020209]/25 to-transparent" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-400"
          style={{ background:`linear-gradient(135deg,${s.color}50,transparent)` }} />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
          style={{ background:`linear-gradient(135deg,${s.color},${s.color}90)`, boxShadow:`0 6px 20px ${s.color}35` }}>
          <s.icon size={20} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">{t(s.titleKey)}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">{t(s.descKey)}</p>
        
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            onClick={() => onNavigateService(s.id)}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-secondary text-foreground font-bold text-[10px] border border-border"
          >
            <Info size={14} /> {locale === 'ar' ? 'شرح الخدمة' : 'Details'}
          </motion.button>

          <motion.a 
            whileHover={{ scale: 1.02 }}
            href={`https://wa.me/971547772515?text=${encodeURIComponent(t('waServiceMessage') + t(s.titleKey))}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white font-bold text-[10px]"
            style={{ background: s.color }}
          >
            <Send size={14} /> {locale === 'ar' ? 'اطلب الآن' : 'Order'}
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services({ onViewAll, onNavigateService }) {
  const { t, locale } = useLocale();
  const sectionRef = useRef(null);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((s, i) => (
            <div key={s.id}>
              <ServiceCard s={s} index={i} scrollYProgress={scrollYProgress} onNavigateService={onNavigateService} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <button 
            onClick={onViewAll}
            className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-foreground text-background font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl"
          >
            {t('learnMore')} <ArrowRight size={22} className={locale === 'ar' ? 'rotate-180' : ''} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
