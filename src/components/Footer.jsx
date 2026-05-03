import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { useLocale } from '../LocaleContext';

export default function Footer({ onNavigate }) {
  const { t } = useLocale();
  const WHATSAPP = 'https://wa.me/971547772515?text=' + encodeURIComponent(t('waMessage'));

  const servicesList = [
    { label: t('svcDigitalMarketing'), id: 'services' },
    { label: t('svcSocialMedia'), id: 'services' },
    { label: t('svcPerformanceAds'), id: 'services' },
    { label: t('svcWebDesign'), id: 'services' },
    { label: t('svcAppDev'), id: 'services' },
    { label: t('svcContentCreation'), id: 'services' },
    { label: t('svcBranding'), id: 'services' },
    { label: t('svcSEO'), id: 'services' },
    { label: t('svcMotionDesign'), id: 'services' }
  ];

  const companyLinks = [
    { label: t('navHome'), id: 'home' },
    { label: t('navAbout'), id: 'about' },
    { label: t('navWork'), id: 'work' },
    { label: t('navContact'), id: 'contact' }
  ];

  return (
    <footer className="relative border-t border-border py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5 cursor-pointer" onClick={() => onNavigate('home')}>
              <img
                src="/logo (2).png"
                alt="FOSTQ Logo" className="h-14 w-auto object-contain drop-shadow-md"
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
              <span className="hidden text-2xl font-black">
                <span style={{ background:'linear-gradient(135deg,#FF6B35,#FF4B6E,#9B51E0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>FOST</span>
                <span className="text-foreground">Q</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              {t('footerDesc')}
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                { icon:Mail,    val:'support@fostq.com' },
                { icon:Phone,   val:'+(971) 547772515'  },
                { icon:MapPin,  val:t('dubaiBusinessBayUAE') },
              ].map(i => (
                <div key={i.val} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <i.icon size={14} className="text-foreground/30" />
                  {i.val}
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-5">{t('servicesLabel')}</h4>
            <ul className="flex flex-col gap-2.5">
              {servicesList.map(s => (
                <li key={s.label}>
                  <button 
                    onClick={() => onNavigate(s.id)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Links + CTA */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-5">{t('companyLabel')}</h4>
            <ul className="flex flex-col gap-2.5 mb-8">
              {companyLinks.map(l => (
                <li key={l.id}>
                  <button 
                    onClick={() => onNavigate(l.id)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
            <motion.a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl text-white text-sm font-semibold"
              style={{ background:'linear-gradient(135deg,#25D366,#128C7E)', boxShadow:'0 8px 24px rgba(37,211,102,0.25)' }}>
              <MessageCircle size={16} />
              {t('chatWhatsApp')}
            </motion.a>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">{t('copyright')}</p>
          <p className="text-sm text-muted-foreground">{t('dubaiUAE')}</p>
        </div>
      </div>
    </footer>
  );
}
