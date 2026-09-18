import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Hero.module.css';

export default function Hero() {
  const containerRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);
  const descRef = useRef(null);
  const backgroundLayers = useRef(null);

  useEffect(() => {
    // Parallax on mouse move
    if (!window.matchMedia('(pointer: coarse)').matches) {
      const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        // Move background layers opposite to mouse
        gsap.to(backgroundLayers.current, {
          x: -x * 2,
          y: -y * 2,
          duration: 1,
          ease: 'power2.out',
        });
        
        // Move text slightly with mouse for depth
        gsap.to(`.${styles.content}`, {
          x: x,
          y: y,
          duration: 1,
          ease: 'power2.out',
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.fromTo(
          [textRef1.current, textRef2.current, textRef3.current],
          { y: 150, opacity: 0, rotateX: -30, scale: 0.9 },
          { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 1.5, stagger: 0.15, delay: 0.2 }
        ).fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 },
          "-=1"
        ).fromTo(
          `.${styles.technicalOverlay}`,
          { opacity: 0 },
          { opacity: 1, duration: 2 },
          "-=0.5"
        );
      }, containerRef);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        ctx.revert();
      };
    }
  }, []);

  return (
    <section className={styles.hero} ref={containerRef}>
      <div className={styles.backgroundSystem} ref={backgroundLayers}>
        <div className={styles.ambientGlow1}></div>
        <div className={styles.ambientGlow2}></div>
      </div>

      <div className={styles.content}>
        <h1 className={styles.headline}>
          <div className={styles.lineOverflow}>
            <span ref={textRef1}>I BUILD THINGS</span>
          </div>
          <div className={styles.lineOverflow}>
            <span ref={textRef2} className={styles.accent}>THAT SHOULDN'T</span>
          </div>
          <div className={styles.lineOverflow}>
            <span ref={textRef3}>BE THIS GOOD.</span>
          </div>
        </h1>
        <div className={styles.meta} ref={descRef}>
          <p>SURYA NARAYAN DASH</p>
          <p className={styles.role}>FULL STACK AI & WEB DEVELOPER</p>
        </div>
      </div>
      
      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
        <span>SCROLL</span>
      </div>
    </section>
  );
}
