import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

const projects = [
  { id:1, title:'NovaTech Rebrand',       category:'Brand Identity',        result:'+220% Conversions', year:'2025', desc:'Full brand overhaul — logo, identity system, website, and marketing assets.',             img:'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80', accent:'#FF6B35', tags:['Branding','Web','UI/UX'] },
  { id:2, title:'GrowthLab Campaign',     category:'Performance Marketing',  result:'+340% ROI',         year:'2025', desc:'Multi-channel paid campaign across Google, Meta & TikTok driving record-breaking results.', img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80', accent:'#FF4B6E', tags:['Paid Ads','SEO','Analytics'] },
  { id:3, title:'FutureFin Platform',     category:'Web Development',        result:'4.9★ App Rating',   year:'2025', desc:'Full-stack fintech platform with real-time dashboards and payment integration.',              img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', accent:'#9B51E0', tags:['React','Node.js','Fintech'] },
  { id:4, title:'Nexus Social Strategy',  category:'Social Media',           result:'10x Followers',     year:'2024', desc:'End-to-end social strategy, content production, and community management.',                   img:'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80', accent:'#FF6B35', tags:['Social','Content','Community'] },
  { id:5, title:'Lumina E-Commerce',      category:'E-Commerce',             result:'+180% Revenue',     year:'2024', desc:'Premium fashion e-commerce store with seamless checkout and personalized UX.',                 img:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80', accent:'#FF4B6E', tags:['Shopify','UX','CRO'] },
  { id:6, title:'Apex Content Studio',    category:'Content Production',     result:'50M+ Views',        year:'2024', desc:'Viral video content series and photography campaign reaching 50M+ across all platforms.',      img:'https://images.unsplash.com/photo-1492724724894-7464c27d0ceb?w=600&q=80', accent:'#9B51E0', tags:['Video','Photography','Viral'] },
  { id:7, title:'Orbit SaaS Launch',      category:'Product Launch',         result:'2K Users Day 1',    year:'2024', desc:'Full go-to-market strategy, landing page, and launch campaign for a B2B SaaS product.',         img:'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80', accent:'#FF6B35', tags:['SaaS','GTM','Launch'] },
];

function TiltCard({ children, className='' }) {
  const ref = useRef(null);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rx = useSpring(useTransform(my,[-0.5,0.5],[8,-8]),  { stiffness:300, damping:35 });
  const ry = useSpring(useTransform(mx,[-0.5,0.5],[-8,8]), { stiffness:300, damping:35 });
  function move(e) { const r=ref.current.getBoundingClientRect(); mx.set((e.clientX-r.left)/r.width-.5); my.set((e.clientY-r.top)/r.height-.5); }
  function leave() { mx.set(0); my.set(0); }
  return (
    <motion.div ref={ref} onMouseMove={move} onMouseLeave={leave}
      style={{ rotateX:rx, rotateY:ry, transformStyle:'preserve-3d' }} className={className}>
      {children}
    </motion.div>
  );
}

function Card({ p, index, total, scrollYProgress }) {
  const active     = useTransform(scrollYProgress, v => v * total - index);
  const y          = useSpring(useTransform(active, [-1,0,1], [160,0,-160]), { stiffness:180, damping:28 });
  const scale      = useSpring(useTransform(active, [-1,0,1], [0.88,1,0.88]), { stiffness:180, damping:28 });
  const opacity    = useTransform(active, [-1.2,-0.5,0,0.5,1.2], [0,1,1,1,0]);
  const brightness = useTransform(active, [-1,0,1], [0.4,1,0.4]);

  return (
    <motion.div style={{ y, scale, opacity, filter:useTransform(brightness,b=>`brightness(${b})`),
      zIndex:useTransform(active,v=>Math.round(100-Math.abs(v)*20)),
      position:'absolute', width:'100%' }}>
      <div className="relative rounded-3xl overflow-hidden border border-white/10 grid grid-cols-1 md:grid-cols-2"
        style={{ boxShadow:`0 32px 80px ${p.accent}25` }}>
        {/* image */}
        <div className="relative h-72 md:h-80 overflow-hidden">
          <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c18] via-[#0c0c18]/20 to-transparent md:hidden" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0c0c18]/70 hidden md:block" />
          <div className="absolute inset-0 opacity-20" style={{ background:`linear-gradient(135deg,${p.accent}60,transparent)` }} />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/15">{p.category}</span>
            <span className="text-xs text-white/50 bg-black/40 px-2 py-1 rounded-lg backdrop-blur-sm">{p.year}</span>
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 w-fit">
              <TrendingUp size={12} className="text-green-400" />
              <span className="text-sm font-bold text-white">{p.result}</span>
            </div>
          </div>
        </div>
        {/* content */}
        <div className="bg-[#0c0c18] p-8 flex flex-col justify-center border-t border-white/5 md:border-t-0 md:border-l md:border-white/5">
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs text-white/20 font-mono">0{p.id} / 0{total}</span>
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <ArrowUpRight size={15} className="text-white/50" />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">{p.title}</h3>
          <p className="text-white/40 text-sm leading-relaxed mb-6">{p.desc}</p>
          <div className="flex flex-wrap gap-2">
            {p.tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/40">{tag}</span>
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
            style2={{ background:'linear-gradient(90deg,#FF6B35,#9B51E0)' }}
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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start start','end end'] });
  const total = projects.length;

  return (
    <div ref={ref} style={{ height:`${total * 80}vh` }} className="relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

        {/* header */}
        <div className="absolute top-8 left-0 right-0 text-center pointer-events-none z-20">
          <span className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full border mb-2"
            style={{ borderColor:'rgba(255,107,53,0.3)', background:'rgba(255,107,53,0.08)', color:'#FF8C5A' }}>
            Our Projects
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white">
            Our Work in{' '}
            <span style={{ background:'linear-gradient(135deg,#FF6B35,#FF4B6E,#9B51E0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Action</span>
          </h2>
          <p className="text-white/30 mt-1 text-sm">↓ Scroll to explore all {total} projects</p>
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
  const { scrollYProgress } = useScroll();
  const x1 = useTransform(scrollYProgress,[0,1],['0%','-30%']);
  const x2 = useTransform(scrollYProgress,[0,1],['-30%','0%']);
  const words = ['Social Media','Performance Ads','Web Design','Branding','SEO','Motion Design','3D Animation',
    'Social Media','Performance Ads','Web Design','Branding','SEO'];
  return (
    <div className="py-8 overflow-hidden border-y border-white/5">
      <motion.div style={{ x:x1 }} className="flex gap-6 whitespace-nowrap w-max mb-3">
        {words.map((t,i) => (
          <div key={i} className="flex items-center gap-5">
            <span className="text-white/[0.08] text-5xl font-black uppercase tracking-tighter select-none">{t}</span>
            <div className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background:'linear-gradient(135deg,#FF6B35,#9B51E0)' }} />
          </div>
        ))}
      </motion.div>
      <motion.div style={{ x:x2 }} className="flex gap-6 whitespace-nowrap w-max">
        {[...words].reverse().map((t,i) => (
          <div key={i} className="flex items-center gap-5">
            <span className="text-white/[0.04] text-5xl font-black uppercase tracking-tighter select-none">{t}</span>
            <div className="w-2 h-2 rounded-full bg-white/10 flex-shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function PinReveal() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start start','end end'] });
  const lineW = useTransform(scrollYProgress,[0,1],['0%','100%']);
  const y1 = useSpring(useTransform(scrollYProgress,[0,0.3],[80,0]), { stiffness:55, damping:18 });
  const o1 = useTransform(scrollYProgress,[0,0.25],[0,1]);
  const y2 = useSpring(useTransform(scrollYProgress,[0.3,0.6],[80,0]), { stiffness:55, damping:18 });
  const o2 = useTransform(scrollYProgress,[0.3,0.55],[0,1]);
  const y3 = useSpring(useTransform(scrollYProgress,[0.6,0.9],[80,0]), { stiffness:55, damping:18 });
  const o3 = useTransform(scrollYProgress,[0.6,0.85],[0,1]);
  return (
    <div ref={ref} style={{ height:'200vh' }} className="relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-6">
        <div className="max-w-5xl mx-auto text-center w-full">
          <div className="relative h-px bg-white/8 mb-16 rounded-full overflow-hidden">
            <motion.div style={{ width:lineW }} className="absolute left-0 top-0 h-full rounded-full"
              style2={{ background:'linear-gradient(90deg,#FF6B35,#FF4B6E,#9B51E0)' }}>
              <div className="w-full h-full" style={{ background:'linear-gradient(90deg,#FF6B35,#FF4B6E,#9B51E0)' }} />
            </motion.div>
          </div>
          <motion.p style={{ y:y1, opacity:o1 }} className="text-white/30 text-xl md:text-2xl font-medium mb-5">
            We don't just create campaigns.
          </motion.p>
          <motion.p style={{ y:y2, opacity:o2 }} className="text-white/70 text-3xl md:text-5xl font-bold mb-6">
            We build brands that dominate.
          </motion.p>
          <motion.p style={{ y:y3, opacity:o3 }} className="text-4xl md:text-7xl font-black leading-tight"
            style2={{ background:'linear-gradient(135deg,#FF6B35,#FF4B6E,#9B51E0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            <span style={{ background:'linear-gradient(135deg,#FF6B35,#FF4B6E,#9B51E0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              Empowering your brand.
            </span>
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default function ScrollScene() {
  return (
    <section id="work" className="relative bg-[#020209]">
      <Marquee />
      <Gallery />
      <PinReveal />
    </section>
  );
}
