import { createContext, useContext, useState, useEffect } from 'react';
import translations from './translations';

const LocaleContext = createContext({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
});

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    return localStorage.getItem('fostq-locale') || 'ar';
  });

  // Update document direction and lang for Arabic
  useEffect(() => {
    const isAr = locale === 'ar';
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
    localStorage.setItem('fostq-locale', locale);
  }, [locale]);

  const t = (key) => {
    const strings = translations[locale] || translations.en;
    return strings[key] || translations.en[key] || key;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);
