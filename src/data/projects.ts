import type { Project } from '../types/project';

const bathroom =
  'https://images.unsplash.com/photo-1722858812700-1519db101372?auto=format&fit=crop&w=1800&q=85';
const brightRoom =
  'https://images.unsplash.com/photo-1723642612494-161a6900f559?auto=format&fit=crop&w=1600&q=85';
const interior =
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85';
const kitchen =
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85';
const neutralInterior =
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85';
const houseExterior =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85';

// These concept entries keep the portfolio layout usable until company photography is added.
export const projects: Project[] = [
  {
    id: 1,
    slug: 'stone-shower-concept',
    title: 'Stone shower detail',
    category: 'Tile',
    tags: ['Tile', 'Bathrooms', 'Renovations'],
    location: 'Calgary, Alberta',
    description:
      'A calm, material-led bathroom concept with large-format stone tile, a frameless shower and clean, considered transitions.',
    coverImage: bathroom,
    coverAlt: 'Illustrative contemporary bathroom with tiled walk-in shower',
    images: [
      { src: bathroom, alt: 'Illustrative marble-look tiled shower and vanity' },
      { src: interior, alt: 'Illustrative bright architectural interior' },
      { src: neutralInterior, alt: 'Illustrative warm neutral finished interior' },
    ],
    beforeImage: {
      src: brightRoom,
      alt: 'Illustrative bathroom before renovation',
    },
    afterImage: { src: bathroom, alt: 'Illustrative bathroom after renovation' },
    services: ['Tile Installation', 'Bathroom Renovation', 'Finishing'],
    featured: true,
    illustrative: true,
  },
  {
    id: 2,
    slug: 'soft-modern-living-concept',
    title: 'Soft modern interior',
    category: 'Painting',
    tags: ['Painting', 'Renovations'],
    location: 'Calgary, Alberta',
    description:
      'A light, quiet interior concept that pairs fresh paint with natural materials and a clear, open layout.',
    coverImage: brightRoom,
    coverAlt: 'Illustrative airy living room in a warm neutral palette',
    images: [
      { src: brightRoom, alt: 'Illustrative neutral living room with natural light' },
      { src: interior, alt: 'Illustrative modern interior with warm finishes' },
      { src: kitchen, alt: 'Illustrative kitchen connected to a finished living space' },
    ],
    beforeImage: {
      src: neutralInterior,
      alt: 'Illustrative room before a fresh paint finish',
    },
    afterImage: { src: brightRoom, alt: 'Illustrative room after a fresh paint finish' },
    services: ['Interior Painting', 'Walls & Ceilings', 'Trim & Doors'],
    featured: true,
    illustrative: true,
  },
  {
    id: 3,
    slug: 'warm-kitchen-concept',
    title: 'Warm kitchen renovation',
    category: 'Kitchens',
    tags: ['Kitchens', 'Tile', 'Renovations'],
    location: 'Calgary, Alberta',
    description:
      'A kitchen concept with understated cabinetry, layered natural tones and a durable tile finish.',
    coverImage: kitchen,
    coverAlt: 'Illustrative modern kitchen with warm neutral finishes',
    images: [
      { src: kitchen, alt: 'Illustrative contemporary kitchen' },
      { src: interior, alt: 'Illustrative kitchen and dining area' },
    ],
    services: ['Kitchen Renovation', 'Tile Installation', 'Painting'],
    featured: true,
    illustrative: true,
  },
  {
    id: 4,
    slug: 'calm-bathroom-concept',
    title: 'Calm bathroom finishes',
    category: 'Bathrooms',
    tags: ['Bathrooms', 'Tile', 'Renovations'],
    location: 'Calgary, Alberta',
    description:
      'An illustrative bathroom direction centered on clean grout lines, simple fixtures and durable surfaces.',
    coverImage: neutralInterior,
    coverAlt: 'Illustrative bathroom with restrained, modern finishes',
    images: [
      { src: neutralInterior, alt: 'Illustrative warm bathroom detail' },
      { src: bathroom, alt: 'Illustrative tiled shower detail' },
    ],
    services: ['Bathroom Renovation', 'Tile Installation', 'Painting'],
    featured: false,
    illustrative: true,
  },
  {
    id: 5,
    slug: 'exterior-refresh-concept',
    title: 'Exterior refresh',
    category: 'Exterior',
    tags: ['Exterior', 'Painting', 'Construction'],
    location: 'Calgary, Alberta',
    description:
      'A simple exterior concept showing how a considered paint palette can bring a home together.',
    coverImage: houseExterior,
    coverAlt: 'Illustrative contemporary home exterior in a neutral palette',
    images: [{ src: houseExterior, alt: 'Illustrative finished home exterior' }],
    services: ['Exterior Painting', 'Siding', 'General Construction'],
    featured: false,
    illustrative: true,
  },
  {
    id: 6,
    slug: 'open-interior-concept',
    title: 'Open interior finish',
    category: 'Construction',
    tags: ['Construction', 'Renovations', 'Painting'],
    location: 'Calgary, Alberta',
    description:
      'An architectural interior concept with natural light, crisp paintwork and a warm material palette.',
    coverImage: interior,
    coverAlt: 'Illustrative modern open-plan interior',
    images: [
      { src: interior, alt: 'Illustrative open-plan interior' },
      { src: brightRoom, alt: 'Illustrative living area detail' },
    ],
    services: ['General Construction', 'Interior Painting', 'Finishing'],
    featured: false,
    illustrative: true,
  },
];
