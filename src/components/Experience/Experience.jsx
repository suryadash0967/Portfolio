import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Experience.module.css';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: 'Maruti Suzuki Industry Limited (MSIL)',
    role: 'STEP Intern',
    date: 'May 2025 - July 2025',
    tech: 'ReactJS, NextJS, NodeJS, Python, FastAPI, RAG, FAISS/ChromaDB',
    points: [
      { desc: 'Engineered an internal RAG-based assistant leveraging document chunking, embeddings, vector search, and LLM-powered responses.' },
      { desc: 'Developed a demand analytics dashboard to monitor forecasts, trends, and key departmental KPIs.' },
      { desc: 'Built scalable data processing pipelines for indexing and retrieving information from 100+ knowledge assets.' }
    ]
  },
  {
    company: 'Purfurry',
    role: 'Full-Stack Developer Intern',
    date: 'Aug 2024 - May 2025',
    tech: 'MERN / Redis Caching / Technical SEO / Performance Optimization',
    points: [
      { desc: 'Engineered comprehensive technical and on-page SEO optimizations for a ReactJS-based architecture, catapulting search rankings to consistent Top-5 first-page positions.' },
      { desc: 'Accelerated platform visibility and user acquisition, achieving a sustained run rate of ~1.5K monthly views and converting ~90-120 new active users per month.' },
      { desc: 'Redesigned key UI flows and optimized frontend responsiveness using ReactJS and data-driven performance improvements.' }
    ]
  },
  {
    company: 'Zidio Development',
    role: 'Full-Stack Developer Intern',
    date: 'June 2024 - July 2024',
    tech: 'MERN / Chart.js / Three.js / SheetJS / JWT',
    points: [
      { desc: 'Developed Excel Analytics, enabling secure Excel uploads, AI-powered insights, and 5+ interactive 2D/3D visualizations for 100+ users.' },
      { desc: 'Leveraged Gemini Flash LLM for automated semantic analysis of unstructured Excel data, generating business insights with 95% accuracy.' }
    ]
  }
];

export default function Experience() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(`.${styles.timelineItem}`);
      const dots = gsap.utils.toArray(`.${styles.timelineDot}`);
      
      // Line drawing animation
      gsap.fromTo(progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          }
        }
      );
      
      items.forEach((item, index) => {
        const dot = dots[index];
        
        // Dot glowing
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          onEnter: () => gsap.to(dot, { backgroundColor: 'var(--text-primary)', scale: 1.5, boxShadow: '0 0 15px var(--text-primary)', duration: 0.3 }),
          onLeaveBack: () => gsap.to(dot, { backgroundColor: 'var(--bg-secondary)', scale: 1, boxShadow: '0 0 0 transparent', duration: 0.3 })
        });

        // Content fade
        gsap.fromTo(item.querySelector(`.${styles.content}`),
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className={styles.experience} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>EXPERIENCE</h2>
          <p className={styles.label}>[ HOW I GOT HERE ]</p>
        </div>
        
        <div className={styles.timeline}>
          <div className={styles.timelineLine} ref={lineRef}>
            <div className={styles.timelineProgress} ref={progressRef}></div>
          </div>
          
          {experiences.map((exp, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              
              <div className={styles.content}>
                <div className={styles.meta}>
                  <h3 className={styles.role}>{exp.role}</h3>
                  <span className={styles.date}>{exp.date}</span>
                </div>
                
                <h4 className={styles.company}>{exp.company}</h4>
                <p className={styles.tech}>{exp.tech}</p>
                
                <ul className={styles.points}>
                  {exp.points.map((point, i) => (
                    <li key={i}>{point.desc}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
