import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
// Last Update: 2026-05-03 - Final FTP Sync Attempt
import Hero from './components/Hero';
import Services from './components/Services';
import AllServices from './components/AllServices';
import ScrollScene from './components/ScrollScene';
import Stats from './components/Stats';
import ClientsCloud from './components/ClientsCloud';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';
import { LocaleProvider } from './LocaleContext';

function App() {
  const [activePage, setActivePage] = useState('home');

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const navigateToServices = () => setActivePage('services');
  const navigateToHome = () => setActivePage('home');

  return (
    <LocaleProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-background">
          <Navbar onNavigateServices={navigateToServices} />
          
          <main>
            {activePage === 'home' ? (
              <>
                <Hero />
                <div id="services">
                  <Services onViewAll={navigateToServices} />
                </div>
                <ScrollScene />
                <Stats />
                <ClientsCloud />
                <Contact />
              </>
            ) : (
              <AllServices onBack={navigateToHome} />
            )}
          </main>

          <Footer onNavigateServices={navigateToServices} />
        </div>
      </ThemeProvider>
    </LocaleProvider>
  );
}

export default App;
