import React from 'react';
import { ExternalLink } from 'lucide-react';

export interface WallFrameProps {
  imageSrc: string;
  title: string;
  category: string;
  onClick?: () => void;
  url?: string;
  isCompact?: boolean;
}

export const WallFrame: React.FC<WallFrameProps> = ({
  imageSrc,
  title,
  category,
  onClick,
  url,
  isCompact = false,
}) => {
  if (isCompact) {
    const frameInner = (
      <div className="relative -mt-2 p-1 bg-[#FAF8F5] rounded-[2px] shadow-md border-[3px] border-[#C29B38] transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:rotate-1">
        {/* Artwork Image */}
        <div className="w-[50px] h-[50px] sm:w-[58px] sm:h-[58px] relative overflow-hidden border border-[#E5E0D8] bg-[#789FBC]">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {url && (
            <div className="absolute inset-0 bg-black/25 backdrop-blur-[0.5px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="bg-white/95 text-[#2C2825] px-1 py-0.2 text-[6px] rounded-full font-sans font-medium flex items-center gap-0.5 shadow-md">
                <span>Visit</span>
                <ExternalLink className="w-1.5 h-1.5 text-[#B45309]" />
              </span>
            </div>
          )}
        </div>

        {/* Specimen Tag / Caption */}
        <div className="mt-1 text-center max-w-[50px] sm:max-w-[58px] flex flex-col items-center">
          <h4 className="font-serif text-[6.5px] sm:text-[7.5px] font-semibold text-[#482728] leading-tight truncate w-full">
            {title}
          </h4>
          <div className="inline-flex items-center justify-center gap-0.5 font-mono text-[4.5px] sm:text-[5.5px] tracking-wider text-[#B45309] group-hover:text-[#78350F] uppercase mt-0.2 max-w-full font-medium">
            <span className="truncate">{category}</span>
            <ExternalLink className="w-1.5 h-1.5 shrink-0 opacity-80" />
          </div>
        </div>
      </div>
    );

    return (
      <div
        id="wall-frame-ferris-mobile"
        className="relative flex flex-col items-center group cursor-pointer select-none"
      >
        {/* Hanging Pin & String */}
        <div className="w-1.5 h-1.5 rounded-full bg-[#B8977E] border border-[#8C6D58] shadow-xs z-10" />
        <div className="w-9 h-4 border-t border-l border-[#A3907C] rotate-45 -mt-1 pointer-events-none" />

        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Visit ${category} (${title}) ↗`}
            className="block text-inherit no-underline"
          >
            {frameInner}
          </a>
        ) : (
          <div onClick={onClick} title={`${title} • ${category}`}>
            {frameInner}
          </div>
        )}
      </div>
    );
  }

  const frameInnerDesktop = (
    <div className="relative -mt-4 p-2 bg-[#FAF8F5] rounded shadow-[0_8px_20px_rgba(72,39,40,0.12)] border-[5px] border-[#C29B38] transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:rotate-1">
      {/* Artwork Image */}
      <div className="w-28 h-28 xl:w-32 xl:h-32 relative overflow-hidden border border-[#E5E0D8] bg-[#789FBC]">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {url && (
          <div className="absolute inset-0 bg-black/25 backdrop-blur-[0.5px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-white/95 text-[#2C2825] px-2 py-0.5 text-[9px] rounded-full font-sans font-medium flex items-center gap-1 shadow-md transform translate-y-1 group-hover:translate-y-0 transition-transform">
              <span>Visit</span>
              <ExternalLink className="w-2.5 h-2.5 text-[#B45309]" />
            </span>
          </div>
        )}
      </div>

      {/* Specimen Tag / Caption */}
      <div className="mt-2 text-center max-w-28 xl:max-w-32 flex flex-col items-center">
        <h4 className="font-serif text-xs font-semibold text-[#482728] leading-tight truncate w-full">
          {title}
        </h4>
        <div className="inline-flex items-center justify-center gap-1 font-mono text-[9px] tracking-wider text-[#B45309] group-hover:text-[#78350F] group-hover:underline uppercase mt-0.5 max-w-full font-medium transition-colors">
          <span className="truncate">{category}</span>
          <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-80" />
        </div>
      </div>
    </div>
  );

  return (
    <div
      id="wall-frame-ferris"
      className="relative flex flex-col items-center group cursor-pointer select-none"
    >
      {/* Hanging Pin & String */}
      <div className="w-2.5 h-2.5 rounded-full bg-[#B8977E] border border-[#8C6D58] shadow-sm z-10" />
      <div className="w-16 h-8 border-t border-l border-[#A3907C] rotate-45 -mt-2 pointer-events-none" />

      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title={`Visit ${category} (${title}) ↗`}
          className="block text-inherit no-underline"
        >
          {frameInnerDesktop}
        </a>
      ) : (
        <div onClick={onClick} title={`${title} • ${category}`}>
          {frameInnerDesktop}
        </div>
      )}
    </div>
  );
};

export default WallFrame;
