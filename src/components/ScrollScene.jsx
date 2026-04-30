import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUpRight, TrendingUp, MessageCircle } from 'lucide-react';
import { useLocale } from '../LocaleContext';

function Card({ p, index, total, scrollYProgress }) {
  const { t } = useLocale();
  const active     = useTransform(scrollYProgress, v => v * total - index);
  const y          = useSpring(useTransform(active, [-1,0,1], [160,0,-160]), { stiffness:180, damping:28 });
  const scale      = useSpring(useTransform(active, [-1,0,1], [0.88,1,0.88]), { stiffness:180, damping:28 });
  const opacity    = useTransform(active, [-1.2,-0.5,0,0.5,1.2], [0,1,1,1,0]);
  const brightness = useTransform(active, [-1,0,1], [0.4,1,0.4]);

  return (
    <motion.div style={{ y, scale, opacity, filter:useTransform(brightness,b=>`brightness(${b})`),
      zIndex:useTransform(active,v=>Math.round(100-Math.abs(v)*20)),
      position:'absolute', width:'100%' }}>
      <div className="relative rounded-3xl overflow-hidden border border-border grid grid-cols-1 md:grid-cols-2"
        style={{ boxShadow:`0 32px 80px ${p.accent}25` }}>
        {/* image */}
        <div className="relative h-72 md:h-80 overflow-hidden">
          <img src={p.img} alt={t(p.titleKey)} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c18] via-[#0c0c18]/20 to-transparent md:hidden" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0c0c18]/70 hidden md:block" />
          <div className="absolute inset-0 opacity-20" style={{ background:`linear-gradient(135deg,${p.accent}60,transparent)` }} />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/15">{t(p.categoryKey)}</span>
            <span className="text-xs text-white/50 bg-black/40 px-2 py-1 rounded-lg backdrop-blur-sm">{p.year}</span>
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 w-fit">
              <TrendingUp size={12} className="text-green-400" />
              <span className="text-sm font-bold text-white">{t(p.resultKey)}</span>
            </div>
          </div>
        </div>
        {/* content */}
        <div className="bg-card p-8 flex flex-col justify-center border-t border-border md:border-t-0 md:border-l md:border-border">
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs text-muted-foreground font-mono">0{p.id} / 0{total + 1}</span>
            <div className="w-9 h-9 rounded-full bg-secondary border border-border flex items-center justify-center">
              <ArrowUpRight size={15} className="text-muted-foreground" />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-foreground leading-tight mb-3">{t(p.titleKey)}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">{t(p.descKey)}</p>
          <div className="flex flex-wrap gap-2">
            {p.tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground">{tag}</span>
            ))}
          </div>
          <div className="mt-6 h-px w-full" style={{ background:`linear-gradient(90deg,${p.accent}60,transparent)` }} />
        </div>
      </div>
    </motion.div>
  );
}

function DotNav({ total, scrollYProgress }) {
  return (
    <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2.5 pointer-events-none z-30">
      {Array.from({length:total}).map((_,i) => {
        const active = useTransform(scrollYProgress, v=>v*total-i);
        const w  = useSpring(useTransform(active,[-0.5,0,0.5],[8,28,8]),    { stiffness:200, damping:25 });
        const op = useSpring(useTransform(active,[-0.8,0,0.8],[0.25,1,0.25]),{ stiffness:200, damping:25 });
        return (
          <motion.div key={i} style={{ width:w, opacity:op }}
            className="h-1.5 rounded-full"
          >
            <div className="w-full h-full rounded-full" style={{ background:'linear-gradient(90deg,#FF6B35,#FF4B6E,#9B51E0)' }} />
          </motion.div>
        );
      })}
    </div>
  );
}

