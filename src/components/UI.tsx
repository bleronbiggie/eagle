import { useEffect, type ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { applyPageMeta, getBusinessSchema } from '../utils/seo';
import { projects } from '../data/projects';
import type { Project } from '../types/project';
import { responsiveImageProps } from '../utils/images';

export function PageMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => applyPageMeta(title, description), [title, description]);
  return null;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-heading ${light ? 'heading-light' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ButtonLink({
  to,
  children,
  variant = 'dark',
  className = '',
}: {
  to: string;
  children: ReactNode;
  variant?: 'dark' | 'light' | 'accent' | 'outline';
  className?: string;
}) {
  return <Link className={`button button-${variant} ${className}`} to={to}>{children}<ArrowUpRight size={16} /></Link>;
}

export function ProjectCard({ project, size = 'standard', index = 0 }: { project: Project; size?: 'standard' | 'large' | 'compact'; index?: number }) {
  return (
    <Link to={`/projects/${project.slug}`} className={`project-card project-card-${size}`}>
      <div className="project-card-image">
        <img src={project.coverImage} {...responsiveImageProps(project.coverImage, '(max-width: 760px) 92vw, (max-width: 1100px) 45vw, 42vw')} alt={project.coverAlt} loading="lazy" width="1200" height="900" />
        <span className="project-card-arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
        {project.illustrative && <span className="photo-placeholder-tag">Concept image</span>}
      </div>
      <div className="project-card-caption">
        <div><span className="project-category">{project.category} <span>·</span> {project.location}</span><h3>{project.title}</h3></div>
        <span className="project-card-index">0{index + 1}</span>
      </div>
    </Link>
  );
}

export function PhotoNote({ children = 'Concept photography shown. Replace with company project photography.' }: { children?: string }) {
  return <p className="photo-note">{children}</p>;
}

export function HomepageBusinessSchema() {
  const schema = JSON.stringify(getBusinessSchema());
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />;
}

export function FeaturedProjectPair() {
  const featured = projects.filter((project) => project.featured).slice(0, 2);
  return <div className="featured-project-pair">{featured.map((project, index) => <ProjectCard key={project.slug} project={project} size={index === 0 ? 'large' : 'standard'} index={index} />)}</div>;
}
