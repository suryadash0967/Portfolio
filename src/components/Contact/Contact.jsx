import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, FileText } from 'lucide-react';

const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.18-.34 6.52-1.65 6.52-7.07a4.9 4.9 0 0 0-1.33-3.41 4.7 4.7 0 0 0-.12-3.36s-1.1-.35-3.6 1.34a12.8 12.8 0 0 0-6.6 0C6.2 1.5 5.1 1.85 5.1 1.85a4.7 4.7 0 0 0-.12 3.36 4.9 4.9 0 0 0-1.33 3.41c0 5.4 3.3 6.7 6.5 7.07a4.8 4.8 0 0 0-1 3.03V22"></path>
    <path d="M9 20c-5 1.5-5-2.5-7-3"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

// Just import the resume pdf
import resumePdf from '../../assets/SURYA_RESUME.pdf';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const climaxLightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = containerRef.current.querySelector(`.${styles.heading}`);
      const links = containerRef.current.querySelectorAll(`.${styles.socialLink}`);
      
      // Climax ambient light converging
      gsap.fromTo(climaxLightRef.current,
        { scale: 3, opacity: 0 },
        {
          scale: 1, opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1,
          }
        }
      );
      
      gsap.fromTo(heading,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
      
      gsap.fromTo(links,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className={styles.contact} ref={containerRef}>
      <div className={styles.climaxLight} ref={climaxLightRef} />
      
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.label}>[ SAY HI ]</p>
          <h2 className={styles.heading}>
            HAVE SOMETHING<br />WORTH BUILDING?
          </h2>
          <p className={styles.subtext}>I probably have a tab open for it.</p>
          
          <div className={styles.links}>
            <a href="mailto:surya.dash0967@gmail.com" className={styles.socialLink} data-cursor="magnetic">
              <Mail size={24} />
              <span>EMAIL</span>
            </a>
            <a href="https://github.com/suryadash0967" target="_blank" rel="noreferrer" className={styles.socialLink} data-cursor="magnetic">
              <GithubIcon size={24} />
              <span>GITHUB</span>
            </a>
            <a href="https://linkedin.com/in/surya-narayan-dash-4b396b291" target="_blank" rel="noreferrer" className={styles.socialLink} data-cursor="magnetic">
              <LinkedinIcon size={24} />
              <span>LINKEDIN</span>
            </a>
            <a href={resumePdf} target="_blank" rel="noreferrer" className={`${styles.socialLink} ${styles.resumeBtn}`} data-cursor="magnetic">
              <FileText size={24} />
              <span>VIEW RESUME</span>
            </a>
          </div>
        </div>
        
        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} SURYA NARAYAN DASH. ALL RIGHTS RESERVED.</p>
          <p className={styles.statusLabel}>SYSTEM / ONLINE</p>
        </div>
      </div>
    </footer>
  );
}
