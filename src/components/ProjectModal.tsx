import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Github } from 'lucide-react';

export interface ProjectCardData {
  title: string;
  subtitle?: string;
  description: string;
  tag: string;
  gradient: [string, string];
  modalBullets: string[];
  modalStat: string;
  bookId: string;
  pageNumber: number;
  actionText?: string;
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectModalProps {
  card: ProjectCardData | null;
  onClose: () => void;
  onReadMore: (card: ProjectCardData) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ card, onClose, onReadMore }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSmoothClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!card) return null;

  const handleSmoothClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 150);
  };

  const handleReadMoreClick = () => {
    setIsClosing(true);
    setTimeout(() => {
      onReadMore(card);
      setIsClosing(false);
    }, 150);
  };

  const accentColor = card.gradient[0];
  const secondColor = card.gradient[1];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleSmoothClose();
      }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 select-none ${
        isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundColor: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      {/* Modal Container: 680px max-width, dark card #141311 */}
      <div
        className={`w-full max-w-[680px] max-h-[90vh] overflow-y-auto p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative transition-all duration-200 ease-out transform ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={{
          backgroundColor: '#141311',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '20px',
        }}
      >
        {/* Top bar: card tag pill + close button (× or Esc key) */}
        <div className="flex items-center justify-between gap-3 w-full">
          <span
            className="uppercase font-mono text-[9px] tracking-[0.1em] font-semibold px-2.5 py-1 rounded-full border"
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.8)',
              borderColor: 'rgba(255,255,255,0.15)',
            }}
          >
            {card.tag}
          </span>

          <button
            type="button"
            onClick={handleSmoothClose}
            aria-label="Close modal"
            className="w-8 h-8 -mr-1.5 -mt-1.5 flex items-center justify-center cursor-pointer transition-colors duration-150 rounded-full hover:bg-white/10"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title: 28px, white, font-weight: 700 */}
        <h2
          id="modal-project-title"
          className="text-[28px] font-bold text-white tracking-tight leading-snug mt-3 mb-1 font-serif sm:font-sans"
        >
          {card.title}
        </h2>

        {/* Subtitle: 15px, rgba(255,255,255,0.7) */}
        {card.subtitle && (
          <p className="text-[15px] font-sans text-white/70 leading-relaxed mb-3">
            {card.subtitle}
          </p>
        )}

        {/* Gradient accent line: 2px tall, matching card gradient */}
        <div
          className="w-full h-[2px] rounded-full my-3"
          style={{
            background: `linear-gradient(90deg, ${accentColor} 0%, ${secondColor} 100%)`,
          }}
        />

        {/* Body Bullets: ◆ marker colored with card's first gradient color */}
        <div className="space-y-3 my-4">
          {card.modalBullets.map((bullet, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 text-[14px] leading-relaxed text-white/80 font-sans"
            >
              <span
                style={{ color: accentColor }}
                className="text-[13px] select-none shrink-0 font-bold mt-0.5"
                aria-hidden="true"
              >
                ◆
              </span>
              <span>{bullet}</span>
            </div>
          ))}
        </div>

        {/* Stat Badge / Citation Line */}
        <div className="text-[12px] font-mono text-white/50 mb-5 pt-3 border-t border-white/10 flex items-center justify-between">
          <span>{card.modalStat}</span>
        </div>

        {/* Action Links & Read Full Book in Shelf Mode */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          {card.liveUrl && (
            <a
              href={card.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-[12px] font-mono font-semibold text-white/90 bg-white/10 hover:bg-white/15 border border-white/15 flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {card.githubUrl && (
            <a
              href={card.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-[12px] font-mono font-semibold text-white/90 bg-white/10 hover:bg-white/15 border border-white/15 flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Source Code</span>
              <Github className="w-3.5 h-3.5" />
            </a>
          )}

          <button
            type="button"
            onClick={handleReadMoreClick}
            className="w-full flex-1 py-2.5 px-4 text-center font-semibold text-white text-[12px] font-mono tracking-wide rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] border border-white/20"
            style={{
              backgroundColor: 'rgba(255,255,255,0.12)',
            }}
          >
            <span>Read Full Book in Shelf Mode →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
