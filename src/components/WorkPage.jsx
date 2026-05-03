import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { useLocale } from '../LocaleContext';

export default function WorkPage({ onBack }) {
  const { t, locale } = useLocale();

  const projects = [
    { id:1, titleKey:'project1Title', categoryKey:'project1Cat', resultKey:'project1Result', year:'2025', descKey:'project1Desc', img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', accent:'#FF6B35', tags:['Branding','Web','UI/UX'] },
    { id:2, titleKey:'project2Title', categoryKey:'project2Cat', resultKey:'project2Result', year:'2025', descKey:'project2Desc', img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', accent:'#FF4B6E', tags:['Paid Ads','SEO','Analytics'] },
    { id:3, titleKey:'project3Title', categoryKey:'project3Cat', resultKey:'project3Result', year:'2025', descKey:'project3Desc', img:'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80', accent:'#9B51E0', tags:['React','Node.js','Fintech'] },
    { id:4, titleKey:'project4Title', categoryKey:'project4Cat', resultKey:'project4Result', year:'2024', descKey:'project4Desc', img:'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80', accent:'#FF6B35', tags:['Social','Content','Community'] },
    { id:5, titleKey:'project5Title', categoryKey:'project5Cat', resultKey:'project5Result', year:'2024', descKey:'project5Desc', img:'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&q=80', accent:'#FF4B6E', tags:['Shopify','UX','CRO'] },
    { id:6, titleKey:'project6Title', categoryKey:'project6Cat', resultKey:'project6Result', year:'2024', descKey:'project6Desc', img:'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80', accent:'#9B51E0', tags:['Video','Photography','Viral'] },
    { id:7, titleKey:'project7Title', categoryKey:'project7Cat', resultKey:'project7Result', year:'2024', descKey:'project7Desc', img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', accent:'#FF6B35', tags:['SaaS','GTM','Launch'] },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-4"
            >
              {locale === 'ar' ? 'معرض أعمالنا' : 'Portfolio Showcase'}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-foreground"
            >
              {locale === 'ar' ? 'مشاريع ' : 'Featured '}
              <span className="gradient-text">{locale === 'ar' ? 'مختارة' : 'Works'}</span>
            </motion.h1>
          </div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold px-6 py-3 rounded-xl border border-border hover:bg-secondary transition-all"
          >
            {locale === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
          </motion.button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-16">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="group relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
              {/* Image side */}
              <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-border shadow-2xl">
                <img src={p.img} alt={t(p.titleKey)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                {/* Result tag */}
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/20">
                    <TrendingUp size={18} className="text-green-400" />
                    <span className="text-white font-bold tracking-tight">{t(p.resultKey)}</span>
                  </div>
                </div>
              </div>

              {/* Info side */}
              <div className={i % 2 === 0 ? 'lg:pl-10' : 'lg:pr-10 lg:order-first'}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm font-bold text-primary">{t(p.categoryKey)}</span>
                  <div className="w-1 h-1 rounded-full bg-border" />
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar size={14} /> {p.year}
                  </span>
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-foreground mb-6 leading-tight">
                  {t(p.titleKey)}
                </h3>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {t(p.descKey)}
                </p>
                <div className="flex flex-wrap gap-2 mb-10">
                  {p.tags.map(tag => (
                    <span key={tag} className="text-xs font-bold px-4 py-2 rounded-xl bg-secondary border border-border text-foreground/70">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-foreground text-background font-bold hover:scale-105 transition-transform">
                    {locale === 'ar' ? 'عرض دراسة الحالة' : 'View Case Study'}
                    <ArrowUpRight size={20} />
                  </button>
                  <button className="p-4 rounded-2xl border border-border text-foreground hover:bg-secondary transition-colors">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-40 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-10">
            {locale === 'ar' ? 'هل لديك فكرة مشروع؟' : 'Have a project idea?'}
          </h2>
          <button 
            onClick={() => window.location.href = '#contact'}
            className="px-12 py-6 rounded-3xl bg-gradient-to-r from-primary to-primary/80 text-white font-black text-xl shadow-2xl hover:scale-105 transition-transform"
          >
            {locale === 'ar' ? 'فلنتحدث الآن' : "Let's Talk Now"}
          </button>
        </div>

      </div>
    </div>
  );
}
