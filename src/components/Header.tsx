import React from 'react';
import { User } from 'lucide-react';

interface HeaderProps {
  onOpenDrawer: () => void;
  onOpenPassport: () => void;
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDrawer,
  onOpenPassport,
  onNavigateHome,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#131314]/95 backdrop-blur-md border-b border-[#262628] px-4 md:px-8 py-3 flex items-center justify-between transition-colors">
      {/* Brand Title Area: ISXI™ • MONOGRAPH Nº04 */}
      <button
        onClick={onNavigateHome}
        className="flex items-center gap-2.5 text-left group focus:outline-none"
      >
        <span className="font-grotesk tracking-[0.16em] text-[15px] font-semibold text-[#f5f4f0] uppercase group-hover:text-white transition-opacity">
          ISXI™
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#E5E2E3] opacity-80" />
        <div className="flex flex-col">
          <span className="font-grotesk text-[10px] tracking-[0.18em] font-medium uppercase text-[#E5E2E3] leading-none group-hover:text-white transition-colors">
            MONOGRAPH
          </span>
          <span className="font-grotesk text-[10px] tracking-[0.18em] font-medium uppercase text-[#91918A] leading-tight mt-0.5">
            Nº04
          </span>
        </div>
      </button>

      {/* Action Controls: 2-line minimal hamburger / toggle + white pill toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenDrawer}
          aria-label="Open monograph navigation index"
          className="w-8 h-8 flex flex-col items-center justify-center gap-[4.5px] text-[#E5E2E3] hover:text-white transition-colors focus:outline-none"
        >
          <span className="w-[18px] h-[1.5px] bg-[#E5E2E3] block transition-transform" />
          <span className="w-[18px] h-[1.5px] bg-[#E5E2E3] block transition-transform" />
        </button>

        <button
          onClick={onNavigateHome}
          aria-label="Return to front page"
          title="Return to Front Page"
          className="w-8 h-8 rounded-full bg-[#f5f4f0] hover:bg-white flex items-center justify-center shadow-lg active:scale-90 transition-transform focus:outline-none"
        >
          <div className="w-3 h-[2px] bg-[#121213] rounded-full" />
        </button>
      </div>
    </header>
  );
};
