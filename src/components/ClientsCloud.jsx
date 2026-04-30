import React from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '../LocaleContext';

const logos = Array.from({ length: 28 }, (_, i) => `/logo%20%20customer/${i + 1}.webp`);

const ClientsCloud = () => {
  const { t } = useLocale();

  return (
    <section className="py-24 md:py-32 bg-[#020209] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[20%] right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-primary mb-6 px-6 py-2 bg-primary/10 rounded-full border border-primary/20 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              {t('happyClients')}
            </span>
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-8">
              {t('trustedClients')}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* Dense Professional Grid - 7 columns as requested */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2 md:gap-4">
          {logos.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: (i % 7) * 0.05 + Math.floor(i / 7) * 0.1 
              }}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
              }}
              className="group aspect-square bg-white/[0.03] backdrop-blur-md rounded-xl md:rounded-2xl p-0 flex items-center justify-center border border-white/5 hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)] transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <img 
                src={src} 
                alt="Client logo" 
                className="w-full h-full object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110 drop-shadow-2xl p-0"
                loading="lazy"
                onError={(e) => { e.target.parentElement.style.display = 'none'; }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsCloud;
