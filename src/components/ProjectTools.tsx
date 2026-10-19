import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import type { ProjectVideo } from '../types/project';

interface ImageItem {
  src: string;
  alt: string;
}

export function BeforeAfterSlider({ before, after }: { before: ImageItem; after: ImageItem }) {
  const [position, setPosition] = useState(50);
  return (
    <div className="before-after">
      <img className="before-after-base" src={after.src} alt={after.alt} loading="lazy" />
      <div className="before-after-overlay" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={before.src} alt={before.alt} loading="lazy" />
      </div>
      <span className="ba-label ba-before">Before</span>
      <span className="ba-label ba-after">After</span>
      <div className="ba-divider" style={{ left: `${position}%` }} aria-hidden="true"><span /></div>
      <input
        className="ba-range"
        type="range"
        min="0"
        max="100"
        value={position}
        aria-label="Drag to compare before and after images"
        onChange={(event) => setPosition(Number(event.target.value))}
      />
    </div>
  );
}

export function ProjectGallery({ images, title }: { images: ImageItem[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  if (images.length === 0) return null;
  return (
    <>
      <div className="project-gallery-grid">
        {images.map((image, index) => (
          <button
            type="button"
            className={`gallery-tile gallery-tile-${index % 3}`}
            key={`${image.src}-${index}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Open image ${index + 1} of ${images.length}: ${image.alt}`}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
            <span className="gallery-open-hint">View image <span>↗</span></span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {activeIndex !== null && (
          <Lightbox
            images={images}
            title={title}
            activeIndex={activeIndex}
            onClose={() => setActiveIndex(null)}
            onChange={setActiveIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function Lightbox({
  images,
  title,
  activeIndex,
  onClose,
  onChange,
}: {
  images: ImageItem[];
  title: string;
  activeIndex: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const previous = () => onChange((activeIndex - 1 + images.length) % images.length);
  const next = () => onChange((activeIndex + 1) % images.length);

  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'ArrowRight') next();
      if (event.key === 'Tab') {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>('button');
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
      previousFocus.current?.focus();
    };
  }, [activeIndex, images.length, onClose, onChange]);

  return (
    <motion.div
      className="lightbox-backdrop"
      role="presentation"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="lightbox-dialog" role="dialog" aria-modal="true" aria-label={`${title} image gallery`} tabIndex={-1} ref={dialogRef}>
        <button className="lightbox-close" type="button" onClick={onClose} aria-label="Close image gallery"><X /></button>
        {images.length > 1 && <button className="lightbox-arrow lightbox-prev" type="button" onClick={previous} aria-label="Previous image"><ChevronLeft /></button>}
        <img
          className="lightbox-image"
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
          onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return;
            const distance = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
            if (Math.abs(distance) > 55) distance > 0 ? previous() : next();
            touchStart.current = null;
          }}
        />
        {images.length > 1 && <button className="lightbox-arrow lightbox-next" type="button" onClick={next} aria-label="Next image"><ChevronRight /></button>}
        <div className="lightbox-caption"><span>{images[activeIndex].alt}</span><span>{activeIndex + 1} / {images.length}</span></div>
      </div>
    </motion.div>
  );
}

export function VideoModal({
  video,
  title,
  onClose,
}: {
  video?: ProjectVideo;
  title: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const embedUrl = video ? getEmbedUrl(video) : null;
  return (
    <motion.div className="lightbox-backdrop video-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="video-dialog" role="dialog" aria-modal="true" aria-label={title}>
        <div className="video-dialog-top"><span>{title}</span><button ref={closeRef} type="button" className="lightbox-close" onClick={onClose} aria-label="Close video"><X /></button></div>
        {video?.type === 'local' ? (
          <video className="video-player" src={video.url} poster={video.thumbnail} controls autoPlay playsInline aria-label={video.title ?? title} />
        ) : embedUrl ? (
          <iframe className="video-player" src={embedUrl} title={video?.title ?? title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        ) : (
          <div className="video-empty-state">
            <div className="play-outline"><Play size={25} fill="currentColor" /></div>
            <span className="eyebrow">Project film slot</span>
            <h2>Let the finished work tell the story.</h2>
            <p>Add a local video, YouTube link or Vimeo link to the project data to show it here.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function getEmbedUrl(video: ProjectVideo) {
  if (video.type === 'youtube') {
    const match = video.url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    return match ? `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&rel=0` : null;
  }
  if (video.type === 'vimeo') {
    const match = video.url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return match ? `https://player.vimeo.com/video/${match[1]}?autoplay=1&title=0` : null;
  }
  return null;
}

export function VideoPlayButton({ onClick, label = 'Play project film' }: { onClick: () => void; label?: string }) {
  return <button type="button" className="video-play-button" onClick={onClick} aria-label={label}><Play size={17} fill="currentColor" /></button>;
}
