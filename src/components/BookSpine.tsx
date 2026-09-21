import React from 'react';
import { motion } from 'motion/react';
import { Book } from '../types';
import { ExternalLink, Github, Linkedin, Sparkles } from 'lucide-react';

interface BookSpineProps {
  book: Book;
  onSelect: (book: Book) => void;
  isStackedMobile?: boolean;
  stackIndex?: number;
}

const STACK_PRESETS = [
  { height: 'h-11 sm:h-12', offsetClass: 'w-full translate-x-0' },
  { height: 'h-11 sm:h-12', offsetClass: 'w-[98.8%] translate-x-1' },
  { height: 'h-10 sm:h-11', offsetClass: 'w-[99.2%] -translate-x-1' },
  { height: 'h-10 sm:h-11', offsetClass: 'w-[98%] translate-x-1.5' },
  { height: 'h-10 sm:h-11', offsetClass: 'w-[99%] -translate-x-1' },
  { height: 'h-10 sm:h-11', offsetClass: 'w-[98.5%] translate-x-0.5' },
  { height: 'h-9.5 sm:h-10', offsetClass: 'w-[97.5%] -translate-x-1' },
  { height: 'h-10 sm:h-11', offsetClass: 'w-full translate-x-0' },
];

const isDarkColor = (color: string) => {
  const c = color.toLowerCase();
  return c.startsWith('#4') || c.startsWith('#3') || c.startsWith('#2') || c.startsWith('#1') || c.startsWith('#0');
};

