import React from 'react';
import { Book, BookPage, ChapterStat, SkillGroup } from '../types';

interface BookPageContentProps {
  book: Book;
  page: BookPage;
  onNavigateToPage: (pageNumber: number) => void;
  isMobile?: boolean;
}

interface StandardPageData {
  tag: string;
  badge?: {
    label: string;
    type?: string;
  };
  title: string;
  subtitle: string;
  body: string;
  stats?: ChapterStat[];
  sectionLabel?: string;
  bullets?: string[];
  communityItems?: string[];
  roleTagLine: string;
  liveLink?: {
    url: string;
    label: string;
    displayPrompt?: string;
  };
}

export const BookPageContent: React.FC<BookPageContentProps> = ({
  book,
  page,
  onNavigateToPage,
}) => {
  // 1. Table of Contents Page
  if (page.type === 'toc') {
    return (
      <div className="h-full flex flex-col justify-between p-4 sm:p-5 text-[#2C2825] select-none">
        <div>
          <div className="border-b border-black/[0.08] pb-2 mb-3 sm:mb-4">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#8C7A6B]">
              {page.chapterTitle || 'INDEX'}
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#1E1B18] mt-0.5">
              {page.title}
            </h2>
            {page.subtitle && (
              <p className="text-[12.5px] sm:text-[13px] text-[#7A6B5E] mt-0.5 font-sans italic">
                {page.subtitle}
              </p>
            )}
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {book.tableOfContents.map((entry, idx) => (
              <div key={idx} className="group/section">
                <button
                  onClick={() => onNavigateToPage(entry.pageNumber)}
                  className="w-full flex items-center justify-between text-left py-0.5 hover:text-[#B45309] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <span className="font-serif font-semibold text-[13px] sm:text-sm text-[#2E2822]">
                      {entry.sectionTitle}
                    </span>
                    {entry.badge && (
                      <span
                        className={`text-[9.5px] font-mono px-2 py-0.2 rounded-full border ${
                          entry.badge.includes('Live')
                            ? 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0] font-bold shadow-2xs'
                            : entry.badge.includes('In Progress')
                            ? 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D] font-semibold'
                            : entry.badge.includes('1st')
                            ? 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]'
                            : 'bg-black/[0.04] text-[#495057] border-black/[0.08]'
                        }`}
                      >
                        {entry.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 mx-2 border-b border-dotted border-black/15 group-hover/section:border-[#B45309]/50" />
                  <span className="font-mono text-xs text-[#8C7A6B] group-hover/section:text-[#B45309]">
                    p. {entry.pageNumber}
                  </span>
                </button>
                {entry.description && (
                  <p className="text-[11px] sm:text-[11.5px] text-[#7A6E64] font-sans italic pl-1 mt-0.5 leading-snug">
                    {entry.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-black/[0.06] mt-auto">
          <div className="text-[10.5px] sm:text-[11px] font-mono text-[#8C7A6B]">
            {book.title} · {book.romanNumeral}
          </div>
        </div>
      </div>
    );
  }

  // 2. Intro / Title Page / Closing Page
  if (page.type === 'intro') {
    return (
      <div className="h-full flex flex-col justify-between p-4 sm:p-5 text-[#2C2825] select-none">
        <div className="flex flex-col gap-2 flex-1 justify-center">
          <div className="text-[10px] font-mono tracking-widest uppercase text-[#8C7A6B]">
            {book.title} · {page.chapterTitle}
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#1E1B18] tracking-tight">
            {page.title}
          </h1>
          {page.subtitle && (
            <p className="text-[13px] sm:text-sm font-sans italic text-[#7A6B5E]">
              {page.subtitle}
            </p>
          )}
          <div className="border-b border-black/[0.08] my-1" />
          {page.content && (
            <p className="text-[12.5px] sm:text-[13px] font-sans text-[#3E3832] leading-relaxed max-w-md">
              {page.content}
            </p>
          )}
        </div>
        <div className="pt-2 border-t border-black/[0.06] mt-auto">
          <div className="text-[11px] font-mono text-[#8C7A6B]">
            Book {book.romanNumeral}
          </div>
        </div>
      </div>
    );
  }

  // 3. Technical Arsenal Page (Book VII, Page 2)
  if (page.type === 'technical-arsenal' && page.technicalArsenal) {
    const data = page.technicalArsenal;
    return (
      <div className="h-full flex flex-col justify-between p-4 sm:p-5 text-[#2C2825] select-none">
        <div className="flex flex-col gap-1.5 sm:gap-2 flex-1">
          {/* 1. TAG PILL */}
          <div>
            <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full font-semibold border bg-[#F5EFEA] text-[#5C4533] border-[#DFD3C3]">
              {data.tag}
            </span>
          </div>

          {/* 3. TITLE */}
          <h2 className="text-[20px] sm:text-[24px] font-serif font-bold text-[#1E1B18] tracking-tight leading-tight">
            {data.title}
          </h2>

          {/* 4. SUBTITLE */}
          <p className="text-[12.5px] sm:text-[13px] text-[#7A6B5E] font-sans italic leading-snug">
            {data.subtitle}
          </p>

          {/* 5. DIVIDER */}
          <div className="border-b border-black/[0.08]" />

          {/* 6. BODY */}
          <p className="text-[12.5px] sm:text-[13px] text-[#3E3832] font-sans leading-relaxed">
            {data.body}
          </p>

          {/* SKILLS GRID (NO levels, NO bars, ONLY specified skills) */}
          <div className="space-y-1.5 sm:space-y-2 pt-1">
            {data.groups.map((group: SkillGroup, idx: number) => (
              <div key={idx} className="space-y-0.5 sm:space-y-1">
                <div className="text-[9.5px] sm:text-[10px] uppercase font-mono font-semibold tracking-wider text-[#8C7A6B]">
                  {group.groupName}
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {group.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10.5px] sm:text-[11px] font-mono px-2 py-0.5 rounded-md bg-black/[0.03] border border-black/[0.08] text-[#2C2825]"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 10. ROLE LINE */}
        <div className="pt-2 border-t border-black/[0.06] mt-auto">
          <div className="text-[11px] font-mono text-[#7A6E64] flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-[#8C7A6B]">ROLE:</span>
            <span>{data.roleTagLine}</span>
          </div>
        </div>
      </div>
    );
  }

  // 4. Standard Chapter Format
  let standardData: StandardPageData | null = null;

  if (page.type === 'hack-chapter' && page.hackChapter) {
    const ch = page.hackChapter;
    standardData = {
      tag: ch.tag,
      badge: ch.badge,
      title: ch.title,
      subtitle: ch.subtitle,
      body: ch.body,
      stats: ch.stats || (ch.metrics as any),
      sectionLabel: ch.sectionLabel || 'HIGHLIGHTS',
      bullets: ch.highlights,
      roleTagLine: ch.roleTagLine,
      liveLink: ch.liveLink,
    };
  } else if (page.type === 'system-chapter' && page.systemChapter) {
    const ch = page.systemChapter;
    standardData = {
      tag: ch.tag,
      badge: ch.badge,
      title: ch.title,
      subtitle: ch.subtitle,
      body: ch.body,
      stats: ch.stats || (ch.metrics as any),
      sectionLabel: ch.sectionLabel || 'ARCHITECTURE',
      bullets: ch.highlights,
      roleTagLine: ch.roleTagLine,
      liveLink: ch.liveLink,
    };
  } else if (page.type === 'analysis-chapter' && page.analysisChapter) {
    const ch = page.analysisChapter;
    standardData = {
      tag: ch.tag,
      badge: ch.badge,
      title: ch.title,
      subtitle: ch.subtitle,
      body: ch.body,
      stats: ch.stats || (ch.statCards as any),
      sectionLabel: ch.sectionLabel || 'HIGHLIGHTS',
      bullets: ch.highlights,
      roleTagLine: ch.roleTagLine,
    };
  } else if (page.type === 'venture-chapter' && page.ventureChapter) {
    const ch = page.ventureChapter;
    standardData = {
      tag: ch.tag,
      badge: ch.badge,
      title: ch.title,
      subtitle: ch.subtitle,
      body: ch.body,
      stats: ch.stats || (ch.metrics as any),
      sectionLabel: ch.sectionLabel || 'HIGHLIGHTS',
      bullets: ch.highlights,
      communityItems: ch.communityItems,
      roleTagLine: ch.roleTagLine,
      liveLink: ch.liveLink,
    };
  } else if (page.type === 'security-chapter' && page.securityChapter) {
    const ch = page.securityChapter;
    standardData = {
      tag: ch.tag,
      badge: ch.badge,
      title: ch.title,
      subtitle: ch.subtitle,
      body: Array.isArray(ch.body) ? ch.body[0] : ch.body,
      stats: ch.stats,
      sectionLabel: ch.sectionLabel !== undefined ? ch.sectionLabel : '',
      bullets: ch.highlights,
      roleTagLine: ch.roleTagLine,
    };
  } else if (page.type === 'origins-chapter' && page.originsChapter) {
    const ch = page.originsChapter;
    standardData = {
      tag: ch.tag,
      badge: ch.badge,
      title: ch.title,
      subtitle: ch.subtitle,
      body: ch.body,
      stats: ch.stats,
      sectionLabel: ch.sectionLabel || 'HIGHLIGHTS',
      bullets: ch.highlights,
      roleTagLine: ch.roleTagLine,
    };
  } else if (page.type === 'creative-practice' && page.creativePractice) {
    const ch = page.creativePractice;
    standardData = {
      tag: ch.tag,
      title: ch.title,
      subtitle: ch.subtitle,
      body: ch.body || '',
      stats: ch.stats,
      sectionLabel: ch.sectionLabel || "WHEN I'M NOT BUILDING",
      bullets: ch.bullets,
      roleTagLine: ch.roleTagLine || '',
    };
  }

  if (standardData) {
    // Theme palette mappings
    let tagClasses = 'bg-[#FDF4EE] text-[#9A3816] border-[#F8CBB8]';
    let badgeClasses = 'bg-black/[0.04] text-[#495057] border-black/[0.08]';
    let bulletColor = 'text-[#C05C38]';

    if (book.id === 'systems') {
      tagClasses = 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]';
      badgeClasses = 'bg-[#EDF4F9] text-[#245370] border-[#CCE0ED]';
      bulletColor = 'text-[#2563EB]';
    } else if (book.id === 'analysis') {
      tagClasses = 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]';
      badgeClasses = 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]';
      bulletColor = 'text-[#15803D]';
    } else if (book.id === 'ventures') {
      tagClasses = 'bg-[#FDF2F8] text-[#9D174D] border-[#FBCFE8]';
      badgeClasses = 'bg-[#FDF2F8] text-[#831843] border-[#F472B6]/40';
      bulletColor = 'text-[#DB2777]';
    } else if (book.id === 'early-years') {
      // Security
      tagClasses = 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]';
      badgeClasses = 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D] font-bold'; // amber (NOT green)
      bulletColor = 'text-[#B45309]';
    } else if (book.id === 'origins') {
      tagClasses = 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]';
      badgeClasses = 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]';
      bulletColor = 'text-[#059669]';
    } else if (book.id === 'hobbies') {
      tagClasses = 'bg-[#FDF4EE] text-[#78350F] border-[#FED7AA]';
      badgeClasses = 'bg-[#F5EFEA] text-[#5C4533] border-[#DFD3C3]';
      bulletColor = 'text-[#9A3816]';
    }

    if (standardData.badge?.type === 'green' || standardData.badge?.label.includes('1st')) {
      badgeClasses = 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0] font-semibold';
    } else if (standardData.badge?.type === 'amber' || standardData.badge?.label.includes('In Progress')) {
      badgeClasses = 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D] font-bold';
    }

    return (
      <div className="h-full flex flex-col justify-between p-4 sm:p-5 text-[#2C2825] select-none">
        <div className="flex flex-col gap-1.5 sm:gap-2 flex-1">
          {/* 1. TAG PILL & 2. BADGE PILL (Header row) */}
          <div className="flex items-center justify-between gap-1.5 flex-wrap">
            <span
              className={`text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full font-semibold border ${tagClasses}`}
            >
              {standardData.tag}
            </span>
            <div className="flex items-center gap-1.5">
              {standardData.badge && (
                <span
                  className={`text-[10.5px] font-mono px-2.5 py-0.5 rounded-full font-medium border ${badgeClasses}`}
                >
                  {standardData.badge.label}
                </span>
              )}
              {standardData.liveLink && (
                <a
                  href={standardData.liveLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-xs transition-all ring-1 ring-emerald-400/40"
                  title={`Open live demo: ${standardData.liveLink.url}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>OPEN DEMO ↗</span>
                </a>
              )}
            </div>
          </div>

          {/* 3. TITLE (max 28px) */}
          <h2 className="text-[20px] sm:text-[24px] font-serif font-bold text-[#1E1B18] tracking-tight leading-tight">
            {standardData.title}
          </h2>

          {/* 4. SUBTITLE (13px italic) */}
          {standardData.subtitle ? (
            <p className="text-[12.5px] sm:text-[13px] text-[#7A6B5E] font-sans italic leading-snug">
              {standardData.subtitle}
            </p>
          ) : null}

          {/* 5. DIVIDER */}
          <div className="border-b border-black/[0.08]" />

          {/* 6. BODY (2 sentences max, 13px) */}
          <p className="text-[12.5px] sm:text-[13px] text-[#3E3832] font-sans leading-relaxed">
            {standardData.body}
          </p>

          {/* 7. STAT CARDS (3 cards, fixed 64px height row) */}
          {standardData.stats && standardData.stats.length > 0 && (
            <div className="h-[64px] grid grid-cols-3 gap-1.5 sm:gap-2">
              {standardData.stats.map((s, idx) => (
                <div
                  key={idx}
                  className="h-[64px] bg-black/[0.025] hover:bg-black/[0.04] border border-black/[0.08] rounded-lg px-1.5 sm:px-2 py-1 flex flex-col justify-center items-center text-center shadow-2xs transition-colors"
                >
                  <div className="text-[12.5px] sm:text-[14px] font-serif font-bold text-[#1E1B18] leading-tight">
                    {s.value}
                  </div>
                  <div className="text-[9px] sm:text-[9.5px] uppercase font-mono text-[#8C7A6B] tracking-wider leading-tight mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 8. SECTION LABEL (1 line, 10px uppercase) */}
          {standardData.sectionLabel && (
            <div className="text-[10px] uppercase font-mono font-semibold tracking-wider text-[#8C7A6B]">
              {standardData.sectionLabel}
            </div>
          )}

          {/* 9. BULLETS (3 bullets max, 1 line each, 12px) */}
          {standardData.bullets && standardData.bullets.length > 0 && (
            <ul className="space-y-1 text-xs text-[#3E3832] font-sans">
              {standardData.bullets.map((b, idx) => {
                const cleanText = b.replace(/^[◆•\-\*]\s*/, '');
                return (
                  <li key={idx} className="flex items-start gap-1.5 leading-snug">
                    <span
                      className={`font-mono font-bold text-[11px] shrink-0 select-none ${bulletColor}`}
                    >
                      ◆
                    </span>
                    <span>{cleanText}</span>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Compact Community Section (for Women & Startups) */}
          {standardData.communityItems && standardData.communityItems.length > 0 && (
            <div className="pt-1 pb-0.5 border-t border-black/[0.06] space-y-0.5">
              <div className="text-[9.5px] uppercase font-mono font-semibold text-[#8C5570] tracking-wider">
                Community
              </div>
              {standardData.communityItems.map((ci, idx) => (
                <div key={idx} className="text-[10px] sm:text-[10.5px] font-sans text-[#705260] leading-tight">
                  {ci}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 10. ROLE LINE (1 line, 11px, pinned to bottom) */}
        <div className="pt-2 border-t border-black/[0.06] mt-auto">
          <div className="text-[11px] font-mono text-[#7A6E64] flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-[#8C7A6B]">ROLE:</span>
            <span>{standardData.roleTagLine}</span>
          </div>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="h-full flex flex-col justify-between p-4 sm:p-5 text-[#2C2825]">
      <div>
        <h2 className="text-xl font-serif font-bold text-[#1E1B18]">{page.title}</h2>
        {page.content && <p className="text-sm mt-2 text-[#3E3832]">{page.content}</p>}
      </div>
      <div className="pt-2 border-t border-black/[0.06] mt-auto text-[11px] font-mono text-[#8C7A6B]">
        p. {page.pageNumber}
      </div>
    </div>
  );
};
