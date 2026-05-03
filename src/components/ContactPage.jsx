import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send, Globe, Camera, Link as LinkIcon, Share2 } from 'lucide-react';
import { useLocale } from '../LocaleContext';
import Contact from './Contact';

export default function ContactPage({ onBack }) {
  const { t, locale } = useLocale();

  const social = [
    { icon: Camera, label: 'Instagram', href: '#' },
    { icon: LinkIcon, label: 'LinkedIn', href: '#' },
    { icon: Share2, label: 'Social', href: '#' },
    { icon: Globe, label: 'Website', href: '#' },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onBack}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            {locale === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
          </motion.button>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-foreground mb-6"
          >
            {locale === 'ar' ? 'دعنا ' : 'Let’s '}
            <span className="gradient-text">{locale === 'ar' ? 'نتحدث' : 'Connect'}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-xl max-w-2xl mx-auto"
          >
            {t('contactDesc')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-foreground">
                {locale === 'ar' ? 'معلومات التواصل' : 'Contact Information'}
              </h2>
              
              <div className="space-y-6">
                {[
                  { icon: Mail, label: t('email'), val: 'support@fostq.com' },
                  { icon: Phone, label: t('phone'), val: '+(971) 547772515' },
                  { icon: MapPin, label: t('location'), val: t('dubaiBusinessBayUAE') },
                ].map((item, i) => (
                  <motion.div 
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-5 p-6 rounded-3xl bg-secondary/30 border border-border group hover:border-primary/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{item.label}</p>
                      <p className="text-lg font-bold text-foreground">{item.val}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-foreground">
                {locale === 'ar' ? 'تابعنا على' : 'Follow Us'}
              </h3>
              <div className="flex gap-4">
                {social.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    whileHover={{ y: -5 }}
                    className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary border border-border hover:border-primary/30 transition-all"
                  >
                    <s.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary to-primary-foreground/10 text-white shadow-2xl">
              <MessageCircle size={40} className="mb-6 opacity-50" />
              <h3 className="text-2xl font-bold mb-2">{t('chatWhatsApp')}</h3>
              <p className="opacity-80 mb-6">{t('replyMinutes')}</p>
              <a 
                href={`https://wa.me/971547772515?text=${encodeURIComponent(t('waMessage'))}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-bold hover:bg-opacity-90 transition-all"
              >
                {locale === 'ar' ? 'تحدث معنا الآن' : 'Chat Now'}
                <Send size={18} />
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="glass p-8 md:p-12 rounded-[3rem] border border-border shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
               {/* Reuse the existing Contact component for the form logic */}
               <Contact isPage />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
