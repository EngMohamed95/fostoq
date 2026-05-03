import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
// Last Update: 2026-05-03 - Service Detail Integration
import Hero from './components/Hero';
import Services from './components/Services';
import AllServices, { services } from './components/AllServices';
import AboutPage from './components/AboutPage';
import WorkPage from './components/WorkPage';
import ContactPage from './components/ContactPage';
import ServiceDetailPage from './components/ServiceDetailPage';
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

  const navigateTo = (page) => setActivePage(page);
  const navigateToService = (id) => setActivePage(`service:${id}`);

  // Helper to get service data
  const getActiveService = () => {
    if (activePage.startsWith('service:')) {
      const id = activePage.split(':')[1];
      return services.find(s => s.id === id);
    }
    return null;
  };

  return (
    <LocaleProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-background">
          <Navbar onNavigate={navigateTo} />
          
          <main>
            {activePage === 'home' && (
              <>
                <Hero />
                <div id="services">
                  <Services 
                    onViewAll={() => navigateTo('services')} 
                    onNavigateService={navigateToService}
                  />
                </div>
                <ScrollScene />
                <Stats />
                <ClientsCloud />
                <Contact />
              </>
            )}
            
            {activePage === 'about' && <AboutPage onBack={() => navigateTo('home')} />}
            {activePage === 'services' && (
              <AllServices 
                onBack={() => navigateTo('home')} 
                onNavigateService={navigateToService}
              />
            )}
            {activePage === 'work' && <WorkPage onBack={() => navigateTo('home')} />}
            {activePage === 'contact' && <ContactPage onBack={() => navigateTo('home')} />}
            
            {activePage.startsWith('service:') && (
              <ServiceDetailPage 
                service={getActiveService()} 
                onBack={() => navigateTo('services')} 
              />
            )}
          </main>

          <Footer onNavigate={navigateTo} />
        </div>
      </ThemeProvider>
    </LocaleProvider>
  );
}

export default App;
