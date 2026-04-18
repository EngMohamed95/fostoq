import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ScrollScene from './components/ScrollScene';
import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="dark min-h-screen" style={{ background: '#020209' }}>
      <Navbar />
      <Hero />
      <Services />
      <ScrollScene />
      <Stats />
      <Contact />
      <Footer />
    </div>
  );
}

export default App
