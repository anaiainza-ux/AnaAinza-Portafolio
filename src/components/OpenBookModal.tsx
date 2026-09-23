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
  ArrowLeft,
  Bookmark,
  ExternalLink,
} from 'lucide-react';

interface OpenBookModalProps {
  book: Book | null;
  allBooks: Book[];
  initialPage?: number;
  onClose: () => void;
  onSelectBook: (book: Book, targetPage?: number) => void;
}

const SHELF_ORDER = ['hacks', 'systems', 'analysis', 'ventures', 'early-years', 'origins', 'hobbies'];

export const OpenBookModal: React.FC<OpenBookModalProps> = ({
  book,
  allBooks,
  initialPage,
  onClose,
  onSelectBook,
}) => {
  // turnedLeafIndex: 0 = closed cover/TOC, 1 = Page 2/3, etc.
  const [turnedLeafIndex, setTurnedLeafIndex] = useState<number>(() => {
    if (initialPage && initialPage > 1) {
      return Math.floor(initialPage / 2);
    }
    return 0;
  });
  const [mobilePageIndex, setMobilePageIndex] = useState<number>(() => initialPage || 1);
  const [startAtEnd, setStartAtEnd] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const [dimensions, setDimensions] = useState({
    width: 400,
    height: 590,
    isMobile: false,
  });

  // Shelf navigation mapping
  const currentShelfIndex = useMemo(() => {
    if (!book) return -1;
    const idx = SHELF_ORDER.indexOf(book.id);
    if (idx !== -1) return idx;
    if (book.id === 'school') return SHELF_ORDER.indexOf('analysis');
    return SHELF_ORDER.findIndex(
      (id) => book.id.toLowerCase().includes(id) || book.title.toLowerCase().includes(id)
    );
  }, [book]);

  const prevBook = useMemo(() => {
    if (currentShelfIndex === -1 || !allBooks?.length) return null;
    const prevIdx = (currentShelfIndex - 1 + SHELF_ORDER.length) % SHELF_ORDER.length;
    const targetId = SHELF_ORDER[prevIdx];
    return (
      allBooks.find((b) => b.id === targetId || b.id.toLowerCase().includes(targetId)) || null
    );
  }, [currentShelfIndex, allBooks]);

  const nextBook = useMemo(() => {
    if (currentShelfIndex === -1 || !allBooks?.length) return null;
    const nextIdx = (currentShelfIndex + 1) % SHELF_ORDER.length;
    const targetId = SHELF_ORDER[nextIdx];
    return (
      allBooks.find((b) => b.id === targetId || b.id.toLowerCase().includes(targetId)) || null
    );
  }, [currentShelfIndex, allBooks]);

  // Dynamically compute book leaf dimensions based on screen size
  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isMob = w < 768;

      if (isMob) {
        // Mobile single leaf scale
        const pageW = Math.min(w - 32, 420);
        const pageH = Math.min(h - 150, 600);
        setDimensions({
          width: Math.max(280, pageW),
          height: Math.max(440, pageH),
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

  // When book opens or changes, start at TOC (or last page if navigating backward, or initialPage)
  useEffect(() => {
    if (book) {
      if (startAtEnd) {
        const maxLeaves = Math.ceil(book.pages.length / 2);
        setTurnedLeafIndex(maxLeaves);
        setMobilePageIndex(book.pages.length);
        setStartAtEnd(false);
      } else if (initialPage && initialPage > 1) {
        setTurnedLeafIndex(Math.floor(initialPage / 2));
        setMobilePageIndex(initialPage);
      } else {
        setTurnedLeafIndex(0);
        setMobilePageIndex(1);
      }
    }
  }, [book?.id, initialPage]);

  // Cross-book transitions
  const goToPrevBook = () => {
    if (!prevBook) return;
    setStartAtEnd(true);
    onSelectBook(prevBook);
  };

  const goToNextBook = () => {
    if (!nextBook) return;
    setStartAtEnd(false);
    onSelectBook(nextBook);
  };

  // Turn page forward (desktop)
  const handleNextLeaf = () => {
    if (!book) return;
    const maxLeaves = Math.ceil(book.pages.length / 2);
    if (turnedLeafIndex >= maxLeaves - 1) {
      goToNextBook();
    } else {
      setTurnedLeafIndex((prev) => Math.min(maxLeaves, prev + 1));
    }
  };

  // Turn page backward (desktop)
  const handlePrevLeaf = () => {
    if (!book) return;
    if (turnedLeafIndex <= 0) {
      goToPrevBook();
    } else {
      setTurnedLeafIndex((prev) => Math.max(0, prev - 1));
    }
  };

  // Mobile page turns
  const handleMobileNext = () => {
    if (!book) return;
    if (mobilePageIndex >= book.pages.length) {
      goToNextBook();
    } else {
      setMobilePageIndex((prev) => prev + 1);
    }
  };

  const handleMobilePrev = () => {
    if (!book) return;
    if (mobilePageIndex <= 1) {
      goToPrevBook();
    } else {
      setMobilePageIndex((prev) => prev - 1);
    }
  };

  // Navigate directly to a specific page number
  const goToPage = (pageNumber: number) => {
    if (!book) return;
    setMobilePageIndex(pageNumber);
    const targetLeaf = pageNumber <= 1 ? 0 : Math.floor(pageNumber / 2);
    setTurnedLeafIndex(targetLeaf);
  };

  // Keyboard navigation (Arrow keys & Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!book) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (dimensions.isMobile) {
          handleMobileNext();
        } else {
          handleNextLeaf();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (dimensions.isMobile) {
          handleMobilePrev();
        } else {
          handlePrevLeaf();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [book, turnedLeafIndex, mobilePageIndex, dimensions.isMobile, prevBook, nextBook]);

  // Convert book pages into React Bits Pro PageFlip leaves
  const leaves: PageFlipLeaf[] = useMemo(() => {
    if (!book) return [];

    const isSecurity =
      book.id === 'early-years' ||
      book.id === 'security' ||
      book.title.toLowerCase().includes('security');
    const isHacks = book.id === 'hacks' || book.id === 'projects' || book.title.toLowerCase().includes('hack');
    const isSystems = book.id === 'systems' || book.title.toLowerCase().includes('system');
    const isCraft = book.id === 'hobbies' || book.id === 'craft' || book.title.toLowerCase().includes('craft');
    const isOrigins = book.id === 'origins' || book.id === 'research' || book.title.toLowerCase().includes('origin');
    const isVentures = book.id === 'ventures' || book.title.toLowerCase().includes('venture');
    const isAnalysis = book.id === 'analysis' || book.id === 'school' || book.title.toLowerCase().includes('analysis');

    const pageCount = book.pages.length;
    const leafCount = isSecurity ? 2 : isOrigins ? 3 : Math.ceil(pageCount / 2);
    const result: PageFlipLeaf[] = [];

    for (let i = 0; i < leafCount; i++) {
      const frontPageNum = i * 2 + 1;
      const backPageNum = i * 2 + 2;

      const frontPage = book.pages.find((p) => p.pageNumber === frontPageNum);
      const backPage = book.pages.find((p) => p.pageNumber === backPageNum);

      // Front of Leaf
      const frontContent = frontPage ? (
        i === 0 ? (
          // Book Cover (Page 1)
          isHacks ? (
            <div className="h-full flex flex-col justify-between p-6 sm:p-7 bg-[#C05C38] text-[#FAF5EE] border border-[#8C3B1E] rounded-l-md shadow-inner select-none relative overflow-hidden">
              {/* Elegant debossed decorative frame & diamond ornament */}
              <div className="absolute inset-3 border border-[#FED7AA]/25 rounded-xs pointer-events-none" />
              <div className="absolute inset-4 border border-[#FED7AA]/15 rounded-xs pointer-events-none" />

              <div className="space-y-2.5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-3.5 h-3.5 border-2 border-[#FED7AA] rotate-45 shadow-xs" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#FED7AA] font-semibold">
                    Volume {book.romanNumeral ?? 'I'}
                  </span>
                </div>
                <div className="pt-2">
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#FED7AA] font-bold">
                    HACKATHONS
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFF5EE] tracking-tight mt-0.5">
                    Table of Contents
                  </h1>
                  <p className="text-xs sm:text-sm font-sans italic text-[#FDE6D2] mt-1">
                    Two builds. Two wins. Both under 48 hours.
                  </p>
                </div>

                {/* Table of Contents List */}
                <div className="pt-3 space-y-2">
                  {book.tableOfContents.map((entry, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPage(entry.pageNumber);
                      }}
                      className="w-full text-left p-2.5 rounded-lg bg-black/15 hover:bg-black/25 border border-[#FED7AA]/30 transition-all text-xs group cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <div className="flex items-center gap-1.5 font-serif font-bold text-sm text-[#FFF5EE]">
                          <span className="text-[#FED7AA] font-mono text-xs">›</span>
                          <span>{entry.sectionTitle}</span>
                          {entry.badge && (
                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                              {entry.badge}
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs text-[#FED7AA] group-hover:underline">
                          p. {entry.pageNumber}
                        </span>
                      </div>
                      {entry.description && (
                        <p className="text-[11px] text-[#FDE6D2]/80 italic pl-3 mt-1 font-sans">
                          {entry.description}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#FED7AA]/25 relative z-10">
                <div className="flex items-center gap-2 text-xs font-serif text-[#FED7AA]">
                  <span className="font-medium">Ana Ainza</span>
                  <span>•</span>
                  <span>Hackathons Edition</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#FFF5EE] bg-black/20 backdrop-blur-xs border border-[#FED7AA]/30 rounded-lg px-3 py-1.5 shadow-xs">
                  <MoveHorizontal className="w-3.5 h-3.5 animate-pulse text-[#FED7AA]" />
                  <span>Drag page or click to open</span>
                </div>
              </div>
            </div>
          ) : isSystems ? (
            <div className="h-full flex flex-col justify-between p-6 sm:p-7 bg-gradient-to-br from-[#2D4556] to-[#1C2F3D] text-[#FAF7F2] border border-[#437699] rounded-l-md shadow-inner select-none relative overflow-hidden">
              {/* Technical debossed frame */}
              <div className="absolute inset-3 border border-[#6096BA]/25 rounded-xs pointer-events-none" />
              <div className="absolute inset-4 border border-[#C8EAD3]/15 rounded-xs pointer-events-none" />

              <div className="space-y-2.5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-3.5 h-3.5 border-2 border-[#C8EAD3] rotate-45 shadow-xs" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#C8EAD3] font-semibold">
                    Volume {book.romanNumeral ?? 'II'}
                  </span>
                </div>
                <div className="pt-2">
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#93C5FD] font-bold">
                    SYSTEMS
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight mt-0.5">
                    Table of Contents
                  </h1>
                  <p className="text-xs sm:text-sm font-sans italic text-[#E2E8F0]/85 mt-1">
                    Two systems built to actually run.
                  </p>
                </div>

                {/* Table of Contents List */}
                <div className="pt-3 space-y-2">
                  {book.tableOfContents.map((entry, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPage(entry.pageNumber);
                      }}
                      className="w-full text-left p-2.5 rounded-lg bg-black/20 hover:bg-black/35 border border-[#6096BA]/35 transition-all text-xs group cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <div className="flex items-center gap-1.5 font-serif font-bold text-sm text-white">
                          <span className="text-[#C8EAD3] font-mono text-xs">›</span>
                          <span>{entry.sectionTitle}</span>
                          {entry.badge && (
                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#EDF4F9] text-[#245370] border border-[#CCE0ED]">
                              {entry.badge}
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs text-[#C8EAD3] group-hover:underline">
                          p. {entry.pageNumber}
                        </span>
                      </div>
                      {entry.description && (
                        <p className="text-[11px] text-[#E2E8F0]/80 italic pl-3 mt-1 font-sans">
                          {entry.description}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#6096BA]/30 relative z-10">
                <div className="flex items-center gap-2 text-xs font-serif text-[#C8EAD3]">
                  <span className="font-medium">Ana Ainza</span>
                  <span>•</span>
                  <span>Systems Edition</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#E2E8F0] bg-black/25 backdrop-blur-xs border border-white/20 rounded-lg px-3 py-1.5 shadow-xs">
                  <MoveHorizontal className="w-3.5 h-3.5 animate-pulse text-[#C8EAD3]" />
                  <span>Drag page or click to open</span>
                </div>
              </div>
            </div>
          ) : isCraft ? (
            <div className="h-full flex flex-col justify-between p-6 sm:p-8 bg-[#e7b5d0] text-[#381E2F] border border-[#C481A5] rounded-l-md shadow-inner select-none relative overflow-hidden">
              {/* Elegant debossed decorative frame matching CRAFT stitched theme */}
              <div className="absolute inset-3 border border-[#832856]/20 rounded-xs pointer-events-none" />
              <div className="absolute inset-4 border border-[#832856]/15 rounded-xs pointer-events-none" />

              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-3.5 h-3.5 border-2 border-[#832856] rotate-45 shadow-xs" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#6B3756] font-semibold">
                    Volume {book.romanNumeral ?? 'VII'}
                  </span>
                </div>
                <div className="pt-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#832856] font-bold">
                    INDEX
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#381E2F] tracking-tight mt-0.5">
                    Table of Contents
                  </h1>
                  <p className="text-xs sm:text-sm font-sans italic text-[#5C2D49] mt-1">
                    What I build with. Who I am outside of it.
                  </p>
                </div>

                {/* Scannable TOC Links on the opening page */}
                <div className="space-y-2 pt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPage(2);
                    }}
                    className="w-full flex items-center justify-between text-left p-2.5 rounded-lg bg-white/55 hover:bg-white/85 border border-[#832856]/20 transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[#832856] font-bold text-sm">›</span>
                      <span className="font-serif font-semibold text-xs sm:text-sm text-[#381E2F] group-hover:text-[#832856]">
                        Technical Arsenal
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#6B3756] font-medium">p. 2</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPage(3);
                    }}
                    className="w-full flex items-center justify-between text-left p-2.5 rounded-lg bg-white/55 hover:bg-white/85 border border-[#832856]/20 transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[#832856] font-bold text-sm">›</span>
                      <span className="font-serif font-semibold text-xs sm:text-sm text-[#381E2F] group-hover:text-[#832856]">
                        Creative Practice
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#6B3756] font-medium">p. 3</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#832856]/20 relative z-10">
                <div className="flex items-center gap-2 text-xs font-serif text-[#6B3756]">
                  <span className="font-medium">Ana Ainza</span>
                  <span>•</span>
                  <span>Craft Edition</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#832856] bg-white/40 backdrop-blur-xs border border-[#832856]/25 rounded-lg px-3 py-2 shadow-xs">
                  <MoveHorizontal className="w-3.5 h-3.5 animate-pulse text-[#832856]" />
                  <span>Drag page or click to open</span>
                </div>
              </div>
            </div>
          ) : isOrigins ? (
            <div className="h-full flex flex-col justify-between p-6 sm:p-7 bg-[#C8EAD3] text-[#482728] border border-[#9DC5AA] rounded-l-md shadow-inner select-none relative overflow-hidden">
              {/* Elegant debossed decorative frame & diamond ornament */}
              <div className="absolute inset-3 border border-[#482728]/20 rounded-xs pointer-events-none" />
              <div className="absolute inset-4 border border-[#482728]/12 rounded-xs pointer-events-none" />

              <div className="space-y-2.5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-3.5 h-3.5 border-2 border-[#482728] rotate-45 shadow-xs" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#482728] font-bold">
                    Volume {book.romanNumeral ?? 'VI'}
                  </span>
                </div>
                <div className="pt-2">
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full font-semibold border bg-white/50 text-[#482728] border-[#482728]/20">
                    ORIGINS · FOUNDATION
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#381E20] tracking-tight mt-1">
                    Table of Contents
                  </h1>
                  <p className="text-xs sm:text-sm font-serif italic text-[#593032] mt-1">
                    Where it all began.
                  </p>
                </div>

                {/* Table of Contents List */}
                <div className="pt-2 space-y-2">
                  {book.tableOfContents.map((entry, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPage(entry.pageNumber);
                      }}
                      className="w-full text-left p-2.5 rounded-lg bg-white/50 hover:bg-white/75 border border-[#482728]/20 transition-all text-xs group cursor-pointer shadow-2xs"
                    >
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <div className="flex items-center gap-1.5 font-serif font-bold text-sm text-[#2E1819]">
                          <span className="text-[#6B3739] font-mono text-xs">›</span>
                          <span>{entry.sectionTitle}</span>
                          {entry.badge && (
                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#FAF5EE] text-[#5C3D28] border border-[#DDD0BE]">
                              {entry.badge}
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs text-[#593032] group-hover:underline">
                          p. {entry.pageNumber}
                        </span>
                      </div>
                      {entry.description && (
                        <p className="text-[11px] text-[#5C383A] italic pl-3 mt-1 font-serif">
                          {entry.description}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#482728]/20 relative z-10">
                <div className="flex items-center gap-2 text-xs font-serif text-[#482728]">
                  <span className="font-medium">Ana Ainza</span>
                  <span>•</span>
                  <span>Origins Edition</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#381E20] bg-white/35 backdrop-blur-xs border border-[#482728]/20 rounded-lg px-3 py-1.5 shadow-xs">
                  <MoveHorizontal className="w-3.5 h-3.5 animate-pulse text-[#482728]" />
                  <span>Drag page or click to open</span>
                </div>
              </div>
            </div>
          ) : isVentures ? (
            <div className="h-full flex flex-col justify-between p-5 sm:p-7 bg-[#E7B5D0] text-[#482728] border border-[#C48CA9] rounded-l-md shadow-inner select-none relative overflow-hidden">
              {/* Elegant debossed decorative frame & diamond ornament */}
              <div className="absolute inset-3 border border-[#482728]/20 rounded-xs pointer-events-none" />
              <div className="absolute inset-4 border border-[#482728]/15 rounded-xs pointer-events-none" />

              <div className="space-y-2 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-3.5 h-3.5 border-2 border-[#482728] rotate-45 shadow-xs" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#482728] font-semibold">
                    Volume {book.romanNumeral ?? 'IV'}
                  </span>
                </div>
                <div className="pt-1.5">
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#482728] font-bold">
                    VENTURES · FOUNDER
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3B1920] tracking-tight mt-0.5">
                    Table of Contents
                  </h1>
                  <p className="text-xs sm:text-sm font-sans italic text-[#593038] mt-0.5">
                    Things I built, led, and launched.
                  </p>
                </div>

                {/* Table of Contents List */}
                <div className="pt-1 space-y-1.5 sm:space-y-2">
                  {book.tableOfContents.map((entry, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPage(entry.pageNumber);
                      }}
                      className="w-full text-left p-2 sm:p-2.5 rounded-lg bg-white/55 hover:bg-white/80 border border-[#482728]/20 transition-all text-xs group cursor-pointer shadow-2xs"
                    >
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <div className="flex items-center gap-1.5 font-serif font-bold text-sm text-[#2E181D]">
                          <span className="text-[#6B3742] font-mono text-xs">›</span>
                          <span>{entry.sectionTitle}</span>
                          {entry.badge && (
                            <span
                              className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${
                                entry.badge.includes('Live')
                                  ? 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0] flex items-center gap-1 font-semibold'
                                  : 'bg-[#FAF0F5] text-[#59223A] border-[#E0B8CE]'
                              }`}
                            >
                              {entry.badge.includes('Live') && (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              )}
                              <span>{entry.badge}</span>
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs text-[#593038] group-hover:underline">
                          p. {entry.pageNumber}
                        </span>
                      </div>
                      {entry.description && (
                        <p className="text-[11px] text-[#5C3842] italic pl-3 mt-0.5 font-sans">
                          {entry.description}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#482728]/20 relative z-10">
                <div className="flex items-center gap-2 text-xs font-serif text-[#482728]">
                  <span className="font-medium">Ana Ainza</span>
                  <span>•</span>
                  <span>Ventures Edition</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#3B1920] bg-white/40 backdrop-blur-xs border border-[#482728]/20 rounded-lg px-3 py-1.5 shadow-xs">
                  <MoveHorizontal className="w-3.5 h-3.5 animate-pulse text-[#482728]" />
                  <span>Drag page or click to open</span>
                </div>
              </div>
            </div>
          ) : isAnalysis ? (
            <div className="h-full flex flex-col justify-between p-5 sm:p-7 md:p-8 bg-[#B6C8A9] text-[#242E22] border-r border-black/15 shadow-inner select-none relative overflow-hidden">
              <div className="absolute inset-2 border border-[#482728]/20 rounded pointer-events-none" />
              <div className="absolute inset-3 border border-[#482728]/10 rounded pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between border-b border-[#482728]/20 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#482728] font-bold">
                      VOLUME {book.romanNumeral ?? 'III'}
                    </span>
                    <span className="text-[#482728]/40">•</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#482728]/80 font-semibold px-2 py-0.5 rounded bg-white/30 border border-[#482728]/20">
                      DATA & DECISIONS
                    </span>
                  </div>
                  <Bookmark className="w-4 h-4 text-[#482728]/60" />
                </div>

                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3B1920] tracking-tight">
                    Table of Contents
                  </h1>
                  <p className="text-xs sm:text-sm font-serif italic text-[#482728]/90">
                    Real data. Real decisions. Real impact.
                  </p>
                </div>

                <div className="space-y-2 pt-1 font-sans">
                  {book.tableOfContents.map((entry, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToPage(entry.pageNumber)}
                      className="w-full text-left p-2.5 rounded-lg bg-white/45 hover:bg-white/75 transition-all border border-[#482728]/20 shadow-2xs group cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-sm text-[#3B1920] group-hover:text-[#1F0C10]">
                            {entry.sectionTitle}
                          </span>
                          {entry.badge && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/60 text-[#3B1920] border border-[#482728]/25 font-semibold">
                              {entry.badge}
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs text-[#482728] group-hover:underline">
                          p. {entry.pageNumber}
                        </span>
                      </div>
                      {entry.description && (
                        <div className="text-[11.5px] text-[#482728]/85 font-sans mt-0.5">
                          {entry.description}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#482728]/20 relative z-10">
                <div className="flex items-center gap-2 text-xs font-serif text-[#482728]">
                  <span className="font-medium">Ana Ainza</span>
                  <span>•</span>
                  <span>Analysis Edition</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#3B1920] bg-white/40 backdrop-blur-xs border border-[#482728]/20 rounded-lg px-3 py-1.5 shadow-xs">
                  <MoveHorizontal className="w-3.5 h-3.5 animate-pulse text-[#482728]" />
                  <span>Drag page or click to open</span>
                </div>
              </div>
            </div>
          ) : isSecurity ? (
            <div className="h-full flex flex-col justify-between p-6 sm:p-7 md:p-8 bg-[#482728] text-[#FAF5EE] border border-[#2C1718] rounded-l-md shadow-inner select-none relative overflow-hidden">
              {/* Restrained academic debossed frame */}
              <div className="absolute inset-3 border border-[#C8EAD3]/20 rounded-xs pointer-events-none" />
              <div className="absolute inset-4 border border-[#C8EAD3]/10 rounded-xs pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between border-b border-[#C8EAD3]/20 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#C8EAD3] font-bold">
                      VOLUME {book.romanNumeral ?? 'V'}
                    </span>
                    <span className="text-[#C8EAD3]/40">•</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#C8EAD3]/80 font-semibold px-2 py-0.5 rounded bg-black/25 border border-[#C8EAD3]/20">
                      RESEARCH
                    </span>
                  </div>
                  <Bookmark className="w-4 h-4 text-[#C8EAD3]/70" />
                </div>

                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                    Table of Contents
                  </h1>
                  <p className="text-xs sm:text-sm font-serif italic text-[#E5DDD0]/85">
                    Research in progress. More soon.
                  </p>
                </div>

                {/* Table of Contents Entry */}
                <div className="pt-2">
                  {book.tableOfContents.map((entry, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPage(entry.pageNumber);
                      }}
                      className="w-full text-left p-3.5 rounded-lg bg-black/25 hover:bg-black/40 transition-all border border-[#C8EAD3]/25 shadow-2xs group cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <div className="flex items-center gap-2 font-serif font-bold text-sm sm:text-base text-white">
                          <span className="text-[#C8EAD3] font-mono text-xs">›</span>
                          <span className="group-hover:text-[#C8EAD3] transition-colors">{entry.sectionTitle}</span>
                          {entry.badge && (
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D]">
                              {entry.badge}
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs text-[#C8EAD3] group-hover:underline">
                          p. {entry.pageNumber}
                        </span>
                      </div>
                      {entry.description && (
                        <p className="text-xs text-[#FAF5EE]/75 italic pl-4 mt-1 font-serif">
                          {entry.description}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#C8EAD3]/20 relative z-10">
                <div className="flex items-center gap-2 text-xs font-serif text-[#C8EAD3]">
                  <span className="font-medium">Ana Ainza</span>
                  <span>•</span>
                  <span>Security Edition</span>
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPage(2);
                  }}
                  className="flex items-center gap-2 text-[11px] font-mono text-[#E5DDD0] bg-black/30 hover:bg-black/45 cursor-pointer backdrop-blur-xs border border-white/15 rounded-lg px-3 py-1.5 shadow-xs transition-colors"
                >
                  <MoveHorizontal className="w-3.5 h-3.5 animate-pulse text-[#C8EAD3]" />
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
      ) : isSecurity ? (
        <div className="h-full flex flex-col justify-between items-center p-8 text-center text-[#FAF5EE] bg-[#482728] border border-[#2C1718] rounded-r-md relative overflow-hidden select-none">
          <div className="absolute inset-3 border border-[#C8EAD3]/20 rounded pointer-events-none" />
          <div className="absolute inset-4 border border-[#C8EAD3]/10 rounded pointer-events-none" />

          <div className="font-mono text-xs uppercase tracking-widest text-[#C8EAD3] pt-2 relative z-10 font-bold">
            Volume V • Research Edition
          </div>

          <div className="space-y-4 relative z-10 flex flex-col items-center my-auto">
            <div className="w-12 h-12 rounded-full bg-black/25 border border-[#C8EAD3]/30 flex items-center justify-center shadow-xs">
              <BookOpen className="w-6 h-6 text-[#C8EAD3]" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
              Security
            </h3>
            <p className="font-serif italic text-xs max-w-xs text-[#E5DDD0]/90 leading-relaxed">
              "Cybersecurity for AI coding agents — Purdue University TSEL Lab."
            </p>
            <div className="pt-2">
              <button
                onClick={() => goToPage(1)}
                className="px-4 py-2 rounded-lg text-xs font-serif bg-black/30 hover:bg-black/50 text-[#FAF5EE] transition-all border border-[#C8EAD3]/30 shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
              >
                <span>Return to Table of Contents</span>
              </button>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#C8EAD3] border-t border-[#C8EAD3]/20 pt-3 w-full relative z-10">
            Visiting Researcher · Purdue University TSEL · Fall 2026
          </div>
        </div>
      ) : isOrigins ? (
        <div className="h-full flex flex-col justify-between items-center p-8 text-center text-[#482728] bg-[#C8EAD3] border border-[#9DC5AA] rounded-r-md relative overflow-hidden select-none">
          <div className="absolute inset-3 border border-[#482728]/20 rounded-xs pointer-events-none" />
          <div className="absolute inset-4 border border-[#482728]/12 rounded-xs pointer-events-none" />

          <div className="font-mono text-xs uppercase tracking-widest text-[#482728] pt-2 relative z-10 font-bold">
            Volume VI • Origins Edition
          </div>

          <div className="space-y-4 relative z-10 flex flex-col items-center my-auto">
            <div className="w-12 h-12 rounded-full bg-white/45 border border-[#482728]/25 flex items-center justify-center shadow-xs">
              <BookOpen className="w-6 h-6 text-[#482728]" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#381E20] tracking-tight">
              Origins
            </h3>
            <p className="font-serif italic text-xs max-w-xs text-[#593032] leading-relaxed">
              "The instinct to organize, give back, and build was already there."
            </p>
            <div className="pt-2">
              <button
                onClick={() => goToPage(1)}
                className="px-4 py-2 rounded-lg text-xs font-serif bg-white/55 hover:bg-white/85 text-[#381E20] transition-all border border-[#482728]/30 shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
              >
                <span>Return to Table of Contents</span>
              </button>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#593032] border-t border-[#482728]/20 pt-3 w-full relative z-10">
            Student Leader · Community Volunteer · Builder
          </div>
        </div>
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
      ) : isHacks ? (
        <div className="h-full flex flex-col items-center justify-between p-6 sm:p-8 text-center bg-[#C05C38] text-[#FAF5EE] border border-[#8C3B1E] rounded-l-md shadow-inner select-none relative overflow-hidden">
          {/* Elegant debossed decorative frame */}
          <div className="absolute inset-3 border border-[#FED7AA]/25 rounded-xs pointer-events-none" />
          <div className="absolute inset-4 border border-[#FED7AA]/15 rounded-xs pointer-events-none" />

          <div className="pt-2 relative z-10 flex items-center justify-center gap-2">
            <div className="w-2.5 h-2.5 border border-[#FED7AA] rotate-45" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#FED7AA] font-semibold">
              Volume {book.romanNumeral ?? 'I'} • Concluding Volume
            </span>
            <div className="w-2.5 h-2.5 border border-[#FED7AA] rotate-45" />
          </div>

          <div className="space-y-3 my-auto relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-black/20 border border-[#FED7AA]/30 flex items-center justify-center shadow-xs">
              <BookOpen className="w-6 h-6 text-[#FED7AA]" />
            </div>
            <div className="font-serif font-bold text-xl text-[#FFF5EE]">
              {book.title}
            </div>
            <p className="font-sans italic text-xs text-[#FDE6D2] max-w-[240px]">
              Two builds. Two wins. Both under 48 hours.
            </p>
            <button
              onClick={() => goToPage(1)}
              className="mt-3 px-4 py-2 rounded-lg text-xs font-serif bg-black/20 hover:bg-black/35 text-[#FFF5EE] transition-all border border-[#FED7AA]/40 shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
            >
              <span>Return to Table of Contents</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-[#FED7AA] border-t border-[#FED7AA]/25 pt-3 w-full relative z-10">
            Ana Ainza • Hackathons Edition
          </div>
        </div>
      ) : isSystems ? (
        <div className="h-full flex flex-col items-center justify-between p-6 sm:p-8 text-center bg-gradient-to-br from-[#2D4556] to-[#1C2F3D] text-[#FAF7F2] border border-[#437699] rounded-l-md shadow-inner select-none relative overflow-hidden">
          <div className="absolute inset-3 border border-[#6096BA]/25 rounded-xs pointer-events-none" />
          <div className="absolute inset-4 border border-[#C8EAD3]/15 rounded-xs pointer-events-none" />

          <div className="pt-2 relative z-10 flex items-center justify-center gap-2">
            <div className="w-2.5 h-2.5 border border-[#C8EAD3] rotate-45" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#C8EAD3] font-semibold">
              Volume {book.romanNumeral ?? 'II'} • Concluding Volume
            </span>
            <div className="w-2.5 h-2.5 border border-[#C8EAD3] rotate-45" />
          </div>

          <div className="space-y-3 my-auto relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-[#6096BA]/40 flex items-center justify-center shadow-xs">
              <BookOpen className="w-6 h-6 text-[#C8EAD3]" />
            </div>
            <div className="font-serif font-bold text-xl text-white">
              {book.title}
            </div>
            <p className="font-sans italic text-xs text-[#CBD5E1] max-w-[240px]">
              Two systems built to actually run.
            </p>
            <button
              onClick={() => goToPage(1)}
              className="mt-3 px-4 py-2 rounded-lg text-xs font-serif bg-white/15 hover:bg-white/25 text-white transition-all border border-[#6096BA]/40 shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
            >
              <span>Return to Table of Contents</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-[#94A3B8] border-t border-[#6096BA]/30 pt-3 w-full relative z-10">
            Ana Ainza • Systems Edition
          </div>
        </div>
      ) : isCraft ? (
        <div className="h-full flex flex-col items-center justify-between p-6 sm:p-8 text-center bg-[#e7b5d0] text-[#381E2F] border border-[#C481A5] rounded-l-md shadow-inner select-none relative overflow-hidden">
          <div className="absolute inset-3 border border-[#832856]/20 rounded-xs pointer-events-none" />
          <div className="absolute inset-4 border border-[#832856]/15 rounded-xs pointer-events-none" />

          <div className="pt-2 relative z-10 flex items-center justify-center gap-2">
            <div className="w-2.5 h-2.5 border border-[#832856] rotate-45" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#6B3756] font-semibold">
              Volume {book.romanNumeral ?? 'VII'} • Concluding Volume
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
            <p className="font-sans italic text-xs text-[#5C2D49] max-w-[240px]">
              What I build with. Who I am outside of it.
            </p>
            <button
              onClick={() => goToPage(1)}
              className="mt-3 px-4 py-2 rounded-lg text-xs font-serif bg-white/60 hover:bg-white/90 text-[#381E2F] transition-all border border-[#C481A5] shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
            >
              <span>Return to Table of Contents</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-[#6B3756] border-t border-[#832856]/20 pt-3 w-full relative z-10">
            Ana Ainza • Craft Edition
          </div>
        </div>
      ) : isOrigins ? (
        <div className="h-full flex flex-col items-center justify-between p-6 sm:p-8 text-center bg-[#C8EAD3] text-[#482728] border border-[#9DC5AA] rounded-l-md shadow-inner select-none relative overflow-hidden">
          <div className="absolute inset-3 border border-[#482728]/20 rounded-xs pointer-events-none" />
          <div className="absolute inset-4 border border-[#482728]/12 rounded-xs pointer-events-none" />

          <div className="pt-2 relative z-10 flex items-center justify-center gap-2">
            <div className="w-2.5 h-2.5 border border-[#482728] rotate-45" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#482728] font-semibold">
              Volume {book.romanNumeral ?? 'VI'} • Concluding Volume
            </span>
            <div className="w-2.5 h-2.5 border border-[#482728] rotate-45" />
          </div>

          <div className="space-y-3 my-auto relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/45 border border-[#482728]/25 flex items-center justify-center shadow-xs">
              <BookOpen className="w-6 h-6 text-[#482728]" />
            </div>
            <div className="font-serif font-bold text-xl text-[#381E20]">
              {book.title}
            </div>
            <p className="font-serif italic text-xs text-[#593032] max-w-[240px]">
              Where it all began.
            </p>
            <button
              onClick={() => goToPage(1)}
              className="mt-3 px-4 py-2 rounded-lg text-xs font-serif bg-white/55 hover:bg-white/85 text-[#381E20] transition-all border border-[#482728]/30 shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
            >
              <span>Return to Table of Contents</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-[#593032] border-t border-[#482728]/20 pt-3 w-full relative z-10">
            Ana Ainza • Origins Edition
          </div>
        </div>
      ) : isVentures ? (
        <div className="h-full flex flex-col items-center justify-between p-6 sm:p-8 text-center bg-[#E7B5D0] text-[#482728] border border-[#C48CA9] rounded-l-md shadow-inner select-none relative overflow-hidden">
          <div className="absolute inset-3 border border-[#482728]/20 rounded-xs pointer-events-none" />
          <div className="absolute inset-4 border border-[#482728]/15 rounded-xs pointer-events-none" />

          <div className="pt-2 relative z-10 flex items-center justify-center gap-2">
            <div className="w-2.5 h-2.5 border border-[#482728] rotate-45" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#482728] font-semibold">
              Volume {book.romanNumeral ?? 'IV'} • Concluding Volume
            </span>
            <div className="w-2.5 h-2.5 border border-[#482728] rotate-45" />
          </div>

          <div className="space-y-3 my-auto relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/45 border border-[#482728]/25 flex items-center justify-center shadow-xs">
              <BookOpen className="w-6 h-6 text-[#482728]" />
            </div>
            <div className="font-serif font-bold text-xl text-[#3B1920]">
              {book.title}
            </div>
            <p className="font-sans italic text-xs text-[#593038] max-w-[240px]">
              Things I built, led, and launched.
            </p>
            <button
              onClick={() => goToPage(1)}
              className="mt-3 px-4 py-2 rounded-lg text-xs font-serif bg-white/55 hover:bg-white/85 text-[#381920] transition-all border border-[#482728]/30 shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
            >
              <span>Return to Table of Contents</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-[#593038] border-t border-[#482728]/20 pt-3 w-full relative z-10">
            Ana Ainza • Ventures Edition
          </div>
        </div>
      ) : isAnalysis ? (
        <div className="h-full flex flex-col justify-between items-center p-8 text-center text-[#242E22] bg-[#B6C8A9] border border-black/[0.1] rounded-l-md relative overflow-hidden select-none">
          <div className="absolute inset-2 border border-[#482728]/20 rounded pointer-events-none" />
          <div className="absolute inset-3 border border-[#482728]/10 rounded pointer-events-none" />

          <div className="font-mono text-xs uppercase tracking-widest text-[#482728] pt-2 relative z-10 font-bold">
            Volume {book.romanNumeral ?? 'III'} • Concluding Volume
          </div>

          <div className="space-y-3 relative z-10 flex flex-col items-center">
            <BookOpen className="w-8 h-8 text-[#482728]/70" />
            <h3 className="font-serif text-2xl font-bold text-[#3B1920]">
              Analysis
            </h3>
            <p className="font-serif italic text-xs max-w-xs text-[#482728] leading-relaxed">
              "Real data. Real decisions. Real impact."
            </p>
            <button
              onClick={() => goToPage(1)}
              className="mt-3 px-4 py-2 rounded-lg text-xs font-serif bg-white/55 hover:bg-white/85 text-[#381920] transition-all border border-[#482728]/30 shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
            >
              <span>Return to Table of Contents</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-[#482728] border-t border-[#482728]/20 pt-3 w-full relative z-10">
            Ana Ainza • Analysis Edition
          </div>
        </div>
      ) : isSecurity ? (
        <div className="h-full flex flex-col justify-between items-center p-8 text-center text-[#FAF5EE] bg-[#482728] border border-[#2C1718] rounded-l-md relative overflow-hidden select-none">
          <div className="absolute inset-3 border border-[#C8EAD3]/20 rounded pointer-events-none" />
          <div className="absolute inset-4 border border-[#C8EAD3]/10 rounded pointer-events-none" />

          <div className="font-mono text-xs uppercase tracking-widest text-[#C8EAD3] pt-2 relative z-10 font-bold">
            Volume V • Concluding Volume
          </div>

          <div className="space-y-4 relative z-10 flex flex-col items-center my-auto">
            <div className="w-12 h-12 rounded-full bg-black/25 border border-[#C8EAD3]/30 flex items-center justify-center shadow-xs">
              <BookOpen className="w-6 h-6 text-[#C8EAD3]" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
              Security
            </h3>
            <p className="font-serif italic text-xs max-w-xs text-[#E5DDD0]/90 leading-relaxed">
              "Cybersecurity for AI coding agents — Purdue University TSEL Lab."
            </p>
            <div className="pt-2">
              <button
                onClick={() => goToPage(1)}
                className="px-4 py-2 rounded-lg text-xs font-serif bg-black/30 hover:bg-black/50 text-[#FAF5EE] transition-all border border-[#C8EAD3]/30 shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
              >
                <span>Return to Table of Contents</span>
              </button>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#C8EAD3] border-t border-[#C8EAD3]/20 pt-3 w-full relative z-10">
            Ana Ainza • Security Edition
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

      const frontPaper = isHacks && i === 0 ? '#C05C38' : isSystems && i === 0 ? '#243B4D' : isCraft && i === 0 ? '#e7b5d0' : isOrigins && (i === 0 || !frontPage) ? '#C8EAD3' : isVentures && i === 0 ? '#E7B5D0' : isAnalysis && i === 0 ? '#B6C8A9' : isSecurity && (i === 0 || !frontPage) ? '#482728' : undefined;
      const backPaper = isHacks && (!backPage || i === leafCount - 1) ? '#C05C38' : isSystems && (!backPage || i === leafCount - 1) ? '#243B4D' : isCraft && (!backPage || i === leafCount - 1) ? '#e7b5d0' : isOrigins && (!backPage || i === leafCount - 1) ? '#C8EAD3' : isVentures && (!backPage || i === leafCount - 1) ? '#E7B5D0' : isAnalysis && (!backPage || i === leafCount - 1) ? '#B6C8A9' : isSecurity && (!backPage || i === leafCount - 1) ? '#482728' : undefined;

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
  const currentMobilePage =
    book.pages.find((p) => p.pageNumber === mobilePageIndex) || book.pages[0];

  // Check if currently visible page(s) has an active live demo link
  const activeLiveLink = useMemo(() => {
    if (!book) return null;

    const getLink = (pageNum: number) => {
      const p = book.pages.find((pg) => pg.pageNumber === pageNum);
      if (!p) return null;
      const l =
        p.hackChapter?.liveLink ||
        p.systemChapter?.liveLink ||
        p.ventureChapter?.liveLink ||
        (p as any).liveLink;
      if (l && l.url) {
        return {
          url: l.url,
          label: l.label || 'Live App',
          title: p.title || p.chapterTitle || book.title,
        };
      }
      return null;
    };

    if (dimensions.isMobile) {
      return getLink(mobilePageIndex);
    } else {
      if (turnedLeafIndex === 0) {
        return getLink(1);
      }
      const leftPageNum = (turnedLeafIndex - 1) * 2 + 2;
      const rightPageNum = turnedLeafIndex * 2 + 1;
      return getLink(rightPageNum) || getLink(leftPageNum);
    }
  }, [book, dimensions.isMobile, mobilePageIndex, turnedLeafIndex]);

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

        {/* Back to Shelf Button at Top Left */}
        <motion.button
          id="back-to-shelf-btn"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed top-3.5 left-3.5 sm:top-6 sm:left-8 z-50 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white/95 hover:bg-white text-[#2C2825] shadow-md hover:shadow-lg border border-black/10 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 group"
          title="Back to Shelf (Esc)"
          aria-label="Back to Shelf"
        >
          <ArrowLeft className="w-4 h-4 text-[#2C2825] group-hover:-translate-x-0.5 transition-transform" />
          <span className="font-mono text-xs sm:text-[13px] font-semibold text-[#2C2825]">
            Back to Shelf
          </span>
        </motion.button>

        {/* Close Button at Top Right */}
        <motion.button
          id="close-book-cross-btn"
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed top-3.5 right-3.5 sm:top-6 sm:right-8 z-50 p-2.5 sm:p-3 rounded-full bg-white/95 hover:bg-white text-[#1E1B18] shadow-md hover:shadow-lg border border-black/10 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center group"
          title="Go back to bookshelf (Esc)"
          aria-label="Go back to bookshelf"
        >
          <X className="w-5 h-5 text-[#2C2825] group-hover:rotate-90 transition-transform duration-200" />
        </motion.button>

        {/* Obvious Floating Top "OPEN LIVE DEMO" Button when viewing any page with a live demo */}
        {activeLiveLink && (
          <motion.a
            key={activeLiveLink.url}
            initial={{ opacity: 0, y: -16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            href={activeLiveLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed top-3.5 sm:top-5 left-1/2 -translate-x-1/2 z-50 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-2xl border-2 border-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 sm:gap-2.5 ring-4 ring-emerald-500/25 group"
            title={`Open Live Demo: ${activeLiveLink.url}`}
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span className="font-mono text-xs sm:text-[13px] font-black uppercase tracking-wider">
              OPEN LIVE DEMO
            </span>
            <span className="font-mono text-[11px] sm:text-xs text-emerald-100 hidden md:inline font-semibold">
              · {activeLiveLink.label}
            </span>
            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        )}

        {/* MOBILE VIEW (< 768px): Dedicated Single-Page Card Reader */}
        {dimensions.isMobile ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.22 }}
            className="relative z-30 w-full max-w-[480px] px-3 flex flex-col items-center pt-10"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX === null) return;
              const deltaX = e.changedTouches[0].clientX - touchStartX;
              if (deltaX < -45) handleMobileNext();
              else if (deltaX > 45) handleMobilePrev();
              setTouchStartX(null);
            }}
          >
            {/* Header info */}
            <div className="w-full flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full ring-1 ring-black/10"
                  style={{ backgroundColor: book.spineColor }}
                />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2C2825]">
                  {book.displayTitle || book.title} · {book.romanNumeral}
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#7A6E64] bg-white/75 px-2 py-0.5 rounded-full border border-black/5">
                Page {mobilePageIndex} of {book.pages.length}
              </span>
            </div>

            {/* Single Page Card (Vertical Scrollable, No Cutoff, Full Width) */}
            <div className="w-full h-[calc(100vh-165px)] max-h-[620px] bg-[#FAF7F2] rounded-xl border border-[#D5CBC0] shadow-xl overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto">
                {currentMobilePage && (
                  <BookPageContent
                    book={book}
                    page={currentMobilePage}
                    onNavigateToPage={goToPage}
                    isMobile={true}
                  />
                )}
              </div>
            </div>

            {/* Mobile Footer Navigation Controls */}
            <div className="w-full flex items-center justify-between mt-2.5 px-0.5">
              <button
                onClick={handleMobilePrev}
                className="px-3 py-1.5 rounded-full bg-white/95 text-[#2C2825] shadow-xs border border-black/10 active:scale-95 transition-all text-xs font-mono font-medium flex items-center gap-1 cursor-pointer"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
                {mobilePageIndex === 1 && prevBook ? (
                  <span style={{ color: prevBook.spineColor }} className="font-semibold">
                    ← {prevBook.displayTitle || prevBook.title}
                  </span>
                ) : (
                  <span>Prev</span>
                )}
              </button>

              {/* Dots indicator */}
              <div className="flex items-center gap-1.5 px-1">
                {book.pages.map((p) => (
                  <button
                    key={p.pageNumber}
                    onClick={() => setMobilePageIndex(p.pageNumber)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      mobilePageIndex === p.pageNumber
                        ? 'w-4 bg-[#4A3E34]'
                        : 'w-1.5 bg-[#D5CBC0] hover:bg-[#8C7A6B]'
                    }`}
                    aria-label={`Go to page ${p.pageNumber}`}
                  />
                ))}
              </div>

              <button
                onClick={handleMobileNext}
                className="px-3 py-1.5 rounded-full bg-white/95 text-[#2C2825] shadow-xs border border-black/10 active:scale-95 transition-all text-xs font-mono font-medium flex items-center gap-1 cursor-pointer"
                aria-label="Next Page"
              >
                {mobilePageIndex === book.pages.length && nextBook ? (
                  <span style={{ color: nextBook.spineColor }} className="font-semibold">
                    {nextBook.displayTitle || nextBook.title} →
                  </span>
                ) : (
                  <span>Next</span>
                )}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* DESKTOP VIEW (>= 768px): 3D PageFlip Spread with Cross-Book Arrows */
          <>
            {/* Minimalist floating left page turn button */}
            <button
              onClick={handlePrevLeaf}
              className={`fixed left-3 sm:left-8 top-1/2 -translate-y-1/2 z-40 rounded-full bg-white/90 hover:bg-white text-[#2C2825] shadow-md hover:shadow-lg border border-black/10 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 group ${
                turnedLeafIndex === 0 ? 'px-3.5 py-2.5' : 'p-2.5 sm:p-3'
              }`}
              title={
                turnedLeafIndex === 0
                  ? `Previous Book: ${prevBook?.displayTitle || prevBook?.title || 'None'}`
                  : 'Previous Page (←)'
              }
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              {turnedLeafIndex === 0 && prevBook && (
                <span
                  className="hidden md:inline font-mono text-xs font-semibold uppercase tracking-wider pr-1"
                  style={{ color: prevBook.spineColor }}
                >
                  Previous: {prevBook.displayTitle || prevBook.title}
                </span>
              )}
            </button>

            {/* Minimalist floating right page turn button */}
            <button
              onClick={handleNextLeaf}
              className={`fixed right-3 sm:right-8 top-1/2 -translate-y-1/2 z-40 rounded-full bg-white/90 hover:bg-white text-[#2C2825] shadow-md hover:shadow-lg border border-black/10 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 group ${
                turnedLeafIndex >= totalLeaves - 1 ? 'px-3.5 py-2.5' : 'p-2.5 sm:p-3'
              }`}
              title={
                turnedLeafIndex >= totalLeaves - 1
                  ? `Next Book: ${nextBook?.displayTitle || nextBook?.title || 'None'}`
                  : 'Next Page (→)'
              }
              aria-label="Next Page"
            >
              {turnedLeafIndex >= totalLeaves - 1 && nextBook && (
                <span
                  className="hidden md:inline font-mono text-xs font-semibold uppercase tracking-wider pl-1"
                  style={{ color: nextBook.spineColor }}
                >
                  Next: {nextBook.displayTitle || nextBook.title}
                </span>
              )}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>

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
                spineShift={dimensions.width / 2}
                duration={0.55}
                shadow={0.35}
                currentPageIndex={turnedLeafIndex}
                onPageChange={(newIdx) => setTurnedLeafIndex(newIdx)}
                interactive={true}
              />
            </motion.div>
          </>
        )}
      </div>
    </AnimatePresence>
  );
};

export default OpenBookModal;
