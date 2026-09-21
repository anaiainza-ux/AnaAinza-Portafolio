import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export interface ProjectCardData {
  title: string;
  description: string;
  tag: string;
  gradient: [string, string];
  modalBullets: string[];
  modalStat: string;
  bookId: string;
  pageNumber: number;
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleSmoothClose();
      }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${
        isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundColor: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* Modal Card */}
      <div
        className={`w-[90vw] max-w-[480px] max-h-[90vh] overflow-y-auto p-6 sm:p-7 flex flex-col justify-between shadow-2xl relative select-none transition-all duration-200 ease-out transform ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={{
          backgroundColor: 'rgba(18,18,18,0.95)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
        }}
      >
        {/* Header: Tag Pill + Close Button */}
        <div className="flex items-center justify-between gap-3 w-full">
          <span
            className="uppercase font-mono text-[10px] tracking-wider font-semibold px-2.5 py-1 rounded-full border border-white/10"
            style={{
              backgroundColor: 'rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            {card.tag}
          </span>

          <button
            type="button"
            onClick={handleSmoothClose}
            aria-label="Close modal"
            className="w-8 h-8 -mr-1.5 -mt-1.5 flex items-center justify-center cursor-pointer transition-colors duration-150 rounded-full"
            style={{ color: 'rgba(255,255,255,0.4)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <h2
          id="modal-project-title"
          className="text-[26px] font-bold text-white tracking-tight leading-snug mt-4 mb-4"
        >
          {card.title}
        </h2>

        {/* 3-4 Bullet Points with Diamond marker in accent color */}
        <div className="space-y-3 mb-5">
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

        {/* Modal Stat Line (acts as citation) */}
        <div className="text-[12px] italic text-white/45 mb-6 pt-3 border-t border-white/5 font-sans">
          {card.modalStat}
        </div>

        {/* Read More Button */}
        <button
          type="button"
          onClick={handleReadMoreClick}
          className="w-full py-3 px-4 text-center font-semibold text-white shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-[0.99]"
          style={{
            backgroundColor: accentColor,
            borderRadius: '8px',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
          }}
        >
          <span>Read More →</span>
        </button>
      </div>
    </div>
  );
};
