import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'framer-motion';
import { Users, Briefcase, Star, Globe, Quote } from 'lucide-react';

function Counter({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');
  const val = useMotionValue(0);
  const spring = useSpring(val, { duration: 2000, bounce: 0 });
  useEffect(() => { const u = spring.on('change', v => setDisplay(Math.round(v).toLocaleString() + suffix)); return u; }, []);
  useEffect(() => { if (inView) val.set(to); }, [inView]);
  return <span ref={ref}>{display}</span>;
}

const stats = [
  { icon: Users,     value: 122, suffix: '+', label: 'Trusted Clients',    color: '#FF6B35' },
  { icon: Star,      value: 108, suffix: '+', label: 'Customer Reviews',   color: '#FF4B6E' },
  { icon: Briefcase, value: 7,   suffix: '',  label: 'Core Services',      color: '#9B51E0' },
  { icon: Globe,     value: 3,   suffix: '+', label: 'Years Experience',   color: '#FF6B35' },
];

const testimonials = [
  {
    name: 'Ahmed Al Rashid', role: 'CEO, Dubai Ventures', stars: 5,
    text: 'FOSTQ completely transformed our social media presence. Their strategic approach and attention to detail helped us reach heights we never imagined possible.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
    color: '#FF6B35',
  },
  {
    name: 'Sara Mohammed',   role: 'Founder, StyleHub UAE', stars: 5,
    text: 'Working with Ridda and the FOSTQ team has been a game-changer for our brand. Our online sales doubled within 3 months of launching our new website.',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
    color: '#FF4B6E',
  },
  {
    name: 'Khalid Hassan',   role: 'Director, Nexus Corp', stars: 5,
    text: 'The performance ads team at FOSTQ delivered an incredible 340% ROI on our Q1 campaign. Best digital marketing investment we have ever made.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80',
    color: '#9B51E0',
  },
  {
    name: 'Layla Karimi',    role: 'CMO, FashionForward', stars: 5,
    text: 'Their branding work is truly world-class. The new brand identity they created has elevated our business beyond recognition in the UAE market.',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80',
    color: '#FF6B35',
  },
];

function StatCard({ stat }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','center center'] });
  const y  = useSpring(useTransform(scrollYProgress,[0,1],[60,0]), { stiffness:220, damping:30 });
  const op = useTransform(scrollYProgress,[0,0.5],[0,1]);
  const sc = useSpring(useTransform(scrollYProgress,[0,1],[0.8,1]), { stiffness:220, damping:30 });
  return (
    <motion.div ref={ref} style={{ y, opacity:op, scale:sc }}
      className="group glass rounded-3xl p-8 text-center border border-white/5 hover:border-white/15 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background:`radial-gradient(circle at 50% 100%, ${stat.color}25 0%, transparent 65%)` }} />
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
        style={{ background:`linear-gradient(135deg,${stat.color},${stat.color}80)`, boxShadow:`0 8px 24px ${stat.color}40` }}>
        <stat.icon size={20} className="text-white" />
      </div>
      <div className="text-4xl md:text-5xl font-black text-white mb-1">
        <Counter to={stat.value} suffix={stat.suffix} />
      </div>
      <div className="text-sm text-white/40">{stat.label}</div>
    </motion.div>
  );
}

function TestimonialCard({ t, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','center center'] });
  const isEven = index % 2 === 0;
  const x  = useSpring(useTransform(scrollYProgress,[0,1],[isEven?-60:60,0]), { stiffness:220, damping:30 });
  const op = useTransform(scrollYProgress,[0,0.4],[0,1]);
  const sc = useSpring(useTransform(scrollYProgress,[0,1],[0.9,1]), { stiffness:220, damping:30 });
  return (
    <motion.div ref={ref} style={{ x, opacity:op, scale:sc }}
      className="group glass rounded-3xl p-7 border border-white/5 hover:border-white/15 transition-colors duration-300">
      <div className="flex gap-1 mb-4">
        {[...Array(t.stars)].map((_,i) => (
          <motion.span key={i} initial={{ scale:0 }} whileInView={{ scale:1 }} viewport={{ once:true }}
            transition={{ delay:index*0.1+i*0.06 }} className="text-yellow-400 text-sm">★</motion.span>
        ))}
      </div>
      <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
        style={{ background:`linear-gradient(135deg,${t.color},${t.color}70)` }}>
        <Quote size={14} className="text-white" />
      </div>
      <p className="text-white/55 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
      <div className="flex items-center gap-3">
        <img src={t.img} alt={t.name} className="w-11 h-11 rounded-full object-cover ring-2"
          style={{ ringColor:`${t.color}50` }} />
        <div>
          <div className="text-sm font-semibold text-white">{t.name}</div>
          <div className="text-xs text-white/35">{t.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

function SectionTitle({ label, title, labelColor }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] });
  const y  = useSpring(useTransform(scrollYProgress,[0,1],[40,-40]), { stiffness:200, damping:28 });
  const op = useTransform(scrollYProgress,[0,0.35],[0,1]);
  return (
    <motion.div ref={ref} style={{ y, opacity:op }} className="text-center mb-16">
      <span className="inline-block text-sm font-semibold px-4 py-2 rounded-full border mb-4"
        style={{ borderColor:`${labelColor}40`, background:`${labelColor}12`, color:labelColor }}>
        {label}
      </span>
      <h2 className="text-4xl md:text-5xl font-black text-white">{title}</h2>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle label="Our Numbers" labelColor="#FF6B35"
          title={<>Results That <span style={{ background:'linear-gradient(135deg,#FF6B35,#FF4B6E,#9B51E0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Speak Louder</span></>} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-32">
          {stats.map(s => <StatCard key={s.label} stat={s} />)}
        </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-24" />
        <SectionTitle label="Client Love" labelColor="#FF4B6E"
          title={<>What Our Clients <span style={{ background:'linear-gradient(135deg,#FF6B35,#FF4B6E,#9B51E0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Say</span></>} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t,i) => <TestimonialCard key={t.name} t={t} index={i} />)}
        </div>
      </div>
    </section>
  );
}
