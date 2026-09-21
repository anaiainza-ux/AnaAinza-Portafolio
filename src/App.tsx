import React, { useState, useEffect } from 'react';
import { BOOKS_DATA } from './data/portfolioData';
import { HANGING_FRAMES_DATA } from './data/framesData';
import { Book } from './types';
import { Header } from './components/Header';
import { Bookshelf } from './components/Bookshelf';
import { InteractivePainting } from './components/InteractivePainting';
import { OpenBookModal } from './components/OpenBookModal';
import GradientCarousel, { ProjectCardData } from './components/GradientCarousel';
import { ThemeToggle } from './components/ThemeToggle';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('portfolio_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return 'light';
    } catch {
      return 'light';
    }
  });

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [initialBookPage, setInitialBookPage] = useState<number>(1);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.body.style.backgroundColor = '#0a0a0a';
      } else {
        document.documentElement.classList.remove('dark');
        document.body.style.backgroundColor = '#FAF7F2';
      }
    } catch {
      // noop
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSelectBook = (book: Book, targetPage?: number) => {
    if (book.isExternalLink && book.externalUrl) {
      window.open(book.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    setInitialBookPage(targetPage || 1);
    setSelectedBook(book);
  };

  const handleReadMoreFromCard = (card: ProjectCardData) => {
    // 1. Crossfade to light mode (300ms ease)
    setTheme('light');

    // 2. Open the designated book after crossfade begins
    setTimeout(() => {
      const targetBook =
        BOOKS_DATA.find(
          (b) =>
            b.id === card.bookId ||
            b.id.toLowerCase().includes(card.bookId.toLowerCase()) ||
            (card.bookId === 'security' && (b.id === 'early-years' || b.title.toLowerCase() === 'security'))
        ) || BOOKS_DATA[0];

      handleSelectBook(targetBook, card.pageNumber || 1);
    }, 280);
  };

  const handleCloseBook = () => {
    setSelectedBook(null);
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen md:h-screen md:overflow-hidden flex flex-col justify-between selection:bg-purple-900/40 relative overflow-x-hidden transition-colors duration-300 ease-out ${
        isDark ? 'bg-[#0a0a0a] text-white' : 'bg-[#FAF7F2] text-[#2C2825]'
      }`}
    >
      {/* Top right fixed Theme Toggle */}
      <ThemeToggle theme={theme} onToggle={handleToggleTheme} />

      {/* Subtle paper grain accent in light mode */}
      {!isDark && (
        <div
          className="fixed inset-0 pointer-events-none opacity-40 z-0 transition-opacity duration-300"
          style={{
            backgroundImage: 'radial-gradient(#E8DFCFC 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      )}

      {/* Main Container */}
      <main className="relative z-10 flex-1 flex flex-col justify-between items-center max-w-[1440px] mx-auto w-full px-3 sm:px-6 h-full min-h-0">
        {/* Header Section (Adapts smoothly to theme) */}
        <div className="w-full relative flex flex-col justify-center items-center pt-1 sm:pt-2 pb-1 shrink-0">
          <Header theme={theme} />
        </div>

        {/* Center Content: Gradient Carousel in Dark Mode / Bookshelf & Paintings in Light Mode */}
        {isDark ? (
          /* DARK MODE: 3D Gradient Carousel */
          <div className="w-full flex-1 flex flex-col justify-center items-center min-h-0 transition-opacity duration-300 ease-out opacity-100">
            <GradientCarousel onReadMoreFromCard={handleReadMoreFromCard} />
          </div>
        ) : (
          /* LIGHT MODE: Classic Bookshelf & Paintings */
          <div className="w-full flex-1 flex flex-col justify-between items-center min-h-0 transition-opacity duration-300 ease-out opacity-100 relative">
            {/* DESKTOP WALL-MOUNTED GALLERY PAINTINGS (viewport >= 768px) */}
            <div className="hidden md:contents">
              {HANGING_FRAMES_DATA.map((painting) => (
                <InteractivePainting
                  key={painting.id}
                  painting={painting}
                  isMobile={false}
                />
              ))}
            </div>

            {/* DESKTOP CENTER BOOKSHELF: Placed with ample breathing room to prevent overlap with wall paintings */}
            <div className="hidden md:flex flex-col justify-end items-center w-full max-w-[700px] lg:max-w-[760px] xl:max-w-[820px] mx-auto flex-1 min-h-0 py-1 overflow-hidden">
              <Bookshelf books={BOOKS_DATA} onSelectBook={handleSelectBook} />
            </div>

            {/* MOBILE LAYOUT (viewport < 768px): Stacked book menu, then 2x2 paintings grid below */}
            <div className="md:hidden flex flex-col items-center w-full px-4 py-3 space-y-5">
              {/* Stacked Books: Colored horizontal bars */}
              <div className="w-full">
                <Bookshelf books={BOOKS_DATA} onSelectBook={handleSelectBook} isMobile={true} />
              </div>

              {/* Paintings: 2x2 grid below book list */}
              <div className="w-full pt-2 pb-3 flex flex-col items-center">
                {/* Subtle uppercase label */}
                <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/40 text-center mb-3 select-none">
                  live projects
                </div>

                <div className="grid grid-cols-2 gap-3.5 w-full max-w-xs mx-auto">
                  {HANGING_FRAMES_DATA.map((painting) => (
                    <InteractivePainting
                      key={painting.id}
                      painting={painting}
                      isMobile={true}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Minimalist Footer Copyright & Information */}
        <footer
          className={`w-full text-center pb-2 pt-1 border-t text-[11px] font-mono flex flex-col sm:flex-row items-center justify-between gap-1.5 max-w-5xl mx-auto px-4 shrink-0 transition-colors duration-300 ${
            isDark ? 'border-white/10 text-white/40' : 'border-[#EFE7DC] text-[#8C7A6B]'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span>Designed & Built with curiosity</span>
            <span>•</span>
            <span>Ana Ainza © {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleTheme}
              className={`transition-colors cursor-pointer flex items-center gap-1 ${
                isDark ? 'hover:text-white' : 'hover:text-[#1E1B18]'
              }`}
            >
              <span>{isDark ? 'Bookshelf Mode' : 'Carousel Mode'}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-sm ${
                  isDark ? 'bg-white/10 text-white/80' : 'bg-[#EAE2D5] text-[#482728]'
                }`}
              >
                {isDark ? 'Light' : 'Dark'}
              </span>
            </button>
            <span>•</span>
            <a
              href="https://github.com/anaiainza-ux"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors underline decoration-dotted ${
                isDark ? 'hover:text-white' : 'hover:text-[#1E1B18]'
              }`}
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/anaainzaacosta"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors underline decoration-dotted ${
                isDark ? 'hover:text-white' : 'hover:text-[#1E1B18]'
              }`}
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </main>

      {/* Interactive Enlarged Open Book Modal (Available in both modes) */}
      {selectedBook && (
        <OpenBookModal
          book={selectedBook}
          allBooks={BOOKS_DATA}
          initialPage={initialBookPage}
          onClose={handleCloseBook}
          onSelectBook={handleSelectBook}
        />
      )}
    </div>
  );
}

