import React, { useState } from 'react';
import { Mail, Check, Copy } from 'lucide-react';

export const Header: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'aiainzaac@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <header className="w-full flex flex-col items-center justify-center text-center px-4 pt-4 sm:pt-6 md:pt-8 pb-1 sm:pb-2 select-none">
      {/* "Hi im Ana Ainza" (Big cursive font matching reference) */}
      <h1
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#1E1B18] tracking-tight leading-none mb-1.5 sm:mb-2"
        style={{
          fontFamily: "'Caveat', cursive",
          fontWeight: 600,
        }}
      >
        Hi im Ana Ainza
      </h1>

      {/* "WELCOME TO MY PORTAFOLIO" (Smaller font uppercase) */}
      <h2 className="text-xs sm:text-sm md:text-base font-serif tracking-[0.25em] text-[#3D352E] uppercase mb-1 font-medium">
        Welcome to my portafolio
      </h2>

      {/* "I love making creative solutions" */}
      <p className="text-xs sm:text-sm font-sans text-[#6B5F54] max-w-md mx-auto italic font-normal">
        I love making creative solutions
      </p>

      {/* Centered Email */}
      <div className="mt-3 flex items-center justify-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF4EB] hover:bg-[#F4ECE0] border border-[#DDD3C5] text-xs font-mono text-[#52483E] shadow-xs transition-colors">
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-1.5 hover:text-[#1E1B18] transition-colors"
            title="Send email to aiainzaac@gmail.com"
          >
            <Mail className="w-3.5 h-3.5 text-[#B45309]" />
            <span>{email}</span>
          </a>
          <span className="text-[#C4B5A5] select-none">•</span>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="text-[11px] font-sans flex items-center gap-1 cursor-pointer transition-colors text-[#8C7A6B] hover:text-[#2C2825]"
            title="Copy email address"
            aria-label="Copy email address"
          >
            {copied ? (
              <span className="text-emerald-700 font-medium flex items-center gap-0.5">
                <Check className="w-3 h-3 text-emerald-600" />
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

