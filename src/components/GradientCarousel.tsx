import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ProjectCardData, ProjectModal } from './ProjectModal';

export type { ProjectCardData };

export const CARDS: ProjectCardData[] = [
  {
    title: 'TIC Challenge',
    description: 'Gamified employee training. 300+ users at launch.',
    tag: 'HACKS · 1ST PLACE',
    gradient: ['#E7B5D0', '#B6C8A9'],
    modalBullets: [
      'Gamified learning platform for employee training',
      'Social features: dashboards, project boards, XP points',
      '100% vibecoded MVP — full-stack web app',
      'Launched live at GP Construction party, 300+ users',
    ],
    modalStat: '98/100 pitch score',
    bookId: 'hacks',
    pageNumber: 2,
  },
  {
    title: 'Zayu.go',
    description: 'Every way to get to the game. Built in 48 hours.',
    tag: 'HACKS · 2ND PLACE',
    gradient: ['#6096BA', '#C8EAD3'],
    modalBullets: [
      'Multi-modal transport comparison: time, cost, safety',
      'In-app World Cup match ticket wallet',
      'Real-time translation for international fans',
      'Emergency services button with local contacts',
    ],
    modalStat: '2nd place · ServiceNow Appathon 2025',
    bookId: 'hacks',
    pageNumber: 3,
  },
  {
    title: 'AI Production Scheduler',
    description: 'Three datasets. One agent. Zero manual steps.',
    tag: 'SYSTEMS · INDUSTRY',
    gradient: ['#482728', '#6096BA'],
    modalBullets: [
      'n8n pipeline unifies 3 raw datasets into clean demand view',
      'AI agent generates schedule to the minute using foundry rules',
      'Human-in-the-loop approval before execution',
      'Final schedule emailed live to directors in demo',
    ],
    modalStat: 'Quimmco Group · Questum Foundry · 2025',
    bookId: 'systems',
    pageNumber: 2,
  },
  {
    title: 'Smart Parking TEC',
    description: 'Know where to park before you leave home.',
    tag: 'SYSTEMS · IoT',
    gradient: ['#B6C8A9', '#6096BA'],
    modalBullets: [
      'ESP32 sensors detect per-spot occupancy in real time',
      'Oracle SQL backend serves live data to dashboard + mobile',
      'Spot-sharing: release your spot for another student',
      'Reservation system for guaranteed access',
    ],
    modalStat: 'Full stack · Hardware to mobile · Tec de Monterrey',
    bookId: 'systems',
    pageNumber: 3,
  },
  {
    title: 'MIT Lift Lab Research',
    description: 'What actually predicts nanostore survival in Mexico.',
    tag: 'ANALYSIS · MIT',
    gradient: ['#B6C8A9', '#C8EAD3'],
    modalBullets: [
      'Cleaned and structured raw nanostore survey data in Python',
      'Applied K-means clustering to segment store profiles',
      'Linear regression identified key survival predictors',
      'Part of MIT Lift Lab ongoing Mexico-wide research',
    ],
    modalStat: 'MIT Lift Lab · Mexico-wide dataset · 2024',
    bookId: 'analysis',
    pageNumber: 2,
  },
  {
    title: 'Bridgestone Downtime Analysis',
    description: 'Found why machine A2 kept failing.',
    tag: 'ANALYSIS · INDUSTRY',
    gradient: ['#482728', '#B6C8A9'],
    modalBullets: [
      'Analyzed historical downtime records for machine A2',
      'Identified root causes and failure-preceding conditions',
      'Designed vulcanization alarm to catch signals early',
      'Reduced non-operative time on production line',
    ],
    modalStat: 'Bridgestone · Production Line Analysis · 2025',
    bookId: 'analysis',
    pageNumber: 3,
  },
  {
    title: 'Science Gallery Monterrey',
    description: 'Dashboards the gallery actually used.',
    tag: 'ANALYSIS · DATA',
    gradient: ['#C8EAD3', '#6096BA'],
    modalBullets: [
      'Analyzed visitor engagement and exhibition performance',
      'Built interactive Power BI dashboards for leadership',
      'Translated raw data into operational recommendations',
      'Gallery implemented findings in programming decisions',
    ],
    modalStat: 'Power BI · Science Gallery Monterrey · 2025',
    bookId: 'analysis',
    pageNumber: 4,
  },
  {
    title: 'Oxxo Demand Prediction',
    description: '1,200+ stores. 4 products. One interface to see it all.',
    tag: 'ANALYSIS · INDUSTRY',
    gradient: ['#B6C8A9', '#482728'],
    modalBullets: [
      'Prediction models (linear regression, time series, random forest) across 1,200+ Oxxo stores for 4 seasonal products',
      'Web app I built pulls live from Google Colab notebook',
      'Store workers tap any location to see its product prediction',
      'Management dashboard for seasonal inventory decisions',
    ],
    modalStat: '1,200+ stores · 4 seasonal products · Class + Industry',
    bookId: 'analysis',
    pageNumber: 5,
  },
  {
    title: 'Outsiiders 2026',
    description: '19 speakers. 21 hours. I built the website and ran the room.',
    tag: 'VENTURES · CONGRESS',
    gradient: ['#6096BA', '#482728'],
    modalBullets: [
      'Designed and built the event website from scratch',
      'Led 12 directors + 6 staff through 6 months of planning',
      '19 industry speakers: Forbes, AWS, CEMEX, Rayados + more',
      'Hosted panels and moderated live in front of 300+ attendees',
    ],
    modalStat: '19 speakers · 21 hours · 18 sponsors · 2026',
    bookId: 'ventures',
    pageNumber: 2,
  },
  {
    title: 'I Got Me',
    description: 'Everyday carry kits for women. Paused. Not forgotten.',
    tag: 'VENTURES · FOUNDER',
    gradient: ['#E7B5D0', '#482728'],
    modalBullets: [
      'Curated everyday carry kit — physical product for women',
      'Launched as concept at Start Up I GOT ME 2025',
      'Prototyped and tested before pausing for development',
      'Evolution of Immanka, her first product from high school',
    ],
    modalStat: 'Founder · Product Design · In Development',
    bookId: 'ventures',
    pageNumber: 3,
  },
  {
    title: 'Dolce Puro',
    description: 'Protein tiramisus with a loyalty card you can actually use.',
    tag: 'VENTURES · LIVE',
    gradient: ['#C8EAD3', '#E7B5D0'],
    modalBullets: [
      'Artisan protein tiramisu brand — real product, real sales',
      'Built and deployed a digital loyalty card for clients',
      'Live at dolcepuro.netlify.app',
      'Full brand + tech: identity, product, digital experience',
    ],
    modalStat: 'Live product · Co-Founder · Tech Lead · 2025',
    bookId: 'ventures',
    pageNumber: 4,
  },
  {
    title: 'AI Security Research',
    description: 'Cybersecurity for AI coding agents. Purdue TSEL. Coming soon.',
    tag: 'SECURITY · IN PROGRESS',
    gradient: ['#482728', '#E7B5D0'],
    modalBullets: [
      'Visiting researcher at Purdue University TSEL Lab',
      'Focus: cybersecurity vulnerabilities in AI coding agents',
      'Empirical research with test harness and mitigations',
      'Academic paper in progress — details withheld until publication',
    ],
    modalStat: 'Purdue TSEL · Fall 2026 · Paper in progress',
    bookId: 'security',
    pageNumber: 2,
  },
];

