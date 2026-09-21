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
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-serif font-semibold text-sm sm:text-base text-[#2E2822]">
                      {entry.sectionTitle}
                    </span>
                    {entry.badge && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          entry.badge === 'IN PROGRESS'
                            ? 'bg-[#C9A84C] text-white border-[#B8973B]'
                            : entry.badge.includes('1st')
                            ? 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]'
                            : 'bg-[#F1F3F5] text-[#495057] border-[#CED4DA]'
                        }`}
                      >
                        {entry.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 mx-3 border-b border-dotted border-[#D5CBC0] group-hover/section:border-[#B45309]/50" />
                  <span className="font-mono text-xs text-[#8C7A6B] group-hover/section:text-[#B45309]">
                    p. {entry.pageNumber}
                  </span>
                </button>
                {entry.description && (
                  <p className="text-[11.5px] text-[#7A6E64] font-sans italic pl-2 mt-0.5">
                    {entry.description}
                  </p>
                )}

                {entry.subItems && entry.subItems.length > 0 && (
                  <div className="pl-4 sm:pl-6 pt-1 space-y-1.5">
                    {entry.subItems.map((sub, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => onNavigateToPage(sub.pageNumber)}
                        className="w-full flex items-start justify-between text-left py-1 text-xs sm:text-sm text-[#5C5248] hover:text-[#B45309] transition-colors pl-2 border-l-2 border-[#E5DDD0] hover:border-[#B45309] group/sub"
                      >
                        <div className="flex-1 pr-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <ChevronRight className="w-3 h-3 text-[#B45309]/60 shrink-0" />
                            <span className="font-medium text-[#2E2822] group-hover/sub:text-[#B45309]">
                              {sub.title}
                            </span>
                            {sub.badge && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#FAF0E4] text-[#B45309] font-sans border border-[#F3DFC6]">
                                {sub.badge}
                              </span>
                            )}
                          </div>
                          {sub.description && (
                            <p className="text-[11px] text-[#7A6E64] font-sans italic pl-5 mt-0.5 leading-snug">
                              {sub.description}
                            </p>
                          )}
                        </div>
                        <span className="font-mono text-[11px] text-[#A39282] shrink-0 pt-0.5">
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
      <div className="h-full flex flex-col justify-between p-4 sm:p-5 md:p-6 text-[#2C2825] overflow-hidden select-none">
        <div className="space-y-3">
          {/* Header */}
          <div className="border-b border-[#E5DDD0] pb-2">
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

            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1E1B18] tracking-tight">
              {p.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6B5E] font-sans italic mt-0.5">
              {p.tagline}
            </p>
          </div>

          {/* Description */}
          <div className="text-xs sm:text-sm text-[#3E3832] leading-relaxed font-sans line-clamp-3">
            <p>{p.description}</p>
          </div>

          {/* Metrics */}
          {p.metrics && p.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 py-0.5">
              {p.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="backdrop-blur-xs bg-black/[0.025] hover:bg-black/[0.04] border border-black/[0.08] rounded-lg p-1.5 sm:p-2 text-center transition-colors shadow-2xs"
                >
                  <div className="text-sm sm:text-base font-serif font-bold text-[#1E1B18]">
                    {m.value}
                  </div>
                  <div className="text-[9.5px] uppercase font-mono text-[#8C7A6B] tracking-wider leading-tight">
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

  // 3. System Overview Page (RIGHT PAGE of Engineering Chapters)
  if (page.type === 'system-overview' && page.systemOverview) {
    const s = page.systemOverview;
    return (
      <div className="h-full flex flex-col justify-between p-4 sm:p-5 md:p-6 text-[#2C2825] overflow-hidden select-none">
        <div className="space-y-2.5 sm:space-y-3">
          {/* Header Area */}
          <div className="border-b border-[#E5DDD0] pb-2 sm:pb-2.5">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
              <span className="text-[10px] sm:text-xs font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#EBF3F8] text-[#2C5282] font-semibold border border-[#BDD7EE]">
                {s.tagPill}
              </span>
              <span className="text-[10px] sm:text-xs font-mono flex items-center gap-1 text-[#234E52] bg-[#E6FFFA] px-2.5 py-0.5 rounded-full border border-[#B2F5EA] font-medium shadow-2xs">
                {s.badgePill}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1E1B18] tracking-tight">
              {s.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5248] font-sans italic mt-0.5 leading-snug">
              {s.subtitle}
            </p>
          </div>

          {/* Body Text */}
          <div className="space-y-1.5 text-xs sm:text-[13px] text-[#3E3832] leading-relaxed font-sans">
            {s.bodyText.map((paragraph, pIdx) => (
              <p key={pIdx} className="line-clamp-2">{paragraph}</p>
            ))}
          </div>

          {/* Stat Cards (Same component style as established in portfolio) */}
          {s.metrics && s.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 py-0.5">
              {s.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="backdrop-blur-xs bg-black/[0.025] hover:bg-black/[0.04] border border-black/[0.08] rounded-lg p-1.5 sm:p-2 text-center transition-colors shadow-2xs"
                >
                  <div className="text-sm sm:text-base font-serif font-bold text-[#1E1B18]">
                    {m.value}
                  </div>
                  <div className="text-[9.5px] uppercase font-mono text-[#8C7A6B] tracking-wider mt-0.5 leading-tight">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Architecture / How it Works section */}
          <div className="space-y-2.5 backdrop-blur-xs bg-black/[0.015] border border-black/[0.07] rounded-xl p-3.5">
            <div className="flex items-center justify-between">
              <h4 className="text-[11px] uppercase tracking-wider font-mono font-semibold text-[#8C7A6B]">
                {s.sectionLabel}
              </h4>
            </div>

            {/* Visual Two-Pipeline Breakdown if provided */}
            {s.pipelines && s.pipelines.length > 0 && (
              <div className="space-y-2 pt-0.5">
                {s.pipelines.map((pipe, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-2.5 rounded-lg bg-white/70 border border-[#D5CBC0]/80 shadow-2xs space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#2D4556] text-white font-semibold tracking-wider">
                        {pipe.name}
                      </span>
                      <span className="text-xs font-medium text-[#2E2822]">
                        {pipe.label}
                      </span>
                    </div>
                    {pipe.flow && pipe.flow.length > 0 && (
                      <div className="flex items-center flex-wrap gap-1 text-[11px] text-[#4A423B] font-mono bg-black/[0.02] p-1.5 rounded border border-black/[0.04]">
                        {pipe.flow.map((step, sIdx) => (
                          <React.Fragment key={sIdx}>
                            <span className="px-1.5 py-0.5 rounded bg-white border border-black/[0.08] shadow-2xs">
                              {step}
                            </span>
                            {sIdx < pipe.flow.length - 1 && (
                              <span className="text-[#6096BA] font-bold">→</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                    {pipe.description && (
                      <p className="text-[11px] text-[#5C5248] font-sans">
                        {pipe.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Highlights bullet list */}
            {s.highlights && s.highlights.length > 0 && (
              <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#4A423A] pt-1">
                {s.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#2C5282] mt-0.5 text-xs shrink-0">✦</span>
                    <span className="leading-snug">
                      {h.title && <strong>{h.title}: </strong>}
                      {h.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* Stack Tags (small pill tags) */}
            {s.stackTags && s.stackTags.length > 0 && (
              <div className="pt-2 border-t border-black/[0.06]">
                <div className="text-[10px] uppercase tracking-wider font-mono font-semibold text-[#8C7A6B] mb-1.5 flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span>Stack</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {s.stackTags.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-0.5 rounded-full backdrop-blur-xs bg-[#2D4556]/8 text-[#243A48] font-mono font-medium border border-[#2D4556]/15 shadow-2xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-3 mt-3 border-t border-[#EFE8DC] flex items-center justify-between text-[11px] text-[#8C7A6B] font-mono">
          <span>Chapter: {page.chapterTitle || 'Systems'}</span>
          <span>Page {page.pageNumber}</span>
        </div>
      </div>
    );
  }

  // 4. System Story Page (LEFT PAGE of Engineering Chapters)
  if (page.type === 'system-story' && page.systemStory) {
    const st = page.systemStory;
    return (
      <div className="h-full flex flex-col justify-between p-4 sm:p-7 text-[#2C2825] overflow-y-auto">
        <div className="space-y-4">
          {/* Header */}
          <div className="border-b border-[#E5DDD0] pb-2">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#8C7A6B]">
              {page.chapterTitle || 'Engineering Journal'}
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1E1B18] tracking-tight mt-0.5">
              {page.title}
            </h2>
            {page.subtitle && (
              <p className="text-xs sm:text-sm text-[#7A6B5E] font-sans italic mt-0.5">
                {page.subtitle}
              </p>
            )}
          </div>

          {/* THE PROBLEM / THE BRIEF */}
          {(st.problemText || st.briefText) && (
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase tracking-wider font-mono font-bold text-[#2C5282] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2C5282]" />
                <span>{st.problemLabel || st.briefLabel || 'THE BRIEF'}</span>
              </div>
              <div className="text-xs sm:text-[13px] text-[#3E3832] leading-relaxed font-sans whitespace-pre-line bg-black/[0.015] p-3 rounded-lg border border-black/[0.05]">
                {st.problemText || st.briefText}
              </div>
            </div>
          )}

          {/* MY ROLE */}
          {st.roleDescription && (
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase tracking-wider font-mono font-bold text-[#2C5282] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2C5282]" />
                <span>MY ROLE</span>
              </div>
              <div className="bg-white/70 p-3 rounded-lg border border-[#D5CBC0]/80 shadow-2xs space-y-1">
                {st.roleTitle && (
                  <div className="font-serif font-bold text-sm text-[#1E1B18]">
                    {st.roleTitle}
                  </div>
                )}
                <p className="text-xs sm:text-[13px] text-[#4A423A] leading-relaxed font-sans whitespace-pre-line">
                  {st.roleDescription}
                </p>
              </div>
            </div>
          )}

          {/* STACK (Small pill tags) */}
          {st.stackTags && st.stackTags.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase tracking-wider font-mono font-bold text-[#2C5282] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2C5282]" />
                <span>STACK</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {st.stackTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-0.5 rounded-full backdrop-blur-xs bg-[#2D4556]/8 text-[#243A48] font-mono font-medium border border-[#2D4556]/15 shadow-2xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {st.stackNote && (
                <p className="text-xs text-[#5C5248] font-sans pt-1 leading-snug">
                  {st.stackNote}
                </p>
              )}
            </div>
          )}

          {/* THE MOMENT / WHAT THIS TAUGHT ME (Larger, italic editorial pull quote style) */}
          {(st.editorialQuoteText || st.reflectionText) && (
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] uppercase tracking-wider font-mono font-bold text-[#8C7A6B] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A6B]" />
                <span>{st.editorialQuoteLabel || st.reflectionLabel || 'THE MOMENT'}</span>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl backdrop-blur-xs bg-gradient-to-br from-[#EBF3F8]/60 to-[#FAF7F2] border border-[#BDD7EE]/60 border-l-4 border-l-[#2C5282] shadow-xs">
                <p className="text-sm sm:text-[15px] font-serif italic text-[#1E2E3D] leading-relaxed">
                  "{st.editorialQuoteText || st.reflectionText}"
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="pt-3 mt-3 border-t border-[#EFE8DC] flex items-center justify-between text-[11px] text-[#8C7A6B] font-mono">
          <span>{book.displayTitle}</span>
          <span>Page {page.pageNumber}</span>
        </div>
      </div>
    );
  }

  // 5. Technical Arsenal Page (CRAFT Book - Chapter 1, Single-Page Scannable)
  if (page.type === 'technical-arsenal' && page.technicalArsenal) {
    const data = page.technicalArsenal;
    return (
      <div className="h-full flex flex-col justify-between p-4 sm:p-6 md:p-7 text-[#2C2825] select-none">
        <div className="space-y-3.5 sm:space-y-4">
          {/* Header */}
          <div className="border-b border-[#E5DDD0] pb-2.5">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#832856] font-bold">
              {data.tag}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#1E1B18] tracking-tight mt-0.5">
              {data.title}
            </h2>
            <p className="text-xs sm:text-[13px] text-[#7A6B5E] font-sans italic mt-1">
              {data.subtitle}
            </p>
          </div>

          {/* Grouped Skills - 4 scannable groups */}
          <div className="space-y-2.5 sm:space-y-3 pt-0.5">
            {data.groups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1 sm:space-y-1.5">
                <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-bold text-[#6B3756] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#832856]" />
                  <span>{group.groupName}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center text-[11px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/80 border border-[#D5CBC0] text-[#2C2825] font-sans shadow-2xs"
                    >
                      <span className="font-medium">{skill.name}</span>
                      {skill.note && (
                        <span className="ml-1 text-[10px] sm:text-[11px] font-sans italic text-[#7A6B5E]">
                          {skill.note}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Small Text Block at bottom (2–3 lines max) */}
          <div className="pt-1.5 sm:pt-2">
            <div className="p-2.5 sm:p-3 rounded-lg bg-white/60 border border-[#D5CBC0]/80 shadow-2xs">
              <p className="text-[11px] sm:text-xs text-[#4A423A] font-sans leading-relaxed">
                <span className="font-semibold text-[#1E1B18]">Currently:</span> AI agent vulnerability research at Purdue TSEL.
                <br />
                <span className="text-[#6B5E52] italic">Every tool on this list was learned on deadline.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 sm:pt-3 border-t border-[#EFE8DC] flex items-center justify-between text-[11px] text-[#8C7A6B] font-mono">
          <span>{book.displayTitle} • Chapter 1</span>
          <span>Page {page.pageNumber}</span>
        </div>
      </div>
    );
  }

  // 6. Creative Practice Page (CRAFT Book - Chapter 2, Single-Page Warm)
  if (page.type === 'creative-practice' && page.creativePractice) {
    const data = page.creativePractice;
    return (
      <div className="h-full flex flex-col justify-between p-4 sm:p-6 md:p-7 text-[#2C2825] select-none">
        <div className="space-y-3.5 sm:space-y-4">
          {/* Header */}
          <div className="border-b border-[#E5DDD0] pb-2.5">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#832856] font-bold">
              {data.tag}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#1E1B18] tracking-tight mt-0.5">
              {data.title}
            </h2>
            <p className="text-xs sm:text-[13px] text-[#7A6B5E] font-sans italic mt-1">
              {data.subtitle}
            </p>
          </div>

          {/* Section A: CRAFT */}
          <div className="space-y-1.5 sm:space-y-2">
            <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-bold text-[#6B3756] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#832856]" />
              <span>{data.craft.label}</span>
            </div>
            <p className="text-[11px] sm:text-xs md:text-[12.5px] text-[#3E3832] font-sans leading-relaxed">
              {data.craft.narrative}
            </p>
            <ul className="space-y-1 pt-0.5 text-[11px] sm:text-xs text-[#4A423A] font-sans">
              {data.craft.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-[#832856] font-bold text-xs select-none leading-none">↗</span>
                  <span className="leading-tight">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section B: MOVEMENT (Small warm Post-it / casual aside card) */}
          <div className="pt-1">
            <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-[#FFF9F0] to-[#FAF3E8] border border-[#E8DCB8] shadow-xs relative overflow-hidden">
              {/* Subtle top tape accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-1.5 sm:h-2 bg-[#EADCC7]/80 rounded-b-xs pointer-events-none" />
              <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-bold text-[#9C5A3E] flex items-center gap-1 mb-1.5">
                <span>{data.movement.label}</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-[13px] text-[#2C2825] font-sans font-medium">
                {data.movement.activities.map((act, idx) => (
                  <span key={idx} className="flex items-center gap-1">
                    {act}
                  </span>
                ))}
              </div>
              <p className="text-[10px] sm:text-[11px] font-serif italic text-[#7A6048] pt-1.5 border-t border-[#E8DCB8]/60 mt-1.5">
                {data.movement.quote}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 sm:pt-3 border-t border-[#EFE8DC] flex items-center justify-between text-[11px] text-[#8C7A6B] font-mono">
          <span>{book.displayTitle} • Chapter 2</span>
          <span>Page {page.pageNumber}</span>
        </div>
      </div>
    );
  }

  // 7. Hack / System Chapter Page (Single-page, zero overflow)
  if (
    (page.type === 'hack-chapter' && page.hackChapter) ||
    (page.type === 'system-chapter' && page.systemChapter)
  ) {
    const ch = page.type === 'system-chapter' ? page.systemChapter! : page.hackChapter!;
    const isSystem = page.type === 'system-chapter';
    const isGreenBadge = ch.badge.type === 'green';
    const isSilverBadge = ch.badge.type === 'silver';

    return (
      <div className="h-full flex flex-col justify-between p-4 sm:p-5 md:p-6 text-[#2C2825] select-none overflow-hidden">
        <div className="space-y-2 sm:space-y-2.5">
          {/* Header Area */}
          <div className="border-b border-[#E5DDD0] pb-2 sm:pb-2.5">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
              <span
                className={`text-[10px] sm:text-[11px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full font-semibold border ${
                  isSystem
                    ? 'bg-[#EDF4F9] text-[#245370] border-[#CCE0ED]'
                    : 'bg-[#FAF0E8] text-[#B8532B] border-[#F3DACB]'
                }`}
              >
                {ch.tag}
              </span>
              <span
                className={`text-[10.5px] sm:text-xs font-mono flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-medium shadow-2xs border ${
                  isGreenBadge
                    ? 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]'
                    : isSilverBadge
                    ? 'bg-[#F1F3F5] text-[#495057] border-[#CED4DA]'
                    : 'bg-[#F0F5F9] text-[#245370] border-[#CCE0ED]'
                }`}
              >
                <span>{ch.badge.label}</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#1E1B18] tracking-tight mt-0.5">
              {ch.title}
            </h2>
            <p className="text-xs sm:text-[13px] text-[#7A6B5E] font-sans italic mt-0.5 leading-snug">
              {ch.subtitle}
            </p>
          </div>

          {/* Body Text (3-4 lines max) */}
          <div className="text-[13px] sm:text-sm text-[#3E3832] font-sans leading-relaxed">
            <p>{ch.body}</p>
          </div>

          {/* Stat Cards (Same component style as portfolio) */}
          {ch.metrics && ch.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 py-0.5">
              {ch.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="backdrop-blur-xs bg-black/[0.025] hover:bg-black/[0.04] border border-black/[0.08] rounded-lg p-1.5 sm:p-2 text-center transition-colors shadow-2xs"
                >
                  <div className="text-sm sm:text-base font-serif font-bold text-[#1E1B18]">
                    {m.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] uppercase font-mono text-[#8C7A6B] tracking-wider leading-tight mt-0.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Highlights (4 bullets max, short & punchy) */}
          {ch.highlights && ch.highlights.length > 0 && (
            <div className="space-y-1.5 backdrop-blur-xs bg-black/[0.015] border border-black/[0.06] rounded-xl p-2.5 sm:p-3">
              <h4 className="text-[10.5px] sm:text-[11px] uppercase tracking-wider font-mono font-semibold text-[#8C7A6B]">
                Key Highlights
              </h4>
              <ul className="space-y-1 text-[13px] sm:text-sm text-[#3E3832] font-sans">
                {ch.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-snug">
                    <span
                      className={`${
                        isSystem ? 'text-[#386B8C]' : 'text-[#C05C38]'
                      } font-mono font-bold text-xs shrink-0 select-none mt-0.5`}
                    >
                      +
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stack Tags (small tech pill badges) */}
          {ch.stackTags && ch.stackTags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              <span className="text-[9.5px] sm:text-[10px] uppercase font-mono font-bold tracking-wider text-[#8C7A6B] mr-0.5">
                STACK:
              </span>
              {ch.stackTags.map((t, idx) => (
                <span
                  key={idx}
                  className="text-[10px] sm:text-[10.5px] font-mono px-2 py-0.5 rounded-md bg-[#EDF3F7] text-[#2D5570] border border-[#D4E3ED]"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Role Tag Line (small text at bottom, single line of muted tags) */}
          <div className="pt-1.5 border-t border-black/[0.06]">
            <div className="text-[10px] sm:text-[11px] font-mono text-[#7A6E64] flex items-center gap-1.5 flex-wrap">
              <span className="text-[9.5px] sm:text-[10px] uppercase font-bold tracking-wider text-[#8C7A6B]">
                ROLE:
              </span>
              <span>{ch.roleTagLine}</span>
            </div>
          </div>
        </div>

        {/* Page Footer */}
        <div className="pt-2 border-t border-[#EFE8DC] flex items-center justify-between text-[11px] text-[#8C7A6B] font-mono">
          <span>{isSystem ? 'SYSTEMS' : 'HACKS'} • {page.chapterTitle || 'Chapter'}</span>
          <span>Page {page.pageNumber}</span>
        </div>
      </div>
    );
  }

  // 7b. Venture Chapter Page (Single-page, zero overflow, founder-minded, warm blush & wine palette)
  if (page.type === 'venture-chapter' && page.ventureChapter) {
    const vc = page.ventureChapter;

    return (
      <div className="h-full flex flex-col justify-between p-4 sm:p-5 md:p-6 text-[#2C2825] select-none overflow-hidden">
        <div className="space-y-2 sm:space-y-2.5">
          {/* Header Area */}
          <div className="border-b border-[#EAD5DE] pb-2 sm:pb-2.5">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full font-semibold border bg-[#FBF0F5] text-[#6B2848] border-[#E7B5D0]">
                {vc.tag}
              </span>
              <span className="text-[10.5px] sm:text-xs font-mono flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-medium shadow-2xs border bg-[#F5E6ED] text-[#482728] border-[#D9AEC4]">
                <span>{vc.badge.label}</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#2A151C] tracking-tight mt-0.5">
              {vc.title}
            </h2>
            <p className="text-xs sm:text-[13px] text-[#705260] font-sans italic mt-0.5 leading-snug">
              {vc.subtitle}
            </p>
          </div>

          {/* Body Text (3-4 lines max) */}
          <div className="text-[12.5px] sm:text-[13px] text-[#3D3136] font-sans leading-relaxed">
            <p>{vc.body}</p>
          </div>

          {/* Stat Cards (For Outsiiders or chapters with metrics) */}
          {vc.metrics && vc.metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-1.5 py-0.5">
              {vc.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF2F6] border border-[#EACBD9] rounded-lg p-1.5 sm:p-2 text-center shadow-2xs"
                >
                  <div className="text-sm sm:text-base font-serif font-bold text-[#482728]">
                    {m.value}
                  </div>
                  <div className="text-[10px] sm:text-[10.5px] uppercase font-mono text-[#7D5367] tracking-wider leading-tight mt-0.5 font-semibold">
                    {m.label}
                  </div>
                  {m.sublabel && (
                    <div className="text-[9px] sm:text-[9.5px] text-[#8C6D7D] font-sans mt-0.5 truncate">
                      {m.sublabel}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Highlights (4 bullets max, short & punchy, using ◆) */}
          {vc.highlights && vc.highlights.length > 0 && (
            <div className="space-y-1.5 bg-[#FCF7FA] border border-[#EED7E3] rounded-xl p-2.5 sm:p-3">
              <h4 className="text-[10.5px] sm:text-[11px] uppercase tracking-wider font-mono font-semibold text-[#8C5570]">
                Key Highlights
              </h4>
              <ul className="space-y-1 text-[12.5px] sm:text-[13px] text-[#3D3136] font-sans">
                {vc.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-snug">
                    <span className="text-[#963866] font-mono font-bold text-[11px] shrink-0 select-none mt-0.5">
                      ◆
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Live Link: Pill (Outsiiders) or Prominent Card (Dolce Puro) */}
          {vc.liveLink && (
            <div className="pt-0.5">
              {vc.liveLink.style === 'card' ? (
                <a
                  href={vc.liveLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-2.5 rounded-lg bg-gradient-to-r from-[#FAF0F5] to-[#F5E6ED] border border-[#DCB0C7] hover:border-[#963866] hover:shadow-xs transition-all text-[#482728]"
                  title={`Open ${vc.liveLink.url}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <div>
                      <div className="font-mono text-xs font-semibold text-[#482728]">
                        {vc.liveLink.label}
                      </div>
                      {vc.liveLink.displayPrompt && (
                        <div className="text-[11px] font-sans text-[#705260] italic">
                          {vc.liveLink.displayPrompt}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs text-[#963866] font-semibold group-hover:translate-x-0.5 transition-transform">
                    <span>Visit</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>
              ) : (
                <div className="flex items-center gap-2">
                  <a
                    href={vc.liveLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0F5] hover:bg-[#F5E4ED] border border-[#E0B8CE] hover:border-[#963866] text-xs font-mono text-[#5E2642] transition-colors"
                  >
                    <span>{vc.liveLink.label}</span>
                    <ExternalLink className="w-3 h-3 text-[#963866]" />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Small editorial note (I Got Me / Women & Startups) */}
          {vc.editorialNote && (
            <div className="pt-0.5">
              <p className="text-[11.5px] sm:text-xs text-[#6B485A] font-serif italic leading-relaxed border-l-2 border-[#D9A4BD] pl-2.5">
                "{vc.editorialNote}"
              </p>
            </div>
          )}

          {/* Role Tag Line */}
          <div className="pt-1.5 border-t border-black/[0.06]">
            <div className="text-[10px] sm:text-[11px] font-mono text-[#7A5B6B] flex items-center gap-1.5 flex-wrap">
              <span className="text-[9.5px] sm:text-[10px] uppercase font-bold tracking-wider text-[#963866]">
                ROLE:
              </span>
              <span>{vc.roleTagLine}</span>
            </div>
          </div>
        </div>

        {/* Page Footer */}
        <div className="pt-2 border-t border-[#EFE8DC] flex items-center justify-between text-[11px] text-[#8C7A6B] font-mono">
          <span>VENTURES • {page.chapterTitle || 'Chapter'}</span>
          <span>Page {page.pageNumber}</span>
        </div>
      </div>
    );
  }

  // 7c. Community Section (Compact final page / mini-section, smaller type, lighter visual weight)
  if (page.type === 'community-section' && page.communitySection) {
    const cs = page.communitySection;

    return (
      <div className="h-full flex flex-col justify-between p-4 sm:p-5 md:p-6 text-[#2C2825] select-none overflow-hidden bg-[#FAF6F8]/60">
        <div className="space-y-3 sm:space-y-3.5">
          {/* Header Area */}
          <div className="border-b border-[#EAD5DE] pb-2 sm:pb-2.5">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full font-semibold border bg-[#FBF0F5] text-[#6B2848] border-[#E7B5D0]">
              {cs.label}
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2A151C] tracking-tight mt-1">
              Clubs & Organizations
            </h2>
            <p className="text-xs sm:text-[13px] text-[#705260] font-sans italic mt-0.5 leading-snug">
              {cs.subtitle}
            </p>
          </div>

          {/* Three Compact Cards */}
          <div className="space-y-2 sm:space-y-2.5">
            {cs.clubs.map((club, idx) => (
              <div
                key={idx}
                className="bg-white/80 border border-[#E8D1DC] rounded-xl p-2.5 sm:p-3 shadow-2xs hover:border-[#D6AABF] transition-colors"
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3 className="font-serif font-bold text-sm sm:text-[15px] text-[#331B24]">
                    {club.title}
                  </h3>
                  <span className="text-[10px] sm:text-[10.5px] font-mono font-medium px-2 py-0.5 rounded-md bg-[#F8EDF3] text-[#59263E] border border-[#E5CAD7]">
                    {club.role}
                  </span>
                </div>
                {club.subtitle && (
                  <div className="text-[11px] sm:text-xs text-[#705260] font-sans italic mt-0.5">
                    {club.subtitle}
                  </div>
                )}
                <div className="text-[11.5px] sm:text-xs text-[#42333B] font-sans mt-1 leading-snug">
                  {club.focus}
                </div>
              </div>
            ))}
          </div>

          {/* Lighter visual weight footer note */}
          <p className="text-[11px] text-[#8C6D7D] font-sans italic text-center pt-1">
            Active leadership, student governance & Hispanic engineering advocacy.
          </p>
        </div>

        {/* Page Footer */}
        <div className="pt-2 border-t border-[#EFE8DC] flex items-center justify-between text-[11px] text-[#8C7A6B] font-mono">
          <span>VENTURES • Community</span>
          <span>Page {page.pageNumber}</span>
        </div>
      </div>
    );
  }

  // 7d. Analysis Chapter Page (Single-page, zero overflow, precise, data-driven & grounded)
  if (page.type === 'analysis-chapter' && page.analysisChapter) {
    const ac = page.analysisChapter;

    return (
      <div className="h-full flex flex-col justify-between p-4 sm:p-5 md:p-6 text-[#242E22] select-none overflow-hidden bg-[#FAF8F5]">
        <div className="space-y-2 sm:space-y-2.5">
          {/* Header Area */}
          <div className="border-b border-[#D8E2D4] pb-2 sm:pb-2.5">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
              <span className="text-[10px] sm:text-[10.5px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full font-semibold border bg-[#EDF3EA] text-[#2F4A27] border-[#C2D4BD]">
                {ac.tag}
              </span>
              <span
                className={`text-[10.5px] sm:text-xs font-mono flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-medium shadow-2xs border ${
                  ac.badge.isPrimaryAccent
                    ? 'bg-[#C8EAD3] text-[#163D22] border-[#92C4A2] font-semibold ring-1 ring-[#92C4A2]/40'
                    : 'bg-[#F0F5ED] text-[#344830] border-[#CCD9C8]'
                }`}
              >
                <span>{ac.badge.label}</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#1C291B] tracking-tight mt-0.5">
              {ac.title}
            </h2>
            <p className="text-xs sm:text-[13px] text-[#4E614A] font-sans italic mt-0.5 leading-snug">
              {ac.subtitle}
            </p>
          </div>

          {/* Body Text (3-4 lines max) */}
          <div className="text-[12px] sm:text-[12.5px] md:text-[13px] text-[#2F3D2C] font-sans leading-relaxed">
            <p>{ac.body}</p>
          </div>

          {/* 3 Methodological Stat Cards (tools, scope, output) */}
          {ac.statCards && ac.statCards.length > 0 && (
            <div className="grid grid-cols-3 gap-1.5 py-0.5">
              {ac.statCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-[#F2F6F0] border border-[#CCD8C9] rounded-lg p-1.5 sm:p-2 text-center shadow-2xs"
                >
                  <div className="text-sm sm:text-base font-serif font-bold text-[#233820]">
                    {card.value}
                  </div>
                  <div className="text-[9.5px] sm:text-[10px] uppercase font-mono text-[#52694D] tracking-wider leading-tight mt-0.5 font-semibold">
                    {card.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Highlights (4 bullets max, short & punchy, using ◆) */}
          {ac.highlights && ac.highlights.length > 0 && (
            <div className="space-y-1 bg-[#F5F8F3] border border-[#D5E1D2] rounded-xl p-2 sm:p-2.5">
              <h4 className="text-[10px] sm:text-[10.5px] uppercase tracking-wider font-mono font-semibold text-[#486343]">
                Analytical Highlights
              </h4>
              <ul className="space-y-1 text-[12px] sm:text-[12.5px] text-[#2E3C2B] font-sans">
                {ac.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 leading-snug">
                    <span className="text-[#3A5D33] font-mono font-bold text-[10.5px] shrink-0 select-none mt-0.5">
                      ◆
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Small editorial note (Science Gallery) - italic, small, bottom-aligned */}
          {ac.editorialNote && (
            <div className="pt-0.5">
              <p className="text-[11.5px] sm:text-xs text-[#415C3A] font-serif italic leading-relaxed border-l-2 border-[#8FA680] pl-2.5">
                "{ac.editorialNote}"
              </p>
            </div>
          )}

          {/* Role Tag Line */}
          <div className="pt-1.5 border-t border-black/[0.06]">
            <div className="text-[10px] sm:text-[11px] font-mono text-[#52664D] flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] sm:text-[9.5px] uppercase font-bold tracking-wider text-[#35542E]">
                ROLE:
              </span>
              <span>{ac.roleTagLine}</span>
            </div>
          </div>
        </div>

        {/* Page Footer */}
        <div className="pt-2 border-t border-[#DFE8DC] flex items-center justify-between text-[11px] text-[#697E64] font-mono">
          <span>ANALYSIS • {page.chapterTitle || 'Chapter'}</span>
          <span>Page {page.pageNumber}</span>
        </div>
      </div>
    );
  }

  // 7e. Security Chapter Page (Academic, credible, restrained, zero overflow, generous whitespace)
  if (page.type === 'security-chapter' && page.securityChapter) {
    const sc = page.securityChapter;

    return (
      <div className="h-full flex flex-col justify-between p-4 sm:p-5 md:p-6 text-[#2C2123] select-none overflow-hidden bg-[#FAF8F5]">
        <div className="space-y-2.5 sm:space-y-3">
          {/* Header Area */}
          <div className="border-b border-[#E0D5C7] pb-2 sm:pb-2.5">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
              <span className="text-[9.5px] sm:text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full font-semibold border bg-[#F0EBE3] text-[#482728] border-[#D9CFC3]">
                {sc.tag}
              </span>
              <span
                className="text-[10px] sm:text-[10.5px] font-mono font-semibold px-2.5 py-0.5 rounded-full text-white shadow-2xs tracking-wider"
                style={{ backgroundColor: sc.badge.style || '#C9A84C' }}
              >
                {sc.badge.label}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2A181B] tracking-tight mt-1">
              {sc.title}
            </h2>
            <p className="text-xs sm:text-[13px] text-[#5C3D42] font-sans italic mt-0.5 leading-snug">
              {sc.subtitle}
            </p>
          </div>

          {/* Body Text (3-4 lines max) */}
          <div className="text-[11.5px] sm:text-[12px] text-[#3B292C] font-sans leading-relaxed space-y-1.5">
            {sc.body.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Three Context Cards — Academic style, NOT stat cards. Clean bordered info cards, no gradients, no shadows */}
          <div className="grid grid-cols-3 gap-2 py-0.5">
            {sc.contextCards.map((card, idx) => (
              <div
                key={idx}
                className="border border-[#482728]/25 bg-white/40 rounded-md p-2 text-left"
              >
                <span className="text-[8.5px] font-mono uppercase tracking-widest text-[#734246] font-bold block mb-1">
                  {card.label}
                </span>
                <div className="space-y-0.5">
                  {card.lines.map((line, lIdx) => (
                    <div
                      key={lIdx}
                      className="text-[10.5px] sm:text-[11px] font-sans text-[#2A181B] leading-tight font-medium"
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Divider line below cards */}
          <div className="border-t border-[#482728]/15" />

          {/* WHAT IS KNOWN Section */}
          <div className="space-y-1 pt-0.5">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#734246] font-bold block">
              {sc.knownSection.label}
            </span>
            <div className="space-y-1">
              {sc.knownSection.bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-[11px] sm:text-[11.5px] font-sans text-[#332225] leading-snug"
                >
                  <span className="text-[#C9A84C] font-mono text-[9px] mt-0.5 shrink-0">
                    ◆
                  </span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coming Soon Block — centered, visually distinct (Hero of the page) */}
          <div
            className="rounded-lg p-2.5 sm:p-3 text-center border relative"
            style={{
              backgroundColor: 'rgba(72, 39, 40, 0.05)',
              borderColor: 'rgba(72, 39, 40, 0.25)',
            }}
          >
            <div className="flex items-center justify-center gap-1.5 text-xs sm:text-[13px] font-serif font-bold text-[#2A181B]">
              <span className="text-[14px] text-[#C9A84C]">◆</span>
              <span className="italic">{sc.comingSoon.title}</span>
            </div>
            <p className="text-[11px] font-sans italic text-[#5C3D42] mt-1 max-w-sm mx-auto leading-relaxed">
              {sc.comingSoon.body}
            </p>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#734246] italic mt-1 block">
              {sc.comingSoon.expected}
            </span>
          </div>
        </div>

        {/* Footer: Role tag line and Page number */}
        <div className="pt-2 border-t border-[#E0D5C7] flex items-center justify-between text-[10.5px] font-mono text-[#734246]">
          <span className="truncate pr-2">{sc.roleTagLine}</span>
          <span className="shrink-0 font-medium">Page {page.pageNumber}</span>
        </div>
      </div>
    );
  }

  // 8. Origins Scrapbook Chapter Page (Single-page, zero overflow, warm nostalgic scrapbook style)
  if (page.type === 'origins-chapter' && page.originsChapter) {
    const orig = page.originsChapter;

    return (
      <div className="h-full flex flex-col justify-between p-4 sm:p-5 md:p-6 text-[#2C241E] select-none overflow-hidden bg-[#FAF6EE]/90">
        <div className="space-y-2 sm:space-y-2.5">
          {/* Header Area */}
          <div className="border-b border-[#E5DAC8] pb-1.5 sm:pb-2">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
              <span className="text-[10px] sm:text-[10.5px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded bg-[#EFE6D5] text-[#5C4936] font-semibold border border-[#DDD0BC] shadow-2xs">
                {orig.tag}
              </span>
              <span className="text-[11px] font-script text-[#8C6239] font-bold px-2 py-0.5 rounded bg-[#FAF0DE] border border-[#ECD9BE]">
                Ana's Journal • High School
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2A1F18] tracking-tight mt-0.5">
              {orig.title}
            </h2>
            <p className="text-xs sm:text-[12.5px] text-[#705946] font-serif italic mt-0.5 leading-snug">
              {orig.subtitle}
            </p>
          </div>

          {/* Body Text (Personal, warm, 2-4 lines) */}
          <div className="text-[13px] sm:text-sm text-[#3E342B] font-sans leading-relaxed whitespace-pre-line">
            <p>{orig.body}</p>
          </div>

          {/* Scrapbook Entries (Styled like sticky notes or pinned memory cards) */}
          <div className="space-y-1.5 sm:space-y-2 pt-0.5">
            {orig.entries.map((entry, idx) => {
              const isCrea = entry.isHighlighted;
              return (
                <div
                  key={idx}
                  className={`p-2 sm:p-2.5 rounded-lg transition-all border shadow-2xs relative ${
                    isCrea
                      ? 'bg-[#FFFDF5] border-[#E2CEB4] shadow-xs'
                      : 'bg-white/75 border-[#E6DCB]/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-[#B6C8A9] select-none inline-flex items-center leading-none font-mono">◆</span>
                      <h4
                        className={`text-xs sm:text-[13px] font-serif font-bold ${
                          isCrea ? 'text-[#3E2512]' : 'text-[#2C221A]'
                        }`}
                      >
                        {entry.title}
                      </h4>
                    </div>
                    {entry.badge && (
                      <span className="text-[9.5px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#FEF3E2] text-[#9A4C18] border border-[#F2D7B3] font-semibold">
                        {entry.badge}
                      </span>
                    )}
                  </div>

                  {/* Bullet lines */}
                  <ul className="space-y-0.5 pl-5 text-[13px] sm:text-sm text-[#4A3E33] font-sans list-disc marker:text-[#B38054]">
                    {entry.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="leading-snug">
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Narrative connection note for Immanka -> I Got Me */}
                  {entry.connectionNote && (
                    <div className="mt-1 pt-1 border-t border-[#EBDCC8]/60 pl-5">
                      <span className="font-mono text-[10.5px] sm:text-[11px] font-semibold text-[#A0481F] bg-[#FDF0E6] px-2 py-0.5 rounded border border-[#F2D6C2] inline-block shadow-2xs">
                        {entry.connectionNote}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quote / Closing Note at page bottom - Visually distinct, italic, centered */}
          {(orig.quote || orig.closingNote) && (
            <div className="pt-1.5 sm:pt-2 text-center">
              <div className="py-1 px-3 rounded-lg bg-[#FAF0E0]/60 border border-[#EADBBE]/80 shadow-2xs">
                <p className="font-serif italic text-xs sm:text-[13px] text-[#3D2617] font-medium leading-snug">
                  {orig.quote || orig.closingNote}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Page Footer */}
        <div className="pt-1.5 border-t border-[#E8DFC9] flex items-center justify-between text-[10.5px] text-[#8C7A65] font-mono">
          <span>ORIGINS • {page.chapterTitle}</span>
          <span>Page {page.pageNumber}</span>
        </div>
      </div>
    );
  }

  // 9. Origins Scrapbook Keepsake & Epilogue Page (Page 5)
  if (page.type === 'origins-keepsake') {
    return (
      <div className="h-full flex flex-col justify-between p-4 sm:p-5 md:p-6 text-[#2C241E] select-none overflow-hidden bg-[#FAF6EE]/90">
        <div className="space-y-2.5 sm:space-y-3">
          {/* Header */}
          <div className="border-b border-[#E5DAC8] pb-1.5 sm:pb-2">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
              <span className="text-[10px] sm:text-[10.5px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded bg-[#EFE6D5] text-[#5C4936] font-semibold border border-[#DDD0BC] shadow-2xs">
                EPILOGUE · SCRAPBOOK KEEPSAKE
              </span>
              <span className="text-[11px] font-script text-[#8C6239] font-bold px-2 py-0.5 rounded bg-[#FAF0DE] border border-[#ECD9BE]">
                1999 → Present
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2A1F18] tracking-tight mt-0.5">
              From Hermosillo to Purdue
            </h2>
            <p className="text-xs sm:text-[12.5px] text-[#705946] font-serif italic mt-0.5 leading-snug">
              The roots that continue to shape the engineering.
            </p>
          </div>

          {/* Keepsake Cards */}
          <div className="space-y-2">
            <div className="p-2 sm:p-2.5 rounded-lg bg-white/80 border border-[#E6DCB]/80 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 font-serif font-bold text-xs sm:text-[13px] text-[#2C221A]">
                <span className="text-[11px] text-[#B6C8A9] select-none inline-flex items-center leading-none font-mono">◆</span>
                <span>Hermosillo, Sonora</span>
              </div>
              <p className="text-[13px] sm:text-sm text-[#4A3E33] font-sans leading-snug pl-4">
                Where the spark ignited: organizing school campaigns, teaching girls on Tuesdays, and realizing that building things is an act of service.
              </p>
            </div>

            <div className="p-2 sm:p-2.5 rounded-lg bg-white/80 border border-[#E6DCB]/80 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 font-serif font-bold text-xs sm:text-[13px] text-[#2C221A]">
                <span className="text-[11px] text-[#B6C8A9] select-none inline-flex items-center leading-none font-mono">◆</span>
                <span>Tec de Monterrey</span>
              </div>
              <p className="text-[13px] sm:text-sm text-[#4A3E33] font-sans leading-snug pl-4">
                Winning hackathons in under 48 hours, building IoT sensors across campus, and designing AI schedulers for factory directors.
              </p>
            </div>

            <div className="p-2 sm:p-2.5 rounded-lg bg-white/80 border border-[#E6DCB]/80 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 font-serif font-bold text-xs sm:text-[13px] text-[#2C221A]">
                <span className="text-[11px] text-[#B6C8A9] select-none inline-flex items-center leading-none font-mono">◆</span>
                <span>Purdue University</span>
              </div>
              <p className="text-[13px] sm:text-sm text-[#4A3E33] font-sans leading-snug pl-4">
                Researching AI agent vulnerabilities at TSEL, advising builders, and proving that deep rigor and human warmth belong together.
              </p>
            </div>
          </div>

          {/* Handwritten Reflection */}
          <div className="p-2.5 rounded-xl bg-[#FAF0DE]/70 border border-[#EADBBE] shadow-2xs text-center">
            <p className="font-script text-base sm:text-lg text-[#52331E] leading-snug">
              “Every system I build, every line of code I optimize, carries the lessons from those 2,000-person events and the communities that trusted me.”
            </p>
          </div>

          {/* Return to Table of Contents button */}
          <div className="pt-0.5">
            <button
              onClick={() => onNavigateToPage(1)}
              className="w-full py-1.5 px-3 rounded-lg bg-[#2C221A] hover:bg-[#423328] text-[#FDFBF7] font-mono text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span>‹ Return to Table of Contents</span>
            </button>
          </div>
        </div>

        {/* Page Footer */}
        <div className="pt-1.5 border-t border-[#E8DFC9] flex items-center justify-between text-[10.5px] text-[#8C7A65] font-mono">
          <span>ORIGINS • Epilogue</span>
          <span>Page {page.pageNumber}</span>
        </div>
      </div>
    );
  }

  // 10. Narrative Story / Intro / Essay Page
  return (
    <div className="h-full flex flex-col justify-between p-4 sm:p-5 md:p-6 text-[#2C2825] overflow-hidden select-none">
      <div className="space-y-3">
        <div className="border-b border-[#E5DDD0] pb-2 sm:pb-2.5">
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#8C7A6B]">
            {page.chapterTitle || book.title}
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1E1B18] tracking-tight mt-0.5">
            {page.title}
          </h2>
          {page.subtitle && (
            <p className="text-xs sm:text-sm text-[#7A6B5E] font-sans italic mt-0.5">
              {page.subtitle}
            </p>
          )}
        </div>

        {page.content && (
          <p className="text-xs sm:text-sm text-[#3E3832] leading-relaxed font-sans whitespace-pre-line line-clamp-6">
            {page.content}
          </p>
        )}

        {page.quote && (
          <div className="p-2.5 sm:p-3 rounded-lg backdrop-blur-xs bg-[#FAF0E4]/40 border border-black/[0.06] border-l-2 border-l-[#B45309] my-1">
            <p className="text-xs sm:text-[13px] font-serif italic text-[#6B4B28] leading-snug">
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
