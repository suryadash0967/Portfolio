import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

import msilImg from '../../assets/msil.png';
import purfurryImg from '../../assets/purfurry.png';
import maadhyamImg from '../../assets/maadhyam.png';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    title: 'Purfurry',
    descriptor: 'DOGS, CATS & JAVASCRIPT',
    type: 'Full-Stack Platform',
    tech: 'MERN / Redis / Performance Optimization',
    date: 'Aug 2024 - May 2025',
    description: 'A React-based platform optimized for technical SEO and rapid traffic growth.',
    highlights: [
      'Engineered comprehensive SEO optimizations, catapulting rankings to Top-5 first-page positions',
      'Accelerated visibility achieving ~1.5K monthly views and converting ~90-120 new active users/month',
      'Redesigned UI flows and optimized frontend responsiveness for seamless user experience'
    ],
    color: 'transparent',
    accent: 'rgba(180, 40, 200, 0.2)',
    image: purfurryImg,
    link: 'https://www.purfurry.com',
    linkText: 'VISIT SITE'
  },
  {
    id: '02',
    title: 'MSIL AI Assistant & Analytics',
    descriptor: 'TAUGHT IT TO READ',
    type: 'Enterprise AI Application',
    tech: 'NextJS / Python / FastAPI / RAG / FAISS',
    date: 'May 2025 - July 2025',
    description: 'An internal RAG-based assistant and demand analytics dashboard for Maruti Suzuki Industry Limited.',
    highlights: [
      'Engineered a RAG-based assistant leveraging document chunking, embeddings, and vector search',
      'Developed a demand analytics dashboard to monitor forecasts and key departmental KPIs',
      'Built scalable data processing pipelines for indexing 100+ knowledge assets'
    ],
    color: 'transparent',
    accent: 'rgba(30, 169, 204, 0.2)',
    image: msilImg,
    link: 'https://github.com/suryadash0967/bp3-demands-portfolio',
    linkText: 'GITHUB'
  },
  {
    id: '03',
    title: 'Excel Analytics',
    descriptor: 'MADE EXCEL DO MORE',
    type: 'Full-Stack Web Application',
    tech: 'MERN / Chart.js / Three.js / SheetJS / JWT',
    date: 'June 2025 - July 2025',
    description: 'A 100% in-browser Excel upload and analysis tool featuring JWT-based authentication and AI insights.',
    highlights: [
      'Built 5+ interactive chart types (2D/3D)',
      'Integrated Gemini Flash LLM for automated data summaries',
      'Optimized for dark mode, exports (PNG/PDF), and dashboard history'
    ],
    color: 'transparent',
    accent: 'rgba(67, 30, 204, 0.2)',
    image: null, // We will use CSS jugaad here
    link: 'https://github.com/suryadash0967/excel-analytics',
    linkText: 'GITHUB'
  },
  {
    id: '04',
    title: 'Maadhyam',
    descriptor: 'MONEY, BUT NICER',
    type: 'Donation Platform',
    tech: 'ReactJS / TailwindCSS / MongoDB / NodeJS',
    date: 'April 2025',
    description: 'A full-stack donation platform connecting donors and recipients across 50+ live listings, built in 48 hours.',
    highlights: [
      'Architected role-based access control and real-time data sync',
      'Implemented CRUD operations, notifications, and analytics dashboards',
      'Achieved seamless multi-role user management with fully responsive UI/UX'
    ],
    color: 'transparent',
    accent: 'rgba(204, 94, 30, 0.2)',
    image: maadhyamImg,
    link: 'https://github.com/Abhinash04/Maadhyam',
    linkText: 'GITHUB'
  }
];

// CSS-based representation of Excel Analytics
const ExcelJugaad = () => (
  <div className={styles.excelJugaad}>
    <div className={styles.excelGrid}>
      {[...Array(20)].map((_, i) => (
        <div key={i} className={styles.excelCell} style={{ opacity: Math.random() * 0.5 + 0.1 }}>
          {i % 4 === 0 && <div className={styles.barChart} style={{ height: `${Math.random() * 80 + 20}%` }} />}
        </div>
      ))}
    </div>
    <div className={styles.floatingChart}>
      <svg viewBox="0 0 100 50" preserveAspectRatio="none">
        <path d="M0 40 L20 30 L40 45 L60 15 L80 25 L100 5" fill="none" stroke="var(--text-primary)" strokeWidth="2" />
        <path d="M0 40 L20 30 L40 45 L60 15 L80 25 L100 5 L100 50 L0 50 Z" fill="url(#gradient)" />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--text-primary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--text-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div className={styles.overlayText}>EXCEL ANALYTICS UI</div>
  </div>
);

export default function Projects() {
  const containerRef = useRef(null);

  useEffect(() => {
    const visuals = document.querySelectorAll(`.${styles.visual}`);
    
    visuals.forEach(visual => {
      const inner = visual.querySelector(`.${styles.imageWrapper}`);
      
      const xTo = gsap.quickTo(inner, "rotateY", { duration: 0.5, ease: "power2.out" });
      const yTo = gsap.quickTo(inner, "rotateX", { duration: 0.5, ease: "power2.out" });
      
      const handleMouseMove = (e) => {
        const rect = visual.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 2 - 1;
        const y = (e.clientY - rect.top) / rect.height * 2 - 1;
        
        xTo(x * 4); 
        yTo(y * -4); 
      };
      
      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };
      
      if (!window.matchMedia('(pointer: coarse)').matches) {
        visual.addEventListener("mousemove", handleMouseMove);
        visual.addEventListener("mouseleave", handleMouseLeave);
      }
    });

    const ctx = gsap.context(() => {
      const projectsList = gsap.utils.toArray(`.${styles.project}`);
      
      projectsList.forEach((project) => {
        const mask = project.querySelector(`.${styles.maskReveal}`);
        const content = project.querySelector(`.${styles.content}`);
        
        gsap.fromTo(mask,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: project,
              start: "top 75%",
              end: "center center",
              scrub: 0.5,
            }
          }
        );
        
        gsap.fromTo(content.children,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: project,
              start: "top 60%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className={styles.projectsSection} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>FEATURED WORK</h2>
          <p className={styles.label}>[ THINGS I'VE ACTUALLY BUILT ]</p>
        </div>
        
        <div className={styles.projectsList}>
          {projects.map((project, index) => (
            <div key={index} className={styles.project}>
              <div className={styles.visualWrapper}>
                <div 
                  className={styles.ambientGlow}
                  style={{ background: `radial-gradient(circle, ${project.accent} 0%, transparent 70%)` }}
                />
                <div className={styles.visual}>
                  <div className={styles.maskReveal}>
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.imageWrapper} 
                      style={{ backgroundColor: project.color, display: 'block', textDecoration: 'none' }}
                      data-cursor="view"
                    >
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className={styles.projectImage} 
                        />
                      ) : (
                        <ExcelJugaad />
                      )}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className={styles.content}>
                <div className={styles.meta}>
                  <span className={styles.id}>{project.id}</span>
                  <span className={styles.date}>{project.date}</span>
                </div>
                
                <h3 className={styles.title}>
                  {project.title} <span className={styles.descriptor}>// {project.descriptor}</span>
                </h3>
                <p className={styles.type}>{project.type}</p>
                <p className={styles.tech}>{project.tech}</p>
                
                <p className={styles.description}>{project.description}</p>
                
                <ul className={styles.highlights}>
                  {project.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                
                <a href={project.link} target="_blank" rel="noreferrer" className={styles.caseStudyBtn} data-cursor="magnetic">
                  {project.linkText} <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