// ── Color Interpolation ───────────────────────────────────────────────────────
function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return [r, g, b];
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpColor(hex1: string, hex2: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  return `rgb(${Math.round(lerp(r1, r2, t))}, ${Math.round(lerp(g1, g2, t))}, ${Math.round(lerp(b1, b2, t))})`;
}

// ── Single Card Component ─────────────────────────────────────────────────────
interface CarouselCardProps {
  card: ProjectCardData;
  offset: number;
  cardWidth: number;
  cardHeight: number;
  gap: number;
  onClick: () => void;
  style?: React.CSSProperties;
}

const CarouselCard: React.FC<CarouselCardProps> = ({
  card,
  offset,
  cardWidth,
  cardHeight,
  gap,
  onClick,
  style,
}) => {
  const absOffset = Math.abs(offset);
  // Center card full size (1.0), side cards scaled to 0.85
  const scale = Math.max(0.85, 1 - absOffset * 0.15);
  const rotation = -offset * 18 * Math.exp(-absOffset * 0.4);
  const depth = -absOffset * 160 * Math.exp(-absOffset * 0.3);
  const opacity = absOffset < 0.5 ? 1 : Math.max(0.35, 1 - absOffset * 0.3);
  const x = offset * (cardWidth + gap);
  const zIndex = Math.round(100 - absOffset * 10);

  const [color1, color2] = card.gradient;

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
        pointerEvents: 'auto',
        transition: 'box-shadow 0.3s ease, transform 0.1s ease-out',
        borderRadius: 20,
        overflow: 'hidden',
        cursor: 'pointer',
        userSelect: 'none',
        background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
        boxShadow:
          absOffset < 0.5
            ? '0 28px 70px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.12)'
            : '0 14px 35px rgba(0,0,0,0.45)',
        ...style,
      }}
    >
      {/* Grain overlay: fractalNoise, opacity 0.4 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
          opacity: 0.4,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />

      {/* Gloss: linear-gradient top-left rgba(255,255,255,0.18) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Tag pill: top-left, 9px, uppercase, rgba(255,255,255,0.12) bg */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 10,
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#ffffff',
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          borderRadius: 9999,
          padding: '3px 8px',
          border: '1px solid rgba(255,255,255,0.15)',
          lineHeight: 1.2,
          fontFamily: 'monospace',
        }}
      >
        {card.tag}
      </div>

      {/* Content sits in bottom overlay: rgba(0,0,0,0.72) gradient */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '32px 20px 20px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 60%, transparent 100%)',
          zIndex: 10,
        }}
      >
        <h3
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.2,
            marginBottom: 6,
          }}
        >
          {card.title}
        </h3>
        <p
          style={{
            fontSize: 13,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.4,
          }}
        >
          {card.description}
        </p>
      </div>
    </div>
  );
};

