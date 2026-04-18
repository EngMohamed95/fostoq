import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { TrendingUp, Users, Globe, Award, Star } from 'lucide-react';

function Counter({ from, to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(from);
  const spring = useSpring(count, { duration: 2500, bounce: 0 });
  const rounded = useTransform(spring, (v) => Math.round(v).toLocaleString() + suffix);

  useEffect(() => {
    if (inView) count.set(to);
  }, [inView, count, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const stats = [
  { icon: Users, value: 500, suffix: '+', label: 'Happy Clients', color: 'from-indigo-500 to-purple-500' },
  { icon: Globe, value: 1200, suffix: '+', label: 'Projects Delivered', color: 'from-purple-500 to-pink-500' },
  { icon: TrendingUp, value: 340, suffix: '%', label: 'Average ROI', color: 'from-pink-500 to-rose-500' },
  { icon: Award, value: 15, suffix: '+', label: 'Industry Awards', color: 'from-rose-500 to-orange-500' },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechNova',
    text: 'PixelForge completely transformed our brand. Our revenue doubled within 6 months of the rebrand and new website launch.',
    avatar: 'SJ',
    stars: 5,
    color: 'from-indigo-500 to-purple-500',
  },
  {
    name: 'Marcus Lee',
    role: 'Founder, GrowthLab',
    text: 'The ROI on our paid campaigns has been insane. 340% return in Q1 alone. These guys know what they\'re doing.',
    avatar: 'ML',
    stars: 5,
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Aisha Patel',
    role: 'CMO, Nexus Group',
    text: 'Best agency decision we\'ve ever made. Professional, creative, and obsessed with results. Highly recommend.',
    avatar: 'AP',
    stars: 5,
    color: 'from-pink-500 to-rose-500',
  },
  {
    name: 'David Chen',
    role: 'Director, FutureFin',
    text: 'Our social media following grew 10x in 4 months. The content they produce is world-class.',
    avatar: 'DC',
    stars: 5,
    color: 'from-violet-500 to-cyan-500',
  },
];

function TestimonialCard({ t, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -6 }}
      className="glass rounded-3xl p-7 border border-white/5 hover:border-purple-500/20 transition-colors duration-300"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(t.stars)].map((_, i) => (
          <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
        ))}
      </div>

      <p className="text-white/70 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>

      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-bold text-white`}>
          {t.avatar}
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{t.name}</div>
          <div className="text-xs text-white/40">{t.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  return (
    <section id="testimonials" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-3xl p-8 text-center border border-white/5 hover:border-purple-500/20 transition-colors duration-300 group"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={20} className="text-white" />
              </div>
              <div className="text-4xl font-black text-white mb-1">
                <Counter from={0} to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-white/40 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-4">
            Client Love
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            What Our Clients
            <span className="gradient-text"> Say About Us</span>
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
