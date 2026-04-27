import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'framer-motion';
import { Users, Briefcase, Star, Globe, Quote } from 'lucide-react';
import { useLocale } from '../LocaleContext';

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

function StatCard({ stat }) {
  const { t } = useLocale();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','center center'] });
  const y  = useSpring(useTransform(scrollYProgress,[0,1],[60,0]), { stiffness:220, damping:30 });
  const op = useTransform(scrollYProgress,[0,0.5],[0,1]);
  const sc = useSpring(useTransform(scrollYProgress,[0,1],[0.8,1]), { stiffness:220, damping:30 });
  return (
    <motion.div ref={ref} style={{ y, opacity:op, scale:sc }}
      className="group glass rounded-3xl p-8 text-center border border-border hover:border-foreground/20 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background:`radial-gradient(circle at 50% 100%, ${stat.color}25 0%, transparent 65%)` }} />
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
        style={{ background:`linear-gradient(135deg,${stat.color},${stat.color}80)`, boxShadow:`0 8px 24px ${stat.color}40` }}>
        <stat.icon size={20} className="text-white" />
      </div>
      <div className="text-4xl md:text-5xl font-black text-foreground mb-1">
        <Counter to={stat.value} suffix={stat.suffix} />
      </div>
      <div className="text-sm text-muted-foreground">{t(stat.labelKey)}</div>
    </motion.div>
  );
}

function TestimonialCard({ t: testimonial, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','center center'] });
  const isEven = index % 2 === 0;
  const x  = useSpring(useTransform(scrollYProgress,[0,1],[isEven?-60:60,0]), { stiffness:220, damping:30 });
  const op = useTransform(scrollYProgress,[0,0.4],[0,1]);
  const sc = useSpring(useTransform(scrollYProgress,[0,1],[0.9,1]), { stiffness:220, damping:30 });
  return (
    <motion.div ref={ref} style={{ x, opacity:op, scale:sc }}
      className="group glass rounded-3xl p-7 border border-border hover:border-foreground/20 transition-colors duration-300">
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.stars)].map((_,i) => (
          <motion.span key={i} initial={{ scale:0 }} whileInView={{ scale:1 }} viewport={{ once:true }}
            transition={{ delay:index*0.1+i*0.06 }} className="text-yellow-400 text-sm">★</motion.span>
        ))}
      </div>
      <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
        style={{ background:`linear-gradient(135deg,${testimonial.color},${testimonial.color}70)` }}>
        <Quote size={14} className="text-white" />
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">"{testimonial.text}"</p>
      <div className="flex items-center gap-3">
        <img src={testimonial.img} alt={testimonial.name} className="w-11 h-11 rounded-full object-cover ring-2"
          style={{ ringColor:`${testimonial.color}50` }} />
        <div>
          <div className="text-sm font-semibold text-foreground">{testimonial.name}</div>
          <div className="text-xs text-muted-foreground">{testimonial.role}</div>
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
      <h2 className="text-4xl md:text-5xl font-black text-foreground">{title}</h2>
    </motion.div>
  );
}

export default function Stats() {
  const { t, locale } = useLocale();

  const stats = [
    { icon: Users,     value: 122, suffix: '+', labelKey: 'statTrustedClients',    color: '#FF6B35' },
    { icon: Star,      value: 108, suffix: '+', labelKey: 'statCustomerReviews',   color: '#FF4B6E' },
    { icon: Briefcase, value: 6,   suffix: '',  labelKey: 'statCoreServices',      color: '#9B51E0' },
    { icon: Globe,     value: 12,  suffix: '+', labelKey: 'statYearsExperience',   color: '#FF6B35' },
  ];

  const testimonials = [
    {
      name: locale === 'ar' ? 'أحمد الراشد' : 'Ahmed Al Rashid', 
      role: locale === 'ar' ? 'المدير التنفيذي، دبي فينتشرز' : 'CEO, Dubai Ventures', 
      stars: 5,
      text: locale === 'ar' ? 'فستق غيرت بالكامل تواجدنا على السوشيال ميديا. استراتيجيتهم واهتمامهم بالتفاصيل ساعدنا نوصل لمستويات ما كنا نتخيلها.' : 'FOSTQ completely transformed our social media presence. Their strategy and attention to detail helped us reach levels we never imagined.',
      img: 'https://images.unsplash.com/photo-1652784549134-bae822a7c4a3?w=80&q=80',
      color: '#FF6B35',
    },
    {
      name: locale === 'ar' ? 'سارة محمد' : 'Sarah Mohammed',   
      role: locale === 'ar' ? 'مؤسسة، ستايل هب الإمارات' : 'Founder, StyleHub UAE', 
      stars: 5,
      text: locale === 'ar' ? 'العمل مع فريق فستق كان نقطة تحول لعلامتنا التجارية. مبيعاتنا على الإنترنت تضاعفت خلال 3 شهور من إطلاق موقعنا الجديد.' : 'Working with the FOSTQ team was a turning point for our brand. Our online sales doubled within 3 months of launching our new website.',
      img: 'https://images.unsplash.com/photo-1552162864-987ac51d1177?w=80&q=80',
      color: '#FF4B6E',
    },
    {
      name: locale === 'ar' ? 'خالد حسن' : 'Khaled Hassan',   
      role: locale === 'ar' ? 'مدير، شركة نكسس' : 'Manager, Nexus Co.', 
      stars: 5,
      text: locale === 'ar' ? 'فريق الإعلانات في فستق حقق لنا عائد استثمار مذهل بنسبة ٣٤٠٪ في الربع الأول. أفضل استثمار في التسويق الرقمي قمنا فيه على الإطلاق.' : 'The ads team at FOSTQ achieved an amazing 340% ROI for us in the first quarter. Best digital marketing investment we have ever made.',
      img: 'https://images.unsplash.com/photo-1554400695-5973d75d179e?w=80&q=80',
      color: '#9B51E0',
    },
    {
      name: locale === 'ar' ? 'ليلى كريمي' : 'Layla Karimi',    
      role: locale === 'ar' ? 'مديرة التسويق، فاشن فورورد' : 'Marketing Director, Fashion Forward', 
      stars: 5,
      text: locale === 'ar' ? 'شغلهم في بناء الهوية التجارية عالمي بمعنى الكلمة. الهوية الجديدة اللي ابتكروها نقلت أعمالنا لمستوى مختلف تماماً في السوق الإماراتي.' : 'Their brand identity work is truly world-class. The new identity they created moved our business to a completely different level in the UAE market.',
      img: 'https://images.unsplash.com/photo-1613498382159-0972b7b4c9f1?w=80&q=80',
      color: '#FF6B35',
    },
  ];

  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle label={t('ourNumbers')} labelColor="#FF6B35"
          title={<>{t('statsTitle1')} <span style={{ background:'linear-gradient(135deg,#FF6B35,#FF4B6E,#9B51E0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{t('statsTitle2')}</span></>} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-32">
          {stats.map(s => <StatCard key={s.labelKey} stat={s} />)}
        </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-24" />
        <SectionTitle label={t('clientLove')} labelColor="#FF4B6E"
          title={<>{t('clientsTitle1')} <span style={{ background:'linear-gradient(135deg,#FF6B35,#FF4B6E,#9B51E0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{t('clientsTitle2')}</span></>} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial,i) => <TestimonialCard key={testimonial.name} t={testimonial} index={i} />)}
        </div>
      </div>
    </section>
  );
}
