import React, {
  memo,
  useState,
  useCallback,
  CSSProperties,
  ReactNode,
} from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "motion/react";
import { cn } from "@/src/lib/utils";

export interface PageFlipLeaf {
  id?: string;
  front?: string;
  back?: string;
  frontAlt?: string;
  backAlt?: string;
  frontContent?: ReactNode;
  backContent?: ReactNode;
  frontPaper?: string;
  backPaper?: string;
}

export interface PageFlipProps {
  pages?: PageFlipLeaf[];
  pageWidth?: number;
  pageHeight?: number;
  pageRadius?: number;
  pageColor?: string;
  perspective?: number;
  spineShift?: number;
  turnAngle?: number;
  peekAngle?: number;
  duration?: number;
  stagger?: number;
  ease?: "easeInOut" | "easeOut" | "circOut" | "backOut";
  shadow?: number;
  trigger?: "click" | "hover";
  closeOnLeave?: boolean;
  interactive?: boolean;
  className?: string;
  style?: CSSProperties;
  currentPageIndex?: number;
  onPageChange?: (index: number) => void;
}

const easings = {
  easeInOut: [0.65, 0, 0.35, 1],
  easeOut: [0.16, 1, 0.3, 1],
  circOut: [0, 0.55, 0.45, 1],
  backOut: [0.34, 1.56, 0.64, 1],
} as const;

const defaultLeaves: PageFlipLeaf[] = [
  {
    id: "leaf-1",
    front:
      "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?q=80&w=700&auto=format&fit=crop",
    back: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=700&auto=format&fit=crop",
    frontAlt: "Architectural structure",
    backAlt: "Modern building skyline",
  },
  {
    id: "leaf-2",
    front:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=700&auto=format&fit=crop",
    back: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=700&auto=format&fit=crop",
    frontAlt: "Modern villa",
    backAlt: "Interior living space",
  },
];

interface LeafComponentProps {
  index: number;
  total: number;
  front?: string;
  back?: string;
  frontAlt?: string;
  backAlt?: string;
  frontContent?: ReactNode;
  backContent?: ReactNode;
  frontPaper?: string;
  backPaper?: string;
  turned: boolean;
  peek: boolean;
  delay: number;
  width: number;
  height: number;
  radius: number;
  paper: string;
  turnAngle: number;
  peekAngle: number;
  duration: number;
  curve: readonly [number, number, number, number];
  shadow: number;
  interactive: boolean;
  onSelect: (index: number) => void;
  onReach: (index: number) => void;
  onRelease: () => void;
  onDragFlip?: (index: number, direction: "next" | "prev") => void;
}

const LeafComponent = memo(function LeafComponent({
  index,
  total,
  front,
  back,
  frontAlt,
  backAlt,
  frontContent,
  backContent,
  frontPaper,
  backPaper,
  turned,
  peek,
  delay,
  width,
  height,
  radius,
  paper,
  turnAngle,
  peekAngle,
  duration,
  curve,
  shadow,
  interactive,
  onSelect,
  onReach,
  onRelease,
  onDragFlip,
}: LeafComponentProps) {
  const rotateY = useMotionValue(turned ? -turnAngle : 0);
  const zIndex = useTransform(rotateY, (val) =>
    val < -turnAngle / 2 ? total + index + 1 : total - index
  );

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (!interactive) return;
    if (info.offset.x < -40 || info.velocity.x < -200) {
      // Dragged left -> turn forward
      if (!turned) {
        onDragFlip ? onDragFlip(index, "next") : onSelect(index);
      }
    } else if (info.offset.x > 40 || info.velocity.x > 200) {
      // Dragged right -> turn backward
      if (turned) {
        onDragFlip ? onDragFlip(index, "prev") : onSelect(index);
      }
    }
  };

  return (
    <motion.div
      className="absolute select-none"
      style={{
        width,
        height,
        rotateY,
        zIndex,
        transformOrigin: "left center",
        transformStyle: "preserve-3d",
        borderRadius: radius,
        cursor: interactive ? "grab" : "default",
        boxShadow:
          shadow > 0
            ? `${Math.round(4 * shadow)}px ${Math.round(6 * shadow)}px ${Math.round(
                34 * shadow
              )}px rgba(0,0,0,${Math.min(0.35 * shadow, 0.4)})`
            : "none",
      }}
      animate={{
        rotateY: turned ? -turnAngle : peek ? -peekAngle : 0,
      }}
      transition={{
        duration,
        delay,
        ease: curve,
      }}
      drag={interactive ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.15}
      onDragEnd={handleDragEnd}
      onPointerEnter={() => onReach(index)}
      onPointerLeave={onRelease}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(index);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(index);
        }
      }}
      role={interactive ? "button" : undefined}
      aria-pressed={interactive ? turned : undefined}
      tabIndex={interactive ? 0 : -1}
    >
      {/* Front of Leaf */}
      <div
        className="absolute inset-0 h-full w-full overflow-hidden backface-hidden"
        style={{
          background: frontPaper ?? paper,
          borderRadius: radius,
          backfaceVisibility: "hidden",
        }}
      >
        {frontContent ? (
          <div className="h-full w-full">{frontContent}</div>
        ) : front ? (
          <img
            src={front}
            alt={frontAlt ?? `Page ${index * 2 + 1}`}
            draggable={false}
            className="h-full w-full object-cover pointer-events-none"
            style={{
              background: paper,
              borderRadius: radius,
            }}
          />
        ) : null}

        {/* Subtle page gradient overlay on outer page curl edge */}
        <div className="absolute inset-y-0 right-0 w-8 pointer-events-none bg-gradient-to-l from-black/5 to-transparent" />
      </div>

      {/* Back of Leaf (Rotated 180 degrees) */}
      <div
        className="absolute inset-0 h-full w-full overflow-hidden backface-hidden"
        style={{
          background: backPaper ?? paper,
          borderRadius: radius,
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg) translateZ(1px)",
        }}
      >
        {backContent ? (
          <div className="h-full w-full">{backContent}</div>
        ) : back ? (
          <img
            src={back}
            alt={backAlt ?? `Page ${index * 2 + 2}`}
            draggable={false}
            className="h-full w-full object-cover pointer-events-none"
            style={{
              background: paper,
              borderRadius: radius,
            }}
          />
        ) : null}

        {/* Subtle page gradient overlay on inner spine edge */}
        <div className="absolute inset-y-0 left-0 w-8 pointer-events-none bg-gradient-to-r from-black/5 to-transparent" />
      </div>
    </motion.div>
  );
});

