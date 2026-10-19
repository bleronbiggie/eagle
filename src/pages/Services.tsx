import { ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { otherServices, paintServices, primaryServices, tileServices } from '../data/services';
import { ButtonLink, PageMeta, PhotoNote, Reveal, SectionHeading } from '../components/UI';

export default function Services() {
  return (
    <>
      <PageMeta title="Construction Services Calgary | Tile, Painting & Renovations" description="Explore tile installation, interior and exterior painting, bathroom and kitchen renovations, roofing, siding and general construction in Calgary." />
      <section className="page-hero page-hero-services">
        <div className="shell page-hero-inner"><span className="eyebrow">Our services · Calgary, Alberta</span><h1>Careful work,<br /><em>from first tile to final coat.</em></h1><p>Tile installation and painting are our core specialties. We also bring the trades together for complete renovations and construction.</p><div className="page-hero-actions"><ButtonLink to="/contact#estimate" variant="accent">Request an estimate</ButtonLink><a className="page-scroll-link" href="#tile">Explore services <span>↓</span></a></div></div>
        <span className="page-hero-index">Services / 01</span>
      </section>

      <section className="section service-detail-section" id="tile">
        <div className="shell">
          <Reveal className="section-topline"><SectionHeading eyebrow="01 / Primary specialty" title="Tile installation." description="Precision layout and considered finishes for surfaces that do the work every day." /><span className="section-side-note">Residential & commercial</span></Reveal>
          <div className="service-detail-feature">
            <div className="service-detail-image"><img src="https://images.unsplash.com/photo-1722858812700-1519db101372?auto=format&fit=crop&w=1900&q=85" alt="Illustrative contemporary shower with large format tile" loading="lazy" width="1400" height="1000" /><span className="photo-placeholder-tag">Concept image</span></div>
            <div className="service-detail-copy"><span className="eyebrow">Thoughtful layout · Crisp finish</span><h3>Tile work built around the space.</h3><p>{primaryServices[0].description} We pay attention to alignment, transitions and the details that make a tiled surface feel complete.</p><ul className="check-list">{tileServices.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul><ButtonLink to="/contact#estimate" variant="dark">Discuss a tile project</ButtonLink></div>
          </div>
        </div>
      </section>

      <section className="section service-detail-section service-detail-paint" id="painting">
        <div className="shell">
          <Reveal className="section-topline"><SectionHeading eyebrow="02 / Primary specialty" title="Interior & exterior painting." description="Clean preparation, careful application and a finish that feels right in the room." /><span className="section-side-note">Residential & commercial</span></Reveal>
          <div className="service-detail-feature service-detail-reverse">
            <div className="service-detail-image"><img src="https://images.unsplash.com/photo-1723642612494-161a6900f559?auto=format&fit=crop&w=1900&q=85" alt="Illustrative bright finished interior in warm neutral colors" loading="lazy" width="1400" height="1000" /><span className="photo-placeholder-tag">Concept image</span></div>
            <div className="service-detail-copy"><span className="eyebrow">Careful prep · Smooth finish</span><h3>Paint that brings the details together.</h3><p>{primaryServices[1].description} From walls and ceilings to exterior surfaces, we plan the preparation and protect the spaces around the work.</p><ul className="check-list">{paintServices.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul><ButtonLink to="/contact#estimate" variant="dark">Discuss a painting project</ButtonLink></div>
          </div>
        </div>
      </section>

      <section className="section complete-services-section" id="renovations">
        <div className="shell">
          <Reveal className="section-topline"><SectionHeading eyebrow="One point of contact for more of the work" title="Complete construction services." description="From focused room updates to broader construction work, choose the scope that fits your project." /><span className="section-side-note">03 / Additional services</span></Reveal>
          <div className="service-overview-grid service-page-grid">
            {otherServices.map((service, index) => {
              const Icon = service.icon;
              const anchor = service.title.toLowerCase().replaceAll(' ', '-');
              const anchorId = service.title === 'Roofing' ? 'exterior' : anchor;
              return <Reveal className="service-overview-card" key={service.title} delay={(index % 4) * 0.04}>
                <div id={anchorId} className="service-card-anchor" />
                <span className="service-overview-index">0{index + 1}</span><Icon size={21} strokeWidth={1.5} /><h3>{service.title}</h3><p>{service.description}</p><Link to="/contact#estimate" aria-label={`Request an estimate for ${service.title}`}><ArrowUpRight size={17} /></Link>
              </Reveal>;
            })}
          </div>
          <div className="services-page-cta"><p>Have a project that combines several of these services?</p><ButtonLink to="/contact#estimate" variant="accent">Tell us about it</ButtonLink></div>
          <PhotoNote />
        </div>
      </section>
    </>
  );
}
