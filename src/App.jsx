import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ScrollScene from './components/ScrollScene';
import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <Services />
        <ScrollScene />
        <Stats />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App
