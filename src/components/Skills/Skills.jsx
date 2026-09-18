import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Skills.module.css';

gsap.registerPlugin(ScrollTrigger);

const nodes = [
  // Frontend
  { id: 'react', label: 'React.js', cat: 'front', x: 20, y: 30, links: ['js', 'next', 'html'] },
  { id: 'next', label: 'Next.js', cat: 'front', x: 35, y: 20, links: ['react', 'node'] },
  { id: 'js', label: 'JavaScript', cat: 'front', x: 25, y: 50, links: ['react', 'node', 'html'] },
  { id: 'html', label: 'HTML/CSS', cat: 'front', x: 10, y: 45, links: ['js', 'react'] },
  
  // Backend
  { id: 'node', label: 'Node.js', cat: 'back', x: 45, y: 40, links: ['js', 'express', 'mongo', 'jwt'] },
  { id: 'express', label: 'Express.js', cat: 'back', x: 55, y: 30, links: ['node', 'mongo'] },
  { id: 'fastapi', label: 'FastAPI', cat: 'back', x: 65, y: 45, links: ['python', 'mongo', 'mysql'] },
  { id: 'jwt', label: 'JWT Auth', cat: 'back', x: 50, y: 20, links: ['node', 'express'] },
  
  // DBs
  { id: 'mongo', label: 'MongoDB', cat: 'db', x: 40, y: 65, links: ['node', 'express', 'python'] },
  { id: 'mysql', label: 'MySQL', cat: 'db', x: 55, y: 70, links: ['fastapi', 'sql'] },
  
  // Data/AI
  { id: 'python', label: 'Python', cat: 'ai', x: 75, y: 30, links: ['fastapi', 'pandas', 'ml', 'rag'] },
  { id: 'pandas', label: 'Pandas/NumPy', cat: 'ai', x: 90, y: 25, links: ['python', 'ml'] },
  { id: 'ml', label: 'Machine Learning', cat: 'ai', x: 85, y: 45, links: ['python', 'pandas', 'rag', 'llms'] },
  { id: 'rag', label: 'RAG', cat: 'ai', x: 70, y: 60, links: ['python', 'ml', 'vector', 'llms'] },
  { id: 'llms', label: 'LLMs', cat: 'ai', x: 80, y: 75, links: ['rag', 'ml'] },
  { id: 'vector', label: 'Vector DBs', cat: 'ai', x: 65, y: 80, links: ['rag'] },
  
  // Tools
  { id: 'git', label: 'Git/GitHub', cat: 'tool', x: 15, y: 75, links: ['js'] },
  { id: 'sql', label: 'SQL', cat: 'tool', x: 45, y: 85, links: ['mysql'] },
  { id: 'c', label: 'C++', cat: 'tool', x: 30, y: 80, links: [] },
  { id: 'java', label: 'Java', cat: 'tool', x: 20, y: 65, links: [] },
];

export default function Skills() {
  const containerRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nodeElements = gsap.utils.toArray(`.${styles.node}`);
      
      // Floating animation
      nodeElements.forEach((node, i) => {
        gsap.to(node, {
          y: `random(-15, 15)`,
          x: `random(-15, 15)`,
          duration: `random(3, 6)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.1
        });
      });

      // Entrance animation
      gsap.fromTo(nodeElements,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getLines = () => {
    if (!activeNode) return null;
    
    const sourceNode = nodes.find(n => n.id === activeNode);
    if (!sourceNode) return null;

    return sourceNode.links.map(targetId => {
      const targetNode = nodes.find(n => n.id === targetId);
      if (!targetNode) return null;

      return (
        <line
          key={`${sourceNode.id}-${targetNode.id}`}
          x1={`${sourceNode.x}%`}
          y1={`${sourceNode.y}%`}
          x2={`${targetNode.x}%`}
          y2={`${targetNode.y}%`}
          className={styles.svgLine}
        />
      );
    });
  };

  return (
    <section className={styles.skills} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>THINGS I TALK TO COMPUTERS IN</h2>
          <p className={styles.label}>[ LANGUAGES, FRAMEWORKS, AND SEVERAL OPEN TABS ]</p>
        </div>
        
        <div className={styles.constellationWrapper}>
          {/* SVG Layer for connecting lines */}
          <svg className={styles.svgLayer}>
            {getLines()}
          </svg>
          
          {/* Node Layer */}
          {nodes.map((node) => {
            const isActive = activeNode === node.id;
            const isConnected = activeNode && nodes.find(n => n.id === activeNode)?.links.includes(node.id);
            const isDimmed = activeNode && !isActive && !isConnected;
            
            return (
              <div
                key={node.id}
                className={`${styles.node} hover-target ${styles[node.cat]} ${isDimmed ? styles.dimmed : ''} ${isActive || isConnected ? styles.highlighted : ''}`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className={styles.dot} />
                <span className={styles.nodeLabel}>{node.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
