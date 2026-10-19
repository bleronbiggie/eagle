export interface ReviewPlaceholder {
  id: number;
  customerName: string;
  projectType: string;
  location?: string;
  review: string;
  isPlaceholder: true;
}

export const reviews: ReviewPlaceholder[] = [
  {
    id: 1,
    customerName: '[CLIENT NAME]',
    projectType: '[PROJECT TYPE]',
    location: 'Calgary, Alberta',
    review: '[Add a verified client review here.]',
    isPlaceholder: true,
  },
  {
    id: 2,
    customerName: '[CLIENT NAME]',
    projectType: '[PROJECT TYPE]',
    location: 'Calgary, Alberta',
    review: '[Add a verified client review here.]',
    isPlaceholder: true,
  },
  {
    id: 3,
    customerName: '[CLIENT NAME]',
    projectType: '[PROJECT TYPE]',
    location: 'Calgary, Alberta',
    review: '[Add a verified client review here.]',
    isPlaceholder: true,
  },
];
