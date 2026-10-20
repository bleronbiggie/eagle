import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta, Reveal, SectionHeading } from '../components/UI';

type JobsiteCategory = 'Tile' | 'Renovation' | 'Painting';

const categories = ['All sites', 'Tile', 'Renovation', 'Painting'] as const;

const jobsitePhotos: {
  title: string;
  category: JobsiteCategory;
  service: string;
  stage: string;
  description: string;
  image: string;
  alt: string;
}[] = [
  {
    title: 'Shower wall tile setting',
    category: 'Tile',
    service: 'Bathroom tile',
    stage: 'Installation',
    description: 'Large-format porcelain tile being aligned with spacers and a level during installation.',
    image: '/images/jobsites/bathroom-tile-install.webp',
    alt: 'Tile installer setting large porcelain tiles on an unfinished shower wall',
  },
  {
    title: 'Kitchen backsplash prep',
    category: 'Renovation',
    service: 'Kitchen renovation',
    stage: 'In progress',
    description: 'Cabinet and countertop surfaces protected while the backsplash is prepared for tile.',
    image: '/images/jobsites/kitchen-renovation.webp',
    alt: 'Kitchen renovation underway with protected counters and backsplash wall prepared for tile',
  },
  {
    title: 'Careful wall preparation',
    category: 'Painting',
    service: 'Interior painting',
    stage: 'Preparation',
    description: 'Trim and furniture protected while the wall is sanded and prepared for a smooth finish.',
    image: '/images/jobsites/interior-paint-prep.webp',
    alt: 'Painter preparing a residential wall with protected furniture, drop cloths and masking tape',
  },
  {
    title: 'Entry floor tile layout',
    category: 'Tile',
    service: 'Floor tile',
    stage: 'Installation',
    description: 'Porcelain floor tiles set with even spacing and leveling clips through a residential entry.',
    image: '/images/jobsites/entry-floor-tiling.webp',
    alt: 'Close view of porcelain entry floor tiles being installed with leveling clips',
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All sites');
  const visiblePhotos = useMemo(() => activeCategory === 'All sites'
    ? jobsitePhotos
    : jobsitePhotos.filter((photo) => photo.category === activeCategory), [activeCategory]);

  return (
    <>
      <PageMeta
        title="Jobsite Pictures | Calgary Craft & Renovation"
        description="See illustrative jobsite photos of tile installation, kitchen renovation and painting preparation in Calgary homes."
      />
      <section className="page-hero page-hero-gallery">
        <div className="shell page-hero-inner">
          <span className="eyebrow">Inside the work · Calgary, Alberta</span>
          <h1>Jobsite<br /><em>pictures.</em></h1>
          <p>A closer look at the preparation, materials and careful work behind a finished space. These sample images will make room for your own jobsite photos.</p>
          <a className="page-scroll-link" href="#jobsite-gallery">Explore jobsite pictures <span>↓</span></a>
        </div>
        <span className="page-hero-index">Gallery / 05</span>
      </section>

      <section className="section jobsites-section" id="jobsite-gallery">
        <div className="shell">
          <Reveal className="section-topline">
            <SectionHeading
              eyebrow="Site journal"
              title="The work behind the finish."
              description="From setting tile to preparing a room for paint, every finished space begins with careful work on site."
            />
            <span className="section-side-note">{visiblePhotos.length.toString().padStart(2, '0')} sample photos</span>
          </Reveal>

          <div className="jobsite-filter-list" role="group" aria-label="Filter jobsite photos">
            {categories.map((category) => {
              const count = category === 'All sites'
                ? jobsitePhotos.length
                : jobsitePhotos.filter((photo) => photo.category === category).length;
              return (
                <button
                  type="button"
                  key={category}
                  className={activeCategory === category ? 'filter-active' : ''}
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}<span>{count.toString().padStart(2, '0')}</span>
                </button>
              );
            })}
          </div>

          <div className="jobsite-gallery-grid" aria-live="polite">
            <AnimatePresence mode="popLayout">
              {visiblePhotos.map((photo, index) => (
                <motion.article
                  className={`jobsite-card jobsite-card-${index % 4}`}
                  key={photo.title}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.24 }}
                >
                  <div className="jobsite-photo-frame">
                    <img src={photo.image} alt={photo.alt} loading="lazy" decoding="async" width="1536" height="1024" />
                    <span className="jobsite-sample-label">Sample image</span>
                    <span className="jobsite-photo-index">{String(index + 1).padStart(2, '0')} / {String(visiblePhotos.length).padStart(2, '0')}</span>
                  </div>
                  <div className="jobsite-card-heading">
                    <div>
                      <span className="jobsite-category">{photo.service} <span>·</span> {photo.stage}</span>
                      <h3>{photo.title}</h3>
                    </div>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </div>
                  <p>{photo.description}</p>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          <p className="photo-note">These are illustrative AI-generated sample images, not photographs of completed company jobsites. Replace them with your own site photos when available.</p>
        </div>
      </section>

      <section className="jobsite-cta-section">
        <div className="shell jobsite-cta-inner">
          <div><span className="eyebrow">Have a project in mind?</span><h2>Let’s talk about what you’re planning.</h2></div>
          <Link className="button button-accent" to="/contact#estimate">Request a free estimate <ArrowUpRight size={16} /></Link>
        </div>
      </section>
    </>
  );
}
