import { useEffect, useRef, useState } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen]     = useState(false);
  const navRef                          = useRef(null);

  /* ── Close mobile menu on outside click ───────────────────────────────── */
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={styles.navbar}
      aria-label="Site navigation"
    >
      {/* Logo */}
      <span className={styles.logo}>SD.</span>

      {/* Desktop nav */}
      <ul className={styles.navLinks}>
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a href={href} onClick={(e) => handleNavClick(e, href)}>
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* Hire Me CTA (desktop) */}
      <a
        href="#contact"
        className={styles.hireCta}
        onClick={(e) => handleNavClick(e, '#contact')}
      >
        Hire Me
      </a>

      {/* Hamburger (mobile) */}
      <button
        className={styles.hamburger}
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile dropdown */}
      <ul className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a href={href} onClick={(e) => handleNavClick(e, href)}>
              {label}
            </a>
          </li>
        ))}
        <li>
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>
            Hire Me
          </a>
        </li>
      </ul>
    </nav>
  );
}
