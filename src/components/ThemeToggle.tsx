import React from 'react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  className = '',
}) => {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      id="theme-toggle-btn"
      className={`fixed top-3 right-3 sm:top-4 sm:right-6 z-50 transition-all duration-300 cursor-pointer flex items-center justify-center rounded-full select-none ${
        isDark
          ? 'bg-[#181818] border border-[#C8EAD3]/30 text-[#C8EAD3] hover:bg-[#242424] shadow-lg shadow-black/40'
          : 'bg-transparent border border-[#482728]/35 text-[#482728] hover:bg-[#482728]/5 shadow-xs'
      } ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {/* Desktop view: small pill — "◑ Dark Mode" / "◑ Light Mode" */}
      <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 font-mono text-xs font-semibold tracking-wider">
        <span className="text-sm select-none leading-none">◑</span>
        <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
      </span>

      {/* Mobile view: icon only (◑), 44px touch target */}
      <span className="sm:hidden w-11 h-11 flex items-center justify-center text-lg select-none">
        ◑
      </span>
    </button>
  );
};
