import { ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { company } from '../data/company';
import { ButtonLink, PageMeta, Reveal, SectionHeading } from '../components/UI';

export default function About() {
  const stats = [
    { value: company.yearsExperience === null ? '[YEARS OF EXPERIENCE]+' : `${company.yearsExperience}+`, label: 'Years experience' },
    { value: company.projectsCompleted === null ? '[PROJECTS COMPLETED]+' : `${company.projectsCompleted}+`, label: 'Projects completed' },
    { value: '[NUMBER]', label: 'Service areas' },
  ];

  return (
    <>
      <PageMeta title="About | Calgary Construction Done with Care" description="Learn about a Calgary construction and renovation company focused on precision, communication and quality tile and painting work." />
      <section className="page-hero page-hero-about"><div className="shell page-hero-inner"><span className="eyebrow">About the company</span><h1>Construction<br /><em>done with care.</em></h1><p>Quality workmanship, attention to detail and professional execution, from a first conversation to the final clean-up.</p><ButtonLink to="/contact#estimate" variant="accent">Talk about your project</ButtonLink></div><span className="page-hero-index">About / 03</span></section>

      <section className="about-manifesto-section section" id="service-area"><div className="shell manifesto-grid"><Reveal className="manifesto-heading"><span className="eyebrow">The way we see it</span><h2>Great construction is a series of thoughtful decisions.</h2></Reveal><Reveal className="manifesto-copy" delay={0.1}><p>We believe great construction is about more than completing a project. It is about precision, communication and creating work that continues to look great for years.</p><p>We provide residential and commercial construction and renovation services in Calgary and surrounding areas, with tile installation and painting as our primary specialties.</p><Link className="text-link" to="/services">Explore our services <ArrowUpRight size={15} /></Link></Reveal></div></section>

      <section className="about-image-break"><div className="shell"><div className="about-wide-image"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=85" alt="Illustrative contemporary interior with clean architectural lines" loading="lazy" width="2200" height="1100" /><span className="image-caption-chip">Calgary · Concept image</span></div></div></section>

      <section className="section about-values-section"><div className="shell"><Reveal className="section-topline"><SectionHeading eyebrow="Our approach" title="A good finish starts before the finish." description="Preparation, care and communication shape the result at every stage." /><span className="section-side-note">Principles / 01–04</span></Reveal><div className="about-values-grid">{[
        ['01', 'Listen first', 'Understand the space, the priorities and what a successful result means to you.'],
        ['02', 'Plan the details', 'Think through preparation, materials, layout and how the work meets what is already there.'],
        ['03', 'Respect the space', 'Keep the work organized and treat the home or business with care.'],
        ['04', 'Finish with intention', 'Review the details and leave the space ready for what comes next.'],
      ].map(([index, title, copy]) => <Reveal className="about-value-card" key={index}><span>{index}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}</div></div></section>

      <section className="about-stats-section"><div className="shell about-stats-inner"><div><span className="eyebrow">Company at a glance</span><h2>Details to be completed<br />by the team.</h2></div><div className="about-stat-grid">{stats.map((stat) => <div className="about-stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></div></section>

      <section className="about-commitment-section"><div className="shell commitment-inner"><div><span className="eyebrow">Good work, clearly communicated</span><h2>Make the next step<br />a simple one.</h2><p>Tell us about the space, what needs to change and what matters most to you.</p></div><ul className="check-list">{['Tile installation', 'Interior & exterior painting', 'Residential & commercial work', 'Calgary and surrounding areas'].map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul><ButtonLink to="/contact#estimate" variant="accent">Request a free estimate</ButtonLink></div></section>
    </>
  );
}
