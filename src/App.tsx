import React, { useState } from 'react';
import { BOOKS_DATA } from './data/portfolioData';
import { HANGING_FRAMES_DATA } from './data/framesData';
import { Book } from './types';
import { Header } from './components/Header';
import { Bookshelf } from './components/Bookshelf';
import { HangingFrame } from './components/HangingFrame';
import { OpenBookModal } from './components/OpenBookModal';

export default function App() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [mobileViewMode, setMobileViewMode] = useState<'stack' | 'shelf'>('stack');

  const leftFrames = HANGING_FRAMES_DATA.filter((f) => f.side === 'left');
  const rightFrames = HANGING_FRAMES_DATA.filter((f) => f.side === 'right');

  const handleSelectBook = (book: Book) => {
    if (book.isExternalLink && book.externalUrl) {
      window.open(book.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    setSelectedBook(book);
  };

  const handleCloseBook = () => {
    setSelectedBook(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2825] flex flex-col justify-between selection:bg-[#EBDDCF] selection:text-[#1F1B17] relative overflow-x-hidden">
      {/* Subtle background paper grain accent */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: 'radial-gradient(#E8DFCFC 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-between items-center max-w-[1440px] mx-auto w-full px-3 sm:px-6">
        {/* Top Centered Header Section with flanking high hanging frames on laptop/desktop */}
        <div className="w-full relative flex flex-col justify-center items-center pt-2 sm:pt-4">
          {/* Left Wall Frames (Laptop / Desktop): Positioned higher up on the wall, a little lower than the name */}
          <div className="hidden lg:flex items-start gap-3 xl:gap-5 absolute left-1 xl:left-6 top-10 xl:top-12 z-20">
            {leftFrames[0] && (
              <div className="transform -translate-y-3 xl:-translate-y-5 transition-transform hover:-translate-y-5">
                <HangingFrame frame={leftFrames[0]} />
              </div>
            )}
            {leftFrames[1] && (
              <div className="transform translate-y-7 xl:translate-y-9 transition-transform hover:translate-y-6">
                <HangingFrame frame={leftFrames[1]} />
              </div>
            )}
          </div>

          {/* Centered Header */}
          <Header />

          {/* Right Wall Frames (Laptop / Desktop): Positioned higher up on the wall, a little lower than the name */}
          <div className="hidden lg:flex items-start gap-3 xl:gap-5 absolute right-1 xl:right-6 top-10 xl:top-12 z-20">
            {rightFrames[0] && (
              <div className="transform translate-y-7 xl:translate-y-9 transition-transform hover:translate-y-6">
                <HangingFrame frame={rightFrames[0]} />
              </div>
            )}
            {rightFrames[1] && (
              <div className="transform -translate-y-3 xl:-translate-y-5 transition-transform hover:-translate-y-5">
                <HangingFrame frame={rightFrames[1]} />
              </div>
            )}
          </div>
        </div>

        {/* Bookshelf & Wall Area */}
        <div className="w-full flex-1 flex flex-col justify-center items-center py-2 sm:py-3">
          {/* Mobile & Tablet Top Wall Gallery: 2 frames on left, 2 frames on right arranged diagonally (compact miniature size) */}
          <div className="lg:hidden w-full max-w-sm sm:max-w-md mx-auto mb-2 px-1 sm:px-3">
            <div className="flex items-center justify-between gap-1.5 sm:gap-2">
              {/* Left 2 frames arranged diagonally */}
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                {leftFrames[0] && (
                  <div className="transform -translate-y-2">
                    <HangingFrame frame={leftFrames[0]} isCompact={true} />
                  </div>
                )}
                {leftFrames[1] && (
                  <div className="transform translate-y-2">
                    <HangingFrame frame={leftFrames[1]} isCompact={true} />
                  </div>
                )}
              </div>

              {/* Center subtle label indicator */}
              <div className="flex flex-col items-center justify-center opacity-60 px-1 select-none">
                <span className="font-serif italic text-[9px] sm:text-[10px] text-[#8C7A6B]">Live Works</span>
                <div className="w-3.5 h-[1px] bg-[#D5CBC0] my-0.5" />
                <span className="font-mono text-[7px] sm:text-[7.5px] uppercase tracking-wider text-[#A8988B]">Portals</span>
              </div>

              {/* Right 2 frames arranged diagonally */}
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                {rightFrames[0] && (
                  <div className="transform translate-y-2">
                    <HangingFrame frame={rightFrames[0]} isCompact={true} />
                  </div>
                )}
                {rightFrames[1] && (
                  <div className="transform -translate-y-2">
                    <HangingFrame frame={rightFrames[1]} isCompact={true} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Wall Layout: Centered Bookshelf */}
          <div className="w-full flex items-center justify-center">
            <div className="w-full max-w-4xl flex justify-center">
              <Bookshelf
                books={BOOKS_DATA}
                onSelectBook={handleSelectBook}
                mobileViewMode={mobileViewMode}
                onToggleMobileView={() =>
                  setMobileViewMode((prev) => (prev === 'stack' ? 'shelf' : 'stack'))
                }
              />
            </div>
          </div>
        </div>

        {/* Minimalist Footer Copyright & Information */}
        <footer className="w-full text-center pb-3 pt-2 border-t border-[#EFE7DC] text-[11px] font-mono text-[#8C7A6B] flex flex-col sm:flex-row items-center justify-between gap-1.5 max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-1.5">
            <span>Designed & Built with curiosity</span>
            <span>•</span>
            <span>Ana Ainza © {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">Portfolio Bookshelf Experience</span>
            <a
              href="https://github.com/anaiainza-ux"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1E1B18] transition-colors underline decoration-dotted"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/anaainzaacosta"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1E1B18] transition-colors underline decoration-dotted"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </main>

      {/* Interactive Enlarged Open Book Modal */}
      {selectedBook && (
        <OpenBookModal
          book={selectedBook}
          allBooks={BOOKS_DATA}
          onClose={handleCloseBook}
          onSelectBook={handleSelectBook}
        />
      )}
    </div>
  );
}