// ── Animated Background ───────────────────────────────────────────────────────
interface AnimatedBackgroundProps {
  activeIndex: number;
  progress: number;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ activeIndex, progress }) => {
  const curr = CARDS[activeIndex] || CARDS[0];
  const next = CARDS[(activeIndex + 1) % CARDS.length] || CARDS[0];
  const t = Math.abs(progress % 1);

  // Background gradient interpolates dynamically between active card's two gradient colors
  const bg1 = lerpColor(curr.gradient[0], next.gradient[0], t);
  const bg2 = lerpColor(curr.gradient[1], next.gradient[1], t);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse 75% 75% at 30% 45%, ${bg1}28 0%, transparent 70%),
                     radial-gradient(ellipse 65% 65% at 70% 55%, ${bg2}28 0%, transparent 70%),
                     #0a0a0a`,
        transition: 'background 0.4s ease',
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

// ── Dot Indicators ────────────────────────────────────────────────────────────
interface DotsProps {
  count: number;
  active: number;
  onDotClick: (index: number) => void;
}

const Dots: React.FC<DotsProps> = ({ count, active, onDotClick }) => {
  return (
    <div className="flex gap-2 justify-center items-center mt-4">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onDotClick(i)}
          style={{
            width: i === active ? 22 : 6,
            height: 6,
            borderRadius: 3,
            background: i === active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.25)',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            transition: 'all 0.3s ease',
          }}
          aria-label={`Go to project slide ${i + 1}`}
        />
      ))}
    </div>
  );
};

// ── Main Gradient Carousel ────────────────────────────────────────────────────
export interface GradientCarouselProps {
  onReadMoreFromCard: (card: ProjectCardData) => void;
}

