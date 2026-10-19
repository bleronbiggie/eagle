import {
  Bath,
  Brush,
  Building2,
  ChefHat,
  House,
  Layers3,
  Paintbrush,
  PanelsTopLeft,
  type LucideIcon,
} from 'lucide-react';

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export const primaryServices: ServiceItem[] = [
  {
    title: 'Tile installation',
    description:
      'Precision tile installation designed for beautiful, durable and professionally finished spaces.',
    icon: Layers3,
    href: '/services#tile',
  },
  {
    title: 'Interior & exterior painting',
    description:
      'Professional painting with careful preparation, clean execution and smooth, long-lasting finishes.',
    icon: Paintbrush,
    href: '/services#painting',
  },
];

export const otherServices: ServiceItem[] = [
  {
    title: 'Home renovations',
    description:
      'Complete renovations designed to improve the comfort, function and appearance of your home.',
    icon: House,
    href: '/services#renovations',
  },
  {
    title: 'Bathroom renovations',
    description:
      'Complete bathroom transformations including tile, painting, fixtures and finishing.',
    icon: Bath,
    href: '/services#bathroom-renovations',
  },
  {
    title: 'Kitchen renovations',
    description: 'Modern kitchen upgrades and complete remodeling.',
    icon: ChefHat,
    href: '/services#kitchen-renovations',
  },
  {
    title: 'Basement renovations',
    description:
      'Transform unfinished or outdated basements into comfortable, functional spaces.',
    icon: PanelsTopLeft,
    href: '/services#basement-renovations',
  },
  {
    title: 'New construction',
    description: 'Construction projects managed from the ground up.',
    icon: Building2,
    href: '/services#new-construction',
  },
  {
    title: 'Roofing',
    description: 'Professional roof installation, replacement and repair.',
    icon: House,
    href: '/services#exterior',
  },
  {
    title: 'Siding',
    description: 'Durable exterior siding installation and replacement.',
    icon: Brush,
    href: '/services#siding',
  },
  {
    title: 'General construction',
    description:
      'Reliable construction solutions for residential and commercial projects.',
    icon: Building2,
    href: '/services#general-construction',
  },
];

export const paintServices = [
  'Interior painting',
  'Exterior painting',
  'Walls & ceilings',
  'Trim & doors',
  'Residential painting',
  'Commercial painting',
];

export const tileServices = [
  'Bathroom tile',
  'Shower tile',
  'Floor tile',
  'Kitchen backsplashes',
  'Large format tile',
  'Custom tile work',
  'Feature walls',
];

export const estimateServiceOptions = [
  'Tile Installation',
  'Interior Painting',
  'Exterior Painting',
  'Home Renovation',
  'Bathroom Renovation',
  'Kitchen Renovation',
  'Basement Renovation',
  'New Construction',
  'Roofing',
  'Siding',
  'Other',
];
