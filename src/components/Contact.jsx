import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, CheckCircle, Send } from 'lucide-react';
import { useLocale } from '../LocaleContext';

export default function Contact() {
  const { t } = useLocale();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','center center'] });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', service:'', message:'' });

  const titleY  = useSpring(useTransform(scrollYProgress,[0,1],[60,0]), { stiffness:220, damping:30 });
  const titleOp = useTransform(scrollYProgress,[0,0.4],[0,1]);
  const leftX   = useSpring(useTransform(scrollYProgress,[0,1],[-80,0]), { stiffness:220, damping:30 });
  const rightX  = useSpring(useTransform(scrollYProgress,[0,1],[80,0]),  { stiffness:220, damping:30 });
  const sideOp  = useTransform(scrollYProgress,[0.1,0.6],[0,1]);
  const bgY     = useSpring(useTransform(scrollYProgress,[0,1],[60,-60]), { stiffness:200, damping:28 });

  const services = [
    { key: 'svcDigitalMarketing', label: t('svcDigitalMarketing') },
    { key: 'svcSocialMedia', label: t('svcSocialMedia') },
    { key: 'svcPerformanceAds', label: t('svcPerformanceAds') },
    { key: 'svcWebDesign', label: t('svcWebDesign') },
    { key: 'svcAppDev', label: t('svcAppDev') },
    { key: 'svcContentCreation', label: t('svcContentCreation') },
    { key: 'svcBranding', label: t('svcBranding') },
    { key: 'svcSEO', label: t('svcSEO') },
    { key: 'svcMotionDesign', label: t('svcMotionDesign') },
  ];

  const WHATSAPP = 'https://wa.me/971547772515?text=' + encodeURIComponent(t('waMessage'));

  return (
    <section id="contact" ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* parallax bg image */}
      <motion.div style={{ y:bgY }} className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&q=60"
          alt="" className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse at 50% 100%, rgba(155,81,224,0.1) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* header */}
        <motion.div style={{ y:titleY, opacity:titleOp }} className="text-center mb-16">
          <span className="inline-block text-sm font-semibold px-4 py-2 rounded-full border mb-4"
            style={{ borderColor:'rgba(155,81,224,0.3)', background:'rgba(155,81,224,0.08)', color:'#B97AE8' }}>
            {t('getInTouch')}
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4">
            {t('readyToGrow')} <span style={{ background:'linear-gradient(135deg,#FF6B35,#FF4B6E,#9B51E0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{t('grow')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t('contactDesc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* left */}
          <motion.div style={{ x:leftX, opacity:sideOp }} className="lg:col-span-2 flex flex-col gap-5">
            {[
              { icon:Mail,    label:t('email'),    value:'support@fostq.com',  color:'#FF6B35' },
              { icon:Phone,   label:t('phone'),    value:'+(971) 547772515',   color:'#FF4B6E' },
              { icon:MapPin,  label:t('location'), value:t('dubaiBusinessBay'), color:'#9B51E0' },
            ].map(info => (
              <motion.div key={info.label} whileHover={{ x:6 }}
                className="flex items-center gap-4 glass rounded-2xl p-5 border border-border hover:border-foreground/20 transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background:`linear-gradient(135deg,${info.color},${info.color}80)`, boxShadow:`0 8px 20px ${info.color}30` }}>
                  <info.icon size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">{info.label}</div>
                  <div className="text-sm font-semibold text-foreground">{info.value}</div>
                </div>
              </motion.div>
            ))}

            {/* WhatsApp CTA */}
            <motion.a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
              className="flex items-center gap-4 rounded-3xl p-6 border border-border cursor-pointer"
              style={{ background:'linear-gradient(135deg,rgba(37,211,102,0.1),rgba(18,140,126,0.05))' }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background:'linear-gradient(135deg,#25D366,#128C7E)', boxShadow:'0 8px 24px rgba(37,211,102,0.3)' }}>
                <MessageCircle size={26} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-foreground mb-0.5">{t('chatWhatsApp')}</div>
                <div className="text-sm text-muted-foreground">{t('replyMinutes')}</div>
              </div>
            </motion.a>

            {/* Dubai image */}
            <div className="relative rounded-3xl overflow-hidden border border-border h-36">
              <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=75"
                alt="Dubai" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020209] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <div className="text-sm font-bold text-white">{t('dubaiBusinessBay')}</div>
                <div className="text-xs text-white/45">{t('unitedArabEmirates')}</div>
              </div>
            </div>
          </motion.div>

          {/* form */}
          <motion.div style={{ x:rightX, opacity:sideOp }} className="lg:col-span-3 glass rounded-3xl p-8 border border-border">
            {submitted ? (
              <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
                className="flex flex-col items-center justify-center h-full py-16 text-center">
                <motion.div initial={{ scale:0 }} animate={{ scale:1 }}
                  transition={{ type:'spring', stiffness:200 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                  style={{ background:'linear-gradient(135deg,#25D366,#128C7E)' }}>
                  <CheckCircle size={40} className="text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{t('messageSent')}</h3>
                <p className="text-muted-foreground">{t('messageSentDesc')}</p>
              </motion.div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-muted-foreground font-medium mb-2 block">{t('yourName')}</label>
                    <input type="text" required placeholder={t('namePlaceholder')} value={form.name}
                      onChange={e => setForm({...form,name:e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-orange-500/40 text-sm transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground font-medium mb-2 block">{t('emailLabel')}</label>
                    <input type="email" required placeholder={t('emailPlaceholder')} value={form.email}
                      onChange={e => setForm({...form,email:e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-orange-500/40 text-sm transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-medium mb-2 block">{t('serviceNeeded')}</label>
                  <select value={form.service} onChange={e => setForm({...form,service:e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:border-orange-500/40 text-sm transition-colors appearance-none">
                    <option value="" className="bg-popover text-foreground">{t('selectService')}</option>
                    {services.map(s => <option key={s.key} value={s.key} className="bg-popover text-foreground">{s.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-medium mb-2 block">{t('projectDetails')}</label>
                  <textarea required rows={5} placeholder={t('projectPlaceholder')}
                    value={form.message} onChange={e => setForm({...form,message:e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-orange-500/40 text-sm transition-colors resize-none" />
                </div>
                <motion.button type="submit"
                  whileHover={{ scale:1.02, boxShadow:'0 20px 60px rgba(255,75,110,0.35)' }}
                  whileTap={{ scale:0.98 }}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white font-semibold text-base shadow-xl"
                  style={{ background:'linear-gradient(135deg,#FF6B35,#FF4B6E,#9B51E0)' }}>
                  <Send size={18} /> {t('sendMessage')}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
