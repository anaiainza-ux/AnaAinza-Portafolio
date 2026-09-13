import React from 'react';
import { Book, BookPage } from '../types';
import { Award, ChevronRight, ExternalLink, Sparkles, Tag } from 'lucide-react';

interface BookPageContentProps {
  book: Book;
  page: BookPage;
  onNavigateToPage: (pageNumber: number) => void;
  isMobile?: boolean;
}

export const BookPageContent: React.FC<BookPageContentProps> = ({
  book,
  page,
  onNavigateToPage,
  isMobile = false,
}) => {
  // 1. Table of Contents Page
  if (page.type === 'toc') {
    return (
      <div className="h-full flex flex-col justify-between p-4 sm:p-7 text-[#2C2825]">
        <div>
          <div className="border-b border-[#E5DDD0] pb-3 mb-5">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#8C7A6B]">
              {page.chapterTitle || 'Directory'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#1E1B18] mt-0.5">
              {page.title}
            </h2>
            {page.subtitle && (
              <p className="text-xs sm:text-sm text-[#7A6B5E] mt-1 font-sans italic">
                {page.subtitle}
              </p>
            )}
          </div>

          <div className="space-y-4">
            {book.tableOfContents.map((entry, idx) => (
              <div key={idx} className="group/section">
                <button
                  onClick={() => onNavigateToPage(entry.pageNumber)}
                  className="w-full flex items-center justify-between text-left py-1 hover:text-[#B45309] transition-colors"
                >
                  <span className="font-serif font-semibold text-sm sm:text-base text-[#2E2822]">
                    {entry.sectionTitle}
                  </span>
                  <div className="flex-1 mx-3 border-b border-dotted border-[#D5CBC0] group-hover/section:border-[#B45309]/50" />
                  <span className="font-mono text-xs text-[#8C7A6B] group-hover/section:text-[#B45309]">
                    Pg. {entry.pageNumber}
                  </span>
                </button>

                {entry.subItems && entry.subItems.length > 0 && (
                  <div className="pl-4 sm:pl-6 pt-1 space-y-1.5">
                    {entry.subItems.map((sub, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => onNavigateToPage(sub.pageNumber)}
                        className="w-full flex items-center justify-between text-left py-1 text-xs sm:text-sm text-[#5C5248] hover:text-[#B45309] transition-colors pl-2 border-l-2 border-[#E5DDD0] hover:border-[#B45309]"
                      >
                        <div className="flex items-center gap-2">
                          <ChevronRight className="w-3 h-3 text-[#B45309]/60" />
                          <span className="font-medium">{sub.title}</span>
                          {sub.badge && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#FAF0E4] text-[#B45309] font-sans border border-[#F3DFC6]">
                              {sub.badge}
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-[11px] text-[#A39282]">
                          p. {sub.pageNumber}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-[#EFE8DC] flex items-center justify-between text-[11px] text-[#8C7A6B] font-mono">
          <span>{book.title}</span>
          <span>Page {page.pageNumber}</span>
        </div>
      </div>
    );
  }

  // 2. Project Detail Page
  if (page.type === 'project' && page.projectData) {
    const p = page.projectData;
    return (
      <div className="h-full flex flex-col justify-between p-4 sm:p-7 text-[#2C2825] overflow-y-auto">
        <div className="space-y-4">
          {/* Header */}
          <div className="border-b border-[#E5DDD0] pb-3">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-[#FAF0E4] text-[#B45309] font-medium border border-[#F3DFC6]">
                {p.category.toUpperCase()} • {p.year || '2024'}
              </span>
              {p.award && (
                <span className="text-[11px] font-sans flex items-center gap-1 text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0] font-medium">
                  <Award className="w-3 h-3" />
                  <span>{p.award}</span>
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#1E1B18] tracking-tight">
              {p.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6B5E] font-sans italic mt-0.5">
              {p.tagline}
            </p>
          </div>

          {/* Description */}
          <div className="text-xs sm:text-sm text-[#3E3832] leading-relaxed font-sans">
            <p>{p.description}</p>
          </div>

          {/* Metrics */}
          {p.metrics && p.metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-2 py-1">
              {p.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="backdrop-blur-xs bg-black/[0.025] hover:bg-black/[0.04] border border-black/[0.08] rounded-lg p-2 text-center transition-colors shadow-2xs"
                >
                  <div className="text-base sm:text-lg font-serif font-bold text-[#1E1B18]">
                    {m.value}
                  </div>
                  <div className="text-[10px] uppercase font-mono text-[#8C7A6B] tracking-wider">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Highlights */}
          {p.highlights && p.highlights.length > 0 && (
            <div className="space-y-1.5 backdrop-blur-xs bg-black/[0.015] border border-black/[0.06] rounded-xl p-3">
              <h4 className="text-[11px] uppercase tracking-wider font-mono font-semibold text-[#8C7A6B]">
                Key Architectural Highlights
              </h4>
              <ul className="space-y-1 text-xs sm:text-sm text-[#4A423A]">
                {p.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#B45309] mt-1 text-xs">✦</span>
                    <span className="leading-snug">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {p.techStack && p.techStack.length > 0 && (
            <div className="pt-1">
              <div className="text-[10px] uppercase tracking-wider font-mono font-semibold text-[#8C7A6B] mb-1.5 flex items-center gap-1">
                <Tag className="w-3 h-3" />
                <span>Technologies</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {p.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2 py-0.5 rounded-md backdrop-blur-xs bg-black/[0.03] text-[#3D352E] font-mono border border-black/[0.08]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {p.links && p.links.length > 0 && (
            <div className="pt-2 flex flex-wrap gap-2">
              {p.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded bg-[#1E1B18] text-[#FAF7F2] hover:bg-[#3E3832] transition-colors shadow-xs"
                >
                  <span>{link.label}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="pt-3 mt-3 border-t border-[#EFE8DC] flex items-center justify-between text-[11px] text-[#8C7A6B] font-mono">
          <span>Chapter: {page.chapterTitle || 'Projects'}</span>
          <span>Page {page.pageNumber}</span>
        </div>
      </div>
    );
  }

  // 3. Narrative Story / Intro / Essay Page
  return (
    <div className="h-full flex flex-col justify-between p-4 sm:p-7 text-[#2C2825] overflow-y-auto">
      <div className="space-y-4">
        <div className="border-b border-[#E5DDD0] pb-3">
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#8C7A6B]">
            {page.chapterTitle || book.title}
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#1E1B18] tracking-tight mt-0.5">
            {page.title}
          </h2>
          {page.subtitle && (
            <p className="text-xs sm:text-sm text-[#7A6B5E] font-sans italic mt-1">
              {page.subtitle}
            </p>
          )}
        </div>

        {page.content && (
          <p className="text-xs sm:text-sm text-[#3E3832] leading-relaxed font-sans whitespace-pre-line">
            {page.content}
          </p>
        )}

        {page.quote && (
          <div className="p-3.5 rounded-lg backdrop-blur-xs bg-[#FAF0E4]/40 border border-black/[0.06] border-l-2 border-l-[#B45309] my-2">
            <p className="text-xs sm:text-sm font-serif italic text-[#6B4B28] leading-snug">
              {page.quote}
            </p>
          </div>
        )}

        {page.items && page.items.length > 0 && (
          <div className="space-y-2.5 pt-1">
            {page.items.map((item, idx) => (
              <div
                key={idx}
                className="backdrop-blur-xs bg-black/[0.02] hover:bg-black/[0.035] border border-black/[0.07] rounded-xl p-3 text-left space-y-1 transition-colors"
              >
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#26211C]">
                    {item.title}
                  </h4>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#FAF0E4] text-[#B45309] font-mono border border-[#F3DFC6]">
                      {item.badge}
                    </span>
                  )}
                </div>
                {item.subtitle && (
                  <div className="text-[11px] font-mono text-[#8C7A6B]">
                    {item.subtitle}
                  </div>
                )}
                <p className="text-xs text-[#52483E] leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-3 mt-3 border-t border-[#EFE8DC] flex items-center justify-between text-[11px] text-[#8C7A6B] font-mono">
        <span>{book.displayTitle}</span>
        <span>Page {page.pageNumber}</span>
      </div>
    </div>
  );
};
