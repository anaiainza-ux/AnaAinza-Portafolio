import React from 'react';
import { ExternalLink } from 'lucide-react';
import { WallFrame } from './WallFrame';

export interface HangingFrameData {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  flowerType: 'marigold' | 'lavender' | 'daisy' | 'rose' | 'ferris';
  frameFinish: 'vintage-gold' | 'dark-walnut' | 'antique-brass' | 'rose-gold';
  cordLength: 'short' | 'medium' | 'tall';
  side: 'left' | 'right';
  botanicalName?: string;
  imageSrc?: string;
  isWallFrame?: boolean;
}

interface HangingFrameProps {
  frame: HangingFrameData;
  isCompact?: boolean;
  onClick?: () => void;
}

export const HangingFrame: React.FC<HangingFrameProps> = ({ frame, isCompact = false, onClick }) => {
  // If this frame is configured specifically as a custom wall frame (like Ferris of Colors)
  if (frame.isWallFrame) {
    return (
      <WallFrame
        imageSrc={frame.imageSrc || '/images/ferris-of-colors.svg'}
        title={frame.title}
        category={frame.subtitle}
        url={frame.url}
        isCompact={isCompact}
        onClick={onClick}
      />
    );
  }

  // Height and wire offsets based on cord length
  const wireHeights = {
    short: isCompact ? 'h-2 sm:h-2.5' : 'h-6 sm:h-7',
    medium: isCompact ? 'h-3 sm:h-3.5' : 'h-8 sm:h-9',
    tall: isCompact ? 'h-4 sm:h-4.5' : 'h-10 sm:h-12',
  };

  // Render Realistic Pressed Flowers Herbarium Artwork
  const renderFlowerArt = () => {
    switch (frame.flowerType) {
      case 'marigold':
        // Realistic Pressed Wild Calendula / Marigold
        return (
          <svg viewBox="0 0 120 150" className="w-full h-full drop-shadow-xs" fill="none">
            <defs>
              <linearGradient id="mari-stem" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3B5332" />
                <stop offset="50%" stopColor="#557548" />
                <stop offset="100%" stopColor="#2F4428" />
              </linearGradient>
              <linearGradient id="mari-leaf-1" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#354D2E" />
                <stop offset="60%" stopColor="#5B7E50" />
                <stop offset="100%" stopColor="#719A64" />
              </linearGradient>
              <radialGradient id="mari-center" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#5B2206" />
                <stop offset="45%" stopColor="#7C2D12" />
                <stop offset="80%" stopColor="#B45309" />
                <stop offset="100%" stopColor="#D97706" />
              </radialGradient>
              <linearGradient id="mari-petal-outer" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#D97706" />
                <stop offset="40%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>
              <linearGradient id="mari-petal-inner" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#B45309" />
                <stop offset="50%" stopColor="#EA580C" />
                <stop offset="100%" stopColor="#FBBF24" />
              </linearGradient>
            </defs>

            {/* Specimen Mounting Archival Strip */}
            <rect x="52" y="132" width="16" height="7" rx="0.5" fill="#E8DEC8" opacity="0.6" transform="rotate(-3 60 135)" />

            {/* Organic Stem */}
            <path
              d="M 59 140 Q 61 100 58 75 Q 56 60 59 50"
              stroke="url(#mari-stem)"
              strokeWidth="2.4"
              strokeLinecap="round"
            />

            {/* Natural Pressed Foliage with veins */}
            {/* Lower Right Leaf */}
            <path
              d="M 59 108 C 72 105 84 96 87 84 C 77 87 68 94 59 102 Z"
              fill="url(#mari-leaf-1)"
              opacity="0.9"
            />
            <path d="M 59 108 Q 74 97 86 85" stroke="#2F4428" strokeWidth="0.6" opacity="0.6" />
            <path d="M 68 103 Q 73 98 75 93" stroke="#2F4428" strokeWidth="0.4" opacity="0.5" />

            {/* Lower Left Leaf */}
            <path
              d="M 58 116 C 45 113 32 106 28 94 C 38 96 48 103 58 110 Z"
              fill="url(#mari-leaf-1)"
              opacity="0.9"
            />
            <path d="M 58 116 Q 42 106 29 95" stroke="#2F4428" strokeWidth="0.6" opacity="0.6" />
            <path d="M 48 111 Q 42 105 40 101" stroke="#2F4428" strokeWidth="0.4" opacity="0.5" />

            {/* Upper Leaf */}
            <path
              d="M 58 84 C 68 80 77 72 79 62 C 70 65 63 72 58 79 Z"
              fill="url(#mari-leaf-1)"
              opacity="0.85"
            />
            <path d="M 58 84 Q 69 74 78 63" stroke="#2F4428" strokeWidth="0.5" opacity="0.5" />

            {/* Side Bud Sprig */}
            <path d="M 58 92 Q 44 82 39 70" stroke="url(#mari-stem)" strokeWidth="1.3" strokeLinecap="round" />
            <ellipse cx="38" cy="68" rx="4.5" ry="6" fill="#557548" transform="rotate(-15 38 68)" />
            <path d="M 37 66 C 36 61 40 60 41 65 Z" fill="#EA580C" opacity="0.9" />

            {/* Main Flower Blossom: Layered Pressed Ray Florets */}
            <g transform="translate(60, 44)">
              {/* Outer Ring Petals (18 natural petals with organic shape and tips) */}
              {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((deg, i) => (
                <path
                  key={`out-${deg}`}
                  d="M -3.5 -5 C -4 -16 -3 -24 0 -26 C 1.5 -25 2 -24 3 -26 C 4 -16 3.5 -5 0 0 Z"
                  fill="url(#mari-petal-outer)"
                  opacity={0.88 + (i % 3) * 0.04}
                  transform={`rotate(${deg + (i % 2 === 0 ? 2 : -2)})`}
                />
              ))}

              {/* Middle Layer Petals */}
              {[10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 310, 330, 350].map((deg, i) => (
                <path
                  key={`mid-${deg}`}
                  d="M -3 -3 C -3.5 -12 -2.5 -19 0 -21 C 2.5 -19 3 -12 0 0 Z"
                  fill="url(#mari-petal-inner)"
                  opacity="0.92"
                  transform={`rotate(${deg})`}
                />
              ))}

              {/* Inner Florets & Center Button */}
              <circle cx="0" cy="0" r="10.5" fill="url(#mari-center)" />
              {/* Tiny individual center stamen / disk floret speckles */}
              {[
                { x: 0, y: 0 }, { x: -3, y: -2 }, { x: 3, y: -2 }, { x: -2, y: 3 }, { x: 2, y: 3 },
                { x: -5, y: -1 }, { x: 5, y: -1 }, { x: -1, y: -5 }, { x: 1, y: -5 }, { x: -4, y: 4 },
                { x: 4, y: 4 }, { x: -6, y: 2 }, { x: 6, y: 2 }, { x: 0, y: 6 }, { x: 0, y: -7 },
              ].map((pt, idx) => (
                <circle
                  key={idx}
                  cx={pt.x}
                  cy={pt.y}
                  r={idx % 2 === 0 ? 0.9 : 0.7}
                  fill={idx % 3 === 0 ? '#FEF08A' : '#F59E0B'}
                />
              ))}
            </g>
          </svg>
        );

      case 'lavender':
        // Realistic Pressed French Lavender (Lavandula)
        return (
          <svg viewBox="0 0 120 150" className="w-full h-full drop-shadow-xs" fill="none">
            <defs>
              <linearGradient id="lav-stem" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#43583E" />
                <stop offset="50%" stopColor="#627E5C" />
                <stop offset="100%" stopColor="#3B4D36" />
              </linearGradient>
              <linearGradient id="floret-grad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#5B21B6" />
                <stop offset="50%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#C4B5FD" />
              </linearGradient>
              <linearGradient id="calyx-grad" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#4C1D95" />
                <stop offset="70%" stopColor="#6D28D9" />
                <stop offset="100%" stopColor="#526E4D" />
              </linearGradient>
            </defs>

            {/* Specimen Mounting Archival Strip */}
            <rect x="48" y="132" width="22" height="7" rx="0.5" fill="#E8DEC8" opacity="0.6" transform="rotate(2 59 135)" />

            {/* Center Main Stem */}
            <path d="M 58 140 Q 60 85 61 24" stroke="url(#lav-stem)" strokeWidth="1.9" strokeLinecap="round" />
            {/* Left Secondary Stem */}
            <path d="M 56 140 Q 48 95 44 42" stroke="url(#lav-stem)" strokeWidth="1.5" strokeLinecap="round" />
            {/* Right Secondary Stem */}
            <path d="M 60 140 Q 68 98 73 48" stroke="url(#lav-stem)" strokeWidth="1.4" strokeLinecap="round" />

            {/* Slender Lanceolate Leaves at Base */}
            <path d="M 57 118 Q 42 110 34 94 Q 45 102 57 114" fill="#556E50" opacity="0.85" />
            <path d="M 59 122 Q 72 114 80 98 Q 70 106 59 118" fill="#5F7B59" opacity="0.85" />
            <path d="M 58 104 Q 46 96 40 82 Q 49 90 58 100" fill="#556E50" opacity="0.8" />
            <path d="M 60 108 Q 70 100 76 86 Q 67 94 60 104" fill="#5F7B59" opacity="0.8" />

            {/* Center Lavender Spike Florets (Realistic verticillasters) */}
            {[
              { y: 24, w: 9 }, { y: 30, w: 12 }, { y: 36, w: 14 }, { y: 42, w: 15 },
              { y: 48, w: 15 }, { y: 54, w: 14 }, { y: 60, w: 13 }, { y: 66, w: 12 },
              { y: 73, w: 10 }
            ].map((node, i) => (
              <g key={`c-${i}`}>
                {/* Calyces */}
                <ellipse cx={60} cy={node.y + 1} rx={node.w * 0.35} ry="2.5" fill="url(#calyx-grad)" opacity="0.9" />
                {/* Left floret with open lip */}
                <path
                  d={`M 60 ${node.y} Q ${60 - node.w * 0.45} ${node.y - 3} ${60 - node.w * 0.55} ${node.y - 2} C ${60 - node.w * 0.3} ${node.y + 2} 60 ${node.y + 1} 60 ${node.y}`}
                  fill="url(#floret-grad)"
                  opacity="0.92"
                />
                {/* Right floret */}
                <path
                  d={`M 60 ${node.y} Q ${60 + node.w * 0.45} ${node.y - 3} ${60 + node.w * 0.55} ${node.y - 2} C ${60 + node.w * 0.3} ${node.y + 2} 60 ${node.y + 1} 60 ${node.y}`}
                  fill="url(#floret-grad)"
                  opacity="0.92"
                />
                {/* Center floret highlight */}
                <circle cx={60.5} cy={node.y - 1.5} r={1.3} fill="#DDD6FE" opacity="0.9" />
              </g>
            ))}

            {/* Left Lavender Spike Florets */}
            {[
              { y: 42, w: 8 }, { y: 47, w: 11 }, { y: 52, w: 12 }, { y: 57, w: 12 },
              { y: 63, w: 11 }, { y: 69, w: 9 }
            ].map((node, i) => (
              <g key={`l-${i}`}>
                <ellipse cx={44} cy={node.y + 1} rx={node.w * 0.35} ry="2.2" fill="url(#calyx-grad)" opacity="0.85" />
                <path
                  d={`M 44 ${node.y} Q ${44 - node.w * 0.5} ${node.y - 2} ${44 - node.w * 0.55} ${node.y - 1} C ${44 - node.w * 0.3} ${node.y + 2} 44 ${node.y + 1} 44 ${node.y}`}
                  fill="url(#floret-grad)"
                  opacity="0.88"
                />
                <circle cx={44} cy={node.y - 1} r={1.1} fill="#E9D5FF" opacity="0.85" />
              </g>
            ))}

            {/* Right Lavender Spike Florets */}
            {[
              { y: 48, w: 8 }, { y: 53, w: 11 }, { y: 58, w: 12 }, { y: 64, w: 11 },
              { y: 70, w: 10 }
            ].map((node, i) => (
              <g key={`r-${i}`}>
                <ellipse cx={73} cy={node.y + 1} rx={node.w * 0.35} ry="2.2" fill="url(#calyx-grad)" opacity="0.85" />
                <path
                  d={`M 73 ${node.y} Q ${73 + node.w * 0.5} ${node.y - 2} ${73 + node.w * 0.55} ${node.y - 1} C ${73 + node.w * 0.3} ${node.y + 2} 73 ${node.y + 1} 73 ${node.y}`}
                  fill="url(#floret-grad)"
                  opacity="0.88"
                />
                <circle cx={73} cy={node.y - 1} r={1.1} fill="#E9D5FF" opacity="0.85" />
              </g>
            ))}
          </svg>
        );

      case 'daisy':
        // Realistic Pressed English Daisy / Chamomile (Bellis perennis)
        return (
          <svg viewBox="0 0 120 150" className="w-full h-full drop-shadow-xs" fill="none">
            <defs>
              <linearGradient id="daisy-stem" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#365337" />
                <stop offset="50%" stopColor="#4F7550" />
                <stop offset="100%" stopColor="#2D422E" />
              </linearGradient>
              <linearGradient id="daisy-leaf" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#385239" />
                <stop offset="70%" stopColor="#5D855F" />
                <stop offset="100%" stopColor="#7DA880" />
              </linearGradient>
              <radialGradient id="daisy-center" cx="45%" cy="45%" r="55%">
                <stop offset="0%" stopColor="#FCD34D" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="85%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#92400E" />
              </radialGradient>
              <linearGradient id="daisy-petal" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#F5EFE6" />
                <stop offset="35%" stopColor="#FAF8F5" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>

            {/* Specimen Mounting Archival Strip */}
            <rect x="51" y="132" width="18" height="7" rx="0.5" fill="#E8DEC8" opacity="0.6" transform="rotate(-2 60 135)" />

            {/* Organic Arching Stem */}
            <path
              d="M 60 140 Q 62 100 58 72 Q 55 58 59 48"
              stroke="url(#daisy-stem)"
              strokeWidth="2.1"
              strokeLinecap="round"
            />

            {/* Delicate Feathery Chamomile Leaves */}
            {/* Lower Right Feathered Branch */}
            <path d="M 60 110 Q 75 102 85 92" stroke="url(#daisy-stem)" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 70 106 Q 78 98 81 92 Q 74 97 68 104" fill="url(#daisy-leaf)" />
            <path d="M 77 98 Q 86 92 88 86 Q 81 92 75 97" fill="url(#daisy-leaf)" />

            {/* Lower Left Feathered Branch */}
            <path d="M 59 118 Q 45 110 35 98" stroke="url(#daisy-stem)" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 50 114 Q 42 106 39 100 Q 46 106 52 112" fill="url(#daisy-leaf)" />
            <path d="M 42 106 Q 34 98 32 92 Q 38 100 44 104" fill="url(#daisy-leaf)" />

            {/* Side Sprout with Tiny Closed Bud */}
            <path d="M 58 82 Q 44 72 38 58" stroke="url(#daisy-stem)" strokeWidth="1.2" strokeLinecap="round" />
            <ellipse cx="37" cy="56" rx="4" ry="5" fill="#4F7550" transform="rotate(-20 37 56)" />
            <ellipse cx="37" cy="54" rx="2" ry="3" fill="#FAF8F5" transform="rotate(-20 37 54)" />

            {/* Main Daisy Blossom */}
            <g transform="translate(60, 44)">
              {/* 22 Realistic Pressed Ray Petals with subtle clefts and vein ribs */}
              {[
                0, 16, 33, 49, 65, 82, 98, 115, 131, 147, 164, 180, 196, 213, 229, 245, 262, 278, 295, 311, 327, 344
              ].map((deg, i) => {
                const len = 22 + (i % 4) * 1.5;
                return (
                  <g key={`d-${deg}`} transform={`rotate(${deg})`}>
                    {/* Petal body */}
                    <path
                      d={`M -2.8 -4 C -3.5 -12 -3.2 -${len - 2} 0 -${len} C 3.2 -${len - 2} 3.5 -12 2.8 -4 Z`}
                      fill="url(#daisy-petal)"
                      stroke="#E5DECE"
                      strokeWidth="0.4"
                      opacity={0.92 + (i % 2) * 0.05}
                    />
                    {/* Subtle translucent central petal vein */}
                    <line x1="0" y1="-5" x2="0" y2={`-${len - 3}`} stroke="#D6CBBA" strokeWidth="0.3" opacity="0.5" />
                  </g>
                );
              })}

              {/* Textured Golden Button Dome */}
              <circle cx="0" cy="0" r="9" fill="url(#daisy-center)" />
              {/* Pollen ring speckles */}
              {[
                { r: 4, count: 8 },
                { r: 6.5, count: 12 },
              ].map((ring, ringIdx) =>
                Array.from({ length: ring.count }).map((_, ptIdx) => {
                  const angle = (ptIdx * 360) / ring.count;
                  const rad = (angle * Math.PI) / 180;
                  return (
                    <circle
                      key={`ring-${ringIdx}-${ptIdx}`}
                      cx={Math.cos(rad) * ring.r}
                      cy={Math.sin(rad) * ring.r}
                      r={0.65}
                      fill={ringIdx === 0 ? '#FEF08A' : '#B45309'}
                    />
                  );
                })
              )}
              {/* Sunlit center highlight */}
              <circle cx="-1.5" cy="-1.5" r="1.5" fill="#FEF9C3" opacity="0.8" />
            </g>
          </svg>
        );

      case 'rose':
        // Realistic Pressed Wild English Rose (Rosa canina)
        return (
          <svg viewBox="0 0 120 150" className="w-full h-full drop-shadow-xs" fill="none">
            <defs>
              <linearGradient id="rose-stem" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3E4C33" />
                <stop offset="50%" stopColor="#556947" />
                <stop offset="100%" stopColor="#303B27" />
              </linearGradient>
              <linearGradient id="rose-leaf" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#35442A" />
                <stop offset="70%" stopColor="#556B43" />
                <stop offset="100%" stopColor="#6C8556" />
              </linearGradient>
              <linearGradient id="petal-blush" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#BE185D" />
                <stop offset="35%" stopColor="#EC4899" />
                <stop offset="75%" stopColor="#F472B6" />
                <stop offset="100%" stopColor="#FCE7F3" />
              </linearGradient>
              <radialGradient id="rose-center-core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#9D174D" />
                <stop offset="70%" stopColor="#BE185D" />
                <stop offset="100%" stopColor="#F43F5E" />
              </radialGradient>
            </defs>

            {/* Specimen Mounting Archival Strip */}
            <rect x="52" y="132" width="16" height="7" rx="0.5" fill="#E8DEC8" opacity="0.6" transform="rotate(-3 60 135)" />

            {/* Stem with Realistic Curved Nodes and Prickle */}
            <path
              d="M 60 140 Q 58 105 61 75 Q 63 60 59 48"
              stroke="url(#rose-stem)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Delicate Rose Thorn Prickle */}
            <path d="M 60 102 C 64 103 66 106 66 108 C 63 107 60 105 60 102" fill="#78350F" opacity="0.8" />

            {/* Serrated Compound Rose Leaves */}
            {/* Right Compound Leaflet */}
            <path
              d="M 61 106 C 74 102 86 92 88 80 C 76 83 67 92 61 100 Z"
              fill="url(#rose-leaf)"
              opacity="0.9"
            />
            <path d="M 61 106 Q 75 94 87 81" stroke="#283520" strokeWidth="0.6" opacity="0.6" />
            <path d="M 70 100 Q 76 95 78 90" stroke="#283520" strokeWidth="0.4" opacity="0.5" />
            <path d="M 77 92 Q 83 88 85 83" stroke="#283520" strokeWidth="0.4" opacity="0.5" />

            {/* Left Compound Leaflet */}
            <path
              d="M 59 116 C 44 112 32 104 28 92 C 40 94 50 102 59 110 Z"
              fill="url(#rose-leaf)"
              opacity="0.9"
            />
            <path d="M 59 116 Q 43 105 29 93" stroke="#283520" strokeWidth="0.6" opacity="0.6" />
            <path d="M 48 111 Q 42 105 40 100" stroke="#283520" strokeWidth="0.4" opacity="0.5" />

            {/* Rose Side Sepal & Unopened Bud */}
            <path d="M 60 85 Q 46 76 40 64" stroke="url(#rose-stem)" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 40 64 Q 38 58 41 53 Q 44 59 40 64" fill="#556947" />
            <ellipse cx="40" cy="58" rx="3.5" ry="5.5" fill="#BE185D" opacity="0.9" transform="rotate(-15 40 58)" />

            {/* Main Wild Rose Blossom (Layered Organic Petals) */}
            <g transform="translate(60, 44)">
              {/* 5 Broad Heart-Lobed Outer Petals (Classic Wild Rose) */}
              {[0, 72, 144, 216, 288].map((deg, i) => (
                <path
                  key={`rose-out-${deg}`}
                  d="M 0 0 C -14 -6 -22 -18 -18 -27 C -12 -33 -3 -30 0 -26 C 3 -30 12 -33 18 -27 C 22 -18 14 -6 0 0 Z"
                  fill="url(#petal-blush)"
                  opacity="0.86"
                  transform={`rotate(${deg + (i % 2 === 0 ? 3 : -3)})`}
                />
              ))}

              {/* Inner Soft Cupped Petals */}
              {[36, 108, 180, 252, 324].map((deg, i) => (
                <path
                  key={`rose-mid-${deg}`}
                  d="M 0 0 C -10 -4 -16 -14 -13 -21 C -6 -25 0 -21 0 -19 C 0 -21 6 -25 13 -21 C 16 -14 10 -4 0 0 Z"
                  fill="url(#petal-blush)"
                  opacity="0.92"
                  transform={`rotate(${deg})`}
                />
              ))}

              {/* Heart/Core Swirl */}
              <circle cx="0" cy="0" r="7.5" fill="url(#rose-center-core)" />

              {/* Radiating Golden Stamens with Tiny Anthers */}
              {Array.from({ length: 16 }).map((_, i) => {
                const deg = (i * 360) / 16;
                const rad = (deg * Math.PI) / 180;
                const x1 = Math.cos(rad) * 3;
                const y1 = Math.sin(rad) * 3;
                const x2 = Math.cos(rad) * 6.5;
                const y2 = Math.sin(rad) * 6.5;
                return (
                  <g key={`stam-${i}`}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FDE68A" strokeWidth="0.6" opacity="0.85" />
                    <circle cx={x2} cy={y2} r={0.7} fill="#D97706" />
                  </g>
                );
              })}
              <circle cx="0" cy="0" r="2.2" fill="#84CC16" opacity="0.9" />
            </g>
          </svg>
        );
    }
  };

  // Frame outer border styling based on finish
  const getFrameStyle = () => {
    switch (frame.frameFinish) {
      case 'vintage-gold':
        return {
          frameClass: 'bg-gradient-to-br from-[#E2C37A] via-[#C99E4A] to-[#8C6B28] border-[#705217]',
          plaqueClass: 'bg-gradient-to-r from-[#DFBF70] via-[#F4E1A6] to-[#C99E4A] text-[#3D2C10] border-[#9E7B2F]',
          nailClass: 'bg-gradient-to-br from-[#F5DE9E] via-[#D4AF37] to-[#8C6D23]',
        };
      case 'dark-walnut':
        return {
          frameClass: 'bg-gradient-to-br from-[#5A3821] via-[#432612] to-[#2B1608] border-[#1E0F05]',
          plaqueClass: 'bg-[#F2ECE1] text-[#3B2516] border-[#D4C3B3]',
          nailClass: 'bg-gradient-to-br from-[#C49A45] to-[#735016]',
        };
      case 'antique-brass':
        return {
          frameClass: 'bg-gradient-to-br from-[#C8A265] via-[#A8803F] to-[#75551E] border-[#593E12]',
          plaqueClass: 'bg-gradient-to-r from-[#D6B477] via-[#F1DFB5] to-[#B8904E] text-[#3A2A0C] border-[#8A6A2B]',
          nailClass: 'bg-gradient-to-br from-[#E8CD8A] via-[#C8A265] to-[#75551E]',
        };
      case 'rose-gold':
        return {
          frameClass: 'bg-gradient-to-br from-[#DFA6B9] via-[#C58299] to-[#92556B] border-[#773D51]',
          plaqueClass: 'bg-gradient-to-r from-[#F6DCE4] via-[#FFF0F4] to-[#E9BCCB] text-[#4A2030] border-[#C58299]',
          nailClass: 'bg-gradient-to-br from-[#E8B8C8] via-[#C58299] to-[#804257]',
        };
    }
  };

  const styleConfig = getFrameStyle();

  return (
    <div className="flex flex-col items-center select-none group">
      {/* Brass Nail / Wall Pin */}
      <div
        className={`${isCompact ? 'w-1.5 h-1.5' : 'w-2 h-2 sm:w-2.5 sm:h-2.5'} rounded-full ${styleConfig.nailClass} shadow-md border border-black/30 z-20 relative`}
      >
        <div className="absolute inset-0.5 rounded-full bg-white/50 blur-[0.5px]" />
      </div>

      {/* Hanging Wire / Cord (inverted V) */}
      <div className={`${isCompact ? 'w-7 sm:w-8' : 'w-11 sm:w-14'} ${wireHeights[frame.cordLength]} relative -mt-0.5 z-10 overflow-visible`}>
        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
          <line
            x1="50"
            y1="5"
            x2="10"
            y2="100"
            stroke="#6E5D4B"
            strokeWidth={isCompact ? '0.9' : '1.1'}
            strokeOpacity="0.8"
            strokeDasharray="2 1"
          />
          <line
            x1="50"
            y1="5"
            x2="90"
            y2="100"
            stroke="#6E5D4B"
            strokeWidth={isCompact ? '0.9' : '1.1'}
            strokeOpacity="0.8"
            strokeDasharray="2 1"
          />
        </svg>
      </div>

      {/* The Dainty Picture Frame (Clickable Link) */}
      <a
        href={frame.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          block relative -mt-0.5
          ${isCompact ? 'w-[54px] sm:w-[62px]' : 'w-[88px] sm:w-[98px] xl:w-[106px]'}
          ${isCompact ? 'p-0.5' : 'p-1 sm:p-1.5'} rounded-[2px] border shadow-md hover:shadow-xl
          ${styleConfig.frameClass}
          transition-all duration-300 ease-out cursor-pointer
          group-hover:-translate-y-1.5 group-hover:rotate-1 group-active:scale-95
        `}
        title={`Visit ${frame.title} (${frame.subtitle}) ↗`}
        aria-label={`Visit ${frame.title}: ${frame.subtitle}`}
      >
        {/* Subtle Frame Corner Accents */}
        <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-black/25" />
        <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-black/25" />
        <div className="absolute bottom-0.5 left-0.5 w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-black/25" />
        <div className="absolute bottom-0.5 right-0.5 w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-black/25" />

        {/* Ivory Passe-Partout (Mat Board) */}
        <div className={`w-full bg-[#FAF7F0] rounded-[1px] ${isCompact ? 'p-0.5' : 'p-1 sm:p-1.5'} border border-[#E8DFCF] shadow-inner flex flex-col items-center`}>
          {/* Botanical / Custom Artwork Illustration Window */}
          <div className="w-full aspect-[4/5] bg-gradient-to-b from-[#F7F3EA] to-[#F1ECE0] rounded-[1px] border border-[#DDD3C2] p-0.5 flex items-center justify-center relative overflow-hidden shadow-2xs">
            {frame.imageSrc ? (
              <img
                src={frame.imageSrc}
                alt={frame.title}
                className="w-full h-full object-cover rounded-[1px]"
                loading="lazy"
              />
            ) : (
              /* Highly Realistic Pressed Flower Artwork */
              renderFlowerArt()
            )}

            {/* Subtle botanical specimen vintage paper texture */}
            <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/[0.04] pointer-events-none" />

            {/* Hover Badge Pill */}
            <div className="absolute inset-0 bg-black/25 backdrop-blur-[0.5px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className={`bg-white/95 text-[#2C2825] ${isCompact ? 'px-1 py-0.2 text-[6px]' : 'px-1.5 py-0.5 text-[8.5px]'} rounded-full font-sans font-medium flex items-center gap-0.5 shadow-md transform translate-y-1 group-hover:translate-y-0 transition-transform`}>
                <span>Visit</span>
                <ExternalLink className={`${isCompact ? 'w-1.5 h-1.5' : 'w-2 h-2'} text-[#B45309]`} />
              </span>
            </div>
          </div>

          {/* Compact Engraved Plaque Label at bottom of frame */}
          <div
            className={`
              ${isCompact ? 'mt-0.5 px-0.5 py-0.2 rounded-[1px]' : 'mt-1 px-1 py-0.5 rounded-[1.5px]'} w-full border shadow-2xs
              flex items-center justify-between gap-0.5
              ${styleConfig.plaqueClass}
            `}
          >
            <div className="flex flex-col text-left overflow-hidden min-w-0">
              <span className={`font-serif font-bold ${isCompact ? 'text-[6px] sm:text-[7px]' : 'text-[9px] sm:text-[10px]'} leading-tight truncate`}>
                {frame.title}
              </span>
              <span className={`font-mono ${isCompact ? 'text-[4.5px] sm:text-[5.5px]' : 'text-[6.5px] sm:text-[7.5px]'} uppercase tracking-wider opacity-85 leading-tight truncate`}>
                {frame.subtitle}
              </span>
            </div>
            <ExternalLink className={`${isCompact ? 'w-1.5 h-1.5' : 'w-2 h-2'} opacity-75 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`} />
          </div>
        </div>
      </a>
    </div>
  );
};

export default HangingFrame;

