import React from 'react';
import { TabView } from '../types';

interface FrontPageHomeProps {
  onNavigateTab: (tab: TabView) => void;
  onOpenLegal: () => void;
  onOpenContact: () => void;
}

export const FrontPageHome: React.FC<FrontPageHomeProps> = ({
  onNavigateTab,
  onOpenLegal,
  onOpenContact,
}) => {
  return (
    <div className="bg-[#121213] text-[#f5f4f0] font-sans antialiased w-full min-h-screen h-screen flex flex-col justify-between overflow-hidden select-none relative">
      {/* Subtle Editorial Visual Ambient Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-700">
        <img
          alt="Dark monochrome rising incense smoke"
          className="w-full h-full object-cover grayscale contrast-125 object-center scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAy7hfhDGZK8YHJCHbvuc4zSlx8ojg9hqPcv42oeaPNB3EilrJXYBPYlOOrDObHhCuW3p_OKrkNq-XlV4TuqtVvQI5cGJkcscUFioDlMcDoW44yez3Eg9VKvfaBplJ1ASOl7rJB1V0m9s1_3dlU0Fp29xzBmf52uCyV8w38IjOheaSZuzAoNtCjFfHngq-zoRDjT9-fKiQz8nXHeBWfqEsGeon5GsgfCX1aDdaok6uFm6MTA_djcui2ifN7OlmGDOMAw"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121213] via-[#121213]/85 to-[#121213]" />
      </div>

      {/* Header: ISXI Brand Wordmark + Circular Close/Toggle Button */}
      <header className="relative z-20 w-full px-7 pt-5 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => onNavigateTab('HOME')}
            className="font-grotesk tracking-[0.16em] text-[15px] font-semibold text-[#f5f4f0] uppercase hover:opacity-80 transition-opacity focus:outline-none"
          >
            ISXI™
          </button>
        </div>

        {/* Circular minimal pill toggle button linking to Blog */}
        <button
          onClick={() => onNavigateTab('BLOG')}
          aria-label="Toggle Menu / Open Blog Archive"
          title="Open Blog Archive"
          className="w-8 h-8 rounded-full bg-[#f5f4f0] hover:bg-white flex items-center justify-center shadow-lg active:scale-90 transition-transform focus:outline-none"
        >
          <div className="w-3 h-[2px] bg-[#121213] rounded-full" />
        </button>
      </header>

      {/* Central Primary Typography Navigation */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-7 -mt-4">
        <nav className="flex flex-col space-y-4 sm:space-y-5">
          <button
            onClick={() => onNavigateTab('HOME')}
            className="group block text-left focus:outline-none"
          >
            <span className="font-sans text-[34px] sm:text-[38px] font-normal tracking-[-0.02em] text-[#f5f4f0] group-hover:text-white group-hover:translate-x-1 transition-all inline-block">
              Home
            </span>
          </button>

          <button
            onClick={() => onNavigateTab('BLOG')}
            className="group block text-left focus:outline-none"
          >
            <span className="font-sans text-[34px] sm:text-[38px] font-normal tracking-[-0.02em] text-[#f5f4f0] group-hover:text-white group-hover:translate-x-1 transition-all inline-block">
              Blog
            </span>
          </button>

          <button
            onClick={() => onNavigateTab('ABOUT')}
            className="group block text-left focus:outline-none"
          >
            <span className="font-sans text-[34px] sm:text-[38px] font-normal tracking-[-0.02em] text-[#f5f4f0] group-hover:text-white group-hover:translate-x-1 transition-all inline-block">
              About
            </span>
          </button>

          <button
            onClick={() => onNavigateTab('CONTACT')}
            className="group block text-left focus:outline-none"
          >
            <span className="font-sans text-[34px] sm:text-[38px] font-normal tracking-[-0.02em] text-[#f5f4f0] group-hover:text-white group-hover:translate-x-1 transition-all inline-block">
              Contact
            </span>
          </button>
        </nav>
      </main>

      {/* Editorial Footnote & Colophon Section */}
      <footer className="relative z-20 w-full px-7 pb-6 flex flex-col">
        {/* Studio Address & Direct Inquiries */}
        <div className="mb-5 flex flex-col items-start text-left">
          <p className="font-grotesk text-[11px] leading-[18px] uppercase tracking-[0.14em] text-[#9a999d]">
            DUBAI DIGITAL PARK,<br />
            A1 BUILDING<br />
            DUBAI, UAE
          </p>

          <button
            onClick={onOpenContact}
            className="mt-4 inline-block font-grotesk text-[11px] tracking-[0.18em] uppercase text-[#f5f4f0] pb-0.5 border-b border-[#f5f4f0]/80 hover:border-white transition-colors focus:outline-none"
          >
            EMAIL US
          </button>
        </div>

        {/* Hairline Separator */}
        <div className="w-full border-t border-[#252528] mb-4" />

        {/* Legal & Attribution Bottom Row */}
        <div className="w-full flex items-center justify-between text-[10px] tracking-[0.15em] uppercase font-grotesk text-[#6a696d]">
          <div className="flex flex-col space-y-0.5 text-left">
            <button
              onClick={onOpenLegal}
              className="hover:text-[#9a999d] transition-colors focus:outline-none text-left"
            >
              LEGAL NOTICE
            </button>
            <span className="text-[9px] text-[#555458] tracking-widest mt-0.5">
              ©2025 ISXI ARCHIVE
            </span>
          </div>

          <div className="flex flex-col items-end space-y-0.5 text-right">
            <span className="text-[#555458]">WEBSITE BY</span>
            <span className="text-[#8e8d8f] font-medium tracking-widest">
              UNIKO
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