export const BookSpine: React.FC<BookSpineProps> = ({
  book,
  onSelect,
  isStackedMobile = false,
  stackIndex = 0,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (book.isExternalLink && book.externalUrl) {
      window.open(book.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    onSelect(book);
  };

  if (isStackedMobile) {
    const preset = STACK_PRESETS[stackIndex % STACK_PRESETS.length];
    const zIndex = 20 - (stackIndex % 20);

    return (
      <div
        className={`relative flex justify-center ${preset.offsetClass}`}
        style={{ zIndex }}
      >
        <motion.button
          id={`mobile-book-${book.id}`}
          whileHover={{
            x: 8,
            transition: { type: 'spring', stiffness: 400, damping: 25 },
          }}
          whileTap={{
            x: 12,
            scale: 0.99,
          }}
          onClick={handleClick}
          title={book.isExternalLink ? `${book.title} (opens in new tab)` : `Open ${book.title}`}
          className={`w-full ${preset.height} text-left relative flex items-center justify-between px-3 sm:px-4 rounded-[2px] cursor-pointer group select-none overflow-hidden transition-shadow duration-200`}
          style={{
            backgroundColor: book.spineColor,
            color: book.spineTextColor,
            boxShadow:
              'inset 0 1.5px 0.5px rgba(255,255,255,0.38), inset 0 -2px 1px rgba(0,0,0,0.38), 0 3px 5px -1px rgba(0,0,0,0.22)',
            borderLeft: `3px solid ${book.accentBorderColor}`,
            borderRight: `3px solid ${book.accentBorderColor}`,
          }}
        >
          {/* Convex cylindrical spine curvature shading (light reflection on top, deep shadow on bottom) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.06) 28%, transparent 55%, rgba(0,0,0,0.28) 100%)',
            }}
          />

          {/* Left Headcap: Book hinge groove & headband accent */}
          <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none" />
          <div className="absolute top-0 bottom-0 left-2.5 w-[1px] bg-black/20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 left-[11px] w-[1px] bg-white/25 pointer-events-none" />

          {/* Right Tailcap: Book hinge groove */}
          <div className="absolute top-0 bottom-0 right-0 w-2.5 bg-gradient-to-l from-black/25 via-black/10 to-transparent pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-2.5 w-[1px] bg-black/20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-[11px] w-[1px] bg-white/20 pointer-events-none" />

          {/* Subtle stitched border or accent band for Book 6 */}
          {book.accentBandColor && (
            <div
              className="absolute inset-x-3 inset-y-1 border border-dashed rounded-[1px] pointer-events-none opacity-80"
              style={{ borderColor: book.accentBandColor }}
            />
          )}
          {book.pattern === 'stitched' && (
            <>
              <div
                className="absolute top-0 bottom-0 left-6 w-1 pointer-events-none opacity-75"
                style={{ backgroundColor: book.accentBandColor || '#B6C8A9' }}
              />
              <div
                className="absolute top-0 bottom-0 right-6 w-1 pointer-events-none opacity-75"
                style={{ backgroundColor: book.accentBandColor || '#B6C8A9' }}
              />
            </>
          )}

          {/* Left section: Volume Roman Numeral */}
          <div className="relative z-10 flex items-center gap-1.5 pl-1 shrink-0">
            {book.romanNumeral && (
              <span
                className="text-[9.5px] sm:text-[10.5px] font-serif font-bold tracking-widest px-1.5 py-0.2 rounded-xs border border-current opacity-90 shadow-2xs"
                style={{
                  color: book.spineAccentColor,
                  textShadow: isDarkColor(book.spineTextColor)
                    ? '0 1px 0 rgba(255,255,255,0.45)'
                    : '0 1px 2px rgba(0,0,0,0.5)',
                }}
              >
                {book.romanNumeral}
              </span>
            )}
            {/* Raised band pairs across the spine */}
            <div className="hidden xs:flex items-center gap-0.5 ml-1 opacity-40">
              <div className="w-[1.5px] h-4 bg-white/60 shadow-[1px_0_0_rgba(0,0,0,0.4)]" />
              <div className="w-[1.5px] h-4 bg-white/60 shadow-[1px_0_0_rgba(0,0,0,0.4)]" />
            </div>
          </div>

          {/* Center: Pure Book Spine Title (No subtitles or card text) */}
          <div className="relative z-10 flex-1 px-2 flex items-center justify-center min-w-0">
            <div className="flex items-center justify-center gap-2 max-w-full">
              {book.pattern === 'diamond' && (
                <div
                  className="w-1.5 h-1.5 border border-current rotate-45 shrink-0 opacity-75"
                  style={{ borderColor: book.spineAccentColor }}
                />
              )}
              {book.pattern === 'double-frame' && (
                <div className="w-2.5 h-[1px] bg-current opacity-60 shrink-0" />
              )}
              {book.pattern === 'bars' && (
                <div className="flex space-x-0.5 opacity-60 shrink-0">
                  <div className="w-[1px] h-2.5 bg-current" />
                  <div className="w-[1px] h-2.5 bg-current" />
                </div>
              )}

              <h3
                className={`font-serif font-bold uppercase truncate text-center select-none ${
                  book.displayTitle.length > 12
                    ? 'text-[10px] xs:text-[11px] sm:text-xs tracking-[0.14em] sm:tracking-[0.18em]'
                    : 'text-[11px] xs:text-xs sm:text-[13px] tracking-[0.18em] sm:tracking-[0.22em]'
                }`}
                style={{
                  textShadow: isDarkColor(book.spineTextColor)
                    ? '0 1px 0 rgba(255,255,255,0.45)'
                    : '0 1px 2px rgba(0,0,0,0.5)',
                }}
              >
                {book.displayTitle}
              </h3>

              {book.pattern === 'diamond' && (
                <div
                  className="w-1.5 h-1.5 border border-current rotate-45 shrink-0 opacity-75"
                  style={{ borderColor: book.spineAccentColor }}
                />
              )}
              {book.pattern === 'double-frame' && (
                <div className="w-2.5 h-[1px] bg-current opacity-60 shrink-0" />
              )}
              {book.pattern === 'bars' && (
                <div className="flex space-x-0.5 opacity-60 shrink-0">
                  <div className="w-[1px] h-2.5 bg-current" />
                  <div className="w-[1px] h-2.5 bg-current" />
                </div>
              )}
            </div>
          </div>

          {/* Right section: Spine colophon / icon or decorative bands */}
          <div className="relative z-10 flex items-center justify-end pr-1 shrink-0">
            {book.isExternalLink ? (
              <div
                className="flex items-center justify-center w-5 h-5 rounded-xs bg-black/15 border border-current/30 shadow-2xs"
                style={{ color: book.spineAccentColor }}
                title={book.title}
              >
                {book.iconName === 'Github' ? (
                  <Github className="w-3 h-3" />
                ) : (
                  <Linkedin className="w-3 h-3" />
                )}
              </div>
            ) : (
              <div className="flex items-center gap-0.5 opacity-40">
                <div className="w-[1.5px] h-4 bg-white/60 shadow-[1px_0_0_rgba(0,0,0,0.4)]" />
                <div className="w-[1.5px] h-4 bg-white/60 shadow-[1px_0_0_rgba(0,0,0,0.4)]" />
              </div>
            )}
          </div>
        </motion.button>
      </div>
    );
  }

  // Desktop / Tablet upright shelf spine layout
  const rotationStyle: React.CSSProperties = book.tiltAngle
    ? { transform: `rotate(${book.tiltAngle}deg)`, transformOrigin: 'bottom center' }
    : {};

  return (
    <div
      className="relative flex flex-col justify-end items-center group cursor-pointer"
      style={rotationStyle}
      onClick={handleClick}
      id={`shelf-book-${book.id}`}
      title={book.isExternalLink ? `${book.title} (Opens in new tab)` : `Read ${book.title}`}
    >
      {/* Tooltip on hover */}
      <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30 bg-[#1A1816] text-[#FAF7F2] text-xs font-sans px-2.5 py-1 rounded shadow-lg whitespace-nowrap flex items-center gap-1.5">
        <span>{book.title}</span>
        {book.isExternalLink ? <ExternalLink className="w-3 h-3 text-amber-300" /> : <Sparkles className="w-3 h-3 text-amber-300" />}
      </div>

      <motion.div
        whileHover={{
          y: -14,
          scale: 1.02,
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }}
        whileTap={{ scale: 0.98 }}
        className={`relative ${book.heightClass} ${book.widthClass} rounded-t-sm shadow-md transition-shadow group-hover:shadow-2xl flex flex-col justify-between items-center py-3 px-1 border-t border-r border-white/20 select-none overflow-hidden`}
        style={{
          backgroundColor: book.spineColor,
          color: book.spineTextColor,
          boxShadow: 'inset 2px 0 4px rgba(255,255,255,0.25), inset -2px 0 5px rgba(0,0,0,0.35), 3px 6px 12px rgba(0,0,0,0.18)',
        }}
      >
        {/* Subtle spine crease & texture gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/30 pointer-events-none" />

        {/* Subtle stitched border for Book 6 */}
        {book.accentBandColor && (
          <div
            className="absolute inset-x-1 inset-y-3 border border-dashed rounded-xs pointer-events-none opacity-80 z-10"
            style={{ borderColor: book.accentBandColor }}
          />
        )}

        {/* Top Gold / Embossed Trim */}
        <div className="relative z-10 flex flex-col items-center w-full px-1">
          {book.pattern === 'ribs' && (
            <div className="w-full flex flex-col space-y-1 mb-1">
              <div className="h-[2px] w-full bg-white/40" />
              <div className="h-[2px] w-full bg-white/40" />
            </div>
          )}

          {book.pattern === 'diamond' && (
            <div
              className="w-3.5 h-3.5 border-2 rotate-45 mb-1.5 shadow-xs"
              style={{ borderColor: book.spineAccentColor || 'rgba(252, 211, 77, 0.8)' }}
            />
          )}

          {book.pattern === 'double-frame' && (
            <div className="w-full h-3 border border-amber-200/60 rounded-xs mb-1" />
          )}

          {book.pattern === 'stitched' && (
            <div className="w-full flex flex-col space-y-1 mb-1 items-center">
              <div
                className="h-[2.5px] w-full rounded-xs shadow-xs"
                style={{ backgroundColor: book.accentBandColor || '#B6C8A9' }}
              />
              <div
                className="w-4/5 h-[1px] border-b border-dashed"
                style={{ borderColor: book.accentBandColor || '#B6C8A9' }}
              />
            </div>
          )}

          {book.pattern === 'bars' && (
            <div className="w-full flex justify-center space-x-1 mb-1 opacity-75">
              <div className="w-[1.5px] h-3 bg-current" />
              <div className="w-[1.5px] h-3 bg-current" />
              <div className="w-[1.5px] h-3 bg-current" />
            </div>
          )}

          {book.romanNumeral && (
            <span
              className="text-[10px] font-serif font-bold tracking-widest opacity-90"
              style={{
                color: book.spineAccentColor,
                textShadow: isDarkColor(book.spineTextColor)
                  ? '0 1px 0 rgba(255,255,255,0.45)'
                  : '0 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              {book.romanNumeral}
            </span>
          )}
        </div>

        {/* Center Spine Title: Vertical Typography */}
        <div className="relative z-10 flex-1 flex items-center justify-center py-2">
          <div
            className="font-serif font-semibold tracking-wider text-center select-none uppercase"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontSize: book.displayTitle.length > 12 ? '11px' : '13px',
              letterSpacing: '0.18em',
              textShadow: isDarkColor(book.spineTextColor)
                ? '0 1px 0 rgba(255,255,255,0.45)'
                : '0 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            {book.displayTitle}
          </div>
        </div>

        {/* Bottom Gold/Embossed Accent / Icon */}
        <div className="relative z-10 flex flex-col items-center w-full px-1 pt-1">
          {book.isExternalLink ? (
            <div className="p-1 rounded bg-black/20 text-white/90">
              {book.iconName === 'Github' ? (
                <Github className="w-4 h-4" />
              ) : (
                <Linkedin className="w-4 h-4" />
              )}
            </div>
          ) : (
            <div className="w-full flex flex-col items-center space-y-1">
              {book.pattern === 'diamond' && (
                <div
                  className="w-2.5 h-2.5 border rotate-45"
                  style={{ borderColor: book.spineAccentColor || 'rgba(252, 211, 77, 0.6)' }}
                />
              )}
              {book.pattern === 'ribs' && (
                <div className="w-4/5 h-[2px] bg-white/30" />
              )}
              {book.pattern === 'stitched' && (
                <div
                  className="w-full h-[2.5px] rounded-xs shadow-xs"
                  style={{ backgroundColor: book.accentBandColor || '#B6C8A9' }}
                />
              )}
              {book.pattern === 'bars' && (
                <div className="flex space-x-1 opacity-70">
                  <div className="w-[1.5px] h-2 bg-current" />
                  <div className="w-[1.5px] h-2 bg-current" />
                </div>
              )}
              <div className="w-3/4 h-[1px] bg-white/20" />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
