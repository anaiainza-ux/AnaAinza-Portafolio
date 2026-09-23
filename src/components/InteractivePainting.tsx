import React, { useState } from 'react';
import { PaintingData } from '../data/framesData';

export interface InteractivePaintingProps {
  painting: PaintingData;
  isMobile?: boolean;
  isColumnLayout?: boolean;
}

export const InteractivePainting: React.FC<InteractivePaintingProps> = ({
  painting,
  isMobile = false,
  isColumnLayout = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMobileTap = () => {
    if (painting.url) {
      window.open(painting.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleVisitClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (painting.url) {
      window.open(painting.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleBackFaceClick = (e: React.MouseEvent) => {
    if (painting.url) {
      e.stopPropagation();
      window.open(painting.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Frame finish border styles
  const getFinishClasses = () => {
    switch (painting.frameFinish) {
      case 'vintage-gold':
        return {
          frameBg: 'bg-gradient-to-br from-[#E2C37A] via-[#C99E4A] to-[#8C6B28] border-[#705217]',
          plaqueBg: 'bg-gradient-to-r from-[#DFBF70] via-[#F4E1A6] to-[#C99E4A] text-[#3D2C10] border-[#9E7B2F]',
        };
      case 'light-wood':
        return {
          frameBg: 'bg-gradient-to-br from-[#E8DAC5] via-[#D4C4A8] to-[#B5A182] border-[#8C7A5E]',
          plaqueBg: 'bg-[#F7F4EE] text-[#3B281B] border-[#C8B89E]',
        };
      case 'dark-walnut':
      default:
        return {
          frameBg: 'bg-gradient-to-br from-[#5A3821] via-[#3D2B1F] to-[#25150B] border-[#1E0F05]',
          plaqueBg: 'bg-[#F2ECE1] text-[#3B2516] border-[#D4C3B3]',
        };
    }
  };

  const finish = getFinishClasses();
  const width = isMobile ? 80 : 110;
  const height = isMobile ? 100 : 160;

  // ─────────────────────────────────────────────────────────────────────────────
  // MOBILE VIEW: Small 80px × 100px, no rotation, no flip, tap = navigate
  // ─────────────────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div
        onClick={handleMobileTap}
        role="button"
        tabIndex={0}
        aria-label={`${painting.title}: ${painting.subtitle}`}
        className="w-full h-36 relative select-none cursor-pointer group focus:outline-hidden"
      >
        {/* Small Frame Outer */}
        <div
          className={`w-full h-full p-1 rounded-[2.5px] border shadow-md flex flex-col ${finish.frameBg}`}
        >
          {/* Mat Board */}
          <div className="w-full h-full bg-[#FAF7F0] rounded-[1px] p-1 border border-[#E8DFCF] flex flex-col justify-between items-center overflow-hidden">
            {/* Artwork Window */}
            <div className="w-full flex-1 min-h-0 bg-gradient-to-b from-[#F7F3EA] to-[#F1ECE0] rounded-[1px] border border-[#DDD3C2] p-0.5 flex items-center justify-center overflow-hidden">
              <img
                src={painting.imageSrc}
                alt={painting.title}
                className="w-full h-full object-cover rounded-[1px]"
                style={{ objectPosition: 'center 18%' }}
                loading="lazy"
              />
            </div>

            {/* Plaque */}
            <div
              className={`mt-0.5 px-1 py-0.5 w-full border shadow-2xs shrink-0 flex items-center justify-between ${finish.plaqueBg}`}
            >
              <span className="font-serif font-bold text-[7.5px] truncate">
                {painting.title}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // DESKTOP VIEW: Wall-mounted, tilted, hanging wire + nail, 3D flip on hover
  // ─────────────────────────────────────────────────────────────────────────────
  const { top, left, right, rotation } = painting.desktopPosition;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      role="region"
      aria-label={`${painting.title} gallery piece`}
      className={`${
        isColumnLayout ? 'relative flex' : 'fixed hidden md:flex'
      } flex-col items-center select-none transition-all duration-300 pointer-events-auto ${
        isHovered ? 'z-20' : 'z-5'
      }`}
      style={
        isColumnLayout
          ? { width: `${width}px` }
          : {
              top,
              left,
              right,
              width: `${width}px`,
            }
      }
    >
      {/* Small Wall Nail: 6px circle */}
      <div
        className="w-[6px] h-[6px] rounded-full mx-auto relative z-10 shrink-0"
        style={{
          backgroundColor: painting.nailColor,
          boxShadow: '0 1px 2px rgba(0,0,0,0.4)',
          border: '0.5px solid rgba(0,0,0,0.3)',
        }}
      >
        <div className="absolute inset-0.5 rounded-full bg-white/40 pointer-events-none" />
      </div>

      {/* Hanging Wire: thin line, 2px, #8B7355, 24px tall */}
      <div
        className="w-[2px] h-[24px] mx-auto -mt-[1px] relative z-0 shrink-0"
        style={{ backgroundColor: '#8B7355' }}
      />

      {/* 3D Flip Card Container */}
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          perspective: 1000,
        }}
        className="relative"
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transformOrigin: 'top center',
            transform: isHovered
              ? 'rotate(0deg) scale(1.06) rotateY(180deg)'
              : `rotate(${rotation}deg) scale(1) rotateY(0deg)`,
            boxShadow: isHovered
              ? '0 16px 40px rgba(0,0,0,0.3)'
              : '0 8px 24px rgba(0,0,0,0.18)',
            transition: 'transform 0.4s ease-in-out, box-shadow 0.3s ease',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {/* ── FRONT FACE (Visible at rest) ── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
            className={`w-full h-full p-1.5 border flex flex-col justify-between ${finish.frameBg}`}
          >
            {/* Subtle Corner Accents */}
            <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-black/25 pointer-events-none" />
            <div className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-black/25 pointer-events-none" />
            <div className="absolute bottom-0.5 left-0.5 w-1 h-1 rounded-full bg-black/25 pointer-events-none" />
            <div className="absolute bottom-0.5 right-0.5 w-1 h-1 rounded-full bg-black/25 pointer-events-none" />

            {/* Ivory Passe-Partout (Mat Board) */}
            <div className="w-full h-full bg-[#FAF7F0] rounded-[2px] p-1.5 border border-[#E8DFCF] shadow-inner flex flex-col justify-between items-center overflow-hidden">
              {/* Artwork Window */}
              <div className="w-full flex-1 min-h-0 bg-gradient-to-b from-[#F7F3EA] to-[#F1ECE0] rounded-[1px] border border-[#DDD3C2] p-0.5 flex items-center justify-center relative overflow-hidden shadow-2xs">
                <img
                  src={painting.imageSrc}
                  alt={painting.title}
                  className="w-full h-full object-cover rounded-[1px]"
                  style={{ objectPosition: 'center 18%' }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/[0.04] pointer-events-none" />
              </div>

              {/* Bottom Plaque Label */}
              <div
                className={`mt-1.5 px-1.5 py-1 w-full border shadow-2xs shrink-0 flex flex-col text-left overflow-hidden rounded-[1.5px] ${finish.plaqueBg}`}
              >
                <span className="font-serif font-bold text-[10px] text-[#381E20] leading-tight truncate">
                  {painting.title}
                </span>
                {painting.subtitle && (
                  <span
                    className={`font-mono text-[6.5px] uppercase font-semibold leading-tight truncate mt-0.5 ${
                      painting.tagColor === 'orange'
                        ? 'text-[#B45309]'
                        : 'text-[#4A3E34] opacity-85'
                    }`}
                  >
                    {painting.subtitle}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ── BACK FACE (Revealed on hover flip) ── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              borderRadius: '4px',
              overflow: 'hidden',
              background: `linear-gradient(135deg, ${painting.gradientBack[0]} 0%, ${painting.gradientBack[1]} 100%)`,
              border: '1px solid rgba(255,255,255,0.22)',
            }}
            className={`w-full h-full p-2.5 flex flex-col justify-between text-left select-none relative ${
              painting.url ? 'cursor-pointer' : ''
            }`}
            onClick={handleBackFaceClick}
          >
            {/* Subtle grain overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E")`,
              }}
            />

            {!painting.url ? (
              <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center p-1">
                <h4 className="text-[14px] font-bold text-white tracking-tight leading-tight">
                  {painting.backTitle}
                </h4>
                <p className="text-[10px] font-light text-white/80 mt-1">
                  {painting.description}
                </p>
                <div className="mt-2.5 text-2xl font-serif select-none" style={{ color: '#E7B5D0' }}>
                  ♡
                </div>
              </div>
            ) : (
              <>
                {/* Top: Small tag pill */}
                <div className="relative z-10">
                  <span className="inline-block text-[7.5px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full bg-white/15 text-white/90 border border-white/20 tracking-wider truncate max-w-full">
                    {painting.tag}
                  </span>

                  {/* Title: 14px, weight 700, white */}
                  <h4 className="text-[14px] font-bold text-white tracking-tight leading-tight mt-1.5">
                    {painting.backTitle}
                  </h4>

                  {/* One-line description: 11px, weight 300, rgba(255,255,255,0.75), max 2 lines */}
                  <p className="text-[11px] font-light text-white/75 leading-snug mt-1 line-clamp-2">
                    {painting.description}
                  </p>
                </div>

                {/* Bottom Action Area: Visit Button */}
                <div className="relative z-10 mt-auto pt-2">
                  <button
                    type="button"
                    onClick={handleVisitClick}
                    className="w-full py-[7px] text-center font-semibold text-white text-[11px] rounded-[6px] transition-all cursor-pointer flex items-center justify-center gap-1 hover:bg-white/25 active:scale-[0.98]"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.3)',
                    }}
                  >
                    <span>Visit →</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
