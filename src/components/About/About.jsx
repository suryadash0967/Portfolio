import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  
  const statsRef = useRef(null);
  const numberRef = useRef(null);
  const cpaRef = useRef(null);
  
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // We create a timeline pinned to the scroll progress of the container
    const ctx = gsap.context(() => {
      // 1. Entrance Animations (when section enters view)
      gsap.fromTo(line1Ref.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: triggerRef.current, start: "top 70%" } }
      );
      
      gsap.fromTo(line2Ref.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2, scrollTrigger: { trigger: triggerRef.current, start: "top 70%" } }
      );

      // 2. Scroll Storytelling (pinning and stats)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 20%",
          end: "+=100%", // Scroll distance
          scrub: 1,
          pin: true,
        }
      });

      tl.fromTo(statsRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1.5 });

      // 3. Stats Animation Trigger (when stats actually become visible)
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 80%",
        onEnter: () => {
          // Counter animation for 100+
          const counter = { val: 0 };
          gsap.to(counter, {
            val: 3000,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              if (numberRef.current) {
                numberRef.current.innerText = `${Math.floor(counter.val)}+`;
              }
            }
          });
          
          // "Not Bad" word reveal
          if (cpaRef.current) {
            const words = cpaRef.current.querySelectorAll('span');
            gsap.fromTo(words, 
              { opacity: 0, y: 10 }, 
              { opacity: 1, y: 0, stagger: 0.2, duration: 0.5, ease: "back.out" }
            );
          }
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className={styles.about} ref={containerRef}>
      <div className={styles.triggerArea} ref={triggerRef}>
        <div className={styles.container}>
          
          <div className={styles.editorialGrid}>
            <div className={styles.labelSection}>
              <p className={styles.label}>[ ABOUT ]</p>
              <div className={styles.decorativeLine} />
            </div>
            
            <div className={styles.statementArea}>
              <h2 className={styles.primaryStatement} ref={line1Ref}>
                I MAKE COMPUTERS DO <br/>
                <span className={styles.emphasis}>THINGS.</span>
              </h2>
              
              <div className={styles.statementContainer}>
                <p 
                  className={`${styles.secondaryStatement} ${isHovered ? styles.hovered : ''}`} 
                  ref={line2Ref}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className={styles.baseText}>Usually on purpose {';)'}</span>
                </p>
              </div>
            </div>

            <div className={styles.statsArea} ref={statsRef}>
              <div className={styles.statGroup}>
                <h3 className={styles.statNumber} ref={numberRef}>0+</h3>
                <p className={styles.statLabel}>USERS IMPACTED</p>
              </div>
              
              <div className={styles.statGroup}>
                <h3 className={styles.statText} ref={cpaRef}>
                  <span>NOT</span> <span>BAD</span>
                </h3>
                <p className={styles.statLabel}>CGPA</p>
              </div>

              <div className={styles.statGroup}>
                <h3 className={styles.statNumber}>20 YEARS OLD</h3>
                <p className={styles.statLabel}>TOO YOUNG? TWSS.</p>
              </div>
              
              <div className={styles.statGroup}>
                <h3 className={styles.statSubtle}>B.TECH CSE '27</h3>
                <p className={styles.statLabel}>STILL LEARNING</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
