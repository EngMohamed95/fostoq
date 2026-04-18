import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Palette, Code2, TrendingUp, Camera, BarChart2, Globe, ArrowRight
} from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Brand Identity',
    desc: 'We create iconic brand identities that tell your story and leave a lasting impression across every touchpoint.',
    color: 'from-indigo-500 to-purple-600',
    glow: 'rgba(99,102,241,0.3)',
    tags: ['Logo Design', 'Brand Strategy', 'Guidelines'],
  },
  {
    icon: Code2,
    title: 'Web Development',
    desc: 'Lightning-fast, pixel-perfect websites and web apps built with cutting-edge technologies for peak performance.',
    color: 'from-purple-500 to-pink-600',
    glow: 'rgba(168,85,247,0.3)',
    tags: ['React / Next.js', 'UI/UX', 'CMS'],
  },
  {
    icon: TrendingUp,
    title: 'Performance Marketing',
    desc: 'Data-driven campaigns across Google, Meta, and TikTok that generate real ROI and explosive growth.',
    color: 'from-pink-500 to-rose-600',
    glow: 'rgba(236,72,153,0.3)',
    tags: ['Paid Ads', 'SEO', 'Growth Hacking'],
  },
  {
    icon: Camera,
    title: 'Content Production',
    desc: 'Scroll-stopping visuals, videos, and copy that engage your audience and drive action at scale.',
    color: 'from-rose-500 to-orange-500',
    glow: 'rgba(244,63,94,0.3)',
    tags: ['Video', 'Photography', 'Copywriting'],
  },
  {
    icon: BarChart2,
    title: 'Analytics & Strategy',
    desc: 'Deep data analysis and strategic insights to optimize your marketing funnel and maximize conversions.',
    color: 'from-cyan-500 to-indigo-500',
    glow: 'rgba(6,182,212,0.3)',
    tags: ['Analytics', 'A/B Testing', 'Reporting'],
  },
  {
    icon: Globe,
    title: 'Social Media',
    desc: 'Full-service social media management that builds communities, drives engagement, and converts followers into clients.',
    color: 'from-violet-500 to-cyan-500',
    glow: 'rgba(139,92,246,0.3)',
    tags: ['Management', 'Influencers', 'Community'],
  },
];

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative glass rounded-3xl p-8 cursor-default overflow-hidden"
      style={{ '--glow': service.glow }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 0%, ${service.glow} 0%, transparent 70%)` }}
      />
      {/* Border gradient on hover */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${service.glow}, transparent)`, padding: '1px' }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg`}
          style={{ boxShadow: `0 8px 32px ${service.glow}` }}
        >
          <service.icon size={24} className="text-white" />
        </div>

        <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
        <p className="text-white/50 text-sm leading-relaxed mb-6">{service.desc}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <motion.div
          whileHover={{ x: 4 }}
          className={`flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
        >
          Learn More <ArrowRight size={14} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="services" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-sm font-semibold px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-4">
            What We Do
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Services That
            <span className="gradient-text"> Drive Growth</span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/50 text-lg">
            From brand conception to digital domination — every service is engineered for maximum impact and measurable results.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
