import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Sparkles, MessageCircle } from 'lucide-react';

const words = ['Bold Marketing', 'Digital Growth', 'Real Results', 'Your Brand'];

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-block" style={{ minWidth: '360px' }}>
      <AnimatePresence mode="wait">
        <motion.span key={words[i]}
          initial={{ y: 70, opacity: 0, filter: 'blur(10px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -70, opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
          style={{ background: 'linear-gradient(135deg,#FF6B35,#FF4B6E,#9B51E0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
          {words[i]}
        </motion.span>
      </AnimatePresence>
      <span className="invisible">{words[i]}</span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const img1Y = useSpring(useTransform(scrollYProgress, [0,1], [0,-160]), { stiffness:200, damping:28 });
  const img2Y = useSpring(useTransform(scrollYProgress, [0,1], [0,-90]),  { stiffness:200, damping:28 });
  const img3Y = useSpring(useTransform(scrollYProgress, [0,1], [0,-220]), { stiffness:200, damping:28 });
  const img4Y = useSpring(useTransform(scrollYProgress, [0,1], [0,-50]),  { stiffness:200, damping:28 });

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* bg */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale:[1,1.4,1], rotate:[0,180,0] }}
          transition={{ duration:28, repeat:Infinity, ease:'linear' }}
          className="absolute top-1/3 left-1/3 w-[900px] h-[900px] rounded-full opacity-[0.07]"
          style={{ background:'conic-gradient(from 0deg,#FF6B35,#FF4B6E,#9B51E0,#FF6B35)' }} />
        <div className="absolute inset-0" style={{ backdropFilter:'blur(100px)' }} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage:`linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)`,
            backgroundSize:'80px 80px' }} />
      </div>

      {/* floating images */}
      <div className="absolute inset-0 pointer-events-none">
        {/* top left */}
        <motion.div style={{ y: img1Y }}
          className="absolute top-[10%] left-[3%] w-44 h-56 rounded-2xl overflow-hidden hidden lg:block"
          initial={{ opacity:0, x:-50 }} animate={{ opacity:1, x:0 }}
          transition={{ delay:0.5, duration:1 }}>
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80"
            alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020209]/70 to-transparent rounded-2xl ring-1 ring-white/10" />
          <div className="absolute bottom-3 left-3 text-white">
            <div className="text-xs text-white/50 mb-0.5">Happy Clients</div>
            <div className="text-xl font-black">122+</div>
          </div>
        </motion.div>

        {/* top right — Dubai */}
        <motion.div style={{ y: img2Y }}
          className="absolute top-[6%] right-[4%] w-52 h-36 rounded-2xl overflow-hidden hidden lg:block"
          initial={{ opacity:0, x:50 }} animate={{ opacity:1, x:0 }}
          transition={{ delay:0.7, duration:1 }}>
          <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&q=80"
            alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#020209]/70 rounded-2xl ring-1 ring-white/10" />
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-lg px-2.5 py-1.5 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-white">Dubai Business Bay</span>
          </div>
        </motion.div>

        {/* bottom left */}
        <motion.div style={{ y: img3Y }}
          className="absolute bottom-[16%] left-[6%] w-40 h-40 rounded-2xl overflow-hidden hidden lg:block"
          initial={{ opacity:0, y:50 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.9, duration:1 }}>
          <img src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80"
            alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020209]/70 to-transparent rounded-2xl ring-1 ring-white/10" />
        </motion.div>

        {/* bottom right */}
        <motion.div style={{ y: img4Y }}
          className="absolute bottom-[18%] right-[5%] w-52 h-32 rounded-2xl overflow-hidden hidden lg:block"
          initial={{ opacity:0, y:50 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:1.1, duration:1 }}>
          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80"
            alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020209]/70 to-transparent rounded-2xl ring-1 ring-white/10" />
          <div className="absolute bottom-3 left-3 text-white">
            <div className="text-xl font-black">108+</div>
            <div className="text-[10px] text-white/50">5★ Reviews</div>
          </div>
        </motion.div>
      </div>

      {/* center content */}
      <motion.div style={{ y, opacity, scale }} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
          className="flex justify-center mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-orange-500/20">
            <motion.span animate={{ rotate:[0,20,-20,0] }} transition={{ duration:2, repeat:Infinity }}>
              <Sparkles size={14} style={{ color:'#FF6B35' }} />
            </motion.span>
            <span className="text-sm text-white/60 font-medium">Dubai's Premier Digital Agency</span>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity:0, y:50 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.9, delay:0.15, ease:[0.16,1,0.3,1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-6">
          <span className="text-white">Empowering Brands</span><br />
          <span className="text-white">with </span>
          <RotatingWord /><br />
          <span className="text-white/25">Solutions</span>
        </motion.h1>

        <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8, delay:0.35 }}
          className="max-w-2xl mx-auto text-lg text-white/45 mb-10 leading-relaxed">
          Dubai-based agency providing comprehensive digital marketing services. We help elevate your digital presence, expand your reach, and drive measurable results.
        </motion.p>

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8, delay:0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">

          <motion.a href="#work" whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-semibold text-base shadow-2xl transition-all duration-300"
            style={{ background:'linear-gradient(135deg,#FF6B35,#FF4B6E,#9B51E0)', boxShadow:'0 20px 50px rgba(255,75,110,0.3)' }}>
            Explore Our Projects
            <motion.span animate={{ x:[0,5,0] }} transition={{ duration:1.5, repeat:Infinity }}>
              <ArrowRight size={18} />
            </motion.span>
          </motion.a>

          <motion.a
            href={`https://wa.me/971547772515?text=${encodeURIComponent('Hello, I am interested in your services. I want to know more.')}`}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl glass text-white font-semibold text-base border border-white/10 hover:border-white/20">
            <div className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background:'linear-gradient(135deg,#25D366,#128C7E)' }}>
              <MessageCircle size={16} className="text-white" />
            </div>
            Start on WhatsApp
          </motion.a>
        </motion.div>

        {/* stats strip */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8">
          {[['122+','Trusted Clients'],['108+','5★ Reviews'],['7','Core Services'],['Dubai','HQ Location']].map(([n,l]) => (
            <div key={l} className="text-center">
              <div className="text-2xl font-black text-white">{n}</div>
              <div className="text-xs text-white/35 mt-0.5">{l}</div>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.8 }}
          className="mt-10 flex flex-col items-center gap-2">
          <motion.div animate={{ y:[0,8,0] }} transition={{ duration:2, repeat:Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full" style={{ background:'linear-gradient(to bottom,#FF6B35,#9B51E0)' }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
