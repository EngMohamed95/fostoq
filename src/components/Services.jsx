import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Share2, Megaphone, Globe, Palette, Search, Film, Box, ArrowRight } from 'lucide-react';

const services = [
  { icon: Share2,    title: 'Social Media',    desc: 'Strategic content creation and community management that grows your audience and drives real engagement across all platforms.',       color: '#FF6B35', tags: ['Instagram','TikTok','LinkedIn'],    img:'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&q=75' },
  { icon: Megaphone, title: 'Performance Ads', desc: 'Data-driven paid campaigns on Google, Meta & TikTok engineered to maximize ROI and generate qualified leads for your business.',    color: '#FF4B6E', tags: ['Google Ads','Meta Ads','TikTok Ads'],  img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=75' },
  { icon: Globe,     title: 'Web Design',      desc: 'Pixel-perfect, high-converting websites and landing pages built with cutting-edge tech to elevate your brand online.',               color: '#9B51E0', tags: ['UI/UX','React','WordPress'],          img:'https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&q=75' },
  { icon: Palette,   title: 'Branding',        desc: 'Complete brand identity systems — logo, colors, typography, and guidelines — that make your business unforgettable.',               color: '#FF6B35', tags: ['Logo','Identity','Guidelines'],       img:'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&q=75' },
  { icon: Search,    title: 'SEO',             desc: 'Sustainable organic growth through technical SEO, content strategy, and link building that puts you on top of Google.',             color: '#FF4B6E', tags: ['On-Page','Technical','Link Building'], img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=75' },
  { icon: Film,      title: 'Motion Design',   desc: 'Eye-catching animations, reels, and video content that capture attention and tell your brand story in the most compelling way.',    color: '#9B51E0', tags: ['Animation','Reels','Video'],           img:'https://images.unsplash.com/photo-1492724724894-7464c27d0ceb?w=500&q=75' },
  { icon: Box,       title: '3D Animation',    desc: "Stunning 3D visuals and product animations that showcase your brand with a premium, futuristic feel competitors can't match.",     color: '#FF6B35', tags: ['3D Render','Product Viz','VFX'],       img:'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=75' },
];

// directions each card enters from
const directions = [
  { x: -80,  y: 60  },  // 0 — bottom-left
  { x: 0,   y: 80  },  // 1 — bottom
  { x: 80,  y: 60  },  // 2 — bottom-right
  { x: -80, y: 60  },  // 3 — bottom-left
  { x: 0,   y: 80  },  // 4 — bottom
  { x: 80,  y: 60  },  // 5 — bottom-right
  { x: -40, y: 80  },  // 6 — bottom
];

/* One card — reads from shared section scrollYProgress */
function ServiceCard({ s, index, scrollYProgress }) {
  const total   = services.length;
  // spread card entrances evenly across 0→0.85 of scroll
  const start   = (index / total) * 0.72;
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
      className="group glass rounded-3xl overflow-hidden border border-white/5 cursor-default"
    >
      {/* image */}
      <div className="relative h-44 overflow-hidden">
        <img src={s.img} alt={s.title}
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
        <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
        <p className="text-white/40 text-sm leading-relaxed mb-4">{s.desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {s.tags.map(t => (
            <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/45">{t}</span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold" style={{ color:s.color }}>
          Learn More <ArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef(null);

  // ONE scroll listener for the whole section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end center'],
  });

  // header parallax
  const headerY  = useSpring(useTransform(scrollYProgress, [0, 0.15], [50, 0]),  { stiffness:250, damping:30 });
  const headerOp = useTransform(scrollYProgress, [0, 0.12], [0, 1]);

  return (
    <section id="services" ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">

        {/* header */}
        <motion.div style={{ y: headerY, opacity: headerOp }} className="text-center mb-20">
          <span className="inline-block text-sm font-semibold px-4 py-2 rounded-full border mb-4"
            style={{ borderColor:'rgba(255,107,53,0.3)', background:'rgba(255,107,53,0.08)', color:'#FF8C5A' }}>
            Our Services
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            7 Ways We
            <span style={{ background:'linear-gradient(135deg,#FF6B35,#FF4B6E,#9B51E0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}> Grow Your Brand</span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/40 text-lg">
            Comprehensive digital marketing solutions tailored for ambitious businesses in Dubai and beyond.
          </p>
        </motion.div>

        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={s.title} className={i === services.length - 1 ? 'md:col-span-2 lg:col-span-3' : ''}>
              <ServiceCard s={s} index={i} scrollYProgress={scrollYProgress} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
