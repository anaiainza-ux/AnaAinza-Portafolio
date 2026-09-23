import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselCardItem {
  id: number;
  title: string;
  tag: string;
  gradient: [string, string];
  bullets: string[];
  book: string;
  chapter: number;
  // Compatibility fields for optional legacy consumers
  bookId?: string;
  pageNumber?: number;
}

export type ProjectCardData = CarouselCardItem;

export const CAROUSEL_CARDS: CarouselCardItem[] = [
  {
    id: 1,
    title: "TIC Challenge",
    tag: "HACKS · 1ST PLACE",
    gradient: ["#E7B5D0", "#B6C8A9"],
    bullets: [
      "Gamified employee training platform with dashboards and XP points",
      "100% vibecoded MVP launched live at GP Construction",
      "300+ active users at launch, 98/100 pitch score"
    ],
    book: "HACKS",
    chapter: 1
  },
  {
    id: 2,
    title: "Zayu.go",
    tag: "HACKS · 2ND PLACE",
    gradient: ["#6096BA", "#C8EAD3"],
    bullets: [
      "Multi-modal transport app for World Cup 2026",
      "Compares Uber, transit, walking on time, cost, and safety",
      "Match ticket wallet, real-time translation, emergency button"
    ],
    book: "HACKS",
    chapter: 2
  },
  {
    id: 3,
    title: "AI Production Scheduler",
    tag: "SYSTEMS · QUIMMCO",
    gradient: ["#482728", "#6096BA"],
    bullets: [
      "n8n pipeline unifies 3 datasets into clean production demand",
      "AI agent generates minute-by-minute foundry schedule",
      "Human-in-the-loop approval — schedule emailed live to directors"
    ],
    book: "SYSTEMS",
    chapter: 1
  },
  {
    id: 4,
    title: "Smart Parking TEC",
    tag: "SYSTEMS · IoT",
    gradient: ["#B6C8A9", "#6096BA"],
    bullets: [
      "ESP32 sensors detect per-spot occupancy in real time",
      "Oracle SQL backend serves live data to dashboard and mobile",
      "Students can share or reserve spots directly in the app"
    ],
    book: "SYSTEMS",
    chapter: 2
  },
  {
    id: 5,
    title: "MIT Lift Lab Research",
    tag: "ANALYSIS · MIT",
    gradient: ["#B6C8A9", "#C8EAD3"],
    bullets: [
      "Python analysis on nanostore data collected across Mexico",
      "K-means clustering to segment store profiles",
      "Linear regression identified key survival predictors"
    ],
    book: "ANALYSIS",
    chapter: 1
  },
  {
    id: 6,
    title: "Bridgestone Downtime Analysis",
    tag: "ANALYSIS · INDUSTRY",
    gradient: ["#482728", "#B6C8A9"],
    bullets: [
      "Analyzed historical downtime records for machine A2",
      "Identified root causes and failure-preceding conditions",
      "Designed vulcanization alarm to catch signals early"
    ],
    book: "ANALYSIS",
    chapter: 2
  },
  {
    id: 7,
    title: "Science Gallery Monterrey",
    tag: "ANALYSIS · DATA",
    gradient: ["#C8EAD3", "#6096BA"],
    bullets: [
      "Analyzed visitor engagement and exhibition performance data",
      "Built Power BI dashboards for gallery leadership",
      "Gallery implemented the recommendations in programming decisions"
    ],
    book: "ANALYSIS",
    chapter: 3
  },
  {
    id: 8,
    title: "Oxxo Demand Prediction",
    tag: "ANALYSIS · INDUSTRY",
    gradient: ["#B6C8A9", "#482728"],
    bullets: [
      "Prediction models across 1,200+ stores for 4 seasonal products",
      "Three model types: linear regression, time series, random forest",
      "Web app connected live to Google Colab — per-store predictions on tap"
    ],
    book: "ANALYSIS",
    chapter: 4
  },
  {
    id: 9,
    title: "Outsiiders 2026",
    tag: "VENTURES · CONGRESS",
    gradient: ["#6096BA", "#482728"],
    bullets: [
      "Built the event website from scratch",
      "Led 12 directors and 6 staff across 6 months of planning",
      "19 speakers, 21 hours of content, 18 sponsors"
    ],
    book: "VENTURES",
    chapter: 1
  },
  {
    id: 10,
    title: "I Got Me",
    tag: "VENTURES · FOUNDER",
    gradient: ["#E7B5D0", "#482728"],
    bullets: [
      "Curated everyday carry kit for women — physical product",
      "Prototyped and tested at Start Up I GOT ME 2025",
      "Evolution of Immanka, first product from high school"
    ],
    book: "VENTURES",
    chapter: 2
  },
  {
    id: 11,
    title: "Dolce Puro",
    tag: "VENTURES · LIVE",
    gradient: ["#C8EAD3", "#E7B5D0"],
    bullets: [
      "Artisan protein tiramisu brand — real product, real sales",
      "Built and deployed a digital loyalty card for clients",
      "Live at dolcepuro.netlify.app"
    ],
    book: "VENTURES",
    chapter: 3
  },
  {
    id: 12,
    title: "AI Security Research",
    tag: "SECURITY · IN PROGRESS",
    gradient: ["#482728", "#E7B5D0"],
    bullets: [
      "Visiting researcher at Purdue University TSEL Lab",
      "Investigating cybersecurity vulnerabilities in AI coding agents",
      "Empirical research with test harness — paper in progress"
    ],
    book: "SECURITY",
    chapter: 1
  }
];

