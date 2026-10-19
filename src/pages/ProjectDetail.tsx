import { useMemo, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowUpRight, MapPin } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { BeforeAfterSlider, ProjectGallery, VideoModal, VideoPlayButton } from '../components/ProjectTools';
import { ButtonLink, PageMeta, PhotoNote, ProjectCard, Reveal } from '../components/UI';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  const [videoOpen, setVideoOpen] = useState(false);
  const nextProject = useMemo(() => {
    const index = projects.findIndex((item) => item.slug === slug);
    return projects[(index + 1) % projects.length];
  }, [slug]);

  if (!project) return <Navigate to="/404" replace />;

  return (
    <>
      <PageMeta title={`${project.title} | Calgary Project Gallery`} description={`${project.description} Illustrative concept photography from a Calgary construction and renovation portfolio.`} />
      <article className="project-detail-page">
        <section className="project-detail-hero">
          <img src={project.coverImage} alt={project.coverAlt} width="2200" height="1450" loading="eager" />
          <div className="detail-hero-shade" />
          <div className="shell detail-hero-content"><Link className="back-to-projects" to="/projects"><ArrowLeft size={15} /> All projects</Link><div><span className="eyebrow">{project.category} · {project.location}</span><h1>{project.title}</h1><span className="illustrative-banner">Concept photography · Replace with a completed company project</span></div></div>
        </section>

        <section className="detail-intro-section section">
          <div className="shell detail-intro-grid">
            <Reveal className="detail-description"><span className="eyebrow">Project overview</span><h2>Care in every transition.</h2><p>{project.description}</p><span className="detail-location"><MapPin size={15} />{project.location}</span></Reveal>
            <Reveal className="detail-services" delay={0.08}><span className="eyebrow">Services performed</span><div>{project.services.map((service) => <span key={service}>{service}<ArrowUpRight size={13} /></span>)}</div></Reveal>
          </div>
        </section>

        <section className="detail-gallery-section section">
          <div className="shell"><Reveal className="section-topline"><div><span className="eyebrow">The gallery</span><h2>Materials, light & finish.</h2></div><span className="section-side-note">Click an image to view full size</span></Reveal><ProjectGallery images={project.images} title={project.title} /><PhotoNote>Illustrative images are included to demonstrate the portfolio layout.</PhotoNote></div>
        </section>

        {project.beforeImage && project.afterImage && <section className="before-after-section section"><div className="shell before-after-layout"><Reveal><span className="eyebrow">Before / after</span><h2>See the change<br />for yourself.</h2><p>Drag the handle to compare the two concept images.</p></Reveal><Reveal className="detail-before-after" delay={0.1}><BeforeAfterSlider before={project.beforeImage} after={project.afterImage} /></Reveal></div></section>}

        <section className="project-film-section"><div className="shell project-film-content"><div><span className="eyebrow">Behind the finish</span><h2>See how the work comes together.</h2><p>Add project footage when a video is available.</p></div><div className="project-film-preview" style={{ backgroundImage: `url(${project.coverImage})` }}><span>{project.title}</span><VideoPlayButton onClick={() => setVideoOpen(true)} label={`Play ${project.title} project video`} /></div></div></section>
        <AnimatePresence>{videoOpen && <VideoModal video={project.video} title={project.title} onClose={() => setVideoOpen(false)} />}</AnimatePresence>

        <section className="next-project-section"><div className="shell next-project-inner"><Link to="/projects" className="text-link"><ArrowLeft size={15} /> Back to projects</Link><Link className="next-project-link" to={`/projects/${nextProject.slug}`}><span className="eyebrow">Next project</span><strong>{nextProject.title}</strong><ArrowUpRight size={18} /></Link></div></section>
        <section className="section related-project-section"><div className="shell"><Reveal className="section-topline"><div><span className="eyebrow">Continue exploring</span><h2>More from the gallery.</h2></div><ButtonLink to="/projects" variant="outline">All projects</ButtonLink></Reveal><div className="related-project-grid">{projects.filter((item) => item.slug !== project.slug).slice(0, 2).map((item, index) => <ProjectCard key={item.slug} project={item} size="standard" index={index} />)}</div></div></section>
      </article>
    </>
  );
}