function SideProgress({ total, scrollYProgress }) {
  return (
    <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-30">
      {Array.from({length:total}).map((_,i) => {
        const active = useTransform(scrollYProgress, v=>v*total-i);
        const h  = useSpring(useTransform(active,[-0.5,0,0.5],[8,28,8]),    { stiffness:200, damping:25 });
        const op = useSpring(useTransform(active,[-0.8,0,0.8],[0.2,1,0.2]), { stiffness:200, damping:25 });
        return (
          <motion.div key={i} style={{ height:h, opacity:op }}
            className="w-0.5 rounded-full" >
            <div className="w-full h-full rounded-full" style={{ background:'linear-gradient(to bottom,#FF6B35,#9B51E0)' }} />
          </motion.div>
        );
      })}
    </div>
  );
}

function Gallery() {
  const { t } = useLocale();
  const ref = useRef(null);
  
  const projects = [
    { id:1, titleKey:'project1Title', categoryKey:'project1Cat', resultKey:'project1Result', year:'2025', descKey:'project1Desc', img:'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80', accent:'#FF6B35', tags:['Branding','Web','UI/UX'] },
    { id:2, titleKey:'project2Title', categoryKey:'project2Cat', resultKey:'project2Result', year:'2025', descKey:'project2Desc', img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80', accent:'#FF4B6E', tags:['Paid Ads','SEO','Analytics'] },
    { id:3, titleKey:'project3Title', categoryKey:'project3Cat', resultKey:'project3Result', year:'2025', descKey:'project3Desc', img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', accent:'#9B51E0', tags:['React','Node.js','Fintech'] },
    { id:4, titleKey:'project4Title', categoryKey:'project4Cat', resultKey:'project4Result', year:'2024', descKey:'project4Desc', img:'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80', accent:'#FF6B35', tags:['Social','Content','Community'] },
    { id:5, titleKey:'project5Title', categoryKey:'project5Cat', resultKey:'project5Result', year:'2024', descKey:'project5Desc', img:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80', accent:'#FF4B6E', tags:['Shopify','UX','CRO'] },
    { id:6, titleKey:'project6Title', categoryKey:'project6Cat', resultKey:'project6Result', year:'2024', descKey:'project6Desc', img:'https://images.unsplash.com/photo-1492724724894-7464c27d0ceb?w=600&q=80', accent:'#9B51E0', tags:['Video','Photography','Viral'] },
    { id:7, titleKey:'project7Title', categoryKey:'project7Cat', resultKey:'project7Result', year:'2024', descKey:'project7Desc', img:'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80', accent:'#FF6B35', tags:['SaaS','GTM','Launch'] },
  ];

  const { scrollYProgress } = useScroll({ target:ref, offset:['start start','end end'] });
  const total = projects.length;

  return (
    <div ref={ref} style={{ height:`${total * 80}vh` }} className="relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

        {/* header */}
        <div className="absolute top-8 left-0 right-0 text-center pointer-events-none z-20">
          <span className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full border mb-2"
            style={{ borderColor:'rgba(255,107,53,0.3)', background:'rgba(255,107,53,0.08)', color:'#FF8C5A' }}>
            {t('ourProjects')}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground">
            {t('workTitle1')}
            <span style={{ background:'linear-gradient(135deg,#FF6B35,#FF4B6E,#9B51E0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{t('workTitle2')}</span>
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">{t('scrollExplore')} {total} {t('scrollProjects')}</p>
        </div>

        {/* cards — full width, stacked */}
        <div className="relative w-full max-w-5xl mx-auto px-6" style={{ height:'420px' }}>
          {projects.map((p, i) => (
            <Card key={p.id} p={p} index={i} total={total - 1} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        <SideProgress total={total} scrollYProgress={scrollYProgress} />
        <DotNav total={total} scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}

function Marquee() {
  const { t } = useLocale();
  const { scrollYProgress } = useScroll();
  const x1 = useTransform(scrollYProgress,[0,1],['0%','-30%']);
  const x2 = useTransform(scrollYProgress,[0,1],['-30%','0%']);
  const words = [t('svcSocialMedia'),t('svcPerformanceAds'),t('svcWebDesign'),t('svcBranding'),t('svcSEO'),t('svcMotionDesign'),
    t('svcSocialMedia'),t('svcPerformanceAds'),t('svcWebDesign'),t('svcBranding'),t('svcSEO')];
  return (
    <div className="py-8 overflow-hidden border-y border-border" dir="ltr">
      <motion.div style={{ x:x1 }} className="flex gap-6 whitespace-nowrap w-max mb-3">
        {words.map((t,i) => (
          <div key={i} className="flex items-center gap-5">
            <span className="text-foreground/[0.08] text-5xl font-black uppercase tracking-tighter select-none">{t}</span>
            <div className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background:'linear-gradient(135deg,#FF6B35,#9B51E0)' }} />
          </div>
        ))}
      </motion.div>
      <motion.div style={{ x:x2 }} className="flex gap-6 whitespace-nowrap w-max">
        {[...words].reverse().map((t,i) => (
          <div key={i} className="flex items-center gap-5">
            <span className="text-foreground/[0.04] text-5xl font-black uppercase tracking-tighter select-none">{t}</span>
            <div className="w-2 h-2 rounded-full bg-foreground/10 flex-shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function PinReveal() {
  const { t } = useLocale();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','center center'] });
  const lineW = useTransform(scrollYProgress,[0,1],['0%','100%']);
  
  const y1 = useSpring(useTransform(scrollYProgress,[0.2,0.6],[60,0]), { stiffness:55, damping:18 });
  const o1 = useTransform(scrollYProgress,[0.2,0.6],[0,1]);
  
  const y2 = useSpring(useTransform(scrollYProgress,[0.4,0.8],[60,0]), { stiffness:55, damping:18 });
  const o2 = useTransform(scrollYProgress,[0.4,0.8],[0,1]);
  
  const y3 = useSpring(useTransform(scrollYProgress,[0.6,1],[60,0]), { stiffness:55, damping:18 });
  const o3 = useTransform(scrollYProgress,[0.6,1],[0,1]);

  return (
    <div ref={ref} className="relative pt-10 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center w-full">
          <div className="relative h-px bg-border mb-16 rounded-full overflow-hidden">
            <motion.div style={{ width:lineW }} className="absolute left-0 top-0 h-full rounded-full"
              style={{ background:'linear-gradient(90deg,#FF6B35,#FF4B6E,#9B51E0)' }}>
            </motion.div>
          </div>
          <motion.p style={{ y:y1, opacity:o1 }} className="text-muted-foreground text-xl md:text-2xl font-medium mb-5">
            {t('pinReveal1')}
          </motion.p>
          <motion.p style={{ y:y2, opacity:o2 }} className="text-foreground text-3xl md:text-5xl font-bold mb-6">
            {t('pinReveal2')}
          </motion.p>
          <motion.p style={{ y:y3, opacity:o3 }} className="text-4xl md:text-7xl font-black leading-tight mb-12">
            <span style={{ background:'linear-gradient(135deg,#FF6B35,#FF4B6E,#9B51E0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              {t('pinReveal3')}
            </span>
          </motion.p>
          
          <motion.div style={{ y:y3, opacity:o3 }} className="flex justify-center w-full">
            <motion.a
              href={`https://wa.me/971547772515?text=${encodeURIComponent(t('waMessage'))}`}
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
              className="w-full max-w-xl flex items-center justify-center gap-4 px-10 py-6 rounded-[2.5rem] bg-[#25D366] text-white font-bold text-xl md:text-2xl shadow-[0_20px_60px_rgba(37,211,102,0.4)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={28} className="text-white" />
              </div>
              {t('startWhatsApp')}
            </motion.a>
          </motion.div>
        </div>
    </div>
  );
}

export default function ScrollScene() {
  return (
    <section id="work" className="relative bg-background">
      <Marquee />
      <Gallery />
      <PinReveal />
    </section>
  );
}