// ── Overlay Component (Step 3) ────────────────────────────────────────────────
interface ProjectOverlayProps {
  card: CarouselCardItem | null;
  onClose: () => void;
  onOpenBook: (book: string, chapter: number) => void;
}

function ProjectOverlay({ card, onClose, onOpenBook }: ProjectOverlayProps) {
  useEffect(() => {
    if (!card) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [card, onClose]);

  if (!card) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'rgba(18,18,18,0.96)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          padding: '32px 28px',
          maxWidth: 420,
          width: '90%',
          boxShadow: '0 25px 60px rgba(0,0,0,0.85)',
        }}
      >
        {/* Tag */}
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: 10,
            fontFamily: 'monospace',
          }}
        >
          {card.tag}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#fff',
            marginBottom: 20,
          }}
          className="font-serif sm:font-sans"
        >
          {card.title}
        </div>

        {/* Bullets — only what is in the data, nothing invented */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {card.bullets.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span
                style={{
                  color: card.gradient[0],
                  fontSize: 10,
                  marginTop: 3,
                  flexShrink: 0,
                  fontWeight: 'bold',
                }}
              >
                ◆
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 1.5,
                  fontFamily: 'sans-serif',
                }}
              >
                {b}
              </span>
            </div>
          ))}
        </div>

        {/* Open in Portfolio button */}
        <button
          onClick={() => {
            onClose();
            onOpenBook(card.book, card.chapter);
          }}
          style={{
            marginTop: 24,
            width: '100%',
            background: card.gradient[0],
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 0',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'opacity 0.15s ease, transform 0.1s ease',
          }}
          className="hover:opacity-90 active:scale-[0.99]"
        >
          Open in Portfolio →
        </button>
      </div>
    </div>
  );
}

// ── Single Carousel Card Component (Step 2) ───────────────────────────────────
interface CarouselCardProps {
  key?: React.Key;
  card: CarouselCardItem;
  offset: number;
  cardWidth: number;
  cardHeight: number;
  onClick: () => void;
}

