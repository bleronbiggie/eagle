import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, MapPin, Play } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { company } from '../data/company';
import { otherServices, paintServices, primaryServices, tileServices } from '../data/services';
import { projects } from '../data/projects';
import { reviews } from '../data/reviews';
import { VideoModal, VideoPlayButton } from '../components/ProjectTools';
import { ButtonLink, HomepageBusinessSchema, PageMeta, PhotoNote, ProjectCard, Reveal, SectionHeading } from '../components/UI';
import { responsiveImageProps } from '../utils/images';

const heroImage = 'https://images.unsplash.com/photo-1722858812700-1519db101372?auto=format&fit=crop&w=2400&q=90';

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false);
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <>
      <PageMeta
        title={`${company.name} | Tile Installation, Painting & Renovations Calgary`}
        description="Professional tile installation, interior and exterior painting, renovations and construction services in Calgary, Alberta. Request a free estimate."
      />
      <HomepageBusinessSchema />

      <section className="home-hero">
        <img className="hero-photo" src={heroImage} {...responsiveImageProps(heroImage, '100vw')} alt="Illustrative contemporary bathroom with carefully finished tile" width="2400" height="1500" loading="eager" fetchPriority="high" />
        <div className="hero-shade" />
        <div className="hero-content shell">
          <div className="hero-copy">
            <span className="hero-eyebrow"><span /> Calgary construction & renovation</span>
            <h1>Built right.<br /><em>Finished beautifully.</em></h1>
            <p>Professional tile installation, painting, renovations and construction in Calgary and surrounding areas.</p>
            <div className="hero-actions">
              <ButtonLink to="/contact#estimate" variant="accent">Get a free estimate</ButtonLink>
              <Link className="hero-work-link" to="/projects">View our work <ArrowUpRight size={16} /></Link>
            </div>
          </div>
          <div className="hero-bottomline">
            <div className="hero-trust-list">
              {['Professional craftsmanship', 'Quality materials', 'Clean work', 'Free estimates'].map((item) => <span key={item}><Check size={13} />{item}</span>)}
            </div>
            <a className="hero-scroll" href="#craftsmanship"><span>Explore the work</span><ArrowDown size={15} /></a>
          </div>
        </div>
        <div className="hero-photo-caption"><span>Calgary · Residential & commercial</span><span>Concept photography</span></div>
      </section>

      <section className="section craftsmanship-section" id="craftsmanship">
        <div className="shell">
          <Reveal className="section-topline">
            <SectionHeading
              eyebrow="The details make the difference"
              title="Craftsmanship you can see."
              description="From precise tile installation to flawless paint finishes, we focus on the details that transform a space."
            />
            <span className="section-side-note">01 / What we do</span>
          </Reveal>

          <div className="primary-service-grid">
            {primaryServices.map((service, index) => {
              const Icon = service.icon;
              const image = index === 0
                ? 'https://images.unsplash.com/photo-1722858812700-1519db101372?auto=format&fit=crop&w=1800&q=85'
                : 'https://images.unsplash.com/photo-1723642612494-161a6900f559?auto=format&fit=crop&w=1800&q=85';
              const list = index === 0 ? tileServices : paintServices;
              return (
                <Reveal className={`primary-service-card primary-service-${index + 1}`} delay={index * 0.08} key={service.title}>
                  <div className="primary-card-photo"><img src={image} {...responsiveImageProps(image, '(max-width: 760px) 100vw, 48vw')} alt={index === 0 ? 'Concept image of a modern tiled shower' : 'Concept image of a finished neutral interior'} loading="lazy" width="1200" height="900" /><span className="image-index">0{index + 1}</span><span className="image-bottom-label">{index === 0 ? 'Tile, stone & detail' : 'Interior & exterior'}</span></div>
                  <div className="primary-card-body">
                    <div className="primary-card-heading"><div><span className="eyebrow">Primary specialty</span><h3>{service.title}</h3></div><Icon size={24} strokeWidth={1.4} /></div>
                    <p>{service.description}</p>
                    <div className="service-pills">{list.map((item) => <span key={item}>{item}</span>)}</div>
                    <Link className="text-link" to={service.href}>{index === 0 ? 'Explore tile services' : 'Explore painting services'} <ArrowUpRight size={15} /></Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <PhotoNote />
        </div>
      </section>

      <section className="section service-overview-section">
        <div className="shell">
          <Reveal className="section-topline">
            <SectionHeading eyebrow="From one room to the whole build" title="Complete construction services." description="A capable team for the project in front of you, with tile and painting at the heart of the finish." />
            <Link className="text-link section-top-link" to="/services">All services <ArrowUpRight size={15} /></Link>
          </Reveal>
          <div className="service-overview-grid">
            {otherServices.map((service, index) => {
              const Icon = service.icon;
              return <Reveal className="service-overview-card" key={service.title} delay={(index % 4) * 0.04}>
                <span className="service-overview-index">0{index + 1}</span>
                <Icon size={21} strokeWidth={1.5} />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to={service.href} aria-label={`Learn about ${service.title}`}><ArrowUpRight size={17} /></Link>
              </Reveal>;
            })}
          </div>
        </div>
      </section>

      <section className="section featured-work-section">
        <div className="shell">
          <Reveal className="work-heading-row">
            <SectionHeading eyebrow="Our work" title="Quality is easier to see than explain." description="Explore material, finish and space through the work gallery." />
            <ButtonLink to="/projects" variant="outline">View all projects</ButtonLink>
          </Reveal>
          <div className="editorial-project-grid">
            {featuredProjects.slice(0, 3).map((project, index) => <Reveal key={project.slug} className={`editorial-project editorial-project-${index + 1}`} delay={index * 0.08}>
              <ProjectCard project={project} size={index === 0 ? 'large' : 'standard'} index={index} />
            </Reveal>)}
          </div>
          <PhotoNote>Portfolio imagery is illustrative until company project photographs are added.</PhotoNote>
        </div>
      </section>

      <section className="video-showcase-section">
        <div className="shell video-showcase-inner">
          <Reveal className="video-showcase-copy">
            <span className="eyebrow">See the transformation</span>
            <h2>Good work has a rhythm of its own.</h2>
            <p>Project films can show the care behind the finish, from the first tile set to the final walkthrough.</p>
            <button className="video-inline-trigger" type="button" onClick={() => setVideoOpen(true)}><span className="play-outline"><Play size={15} fill="currentColor" /></span> Open the video showcase</button>
          </Reveal>
          <Reveal className="video-showcase-frame" delay={0.1}>
            <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85" {...responsiveImageProps('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85', '(max-width: 760px) 100vw, 55vw')} alt="Illustrative architectural interior ready for a project film" loading="lazy" width="1200" height="780" />
            <span className="film-stamp">Project<br />film 01</span>
            <VideoPlayButton onClick={() => setVideoOpen(true)} label="Open the project video showcase" />
            <span className="video-image-caption">A place for the process, not just the final frame.</span>
          </Reveal>
        </div>
        <AnimatePresence>{videoOpen && <VideoModal title="Project video showcase" onClose={() => setVideoOpen(false)} />}</AnimatePresence>
      </section>

      <section className="section quality-section">
        <div className="shell quality-layout">
          <Reveal className="quality-intro"><SectionHeading eyebrow="How we work" title="Built on quality." description="A dependable result comes from the care taken before, during and after the work." /><Link className="text-link" to="/about">Our approach <ArrowUpRight size={15} /></Link></Reveal>
          <div className="quality-list">
            {[
              ['01', 'Craftsmanship', 'Every detail matters, from preparation to the final finish.'],
              ['02', 'Reliability', 'Clear communication, organized work and dependable scheduling.'],
              ['03', 'Quality materials', 'We use trusted materials designed for lasting performance.'],
              ['04', 'Clean work', 'We respect your property and maintain a clean, organized workspace.'],
            ].map(([number, title, text]) => <Reveal className="quality-row" key={number}><span className="quality-number">{number}</span><h3>{title}</h3><p>{text}</p></Reveal>)}
          </div>
        </div>
      </section>

      <section className="about-preview-section">
        <div className="shell about-preview-grid">
          <Reveal className="about-preview-image"><img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1500&q=85" {...responsiveImageProps('https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1500&q=85', '(max-width: 760px) 90vw, 45vw')} alt="Illustrative kitchen interior with warm, natural finishes" loading="lazy" width="1100" height="1200" /><span className="image-frame-mark">Calgary<br />& area</span></Reveal>
          <Reveal className="about-preview-copy" delay={0.1}><span className="eyebrow">Construction done with care</span><h2>Good spaces begin with good work.</h2><p>We believe great construction is about more than completing a project. It is about precision, communication and creating work that continues to look great for years.</p><p>Tile, painting and renovation services for homes and businesses in Calgary and surrounding areas.</p><ButtonLink to="/about" variant="outline">Learn more about us</ButtonLink></Reveal>
        </div>
      </section>

      <section className="service-area-section">
        <div className="shell service-area-grid">
          <Reveal className="service-area-copy"><span className="eyebrow">Rooted close to home</span><h2>Proudly serving Calgary & surrounding areas.</h2><p>Calgary, Alberta</p><div className="area-chips">{company.serviceAreas.slice(1).map((area) => <span key={area}>{area}</span>)}</div></Reveal>
          <Reveal className="service-area-map" delay={0.12} aria-label="Abstract service area graphic centered on Calgary"><div className="map-contours"><span /><span /><span /><span /></div><div className="map-point"><span className="map-point-pulse" /><span className="map-point-dot" /></div><span className="map-city-label"><MapPin size={15} fill="currentColor" /> Calgary</span><span className="map-corner-label">Alberta · Canada</span></Reveal>
        </div>
      </section>

      <section className="section reviews-section">
        <div className="shell">
          <Reveal className="section-topline"><SectionHeading eyebrow="What our clients say" title="A place for your clients’ words." description="Add real, permissioned client feedback here when it’s ready." /><span className="section-side-note">Google Reviews ready</span></Reveal>
          <div className="review-placeholder-grid">{reviews.map((review, index) => <Reveal className="review-placeholder" key={review.id} delay={index * 0.06}><span className="review-placeholder-mark">“</span><span className="eyebrow">Verified review slot</span><p>{review.review}</p><div><strong>{review.customerName}</strong><span>{review.projectType} · {review.location}</span></div></Reveal>)}</div>
        </div>
      </section>

      <section className="closing-cta-section">
        <div className="shell closing-cta-content"><div><span className="eyebrow">Start with a conversation</span><h2>Have a project in mind?</h2><p>Tell us what you’re planning and we’ll discuss the details and a free estimate.</p></div><ButtonLink to="/contact#estimate" variant="accent">Tell us about your project</ButtonLink><span className="cta-index">Let’s make<br />it well made.</span></div>
      </section>
    </>
  );
}
