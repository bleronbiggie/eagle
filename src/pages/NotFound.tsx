import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/UI';

export default function NotFound() {
  return (
    <>
      <PageMeta title="Page not found | Calgary Construction & Renovation" description="The page you are looking for could not be found." />
      <div className="not-found-page"><div className="not-found-mark">404</div><span className="eyebrow">Page not found</span><h1>This page is<br /><em>out of place.</em></h1><p>The link may have changed, or the page may no longer be here.</p><div className="not-found-actions"><Link className="button button-dark" to="/"><ArrowLeft size={15} /> Return home</Link><Link className="text-link" to="/contact">Get in touch <ArrowUpRight size={15} /></Link></div></div>
    </>
  );
}
