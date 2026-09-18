import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './OrbMotif.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function OrbMotif() {
  const orbRef = useRef(null);

  useEffect(() => {
    // Only animate on desktop for performance and layout reasons
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const ctx = gsap.context(() => {
      const orb = orbRef.current;
      
      // We create a master timeline tied to the scroll of the entire page
      // that moves the orb around
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      });
      
      // Define the path of the orb through the sections
      // Hero (starts center right) -> About (moves to left) -> Skills (center) -> Exp (left timeline) -> Projects (right) -> Contact (center)
      
      tl.to(orb, {
        top: '30vh',
        left: '10vw',
        scale: 1.5,
        backgroundColor: 'rgba(204, 94, 30, 0.8)',
        boxShadow: '0 0 40px rgba(204, 94, 30, 0.4)',
        ease: 'power1.inOut'
      }, 0.1)
      .to(orb, {
        top: '60vh',
        left: '50vw',
        scale: 0.5,
        backgroundColor: 'rgba(30, 169, 204, 0.9)',
        boxShadow: '0 0 20px rgba(30, 169, 204, 0.5)',
        ease: 'power1.inOut'
      }, 0.3)
      .to(orb, {
        top: '40vh',
        left: '20vw',
        scale: 1,
        backgroundColor: 'rgba(30, 204, 117, 0.8)',
        boxShadow: '0 0 30px rgba(30, 204, 117, 0.4)',
        ease: 'power1.inOut'
      }, 0.5)
      .to(orb, {
        top: '70vh',
        left: '80vw',
        scale: 2,
        backgroundColor: 'rgba(180, 40, 200, 0.7)',
        boxShadow: '0 0 60px rgba(180, 40, 200, 0.3)',
        ease: 'power1.inOut'
      }, 0.7)
      .to(orb, {
        top: '50vh',
        left: '50vw',
        scale: 3,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        boxShadow: '0 0 100px rgba(255, 255, 255, 0.6)',
        ease: 'power2.in'
      }, 0.9);

    }, orbRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={orbRef} className={styles.orb} />
  );
}
