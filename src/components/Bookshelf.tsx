import React from 'react';
import { Book } from '../types';
import { BookSpine } from './BookSpine';
import { Layers, Library } from 'lucide-react';

interface BookshelfProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  mobileViewMode: 'stack' | 'shelf';
  onToggleMobileView: () => void;
}

export const Bookshelf: React.FC<BookshelfProps> = ({
  books,
  onSelectBook,
  mobileViewMode,
  onToggleMobileView,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative">
      {/* Mobile Stack / Shelf Mode Toggle */}
      <div className="sm:hidden flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-serif uppercase tracking-widest text-[#7C6E65]">
          {mobileViewMode === 'stack' ? 'Stacked Library' : 'Bookshelf'}
        </span>
        <button
          onClick={onToggleMobileView}
          className="text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EFE9DF] text-[#4A423B] border border-[#D5CBC0] hover:bg-[#E5DDD0] transition-colors"
          title="Toggle view"
        >
          {mobileViewMode === 'stack' ? (
            <>
              <Library className="w-3.5 h-3.5" />
              <span>Shelf View</span>
            </>
          ) : (
            <>
              <Layers className="w-3.5 h-3.5" />
              <span>Stack View</span>
            </>
          )}
        </button>
      </div>

      {/* MOBILE: Stacked view (books stacked directly on top of each other, reading only the spines) */}
      <div className={`sm:hidden ${mobileViewMode === 'stack' ? 'block' : 'hidden'} w-full max-w-sm mx-auto px-2`}>
        <div className="flex flex-col -space-y-0.5 pb-0">
          {books.map((book, index) => (
            <BookSpine
              key={book.id}
              book={book}
              onSelect={onSelectBook}
              isStackedMobile={true}
              stackIndex={index}
            />
          ))}
        </div>
        {/* Wooden desk surface beneath the mobile book stack */}
        <div className="relative w-full -mt-0.5">
          <div
            className="w-full h-3 rounded-t-sm shadow-inner"
            style={{
              background: 'linear-gradient(180deg, #A86938 0%, #8D4F25 50%, #6E3B19 100%)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.35), 0 3px 6px rgba(0,0,0,0.2)',
            }}
          />
          <div
            className="w-full h-3.5 rounded-b-sm flex items-center justify-between px-3"
            style={{
              background: 'linear-gradient(180deg, #7A3F18 0%, #5B2B0E 60%, #441E08 100%)',
              boxShadow: '0 6px 14px rgba(0,0,0,0.15)',
            }}
          >
            <div className="w-1 h-1 rounded-full bg-[#A86938]/40 shadow-inner" />
            <div className="w-1 h-1 rounded-full bg-[#A86938]/40 shadow-inner" />
          </div>
          <div className="w-4/5 mx-auto h-2 bg-black/10 blur-md rounded-full mt-0.5" />
        </div>
      </div>

      {/* DESKTOP & TABLET SHELF VIEW: Horizontal bookshelf with wooden shelf ledge */}
      <div className={`${mobileViewMode === 'stack' ? 'hidden sm:block' : 'block'} w-full pb-1 pt-1 sm:pt-2`}>
        {/* Books Row */}
        <div className="flex items-end justify-center gap-1.5 sm:gap-3 px-2 sm:px-4 pb-0 overflow-x-auto sm:overflow-visible">
          {books.map((book) => (
            <BookSpine
              key={book.id}
              book={book}
              onSelect={onSelectBook}
              isStackedMobile={false}
            />
          ))}
        </div>

        {/* Real Wooden Shelf Structure */}
        <div className="relative w-full mt-0">
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
