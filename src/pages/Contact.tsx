import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { company, hasConfiguredValue, phoneHref } from '../data/company';
import { ContactForm } from '../components/ContactForm';
import { PageMeta, Reveal } from '../components/UI';

export default function Contact() {
  const tel = phoneHref('tel');
  const sms = phoneHref('sms');
  const emailConfigured = hasConfiguredValue(company.email);

  return (
    <>
      <PageMeta title="Free Estimate | Calgary Tile, Painting & Renovation" description="Tell us about your tile, painting, renovation or construction project in Calgary and surrounding areas to prepare a free estimate." />
      <section className="contact-page-hero"><div className="shell contact-hero-inner"><span className="eyebrow">Get in touch · Calgary, Alberta</span><h1>Have a project<br /><em>in mind?</em></h1><p>Tell us about the space and what you’re planning. We’ll discuss the details and a free estimate.</p><a className="page-scroll-link" href="#estimate">Start a request <span>↓</span></a><span className="contact-hero-index">Contact / 04</span></div></section>

      <section className="contact-main-section" id="estimate"><div className="shell contact-main-grid">
        <div className="contact-info-column"><Reveal><span className="eyebrow">Let’s talk through the work</span><h2>A clear first step.</h2><p>Share what needs attention, where the project is and how you’d like to be reached.</p></Reveal><div className="contact-details-list">
          <Reveal className="contact-detail-item"><span className="contact-detail-icon"><Phone size={18} /></span><div><span className="eyebrow">Phone</span>{tel ? <a href={tel}>{company.phoneDisplay}</a> : <span>{company.phoneDisplay}</span>}{sms && <a className="contact-small-link" href={sms}>Text us <ArrowUpRight size={13} /></a>}</div></Reveal>
          <Reveal className="contact-detail-item" delay={0.04}><span className="contact-detail-icon"><Mail size={18} /></span><div><span className="eyebrow">Email</span>{emailConfigured ? <a href={`mailto:${company.email}`}>{company.email}</a> : <span>{company.email}</span>}</div></Reveal>
          <Reveal className="contact-detail-item" delay={0.08}><span className="contact-detail-icon"><MapPin size={18} /></span><div><span className="eyebrow">Service area</span><span>{company.location}</span><Link className="contact-small-link" to="/about#service-area">Calgary & surrounding areas <ArrowUpRight size={13} /></Link></div></Reveal>
          <Reveal className="contact-detail-item" delay={0.12}><span className="contact-detail-icon"><Clock3 size={18} /></span><div><span className="eyebrow">Business hours</span><span>{company.businessHours}</span></div></Reveal>
        </div><div className="contact-availability-note"><span className="availability-dot" /> Free estimates available</div></div>

        <Reveal className="contact-form-panel" delay={0.08}><div className="contact-form-heading"><span className="eyebrow">Tell us about it</span><h2>Request a free estimate.</h2><p>Fields marked with <span>*</span> are required.</p></div><ContactForm /></Reveal>
      </div></section>

      <section className="contact-bottom-cta"><div className="shell contact-bottom-inner"><span className="eyebrow">Not ready for a form?</span><p>Save a few details and come back when the project takes shape.</p><Link to="/services">Explore services <ArrowUpRight size={15} /></Link></div></section>
    </>
  );
}
