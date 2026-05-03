import React from 'react';
import { useLocale } from '../LocaleContext';

const LogoMarquee = () => {
  const { t } = useLocale();

  // 28 logos total. Split into 3 rows for a "fuller" look.
  const logos = Array.from({ length: 28 }, (_, i) => `/logo  customer/${i + 1}.webp`);
  
  const row1 = logos.slice(0, 10);
  const row2 = logos.slice(10, 19);
  const row3 = logos.slice(19, 28);

  const MarqueeRow = ({ items, direction, duration }) => {
    const animationName = direction === 'left' ? 'marquee-left' : 'marquee-right';
    
    return (
      <div className="flex overflow-hidden w-full py-4 group">
        <div 
          className="flex whitespace-nowrap gap-10 px-4"
          style={{
            animation: `${animationName} ${duration}s linear infinite`,
            width: 'fit-content'
          }}
        >
          {/* We repeat the logos 4 times to be absolutely sure there's no empty space */}
          {[...items, ...items, ...items, ...items].map((src, i) => (
            <div 
              key={i} 
              className="w-56 md:w-80 h-32 md:h-48 flex-shrink-0 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 flex items-center justify-center p-8 md:p-12 shadow-2xl hover:bg-white/10 hover:border-primary/30 transition-all duration-500"
            >
              <img 
                src={src} 
                alt="" 
                className="max-w-full max-h-full object-contain filter drop-shadow-xl opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* CSS for the marquee animation */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-25%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-25%); }
            100% { transform: translateX(0); }
          }
        `}} />
      </div>
    );
  };

  return (
    <section className="py-32 overflow-hidden bg-[#020617] relative border-y border-white/5">
      {/* Luxury Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(148,163,184,0.1),transparent_70%)] pointer-events-none" />
      <div className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse pointer-events-none" />
      <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] animate-pulse pointer-events-none" />

      <div className="container mx-auto px-4 mb-24 text-center relative z-10">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="px-6 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-8 inline-block shadow-[0_0_20px_rgba(148,163,184,0.2)]">
            {t('happyClients')}
          </span>
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6">
            {t('trustedClients')}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-8" />
        </div>
      </div>

      <div className="flex flex-col gap-6 md:gap-10 relative z-10">
        <MarqueeRow items={row1} direction="left" duration={40} />
        <MarqueeRow items={row2} direction="right" duration={45} />
        <MarqueeRow items={row3} direction="left" duration={50} />
      </div>

      {/* Deep Edge Fading for Luxury Feel */}
      <div className="absolute inset-y-0 left-0 w-32 md:w-96 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 md:w-96 bg-gradient-to-l from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none" />
    </section>
  );
};

export default LogoMarquee;
