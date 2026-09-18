import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Atmosphere.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Atmosphere() {
  const containerRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    // Mouse tracking for the ambient glow
    if (!window.matchMedia('(pointer: coarse)').matches) {
      const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        gsap.to(glowRef.current, {
          x: `${x}%`,
          y: `${y}%`,
          duration: 2,
          ease: 'power2.out',
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useEffect(() => {
    // Scroll-linked color interpolation
    // We can just use ScrollTriggers to change the background of the glow container
    // based on which section is in view.
    
    const sections = [
      { selector: 'section[class*="Hero"]', color: 'var(--light-hero)' },
      { selector: 'section[class*="About"]', color: 'var(--light-about)' },
      { selector: 'section[class*="Skills"]', color: 'var(--light-skills)' },
      { selector: 'section[class*="Experience"]', color: 'var(--light-exp)' },
    ];

    const ctx = gsap.context(() => {
      sections.forEach(({ selector, color }) => {
        const el = document.querySelector(selector);
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: "top center",
            end: "bottom center",
            onEnter: () => gsap.to(glowRef.current, { backgroundImage: color, duration: 1.5 }),
            onEnterBack: () => gsap.to(glowRef.current, { backgroundImage: color, duration: 1.5 }),
          });
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.atmosphere} ref={containerRef}>
      <div className={styles.glowContainer} ref={glowRef} />
    </div>
  );
}