function CarouselCard({ card, offset, cardWidth, cardHeight, onClick }: CarouselCardProps) {
  const absOffset = Math.abs(offset);

  // Active card: scale(1), center of screen
  // Flanking cards: scale(0.85), opacity 0.5, tilted (rotateY ±15deg)
  // Next cards: scale(0.70), opacity 0.25, further back
  let scale = 1;
  let opacity = 1;
  let rotation = 0;
  let depth = 0;

  if (absOffset < 0.5) {
    scale = 1 - absOffset * 0.15;
    opacity = 1;
    rotation = -offset * 15;
    depth = 0;
  } else if (absOffset < 1.5) {
    const t = absOffset - 0.5;
    scale = 0.85 - t * 0.15;
    opacity = 0.55 - t * 0.25;
    rotation = offset > 0 ? -15 : 15;
    depth = -100;
  } else {
    scale = 0.70;
    opacity = Math.max(0.1, 0.25 - (absOffset - 1.5) * 0.1);
    rotation = offset > 0 ? -18 : 18;
    depth = -180;
  }

  // Smooth spacing across cards
  const x = offset * (cardWidth * 0.82 + 20);
  const zIndex = Math.round(100 - absOffset * 10);
  const [color1, color2] = card.gradient;

  if (absOffset > 2.8) {
    return null;
  }

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${card.title} - ${card.tag}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      style={{
        position: 'absolute',
        width: cardWidth,
        height: cardHeight,
        left: '50%',
        top: '50%',
        marginLeft: -cardWidth / 2,
        marginTop: -cardHeight / 2,
        transform: `translateX(${x}px) translateZ(${depth}px) rotateY(${rotation}deg) scale(${scale})`,
        opacity,
        zIndex,
        pointerEvents: 'auto', // always — never none
        cursor: 'pointer',
        transition: 'box-shadow 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
        borderRadius: 16,
        padding: '28px 24px',
        overflow: 'hidden',
        userSelect: 'none',
        background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow:
          absOffset < 0.5
            ? '0 28px 70px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.12)'
            : '0 14px 35px rgba(0,0,0,0.45)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Subtle Grain overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
          opacity: 0.35,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />

      {/* Top-left gloss highlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* TOP: Tag pill */}
      <div className="relative z-10">
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            background: 'rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.9)',
            padding: '4px 10px',
            borderRadius: '20px',
            display: 'inline-block',
            border: '1px solid rgba(255,255,255,0.15)',
            whiteSpace: 'nowrap',
          }}
        >
          {card.tag}
        </span>
      </div>

      {/* MIDDLE: Title & Bullets */}
      <div className="relative z-10 flex flex-col my-auto py-2">
        <h3
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.25,
            marginBottom: '12px',
          }}
          className="font-serif sm:font-sans"
        >
          {card.title}
        </h3>
        <div className="space-y-2">
          {card.bullets.slice(0, 2).map((bullet, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 text-[12px] leading-snug text-white/80 font-sans"
            >
              <span
                style={{ color: card.gradient[0] }}
                className="text-[10px] shrink-0 font-bold mt-0.5 select-none"
              >
                ◆
              </span>
              <span className="line-clamp-2">{bullet}</span>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM: Action button visual */}
      <div className="relative z-10 w-full pt-1">
        <div
          style={{
            width: '100%',
            height: '38px',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.12)',
            color: '#FFFFFF',
            fontFamily: 'monospace',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            border: '1px solid rgba(255,255,255,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s ease',
          }}
          className="hover:bg-white/20"
        >
          View Project →
        </div>
      </div>
    </div>
  );
}

// ── Animated Background ───────────────────────────────────────────────────────
interface AnimatedBackgroundProps {
  activeIndex: number;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ activeIndex }) => {
  const curr = CAROUSEL_CARDS[activeIndex] || CAROUSEL_CARDS[0];
  const next = CAROUSEL_CARDS[(activeIndex + 1) % CAROUSEL_CARDS.length] || CAROUSEL_CARDS[0];

  const bg1 = curr.gradient[0];
  const bg2 = next.gradient[1];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse 75% 75% at 30% 45%, ${bg1}30 0%, transparent 70%),
                     radial-gradient(ellipse 65% 65% at 70% 55%, ${bg2}30 0%, transparent 70%),
                     #0F0E0C`,
        transition: 'background 0.5s ease',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
          opacity: 0.6,
        }}
      />
    </div>
  );
};

