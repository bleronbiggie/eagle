import { company } from '../data/company';

export function applyPageMeta(title: string, description: string) {
  document.title = title;
  setMeta('name', 'description', description);
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', `${company.siteUrl}${window.location.pathname}`);

  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.append(canonical);
  }
  canonical.href = `${company.siteUrl}${window.location.pathname}`;
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.content = content;
}

export function getBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'GeneralContractor'],
    name: company.name,
    url: company.siteUrl,
    description:
      'Professional tile installation, painting, renovation and construction services in Calgary, Alberta.',
    areaServed: {
      '@type': 'City',
      name: 'Calgary',
    },
    knowsAbout: [
      'Tile installation',
      'Interior painting',
      'Exterior painting',
      'Residential renovation',
      'Construction',
    ],
  };
}
