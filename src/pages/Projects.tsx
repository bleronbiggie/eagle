import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import type { ProjectCategory } from '../types/project';
import { PageMeta, PhotoNote, ProjectCard, Reveal, SectionHeading } from '../components/UI';

const filters: ('All' | ProjectCategory)[] = ['All', 'Tile', 'Painting', 'Renovations', 'Bathrooms', 'Kitchens', 'Exterior', 'Construction'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>('All');
  const visibleProjects = useMemo(() => activeFilter === 'All'
    ? projects
    : projects.filter((project) => project.category === activeFilter || project.tags.includes(activeFilter)), [activeFilter]);

  return (
    <>
      <PageMeta title="Projects | Tile, Painting & Renovations in Calgary" description="Browse illustrative tile, painting, renovation and construction photography. Replace concept imagery with completed Calgary projects as they are available." />
      <section className="page-hero page-hero-projects">
        <div className="shell page-hero-inner"><span className="eyebrow">Selected work · Calgary, Alberta</span><h1>Work speaks<br /><em>in the details.</em></h1><p>A visual portfolio structure for tile, painting, renovation and construction work. The current images are concept photography.</p><a className="page-scroll-link" href="#portfolio">Browse the gallery <span>↓</span></a></div>
        <span className="page-hero-index">Projects / 02</span>
      </section>

      <section className="section projects-page-section" id="portfolio">
        <div className="shell">
          <Reveal className="section-topline"><SectionHeading eyebrow="Portfolio" title="A closer look at the finish." description="Filter by the kind of work you’re planning." /><span className="section-side-note">{visibleProjects.length.toString().padStart(2, '0')} concept entries</span></Reveal>
          <div className="project-filter-list" role="group" aria-label="Filter projects by service">
            {filters.map((filter) => <button type="button" key={filter} className={activeFilter === filter ? 'filter-active' : ''} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}<span>{filter === 'All' ? projects.length : projects.filter((project) => project.category === filter || project.tags.includes(filter)).length.toString().padStart(2, '0')}</span></button>)}
          </div>
          <div className="project-gallery-list" aria-live="polite">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, index) => <motion.div key={project.slug} className={`portfolio-item portfolio-item-${index % 3}`} layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.24 }}><ProjectCard project={project} size={index % 3 === 0 ? 'large' : 'standard'} index={index} /></motion.div>)}
            </AnimatePresence>
          </div>
          {visibleProjects.length === 0 && <div className="empty-project-state"><span className="eyebrow">No projects in this filter yet</span><p>Check back as more work is added to the gallery.</p><button type="button" className="text-link" onClick={() => setActiveFilter('All')}>View all <ArrowUpRight size={15} /></button></div>}
          <PhotoNote>All portfolio images are illustrative concept photography, not representations of completed company work.</PhotoNote>
        </div>
      </section>
    </>
  );
}