// ── Main Gradient Carousel ────────────────────────────────────────────────────
export interface GradientCarouselProps {
  onReadMoreFromCard?: (card: CarouselCardItem) => void;
  onOpenBook?: (book: string, chapter: number) => void;
}

export default function GradientCarousel({
  onReadMoreFromCard,
  onOpenBook,
}: GradientCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [overlayCard, setOverlayCard] = useState<CarouselCardItem | null>(null);

  // Card dimensions: Active card 280px wide × 400px tall
  const cardWidth = 280;
  const cardHeight = 400;

  // Step 4 Navigation: cycle through all 12 cards
  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % CAROUSEL_CARDS.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + CAROUSEL_CARDS.length) % CAROUSEL_CARDS.length);
  }, []);

  // Step 2: Click handler — each card is individually clickable
  const handleCardClick = (i: number) => {
    if (i !== activeIndex) {
      setActiveIndex(i);
      // wait for animation then open overlay
      setTimeout(() => setOverlayCard(CAROUSEL_CARDS[i]), 350);
    } else {
      setOverlayCard(CAROUSEL_CARDS[i]);
    }
  };

  // Keyboard navigation when overlay is closed
  useEffect(() => {
    if (overlayCard) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, overlayCard]);

  // Touch swipe support for mobile
  const touchStartRef = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartRef.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) goNext();
      else goPrev();
    }
    touchStartRef.current = null;
  };

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full flex-1 flex flex-col justify-center items-center overflow-hidden select-none py-2"
      aria-label="Interactive project card carousel"
    >
      {/* Dynamic Background with interpolated ambient gradients */}
      <AnimatedBackground activeIndex={activeIndex} />

      {/* 3D Carousel Stage with Left/Right Arrow Navigation */}
      <div className="relative w-full flex items-center justify-center">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous project"
          className="absolute left-3 sm:left-8 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center text-white border border-white/15 cursor-pointer backdrop-blur-md"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* 3D Stage */}
        <div
          className="relative w-full flex items-center justify-center"
          style={{
            height: cardHeight + 40,
            perspective: 1000,
            perspectiveOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
          }}
        >
          {CAROUSEL_CARDS.map((card, i) => {
            // Circular offset so cycling wraps smoothly across 12 cards
            let offset = i - activeIndex;
            if (offset > CAROUSEL_CARDS.length / 2) {
              offset -= CAROUSEL_CARDS.length;
            } else if (offset < -CAROUSEL_CARDS.length / 2) {
              offset += CAROUSEL_CARDS.length;
            }

            return (
              <CarouselCard
                key={card.id}
                card={card}
                offset={offset}
                cardWidth={cardWidth}
                cardHeight={cardHeight}
                onClick={() => handleCardClick(i)}
              />
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={goNext}
          aria-label="Next project"
          className="absolute right-3 sm:right-8 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center text-white border border-white/15 cursor-pointer backdrop-blur-md"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dot Indicators: 12 dots, current card highlighted */}
      <div className="relative z-10 flex gap-1.5 justify-center items-center mt-3">
        {CAROUSEL_CARDS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            style={{
              width: i === activeIndex ? 22 : 6,
              height: 6,
              borderRadius: 3,
              background: i === activeIndex ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.25)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
            }}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>

      {/* Subtle interaction cue */}
      <div className="relative z-10 text-[11px] font-mono tracking-wider text-white/30 mt-3 pointer-events-none">
        arrows · swipe · click card for details ({activeIndex + 1} of {CAROUSEL_CARDS.length})
      </div>

      {/* Project Detail Overlay */}
      <ProjectOverlay
        card={overlayCard}
        onClose={() => setOverlayCard(null)}
        onOpenBook={(book, chapter) => {
          if (onOpenBook) {
            onOpenBook(book, chapter);
          } else if (onReadMoreFromCard && overlayCard) {
            onReadMoreFromCard(overlayCard);
          }
        }}
      />
    </section>
  );
}
