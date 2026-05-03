import { motion } from 'framer-motion';
import { Share2, MessageCircle, Megaphone, Globe, Box, Film, Palette, Search, ArrowLeft, Send } from 'lucide-react';
import { useLocale } from '../LocaleContext';

const services = [
  { icon: Share2,    titleKey: 'svcDigitalMarketing', descKey: 'svcDigitalMarketingDesc', color: '#FF6B35', tags: ['Strategy', 'ROI', 'Growth'],    img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' },
  { icon: MessageCircle, titleKey: 'svcSocialMedia', descKey: 'svcSocialMediaDesc', color: '#FF4B6E', tags: ['Instagram', 'TikTok', 'Ads'], img:'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80' },
  { icon: Megaphone, titleKey: 'svcPerformanceAds', descKey: 'svcPerformanceAdsDesc', color: '#9B51E0', tags: ['Google', 'Meta', 'TikTok'], img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80' },
  { icon: Globe,     titleKey: 'svcWebDesign',      descKey: 'svcWebDesignDesc',      color: '#FF6B35', tags: ['UI/UX', 'React', 'Modern'],     img:'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80' },
  { icon: Box,       titleKey: 'svcAppDev',         descKey: 'svcAppDevDesc',         color: '#FF4B6E', tags: ['Mobile', 'iOS', 'Android'],     img:'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80' },
  { icon: Film,      titleKey: 'svcContentCreation', descKey: 'svcContentCreationDesc', color: '#9B51E0', tags: ['Video', 'Photos', 'Copy'],    img:'https://images.unsplash.com/photo-1492724724894-7464c27d0ceb?w=800&q=80' },
  { icon: Palette,   titleKey: 'svcBranding',       descKey: 'svcBrandingDesc',       color: '#FF6B35', tags: ['Logo', 'Identity', 'Vision'],   img:'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80' },
  { icon: Search,    titleKey: 'svcSEO',            descKey: 'svcSEODesc',            color: '#FF4B6E', tags: ['Ranking', 'Traffic', 'Google'], img:'https://images.unsplash.com/photo-1572021335469-3171624c1c5c?w=800&q=80' },
  { icon: Film,      titleKey: 'svcMotionDesign',   descKey: 'svcMotionDesignDesc',    color: '#9B51E0', tags: ['Animation', 'Reels', '3D'],    img:'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80' },
];

export default function AllServices({ onBack }) {
  const { t, locale } = useLocale();

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className={locale === 'ar' ? 'rotate-180' : ''} />
          <span className="font-semibold">{locale === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</span>
        </motion.button>

        {/* Header */}
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-foreground mb-6"
          >
            {locale === 'ar' ? 'خدماتنا ' : 'Our '}
            <span style={{ background:'linear-gradient(135deg,#FF6B35,#FF4B6E,#9B51E0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              {locale === 'ar' ? 'المتكاملة' : 'Complete Services'}
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed"
          >
            {locale === 'ar' 
              ? 'نقدم مجموعة واسعة من الحلول الرقمية المبتكرة المصممة خصيصًا لتنمية مشروعك وتعزيز حضورك في السوق العالمي.' 
              : 'We offer a wide range of innovative digital solutions tailored specifically to grow your project and enhance your presence in the global market.'}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-[2rem] overflow-hidden border border-border group hover:border-foreground/10 transition-all duration-500"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={s.img} alt={t(s.titleKey)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute top-6 left-6 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl"
                  style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}dd)` }}>
                  <s.icon size={24} />
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">{t(s.titleKey)}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                  {t(s.descKey)}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {s.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full bg-secondary text-foreground/60 border border-border">
                      {tag}
                    </span>
                  ))}
                </div>
                <a 
                  href={`https://wa.me/971547772515?text=${encodeURIComponent(t('waServiceMessage') + t(s.titleKey))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-bold text-sm transition-all shadow-lg hover:shadow-xl active:scale-95"
                  style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}dd)` }}
                >
                  <Send size={16} />
                  {t('orderServiceNow')}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
