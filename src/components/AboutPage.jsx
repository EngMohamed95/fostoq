import { motion } from 'framer-motion';
import { Target, Users, Award, Rocket, CheckCircle2, ArrowRight, Globe } from 'lucide-react';
import { useLocale } from '../LocaleContext';

export default function AboutPage({ onBack }) {
  const { t, locale } = useLocale();

  const stats = [
    { label: t('statTrustedClients'), value: '250+', icon: Users },
    { label: t('statCustomerReviews'), value: '5.0', icon: Award },
    { label: t('statCoreServices'), value: '9', icon: Rocket },
    { label: t('statYearsExperience'), value: '10+', icon: Target },
  ];

  const features = [
    { title: locale === 'ar' ? 'رؤيتنا' : 'Our Vision', desc: locale === 'ar' ? 'أن نكون الوكالة الرقمية الرائدة في الشرق الأوسط من خلال تقديم حلول مبتكرة ونتائج ملموسة.' : 'To be the leading digital agency in the Middle East by delivering innovative solutions and tangible results.' },
    { title: locale === 'ar' ? 'مهمتنا' : 'Our Mission', desc: locale === 'ar' ? 'تمكين العلامات التجارية من النمو في العصر الرقمي باستخدام أحدث تقنيات التسويق والبرمجة.' : 'Empowering brands to grow in the digital age using the latest marketing and programming technologies.' },
    { title: locale === 'ar' ? 'قيمنا' : 'Our Values', desc: locale === 'ar' ? 'الشفافية، الابتكار، والالتزام بأعلى معايير الجودة في كل مشروع نقوم به.' : 'Transparency, innovation, and commitment to the highest quality standards in every project we undertake.' },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-sm font-semibold px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary mb-6">
              {locale === 'ar' ? 'من نحن' : 'Who We Are'}
            </span>
            <div className="relative group mb-10">
              {/* Premium Background Glow */}
              <div className="absolute -inset-10 bg-primary/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground leading-[1.1] relative z-10 text-center md:text-start">
                <motion.span 
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{ background: 'linear-gradient(90deg, #fff, #FF6B35, #fff)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  {locale === 'ar' ? 'وكالة فسدق ' : 'Fostoq '}
                </motion.span>
                <br />
                <span className="gradient-text">
                  {locale === 'ar' ? 'للتسويق الرقمي' : 'Digital Agency'}
                </span>

                {/* Abstract Orbital Particles */}
                <div className="absolute -right-4 md:-right-20 top-1/2 -translate-y-1/2 w-32 h-32 hidden md:block">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ 
                        rotate: { duration: 8 + i * 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="absolute inset-0 border border-primary/20 rounded-[40%] flex items-start justify-center"
                      style={{ rotate: `${i * 45}deg` }}
                    >
                      <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_#FF6B35]" />
                    </motion.div>
                  ))}
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-8 bg-primary/10 rounded-full blur-xl" 
                  />
                </div>
              </h1>
            </div>
            <p className="text-muted-foreground text-xl leading-relaxed mb-8">
              {t('heroDesc')}
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '#contact'}
                className="px-8 py-4 rounded-2xl bg-foreground text-background font-bold"
              >
                {t('startProject')}
              </motion.button>
              <button 
                onClick={onBack}
                className="px-8 py-4 rounded-2xl border border-border text-foreground font-bold hover:bg-secondary transition-colors"
              >
                {locale === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1522071823991-b1ae650a0c9e?w=800&q=80" 
                alt="Our Team" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Stats Overlay */}
            <div className="absolute -bottom-10 -left-10 glass p-8 rounded-3xl border border-border shadow-2xl hidden md:block">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-bold text-foreground">Active in Dubai</span>
              </div>
              <p className="text-3xl font-black text-foreground tracking-tight">10+ Years</p>
              <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">Of Digital Excellence</p>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl border border-border text-center group hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary group-hover:scale-110 transition-transform">
                <stat.icon size={24} />
              </div>
              <h3 className="text-4xl font-black text-foreground mb-1">{stat.value}</h3>
              <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Vision/Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[2.5rem] bg-secondary/50 border border-border hover:bg-secondary transition-all"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <CheckCircle2 className="text-primary" size={24} />
                {f.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] overflow-hidden py-24 px-10 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 -z-10" />
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8">
            {locale === 'ar' ? 'جاهز للانطلاق بمشروعك؟' : 'Ready to Launch Your Project?'}
          </h2>
          <button 
            onClick={() => window.location.href = '#contact'}
            className="group flex items-center gap-3 px-12 py-6 rounded-2xl bg-foreground text-background font-black text-xl mx-auto hover:scale-105 transition-transform"
          >
            {t('startProject')}
            <ArrowRight className={locale === 'ar' ? 'rotate-180' : ''} />
          </button>
        </motion.div>

      </div>
    </div>
  );
}
