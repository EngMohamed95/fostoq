import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

const WHATSAPP = 'https://wa.me/971547772515?text=' + encodeURIComponent('Hello, I am interested in your services. I want to know more.');

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <img
                src="https://fostq.com/wp-content/uploads/2024/10/%D8%AF%D9%84%D9%8A%D9%84-%D8%A7%D9%84%D9%87%D9%88%D9%8A%D8%A9-%D8%A7%D9%84%D8%A5%D8%B1%D8%B4%D8%A7%D8%AF%D9%8A-14.png"
                alt="FOSTQ" className="h-10 w-auto object-contain"
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
              <span className="hidden text-2xl font-black">
                <span style={{ background:'linear-gradient(135deg,#FF6B35,#FF4B6E,#9B51E0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>FOST</span>
                <span className="text-white">Q</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              Empowering brands with bold marketing solutions. Dubai-based agency delivering real results for ambitious businesses worldwide.
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                { icon:Mail,    val:'support@fostq.com' },
                { icon:Phone,   val:'+(971) 547772515'  },
                { icon:MapPin,  val:'Dubai Business Bay, UAE' },
              ].map(i => (
                <div key={i.val} className="flex items-center gap-2.5 text-sm text-white/40">
                  <i.icon size={14} className="text-white/30" />
                  {i.val}
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5">Services</h4>
            <ul className="flex flex-col gap-2.5">
              {['Social Media','Performance Ads','Web Design','Branding','SEO','Motion Design','3D Animation'].map(s => (
                <li key={s}><a href="#services" className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Links + CTA */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5">Company</h4>
            <ul className="flex flex-col gap-2.5 mb-8">
              {['About','Our Work','Contact','Privacy Policy','FAQs'].map(l => (
                <li key={l}><a href="#" className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200">{l}</a></li>
              ))}
            </ul>
            <motion.a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl text-white text-sm font-semibold"
              style={{ background:'linear-gradient(135deg,#25D366,#128C7E)', boxShadow:'0 8px 24px rgba(37,211,102,0.25)' }}>
              <MessageCircle size={16} />
              Chat on WhatsApp
            </motion.a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/25">© 2025 FOSTQ Marketing. All rights reserved.</p>
          <p className="text-sm text-white/20">Dubai Business Bay, United Arab Emirates</p>
        </div>
      </div>
    </footer>
  );
}
