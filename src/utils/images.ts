import type { ImgHTMLAttributes } from 'react';

type ResponsiveImageAttributes = Pick<ImgHTMLAttributes<HTMLImageElement>, 'srcSet' | 'sizes'>;

/** Provide appropriately sized Unsplash sources for different screen widths and pixel densities. */
export function responsiveImageProps(src: string, sizes = '100vw'): ResponsiveImageAttributes {
  try {
    const source = new URL(src);
    if (source.hostname !== 'images.unsplash.com') return {};

    const sourceWidth = Number(source.searchParams.get('w')) || 1800;
    const widths = [...new Set([480, 768, 1024, 1440, 1920, sourceWidth].filter((width) => width <= sourceWidth))]
      .sort((a, b) => a - b);
    const srcSet = widths.map((width) => {
      const candidate = new URL(source);
      candidate.searchParams.set('w', String(width));
      candidate.searchParams.set('q', width <= 768 ? '78' : '82');
      return `${candidate.toString()} ${width}w`;
    }).join(', ');

    return { srcSet, sizes };
  } catch {
    return {};
  }
}

/** Make a smaller Unsplash URL for decorative backgrounds that do not support srcSet. */
export function resizedImageUrl(src: string, width: number): string {
  try {
    const source = new URL(src);
    if (source.hostname !== 'images.unsplash.com') return src;
    const originalWidth = Number(source.searchParams.get('w')) || width;
    source.searchParams.set('w', String(Math.min(width, originalWidth)));
    source.searchParams.set('q', '78');
    return source.toString();
  } catch {
    return src;
  }
}
