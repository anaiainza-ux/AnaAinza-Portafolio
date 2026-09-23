import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

interface DeskPhotoFrameProps {
  className?: string;
}

export const DeskPhotoFrame: React.FC<DeskPhotoFrameProps> = ({ className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* ── Photo Frame Sitting on the Shelf ── */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Framed photo of Ana Ainza"
        onClick={() => setIsModalOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative shrink-0 select-none cursor-pointer group pb-0 mr-1 sm:mr-2 flex flex-col items-center justify-end ${className}`}
        style={{
          // Frame dimensions proportioned to sit beside the books on the shelf
          width: '92px',
          height: '142px',
          transform: isHovered ? 'translateY(-6px) rotate(-1.5deg)' : 'translateY(0) rotate(-2.5deg)',
          transformOrigin: 'bottom center',
          transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), filter 0.28s ease',
          filter: isHovered ? 'drop-shadow(0 12px 18px rgba(0,0,0,0.28))' : 'drop-shadow(0 6px 10px rgba(0,0,0,0.22))',
        }}
        title="Ana Ainza — Click to view photo"
      >
        {/* Easel Stand Shadow cast onto the wooden shelf behind the frame */}
        <div
          className="absolute -bottom-1 left-3 right-3 h-2.5 bg-black/35 blur-[2.5px] rounded-full pointer-events-none"
          style={{
            transform: 'rotate(2deg) scaleX(0.95)',
          }}
        />

        {/* Outer Frame: Vintage Polished Gold & Walnut Molding */}
        <div
          className="w-full h-full rounded-[4px] p-1.5 flex flex-col justify-between relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #DFBF70 0%, #C99E4A 35%, #8C6B28 70%, #5A3F16 100%)',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -1px 2px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.25)',
            border: '1px solid #705217',
          }}
        >
          {/* Subtle Frame Corner Ornaments */}
          <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-black/30 pointer-events-none" />
          <div className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-black/30 pointer-events-none" />
          <div className="absolute bottom-0.5 left-0.5 w-1 h-1 rounded-full bg-black/30 pointer-events-none" />
          <div className="absolute bottom-0.5 right-0.5 w-1 h-1 rounded-full bg-black/30 pointer-events-none" />

          {/* Inner Ivory Passe-Partout (Mat Board) */}
          <div
            className="w-full h-full rounded-[2px] p-1.5 flex flex-col justify-between items-center relative overflow-hidden"
            style={{
              backgroundColor: '#FAF7F0',
              border: '1px solid #E3D7C3',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.12)',
            }}
          >
            {/* The Photograph Container */}
            <div
              className="w-full flex-1 rounded-[1px] relative overflow-hidden"
              style={{
                backgroundColor: '#EAE3D2',
                border: '1px solid #D5C8B0',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.18)',
              }}
            >
              <img
                src="/images/slack-profile.jpeg"
                alt="Ana Ainza"
                className="w-full h-full object-cover"
                style={{
                  objectPosition: 'center 18%',
                  filter: 'contrast(1.02) saturate(1.02)',
                }}
                loading="eager"
              />

              {/* Glass Glare Reflection Line */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 35%, transparent 55%)',
                }}
              />
            </div>

            {/* Brass Nameplate at bottom */}
            <div
              className="mt-1 w-full px-1 py-0.5 rounded-[1px] flex flex-col items-center justify-center text-center shadow-2xs"
              style={{
                background: 'linear-gradient(180deg, #F4E1A6 0%, #D8B763 60%, #BA943E 100%)',
                border: '0.5px solid #8C6B28',
                boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
              }}
            >
              <span
                className="font-serif font-bold text-[8px] text-[#3D2C10] tracking-wide leading-none truncate w-full"
                style={{ textShadow: '0 0.5px 0 rgba(255,255,255,0.5)' }}
              >
                Ana Ainza
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── High-Resolution Photo Modal when clicked ── */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="frame-modal-title"
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
          style={{
            backgroundColor: 'rgba(15, 14, 12, 0.82)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col items-center max-w-[380px] w-full p-5 sm:p-6 rounded-2xl shadow-2xl border"
            style={{
              backgroundColor: '#181715',
              borderColor: 'rgba(255, 255, 255, 0.12)',
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close photo"
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Framed Big Portrait */}
            <div
              className="w-[210px] sm:w-[240px] rounded-lg p-2.5 shadow-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #DFBF70 0%, #C99E4A 35%, #8C6B28 70%, #5A3F16 100%)',
                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.6), 0 16px 36px rgba(0,0,0,0.5)',
                border: '1.5px solid #705217',
              }}
            >
              <div
                className="w-full rounded-[3px] p-2 flex flex-col items-center"
                style={{
                  backgroundColor: '#FAF7F0',
                  border: '1px solid #E3D7C3',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.15)',
                }}
              >
                <div
                  className="w-full aspect-[3/4] rounded-[2px] overflow-hidden relative shadow-inner"
                  style={{ backgroundColor: '#EAE3D2' }}
                >
                  <img
                    src="/images/slack-profile.jpeg"
                    alt="Ana Ainza"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 18%' }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)',
                    }}
                  />
                </div>

                {/* Brass plaque under photo */}
                <div
                  className="mt-2 px-3 py-1 rounded-[2px] text-center w-full shadow-2xs"
                  style={{
                    background: 'linear-gradient(180deg, #F4E1A6 0%, #D8B763 60%, #BA943E 100%)',
                    border: '0.5px solid #8C6B28',
                  }}
                >
                  <span className="font-serif font-bold text-xs text-[#3D2C10] tracking-wider block">
                    Ana Ainza
                  </span>
                  <span className="font-mono text-[8px] text-[#5A4018] uppercase tracking-widest block">
                    Monterrey, Mexico
                  </span>
                </div>
              </div>
            </div>

            {/* Bio Card Under Photo */}
            <div className="mt-4 text-center w-full">
              <h3
                id="frame-modal-title"
                className="font-serif text-lg font-bold text-white flex items-center justify-center gap-1.5"
              >
                <span>Ana Ainza</span>
                <Sparkles className="w-3.5 h-3.5 text-[#DFBF70]" />
              </h3>
              <p className="font-mono text-xs text-[#DFBF70] mt-1 uppercase tracking-wider font-semibold">
                Innovation & Development Engineer
              </p>
              <p className="font-mono text-[11px] text-[#E5CE93] mt-0.5 uppercase tracking-wide font-medium">
                Specialization in Smart Value Chains
              </p>
              <p className="font-sans text-xs text-white/80 mt-2.5 leading-relaxed px-2">
                Innovation and Development Engineer specialized in Smart Value Chains, currently doing AI cybersecurity research at Purdue.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeskPhotoFrame;