export default function GradientCarousel({ onReadMoreFromCard }: GradientCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(290);
  const cardHeight = cardWidth; // 1:1 aspect ratio
  const gap = 16;

  // Float position for continuous smooth motion
  const positionRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [displayPosition, setDisplayPosition] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-advance & hover pause state
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCardForModal, setSelectedCardForModal] = useState<ProjectCardData | null>(null);

  // Pointer drag state
  const dragRef = useRef<{
    isDown: boolean;
    isDragging: boolean;
    startX: number;
    startPos: number;
  }>({
    isDown: false,
    isDragging: false,
    startX: 0,
    startPos: 0,
  });

  // Calculate card width responsively
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      setCardWidth(Math.min(300, Math.max(250, w * 0.62)));
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Smooth step animation toward target
  const animate = useCallback(() => {
    velocityRef.current *= 0.92;
    positionRef.current += velocityRef.current;

    if (Math.abs(velocityRef.current) < 0.002) {
      const target = Math.round(positionRef.current);
      const clamped = Math.max(0, Math.min(CARDS.length - 1, target));
      const diff = clamped - positionRef.current;
      positionRef.current += diff * 0.16;
      if (Math.abs(diff) < 0.001) {
        positionRef.current = clamped;
        velocityRef.current = 0;
        setDisplayPosition(clamped);
        setActiveIndex(clamped);
        rafRef.current = null;
        return;
      }
    }

    const clamped = Math.max(0, Math.min(CARDS.length - 1, positionRef.current));
    if (clamped !== positionRef.current) {
      positionRef.current += (clamped - positionRef.current) * 0.3;
      velocityRef.current *= 0.7;
    }

    setDisplayPosition(positionRef.current);
    const newActive = Math.round(positionRef.current);
    setActiveIndex(Math.max(0, Math.min(CARDS.length - 1, newActive)));

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const startAnimate = useCallback(() => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const goTo = useCallback(
    (targetIdx: number) => {
      const clamped = Math.max(0, Math.min(CARDS.length - 1, targetIdx));
      const diff = clamped - positionRef.current;
      velocityRef.current = diff * 0.22;
      startAnimate();
    },
    [startAnimate]
  );

  // Auto-advance every 4 seconds, pauses on hover or when modal is open
  useEffect(() => {
    if (isHovered || selectedCardForModal !== null || dragRef.current.isDragging) return;
    const interval = setInterval(() => {
      goTo((activeIndex + 1) % CARDS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, selectedCardForModal, activeIndex, goTo]);

  // Wheel horizontal/vertical scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (selectedCardForModal) return;
      e.preventDefault();
      velocityRef.current += (e.deltaX || e.deltaY) * 0.0022;
      startAnimate();
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [selectedCardForModal, startAnimate]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedCardForModal) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goTo(activeIndex + 1);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goTo(activeIndex - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, goTo, selectedCardForModal]);

  // Pointer Drag & Mobile Swipe (one card at a time)
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (selectedCardForModal) return;
    dragRef.current = {
      isDown: true,
      isDragging: false,
      startX: e.clientX,
      startPos: positionRef.current,
    };
    velocityRef.current = 0;
  }, [selectedCardForModal]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current.isDown) return;
      const dx = e.clientX - dragRef.current.startX;
      if (!dragRef.current.isDragging && Math.abs(dx) > 6) {
        dragRef.current.isDragging = true;
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      }
      if (!dragRef.current.isDragging) return;

      const newPos = dragRef.current.startPos - (dx / (cardWidth + gap)) * 1.1;
      const clamped = Math.max(-0.2, Math.min(CARDS.length - 0.8, newPos));
      positionRef.current = clamped;
      setDisplayPosition(clamped);
      setActiveIndex(Math.max(0, Math.min(CARDS.length - 1, Math.round(clamped))));
    },
    [cardWidth, gap]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current.isDown) return;
      const wasDragging = dragRef.current.isDragging;
      const dx = e.clientX - dragRef.current.startX;
      dragRef.current.isDown = false;
      dragRef.current.isDragging = false;

      if (wasDragging) {
        // Snappy one-card swipe threshold
        if (Math.abs(dx) > 35) {
          const direction = dx < 0 ? 1 : -1;
          goTo(Math.round(dragRef.current.startPos) + direction);
        } else {
          velocityRef.current = (-dx / (cardWidth + gap)) * 0.1;
          startAnimate();
        }
      }
    },
    [cardWidth, gap, goTo, startAnimate]
  );

  // FIX 4: Click handler receives card index and works in ANY position
  const handleCardClick = (index: number) => {
    if (dragRef.current.isDragging) return;
    const targetCard = CARDS[index];
    if (!targetCard) return;

    if (index !== activeIndex) {
      // Animate to this card first (300ms), then open modal after animation
      goTo(index);
      setTimeout(() => {
        setSelectedCardForModal(targetCard);
      }, 350);
    } else {
      setSelectedCardForModal(targetCard);
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      className="relative w-full flex-1 flex flex-col justify-center items-center overflow-hidden select-none py-2"
      style={{
        cursor: dragRef.current.isDragging ? 'grabbing' : 'grab',
      }}
      aria-label="Interactive project card carousel"
    >
      {/* Dynamic Background with interpolated ambient gradients */}
      <AnimatedBackground activeIndex={activeIndex} progress={displayPosition} />

      {/* 3D Carousel Stage */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          height: cardHeight + 40,
          perspective: 1000,
          perspectiveOrigin: '50% 50%',
          transformStyle: 'preserve-3d',
        }}
      >
        {CARDS.map((card, i) => {
          const offset = i - displayPosition;
          if (Math.abs(offset) > 3.8) return null;
          return (
            <CarouselCard
              key={i}
              card={card}
              offset={offset}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              gap={gap}
              onClick={() => handleCardClick(i)}
              style={{ pointerEvents: 'auto' }}
            />
          );
        })}
      </div>

      {/* Dot Indicators */}
      <div className="relative z-10">
        <Dots count={CARDS.length} active={activeIndex} onDotClick={goTo} />
      </div>

      {/* Subtle interaction cue */}
      <div className="relative z-10 text-[11px] font-mono tracking-wider text-white/30 mt-3 pointer-events-none">
        drag · scroll · arrows · click card for details
      </div>

      {/* Card Detail Modal */}
      <ProjectModal
        card={selectedCardForModal}
        onClose={() => setSelectedCardForModal(null)}
        onReadMore={(card) => {
          setSelectedCardForModal(null);
          onReadMoreFromCard(card);
        }}
      />
    </section>
  );
}
