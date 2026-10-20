import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Menu,
  Phone,
  X,
  Youtube,
} from 'lucide-react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { company, hasConfiguredValue, phoneHref } from '../data/company';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(window.scrollY > 24);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const homeHero = location.pathname === '/';
  const tel = phoneHref('tel');
  const sms = phoneHref('sms');

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menuRef.current?.querySelector<HTMLElement>('a')?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
      if (event.key === 'Tab') {
        const controls = menuRef.current?.querySelectorAll<HTMLElement>('a, button');
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <header
      className={`site-header ${scrolled ? 'is-scrolled' : ''} ${homeHero && !scrolled ? 'over-hero' : ''} ${menuOpen ? 'is-menu-open' : ''}`}
    >
      <div className="header-inner shell">
        <Link className="brand" to="/" aria-label={`${company.name}, home`}>
          <span className="brand-mark" aria-hidden="true">C</span>
          <span className="brand-name">{company.name}</span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          {tel ? (
            <a className="header-phone" href={tel}>
              <Phone size={15} strokeWidth={1.7} />
              <span>{company.phoneDisplay}</span>
            </a>
          ) : (
            <span className="header-phone placeholder-phone">
              <Phone size={15} strokeWidth={1.7} />
              <span>{company.phoneDisplay}</span>
            </span>
          )}
          <Link className="button button-dark header-estimate" to="/contact#estimate">
            Get a free estimate <ArrowUpRight size={15} />
          </Link>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            className="mobile-menu"
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <nav aria-label="Mobile navigation">
              {navItems.map((item, index) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  style={{ '--item-index': index } as CSSProperties}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>0{index + 1}</span>{item.label}<ArrowUpRight size={18} />
                </NavLink>
              ))}
            </nav>
            <div className="mobile-menu-contact">
              <div>
                <span className="eyebrow">Calgary, Alberta</span>
                <p>{company.phoneDisplay}</p>
              </div>
              <div className="mobile-menu-actions">
                {tel && <a className="button button-outline" href={tel}>Call</a>}
                {sms && <a className="button button-outline" href={sms}>Text us</a>}
                <Link className="button button-accent" to="/contact#estimate" onClick={() => setMenuOpen(false)}>
                  Get a free estimate <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function SiteFooter() {
  const socials = [
    { label: 'Instagram', url: company.social.instagram, icon: Instagram },
    { label: 'Facebook', url: company.social.facebook, icon: Facebook },
    { label: 'TikTok', url: company.social.tiktok, icon: null },
    { label: 'YouTube', url: company.social.youtube, icon: Youtube },
  ].filter((social) => social.url);
  const tel = phoneHref('tel');
  const email = hasConfiguredValue(company.email);

  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand-column">
          <Link className="brand brand-footer" to="/">
            <span className="brand-mark" aria-hidden="true">C</span>
            <span className="brand-name">{company.name}</span>
          </Link>
          <p>Professional tile installation, painting, renovation and construction services in Calgary and surrounding areas.</p>
          <span className="footer-location">Calgary, Alberta <span aria-hidden="true">↗</span></span>
        </div>

        <div className="footer-links-column">
          <h2>Services</h2>
          <Link to="/services#tile">Tile installation</Link>
          <Link to="/services#painting">Interior painting</Link>
          <Link to="/services#painting">Exterior painting</Link>
          <Link to="/services#renovations">Renovations</Link>
          <Link to="/services#exterior">Roofing & siding</Link>
          <Link to="/services#general-construction">Construction</Link>
        </div>

        <div className="footer-links-column">
          <h2>Explore</h2>
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-links-column footer-contact-column">
          <h2>Contact</h2>
          {tel ? <a href={tel}>{company.phoneDisplay}</a> : <span>{company.phoneDisplay}</span>}
          {email ? <a href={`mailto:${company.email}`}>{company.email}</a> : <span>{company.email}</span>}
          <span>{company.location}</span>
          <span>{company.businessHours}</span>
          {socials.length > 0 && (
            <div className="footer-socials" aria-label="Social profiles">
              {socials.map(({ label, url, icon: Icon }) => (
                <a key={label} href={url} target="_blank" rel="noreferrer" aria-label={label}>
                  {Icon ? <Icon size={17} /> : <span className="social-word">tt</span>}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
        <span className="footer-note">Concept photography shown for presentation. Replace with completed project imagery.</span>
      </div>
    </footer>
  );
}

export function MobileContactBar() {
  const tel = phoneHref('tel');
  const sms = phoneHref('sms');
  return (
    <>
      <div className="mobile-bar-spacer" aria-hidden="true" />
      <div className="mobile-contact-bar" aria-label="Quick contact">
        {tel ? <a href={tel}><Phone size={16} /><span>Call</span></a> : <span className="bar-disabled"><Phone size={16} /><span>Call</span></span>}
        {sms ? <a href={sms}><span className="sms-mark" aria-hidden="true">↗</span><span>Text</span></a> : <span className="bar-disabled"><span className="sms-mark" aria-hidden="true">↗</span><span>Text</span></span>}
        <Link className="bar-estimate" to="/contact#estimate">Free estimate <ArrowUpRight size={15} /></Link>
      </div>
    </>
  );
}

export function SiteShell() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content"><Outlet /></main>
      <SiteFooter />
      <MobileContactBar />
    </>
  );
}
