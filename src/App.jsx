import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ScrollScene from './components/ScrollScene';
import Stats from './components/Stats';
import ClientsCloud from './components/ClientsCloud';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';
import { LocaleProvider } from './LocaleContext';

function App() {
  return (
    <LocaleProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="min-h-screen">
          <Navbar />
          <Hero />
          <Services />
          <ScrollScene />
          <Stats />
          <ClientsCloud />
          <Contact />
          <Footer />
        </div>
      </ThemeProvider>
    </LocaleProvider>
  );
}

export default App
