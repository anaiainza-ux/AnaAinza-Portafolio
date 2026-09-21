import React, { useState } from 'react';
import { Mail, Check, Copy } from 'lucide-react';

interface HeaderProps {
  theme?: 'light' | 'dark';
}

export const Header: React.FC<HeaderProps> = ({ theme = 'light' }) => {
  const [copied, setCopied] = useState(false);
  const email = 'aiainzaac@gmail.com';
  const isDark = theme === 'dark';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <header className="w-full flex flex-col items-center justify-center text-center px-4 pt-3 sm:pt-5 pb-1 sm:pb-2 select-none relative transition-colors duration-300">
      {/* "Hi im Ana Ainza" */}
      <h1
        className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-1 sm:mb-1.5 transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-[#1E1B18]'
        }`}
        style={{
          fontFamily: "'Caveat', cursive",
          fontWeight: 600,
        }}
      >
        Hi im Ana Ainza
      </h1>

      {isDark ? (
        /* Dark mode subtitle: "explore my work" */
        <p className="text-xs sm:text-sm md:text-base font-serif tracking-[0.22em] text-white/70 uppercase mb-1 font-medium transition-colors duration-300">
          explore my work
        </p>
      ) : (
        /* Light mode subtitles */
        <>
          <h2 className="text-xs sm:text-sm md:text-base font-serif tracking-[0.25em] text-[#3D352E] uppercase mb-0.5 font-medium transition-colors duration-300">
            Welcome to my portafolio
          </h2>
          <p className="text-xs sm:text-sm font-sans text-[#6B5F54] max-w-md mx-auto italic font-normal transition-colors duration-300">
            I love making creative solutions
          </p>
        </>
      )}

      {/* Action Row: Email Pill */}
      <div className="mt-2.5 flex items-center justify-center">
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono shadow-xs transition-all duration-300 ${
            isDark
              ? 'bg-white/10 hover:bg-white/15 border border-white/15 text-white/90 shadow-lg'
              : 'bg-[#FAF4EB] hover:bg-[#F4ECE0] border border-[#DDD3C5] text-[#52483E]'
          }`}
        >
          <a
            href={`mailto:${email}`}
            className={`flex items-center gap-1.5 transition-colors ${
              isDark ? 'text-white hover:text-white/80' : 'hover:text-[#1E1B18]'
            }`}
            title="Send email to aiainzaac@gmail.com"
          >
            <Mail className={`w-3.5 h-3.5 ${isDark ? 'text-[#C8EAD3]' : 'text-[#B45309]'}`} />
            <span>{email}</span>
          </a>
          <span className={isDark ? 'text-white/20 select-none' : 'text-[#C4B5A5] select-none'}>•</span>
          <button
            type="button"
            onClick={handleCopyEmail}
            className={`text-[11px] font-sans flex items-center gap-1 cursor-pointer transition-colors ${
              isDark
                ? 'text-white/60 hover:text-white'
                : 'text-[#8C7A6B] hover:text-[#2C2825]'
            }`}
            title="Copy email address"
            aria-label="Copy email address"
          >
            {copied ? (
              <span className={`font-medium flex items-center gap-0.5 ${isDark ? 'text-[#C8EAD3]' : 'text-emerald-700'}`}>
                <Check className="w-3 h-3" />
                <span>Copied</span>
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Copy className="w-2.5 h-2.5 opacity-70" />
                <span>Copy</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
