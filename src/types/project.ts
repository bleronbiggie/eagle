export type ProjectCategory =
  | 'Tile'
  | 'Painting'
  | 'Renovations'
  | 'Bathrooms'
  | 'Kitchens'
  | 'Exterior'
  | 'Construction';

export interface ProjectVideo {
  type: 'youtube' | 'vimeo' | 'local';
  url: string;
  thumbnail?: string;
  title?: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: ProjectCategory;
  tags: ProjectCategory[];
  location: string;
  description: string;
  coverImage: string;
  coverAlt: string;
  images: { src: string; alt: string }[];
  video?: ProjectVideo;
  beforeImage?: { src: string; alt: string };
  afterImage?: { src: string; alt: string };
  services: string[];
  featured: boolean;
  illustrative: boolean;
}
