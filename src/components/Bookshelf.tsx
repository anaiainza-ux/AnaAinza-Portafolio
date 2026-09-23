import React, { useRef, useState, useEffect } from 'react';
import { Book } from '../types';
import { BookSpine } from './BookSpine';
import { DeskPhotoFrame } from './DeskPhotoFrame';

interface BookshelfProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  className?: string;
  isMobile?: boolean;
}

export const Bookshelf: React.FC<BookshelfProps> = ({
  books,
  onSelectBook,
  className = '',
  isMobile = false,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scaleY, setScaleY] = useState(1);
  const [scaleX, setScaleX] = useState(1);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const availableHeight = rect.height;
      const availableWidth = rect.width;

      if (availableHeight <= 0) return;

      // Plank height is ~48px (top surface ~16px + beam ~24px + shadow ~8px)
      // Reserve ~20px headroom for book hover lift (y: -14px)
      const reservedHeight = 60;
      const maxBookHeight = 256; // h-64 in Tailwind is 256px
      const availableForBooks = availableHeight - reservedHeight;

      let computedScaleY = 1;
      if (availableForBooks < maxBookHeight) {
        computedScaleY = Math.max(0.45, availableForBooks / maxBookHeight);
      }

      let computedScaleX = 1;
      // On desktop (>= 768px), books + photo frame with gap need ~670px
      if (window.innerWidth >= 768 && availableWidth > 0 && availableWidth < 670) {
        computedScaleX = Math.max(0.6, (availableWidth - 16) / 670);
      }

      setScaleY(computedScaleY);
      setScaleX(computedScaleX);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const scaleTransform =
    scaleX < 1
      ? `scale(${Math.min(scaleX, scaleY)})`
      : scaleY < 1
      ? `scaleY(${scaleY})`
      : 'none';

  if (isMobile) {
    return (
      <div className={`bookshelf-container w-full flex flex-col items-center gap-2 px-4 py-1 overflow-visible ${className}`}>
        {/* Mobile Profile Frame Card */}
        <div className="w-full flex items-center gap-3.5 p-3 mb-1.5 rounded-xl bg-white/75 border border-[#E8DFCF] shadow-xs backdrop-blur-xs">
          <div className="w-13 h-17 shrink-0 p-1 rounded-sm bg-gradient-to-br from-[#E2C37A] via-[#C99E4A] to-[#8C6B28] shadow-sm border border-[#705217]/50">
            <div className="w-full h-full p-0.5 bg-[#FAF7F0] rounded-[1px] border border-[#E8DFCF] overflow-hidden shadow-inner">
              <img
                src="/images/slack-profile.jpeg"
                alt="Ana Ainza"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 18%' }}
              />
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-serif font-bold text-sm text-[#2C2825]">Ana Ainza</span>
            <span className="font-mono text-[9.5px] text-[#8C7A6B] uppercase tracking-wider font-semibold">
              Innovation & Development Engineer
            </span>
            <span className="text-[11px] text-[#5A5047] mt-0.5 truncate">
              Smart Value Chains · AI Cybersecurity Research @ Purdue
            </span>
          </div>
        </div>

        {books.map((book) => (
          <button
            key={book.id}
            id={`mobile-book-bar-${book.id}`}
            onClick={(e) => {
              e.stopPropagation();
              if (book.isExternalLink && book.externalUrl) {
                window.open(book.externalUrl, '_blank', 'noopener,noreferrer');
                return;
              }
              onSelectBook(book);
            }}
            className="w-full h-14 rounded-lg flex items-center justify-between px-5 cursor-pointer shadow-xs active:scale-[0.98] transition-all select-none border"
            style={{
              backgroundColor: book.spineColor,
              color: book.spineTextColor,
              borderColor: book.accentBorderColor || 'rgba(0,0,0,0.12)',
            }}
          >
            <div className="flex items-center gap-3">
              {book.romanNumeral && (
                <span className="font-mono text-xs opacity-60 font-semibold tracking-wider">
                  Vol. {book.romanNumeral}
                </span>
              )}
              <span className="font-serif text-sm font-semibold tracking-wide uppercase">
                {book.displayTitle || book.title}
              </span>
            </div>
            <span className="text-xl opacity-60 font-mono">›</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    // Parent of shelf container: overflow: hidden to clip at viewport edge cleanly
    <div
      ref={wrapperRef}
      className={`w-full h-full flex flex-col justify-end items-center overflow-hidden relative select-none ${className}`}
    >
      {/* Shelf Container: overflow: visible, scales to fit center column */}
      <div
        className="w-full flex flex-col justify-end items-center relative overflow-visible"
        style={{
          maxHeight: isMobile ? '45vh' : 'calc(100vh - 180px - 40px)',
        }}
      >
        {/* Books Row: Books stay together in horizontal row */}
        <div
          className="flex items-end justify-center gap-1.5 sm:gap-2.5 md:gap-3 px-2 sm:px-4 pb-0 overflow-x-auto md:overflow-visible w-full max-w-full"
          style={{
            transformOrigin: 'bottom center',
            transform: scaleTransform,
          }}
        >
          {/* Framed Desk Photo of Ana resting on the shelf */}
          <DeskPhotoFrame />

          {books.map((book) => (
            <BookSpine
              key={book.id}
              book={book}
              onSelect={onSelectBook}
              isStackedMobile={false}
            />
          ))}
        </div>

        {/* Real Wooden Shelf Plank: Always visible, anchors the whole design */}
        <div className="relative w-full mt-0 shrink-0">
          {/* Top shelf wood surface with reflection highlight */}
          <div
            className="w-full h-3.5 sm:h-4 rounded-t-sm shadow-inner"
            style={{
              background: 'linear-gradient(180deg, #A86938 0%, #8D4F25 50%, #6E3B19 100%)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4), 0 3px 6px rgba(0,0,0,0.25)',
            }}
          />
          {/* Main front wooden beam */}
          <div
            className="w-full h-5 sm:h-6 rounded-b-sm flex items-center justify-between px-4"
            style={{
              background: 'linear-gradient(180deg, #7A3F18 0%, #5B2B0E 60%, #441E08 100%)',
              boxShadow: '0 8px 18px rgba(0,0,0,0.18)',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#A86938]/40 shadow-inner" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#A86938]/40 shadow-inner" />
          </div>
          {/* Soft shadow cast beneath the shelf */}
          <div className="w-4/5 mx-auto h-3 bg-black/10 blur-md rounded-full mt-0.5" />
        </div>
      </div>
    </div>
  );
};

export default Bookshelf;
