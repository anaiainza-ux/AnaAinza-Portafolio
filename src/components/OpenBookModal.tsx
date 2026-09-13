import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book } from '../types';
import { BookPageContent } from './BookPageContent';
import { PageFlip, PageFlipLeaf } from './ui/page-flip';
import {
  ChevronLeft,
  ChevronRight,
  X,
  BookOpen,
  MoveHorizontal,
} from 'lucide-react';

interface OpenBookModalProps {
  book: Book | null;
  allBooks: Book[];
  onClose: () => void;
  onSelectBook: (book: Book) => void;
}

export const OpenBookModal: React.FC<OpenBookModalProps> = ({
  book,
  onClose,
}) => {
  // turnedLeafIndex: 0 = closed cover, 1 = TOC (Page 2 on left, Page 3 on right), etc.
  const [turnedLeafIndex, setTurnedLeafIndex] = useState<number>(1);
  const [dimensions, setDimensions] = useState({
    width: 400,
    height: 590,
    isMobile: false,
  });

  // Dynamically compute book leaf dimensions based on screen size
  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isMob = w < 768;

      if (isMob) {
        // Mobile single leaf scale
        const pageW = Math.min(w - 40, 340);
        const pageH = Math.min(h - 140, 540);
        setDimensions({
          width: Math.max(270, pageW),
          height: Math.max(420, pageH),
          isMobile: true,
        });
      } else {
        // Desktop two-page spread (w / 2 per leaf)
        const availableW = Math.min(w - 120, 1000);
        const availableH = Math.min(h - 120, 640);
        const pageW = Math.min(Math.floor(availableW / 2.15), 440);
        const pageH = Math.min(availableH, 610);
        setDimensions({
          width: Math.max(340, pageW),
          height: Math.max(500, pageH),
          isMobile: false,
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // When book opens or changes, start at Table of Contents (turnedLeafIndex = 1)
  useEffect(() => {
    if (book) {
      setTurnedLeafIndex(1);
    }
  }, [book?.id]);

  // Keyboard navigation (Arrow keys & Escape) - No sounds
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!book) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNextLeaf();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrevLeaf();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [book, turnedLeafIndex]);

  // Navigate directly to a specific page number
  const goToPage = (pageNumber: number) => {
    if (!book) return;
    const targetLeaf = pageNumber <= 1 ? 0 : Math.floor(pageNumber / 2);
    setTurnedLeafIndex(targetLeaf);
  };

  const handleNextLeaf = () => {
    if (!book) return;
    const maxLeaves = Math.ceil(book.pages.length / 2);
    setTurnedLeafIndex((prev) => Math.min(maxLeaves, prev + 1));
  };

  const handlePrevLeaf = () => {
    setTurnedLeafIndex((prev) => Math.max(0, prev - 1));
  };

  // Convert book pages into React Bits Pro PageFlip leaves
  const leaves: PageFlipLeaf[] = useMemo(() => {
    if (!book) return [];

    const pageCount = book.pages.length;
    const leafCount = Math.ceil(pageCount / 2);
    const result: PageFlipLeaf[] = [];
    const isProjects = book.id === 'projects' || book.title.toLowerCase().includes('proyect');

    for (let i = 0; i < leafCount; i++) {
      const frontPageNum = i * 2 + 1;
      const backPageNum = i * 2 + 2;

      const frontPage = book.pages.find((p) => p.pageNumber === frontPageNum);
      const backPage = book.pages.find((p) => p.pageNumber === backPageNum);

      // Front of Leaf
      const frontContent = frontPage ? (
        i === 0 ? (
          // Book Cover (Page 1)
          isProjects ? (
            <div className="h-full flex flex-col justify-between p-6 sm:p-8 bg-[#e7b5d0] text-[#381E2F] border border-[#C481A5] rounded-l-md shadow-inner select-none relative overflow-hidden">
              {/* Elegant debossed decorative frame & diamond ornament */}
              <div className="absolute inset-3 border border-[#832856]/20 rounded-xs pointer-events-none" />
              <div className="absolute inset-4 border border-[#832856]/15 rounded-xs pointer-events-none" />

              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-3.5 h-3.5 border-2 border-[#832856] rotate-45 shadow-xs" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#6B3756] font-semibold">
                    Volume {book.romanNumeral ?? 'I'}
                  </span>
                </div>
                <div className="pt-6">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#832856] font-bold">
                    Hackathons & Startups
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#381E2F] tracking-tight mt-1">
                    {book.title}
                  </h1>
                  <p className="text-sm font-sans italic text-[#5C2D49] mt-2">
                    {book.subtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-[#832856]/20 relative z-10">
                <div className="flex items-center gap-2 text-xs font-serif text-[#6B3756]">
                  <span className="font-medium">Ana Ainza</span>
                  <span>•</span>
                  <span>Portfolio Edition</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#832856] bg-white/40 backdrop-blur-xs border border-[#832856]/25 rounded-lg px-3 py-2 shadow-xs">
                  <MoveHorizontal className="w-3.5 h-3.5 animate-pulse text-[#832856]" />
                  <span>Drag page or click to open</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-br from-[#FAF7F2] to-[#EFEAE2] text-[#2C2825] border border-black/[0.08] rounded-l-md shadow-inner select-none">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className="w-3 h-3 rounded-full shadow-xs"
                    style={{ backgroundColor: book.spineColor }}
                  />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#8C7A6B]">
                    Volume {book.romanNumeral ?? 'I'}
                  </span>
                </div>
                <div className="pt-6">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#B45309]">
                    Selected Works
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E1B18] tracking-tight mt-1">
                    {book.title}
                  </h1>
                  <p className="text-sm font-sans italic text-[#6B5E52] mt-2">
                    {book.subtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-black/[0.08]">
                <div className="flex items-center gap-2 text-xs font-serif text-[#7A6B5E]">
                  <span>Ana Ainza</span>
                  <span>•</span>
                  <span>Portfolio Edition</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#B45309] bg-[#FAF0E4]/60 backdrop-blur-xs border border-[#F3DFC6] rounded-lg px-3 py-2">
                  <MoveHorizontal className="w-3.5 h-3.5 animate-pulse" />
                  <span>Drag page or click to open</span>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="h-full bg-gradient-to-br from-[#FAF7F2] to-[#EFEAE2] overflow-y-auto border border-black/[0.06] rounded-r-md">
            <BookPageContent
              book={book}
              page={frontPage}
              onNavigateToPage={goToPage}
              isMobile={dimensions.isMobile}
            />
          </div>
        )
      ) : (
        <div className="h-full flex items-center justify-center p-8 text-center text-[#8C7A6B] font-serif italic bg-[#FAF7F2] border border-black/[0.06] rounded-r-md">
          End of volume
        </div>
      );

      // Back of Leaf
      const backContent = backPage ? (
        <div className="h-full bg-gradient-to-bl from-[#FAF7F2] to-[#EFEAE2] overflow-y-auto border border-black/[0.06] rounded-l-md">
          <BookPageContent
            book={book}
            page={backPage}
            onNavigateToPage={goToPage}
            isMobile={dimensions.isMobile}
          />
        </div>
      ) : isProjects ? (
        <div className="h-full flex flex-col items-center justify-between p-6 sm:p-8 text-center bg-[#e7b5d0] text-[#381E2F] border border-[#C481A5] rounded-l-md shadow-inner select-none relative overflow-hidden">
          {/* Elegant debossed decorative frame */}
          <div className="absolute inset-3 border border-[#832856]/20 rounded-xs pointer-events-none" />
          <div className="absolute inset-4 border border-[#832856]/15 rounded-xs pointer-events-none" />

          <div className="pt-2 relative z-10 flex items-center justify-center gap-2">
            <div className="w-2.5 h-2.5 border border-[#832856] rotate-45" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#6B3756] font-semibold">
              Volume {book.romanNumeral ?? 'I'} • Concluding Volume
            </span>
            <div className="w-2.5 h-2.5 border border-[#832856] rotate-45" />
          </div>

          <div className="space-y-3 my-auto relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/45 border border-[#832856]/25 flex items-center justify-center shadow-xs">
              <BookOpen className="w-6 h-6 text-[#832856]" />
            </div>
            <div className="font-serif font-bold text-xl text-[#381E2F]">
              {book.title}
            </div>
            <p className="font-sans italic text-xs text-[#5C2D49] max-w-[220px]">
              You have explored the complete Proyects collection.
            </p>
            <button
              onClick={() => goToPage(2)}
              className="mt-3 px-4 py-2 rounded-lg text-xs font-serif bg-white/60 hover:bg-white/90 text-[#381E2F] transition-all border border-[#C481A5] shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
            >
              <span>Return to Table of Contents</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-[#6B3756] border-t border-[#832856]/20 pt-3 w-full relative z-10">
            Ana Ainza • Portfolio Edition
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center text-[#8C7A6B] space-y-3 bg-[#FAF7F2] border border-black/[0.06] rounded-l-md">
          <BookOpen className="w-9 h-9 opacity-40 text-[#B45309]" />
          <div className="font-serif italic text-sm">
            You have explored {book.title}.
          </div>
          <button
            onClick={() => goToPage(2)}
            className="px-3 py-1.5 rounded-lg text-xs font-serif backdrop-blur-xs bg-black/[0.04] hover:bg-black/[0.08] text-[#4A3E34] transition-colors border border-black/[0.08] cursor-pointer"
          >
            Return to Table of Contents
          </button>
        </div>
      );

      const frontPaper = isProjects && i === 0 ? '#e7b5d0' : undefined;
      const backPaper = isProjects && (!backPage || i === leafCount - 1) ? '#e7b5d0' : undefined;

      result.push({
        id: `leaf-${book.id}-${i}`,
        frontContent,
        backContent,
        frontPaper,
        backPaper,
      });
    }

    return result;
  }, [book, dimensions.isMobile]);

  if (!book) return null;

  const totalLeaves = leaves.length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center select-none overflow-hidden">
        {/* Background: Bookshelf and original page remain visible behind the book */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/[0.12] cursor-pointer"
          onClick={onClose}
          aria-label="Click outside to go back to bookshelf"
        />

        {/* Cross on top to go back */}
        <motion.button
          id="close-book-cross-btn"
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed top-4 right-4 sm:top-6 sm:right-8 z-50 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white text-[#1E1B18] shadow-md hover:shadow-lg border border-black/10 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center group"
          title="Go back to bookshelf (Esc)"
          aria-label="Go back to bookshelf"
        >
          <X className="w-5 h-5 text-[#2C2825] group-hover:rotate-90 transition-transform duration-200" />
        </motion.button>

        {/* Minimalist floating left page turn button */}
        {turnedLeafIndex > 0 && (
          <button
            onClick={handlePrevLeaf}
            className="fixed left-3 sm:left-8 top-1/2 -translate-y-1/2 z-40 p-2.5 sm:p-3 rounded-full bg-white/85 hover:bg-white text-[#2C2825] shadow-md hover:shadow-lg border border-black/10 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            title="Previous Page (← or drag right)"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Minimalist floating right page turn button */}
        {turnedLeafIndex < totalLeaves && (
          <button
            onClick={handleNextLeaf}
            className="fixed right-3 sm:right-8 top-1/2 -translate-y-1/2 z-40 p-2.5 sm:p-3 rounded-full bg-white/85 hover:bg-white text-[#2C2825] shadow-md hover:shadow-lg border border-black/10 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            title="Next Page (→ or drag left)"
            aria-label="Next Page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* The Open Book itself (NO enclosing boxes, frames, or bars around it) */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          className="relative z-30 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <PageFlip
            pages={leaves}
            pageWidth={dimensions.width}
            pageHeight={dimensions.height}
            pageRadius={8}
            pageColor="#FAF7F2"
            perspective={1500}
            spineShift={dimensions.isMobile ? 0 : dimensions.width / 2}
            duration={0.55}
            shadow={0.35}
            currentPageIndex={turnedLeafIndex}
            onPageChange={(newIdx) => setTurnedLeafIndex(newIdx)}
            interactive={true}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OpenBookModal;
