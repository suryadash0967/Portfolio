import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation logic for about section
      // In a real scenario we might use SplitText, but we'll use CSS/HTML structure
      
      gsap.fromTo(
        `.${styles.revealText} span`,
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 50%",
            scrub: true,
          }
        }
      );

      gsap.fromTo(
        statsRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.about} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.left}>
            <p className={styles.label}>[ ABOUT ]</p>
          </div>
          <div className={styles.right}>
            <div className={styles.revealText} ref={textRef}>
              <p>
                <span>I </span><span>MAKE </span><span>COMPUTERS </span><span>DO </span><span>THINGS. </span>
              </p>
              <p>
                <span className={styles.dimText}>Usually </span><span className={styles.dimText}>on </span><span className={styles.dimText}>purpose.</span>
              </p>
            </div>
            
            <div className={styles.stats} ref={statsRef}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>100+</span>
                <span className={styles.statLabel}>Users Impacted</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>Not Bad</span>
                <span className={styles.statLabel}>CGPA</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>B.Tech CSE '27</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
