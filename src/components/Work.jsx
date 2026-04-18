import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'NovaTech Rebrand',
    category: 'Branding + Web',
    result: '+220% Conversions',
    color: 'from-indigo-600 to-purple-700',
    pattern: 'circles',
  },
  {
    title: 'GrowthLab Campaign',
    category: 'Performance Marketing',
    result: '+340% ROI',
    color: 'from-purple-600 to-pink-700',
    pattern: 'lines',
  },
  {
    title: 'Nexus Social Strategy',
    category: 'Social Media',
    result: '10x Followers',
    color: 'from-pink-600 to-rose-700',
    pattern: 'dots',
  },
  {
    title: 'FutureFin Platform',
    category: 'Web Development',
    result: '4.9★ App Rating',
    color: 'from-violet-600 to-indigo-700',
    pattern: 'grid',
  },
];

const patterns = {
  circles: (
    <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 300">
      {[80, 120, 160, 200].map((r, i) => (
        <circle key={i} cx="200" cy="150" r={r} fill="none" stroke="white" strokeWidth="1" />
      ))}
    </svg>
  ),
  lines: (
    <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 300">
      {[...Array(10)].map((_, i) => (
        <line key={i} x1={i * 45} y1="0" x2={i * 45 + 100} y2="300" stroke="white" strokeWidth="1" />
      ))}
    </svg>
  ),
  dots: (
    <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 300">
      {[...Array(80)].map((_, i) => (
        <circle key={i} cx={(i % 10) * 45 + 10} cy={Math.floor(i / 10) * 35 + 10} r="2" fill="white" />
      ))}
    </svg>
  ),
  grid: (
    <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 300">
      {[...Array(6)].map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 60} x2="400" y2={i * 60} stroke="white" strokeWidth="1" />
      ))}
      {[...Array(9)].map((_, i) => (
        <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="300" stroke="white" strokeWidth="1" />
      ))}
    </svg>
  ),
};

export default function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="work" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-4">
            Case Studies
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Our Recent
            <span className="gradient-text"> Work</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Real projects. Real results. Here are some of our proudest achievements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl cursor-pointer"
            >
              {/* Card bg */}
              <div className={`relative h-64 bg-gradient-to-br ${p.color} overflow-hidden`}>
                {patterns[p.pattern]}
                <div className="absolute inset-0 bg-black/20" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/20 text-white border border-white/20">
                      {p.category}
                    </span>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30"
                    >
                      <ArrowUpRight size={18} className="text-white" />
                    </motion.div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">{p.title}</h3>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-sm font-bold text-white">{p.result}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
