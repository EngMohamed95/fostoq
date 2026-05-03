import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, CheckCircle2, Zap, Shield, Star, Users, BarChart } from 'lucide-react';
import { useLocale } from '../LocaleContext';

export default function ServiceDetailPage({ service, onBack }) {
  const { t, locale } = useLocale();

  if (!service) return null;

  const benefits = [
    { icon: Zap, title: locale === 'ar' ? 'سرعة التنفيذ' : 'Fast Delivery' },
    { icon: Shield, title: locale === 'ar' ? 'جودة مضمونة' : 'Guaranteed Quality' },
    { icon: Star, title: locale === 'ar' ? 'نتائج ملموسة' : 'Proven Results' },
    { icon: Users, title: locale === 'ar' ? 'دعم مستمر' : 'Ongoing Support' },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-12 transition-colors group"
        >
          <ArrowLeft size={20} className={locale === 'ar' ? 'rotate-180 group-hover:translate-x-1' : 'group-hover:-translate-x-1'} />
          <span className="font-bold">{locale === 'ar' ? 'العودة للخدمات' : 'Back to Services'}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-lg shadow-primary/5">
                <service.icon size={30} />
              </div>
              <span className="text-sm font-bold text-primary uppercase tracking-widest">{t('serviceDetails')}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-8 leading-tight">
              {t(service.titleKey)}
            </h1>
            
            <p className="text-muted-foreground text-xl leading-relaxed mb-10">
              {t(service.descKey)}
            </p>

            {/* Detailed description placeholder - usually you'd have more keys in translations */}
            <div className="space-y-6 mb-12">
              <h3 className="text-2xl font-bold text-foreground">
                {locale === 'ar' ? 'ماذا نقدم في هذه الخدمة؟' : 'What do we offer?'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-border">
                    <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                    <span className="text-foreground font-medium">
                      {locale === 'ar' ? `ميزة رقم ${i} في الخدمة` : `Feature ${i} in this service`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://wa.me/971547772515?text=${encodeURIComponent(t('waMessage') + ' ' + t(service.titleKey))}`}
                className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-[#25D366] text-white font-black text-xl shadow-xl shadow-[#25D366]/20"
              >
                <MessageCircle size={24} />
                {t('chatWhatsApp')}
              </motion.a>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="aspect-video rounded-[2.5rem] overflow-hidden border border-border shadow-2xl relative group">
              <img 
                src={service.img} 
                alt={t(service.titleKey)} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                 <p className="text-white font-bold">{t('premiumQuality')}</p>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-4">
               {benefits.map((b, i) => (
                 <div key={i} className="glass p-6 rounded-3xl border border-border text-center">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                      <b.icon size={20} />
                    </div>
                    <p className="text-sm font-bold text-foreground">{b.title}</p>
                 </div>
               ))}
            </div>

            <div className="p-8 rounded-[2rem] bg-secondary/30 border border-border text-center">
              <BarChart className="mx-auto mb-4 text-muted-foreground/30" size={40} />
              <p className="text-muted-foreground text-sm">
                {locale === 'ar' 
                  ? 'نحن نستخدم أحدث الأدوات والتقنيات لضمان أفضل عائد لمشروعك.' 
                  : 'We use the latest tools and technologies to ensure the best ROI for your project.'}
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
