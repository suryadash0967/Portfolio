import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Cursor.module.css';

export default function Cursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const textRef = useRef(null);
  const [cursorState, setCursorState] = useState('default'); // 'default', 'hover', 'magnetic', 'explore', 'select'

  useEffect(() => {
    // Disable on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    // QuickSetters for performance
    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.5, ease: "power4.out" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.5, ease: "power4.out" });

    let isMagnetic = false;
    let magneticTarget = null;

    const onMouseMove = (e) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      if (isMagnetic && magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        // Calculate pull distance
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        targetX = centerX + distanceX * 0.2;
        targetY = centerY + distanceY * 0.2;
        
        // Also move the button itself slightly
        gsap.to(magneticTarget, {
          x: distanceX * 0.2,
          y: distanceY * 0.2,
          duration: 0.3,
          ease: "power2.out"
        });
      }

      xToCursor(targetX);
      yToCursor(targetY);
      xToFollower(targetX);
      yToFollower(targetY);
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const cursorType = target.getAttribute('data-cursor');
      
      if (cursorType) {
        setCursorState(cursorType);
        
        if (cursorType === 'magnetic') {
          isMagnetic = true;
          magneticTarget = target;
        }
      } else if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hover-target')
      ) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    const onMouseOut = (e) => {
      if (isMagnetic && magneticTarget) {
        gsap.to(magneticTarget, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
        isMagnetic = false;
        magneticTarget = null;
      }
      setCursorState('default');
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  let textContent = '';
  if (cursorState === 'explore') textContent = 'EXPLORE';
  if (cursorState === 'select') textContent = 'SELECT';
  if (cursorState === 'view') textContent = 'VIEW';

  return (
    <>
      <div ref={cursorRef} className={`${styles.cursor} ${styles[cursorState]}`} />
      <div ref={followerRef} className={`${styles.follower} ${styles[cursorState]}`}>
        <span ref={textRef} className={styles.text}>{textContent}</span>
      </div>
    </>
  );
}