export const PageFlip: React.FC<PageFlipProps> = ({
  pages = defaultLeaves,
  pageWidth = 320,
  pageHeight = 440,
  pageRadius = 8,
  pageColor = "#FDFBF7",
  perspective = 1400,
  spineShift = 120,
  turnAngle = 180,
  peekAngle = 12,
  duration = 0.6,
  stagger = 0.08,
  ease = "easeInOut",
  shadow = 0.3,
  trigger = "click",
  closeOnLeave = false,
  interactive = true,
  className,
  style,
  currentPageIndex,
  onPageChange,
}) => {
  const leafList = pages.length > 0 ? pages : defaultLeaves;
  const total = leafList.length;

  const [internalTurnedIndex, setInternalTurnedIndex] = useState<number>(
    currentPageIndex ?? 0
  );
  const [peekIndex, setPeekIndex] = useState<number>(-1);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const turnedIndex =
    currentPageIndex !== undefined ? currentPageIndex : internalTurnedIndex;

  const curve = easings[ease] ?? easings.easeInOut;

  const setTurned = useCallback(
    (newIndex: number) => {
      if (onPageChange) {
        onPageChange(newIndex);
      }
      setInternalTurnedIndex(newIndex);
    },
    [onPageChange]
  );

  const handleSelect = useCallback(
    (index: number) => {
      if (!interactive) return;
      setIsResetting(false);
      if (index < turnedIndex) {
        // Flipping backward (unturn this page and pages after it)
        setTurned(index);
      } else {
        // Flipping forward (turn this page)
        setTurned(index + 1);
      }
    },
    [interactive, turnedIndex, setTurned]
  );

  const handleDragFlip = useCallback(
    (index: number, direction: "next" | "prev") => {
      if (!interactive) return;
      setIsResetting(false);
      if (direction === "next") {
        setTurned(Math.min(total, index + 1));
      } else {
        setTurned(Math.max(0, index));
      }
    },
    [interactive, total, setTurned]
  );

  const handleReach = useCallback(
    (index: number) => {
      if (!interactive) return;
      setPeekIndex(index);
      if (trigger === "hover") {
        setIsResetting(false);
        setTurned(index + 1);
      }
    },
    [interactive, trigger, setTurned]
  );

  const handleRelease = useCallback(() => {
    setPeekIndex(-1);
  }, []);

  const handleReset = useCallback(() => {
    setIsResetting(true);
    setTurned(0);
  }, [setTurned]);

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center select-none",
        className
      )}
      style={{
        perspective: `${perspective}px`,
        ...style,
      }}
      onClick={(e) => {
        // Only trigger reset if clicked outside the leaves
        if (e.target === e.currentTarget) {
          handleReset();
        }
      }}
      onPointerLeave={() => {
        setPeekIndex(-1);
        if (closeOnLeave) {
          handleReset();
        }
      }}
    >
      {/* Book Container with 3D perspective and center spine shift */}
      <motion.div
        className="relative"
        style={{
          width: pageWidth,
          height: pageHeight,
          perspective: `${perspective}px`,
          transformStyle: "preserve-3d",
        }}
        animate={{
          x: turnedIndex > 0 ? (spineShift > 0 ? spineShift : pageWidth / 2) : 0,
        }}
        transition={{
          duration: Math.max(0.8 * duration, 0.15),
          ease: "easeOut",
        }}
      >
        {leafList.map((leaf, index) => {
          const isTurned = index < turnedIndex;
          const isPeeking =
            interactive && !isTurned && peekIndex === index && index === turnedIndex;
          const delay = isResetting && !isTurned ? (total - 1 - index) * stagger : 0;

          return (
            <LeafComponent
              key={leaf.id ?? `leaf-${index}`}
              index={index}
              total={total}
              front={leaf.front}
              back={leaf.back}
              frontAlt={leaf.frontAlt}
              backAlt={leaf.backAlt}
              frontContent={leaf.frontContent}
              backContent={leaf.backContent}
              frontPaper={leaf.frontPaper}
              backPaper={leaf.backPaper}
              turned={isTurned}
              peek={isPeeking}
              delay={delay}
              width={pageWidth}
              height={pageHeight}
              radius={pageRadius}
              paper={pageColor}
              turnAngle={turnAngle}
              peekAngle={peekAngle}
              duration={duration}
              curve={curve}
              shadow={shadow}
              interactive={interactive}
              onSelect={handleSelect}
              onReach={handleReach}
              onRelease={handleRelease}
              onDragFlip={handleDragFlip}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default PageFlip;
