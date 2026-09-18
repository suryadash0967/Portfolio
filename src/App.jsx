import Cursor from './components/Cursor/Cursor';
import Atmosphere from './components/Atmosphere/Atmosphere';
import OrbMotif from './components/OrbMotif/OrbMotif';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';
import './index.css';

function App() {
  return (
    <>
      <div className="noise" />
      <div className="grid-overlay" />
      <Atmosphere />
      <OrbMotif />
      <Cursor />
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default App;
