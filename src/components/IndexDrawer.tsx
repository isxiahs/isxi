import React from 'react';
import { X, Volume2, VolumeX, Compass, BookOpen, Layers, Radio, Mail, ExternalLink } from 'lucide-react';
import { TabView } from '../types';

interface IndexDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: TabView) => void;
  onSelectCategory: (category: any) => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
}

export const IndexDrawer: React.FC<IndexDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onSelectCategory,
  isPlayingAudio,
  onToggleAudio,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-sm bg-[#131314] border-l border-[#262628] h-full overflow-y-auto no-scrollbar flex flex-col justify-between p-6 z-10">
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#262628] mb-6">
            <div>
              <p className="font-grotesk tracking-[0.16em] text-base font-semibold text-[#F4F2EC] uppercase">
                ISXI™
              </p>
              <p className="font-grotesk text-[10px] tracking-[0.2em] text-[#91918A] uppercase mt-0.5">
                DIGITAL ARCHIVE · 2025.ED
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 border border-[#262628] hover:border-[#F4F2EC] text-[#91918A] hover:text-white transition-colors"
              aria-label="Close index menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-4 font-grotesk text-xs tracking-[0.16em] uppercase">
            <div className="text-[10px] text-[#7E7E7E] tracking-[0.2em] pb-1 border-b border-[#262628]/60">
              NAVIGATION FOLIO
            </div>

            <button
              onClick={() => {
                onNavigateTab('HOME');
                onClose();
              }}
              className="w-full text-left py-1 text-[#E5E2E3] hover:text-white flex items-center justify-between group"
            >
              <span>HOME</span>
              <span className="text-[10px] text-[#7E7E7E] font-mono group-hover:text-white">FRONT PAGE</span>
            </button>

            <button
              onClick={() => {
                onNavigateTab('BLOG');
                onClose();
              }}
              className="w-full text-left py-1 text-[#91918A] hover:text-white flex items-center justify-between group"
            >
              <span>BLOG & DISPATCHES</span>
              <BookOpen className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                onNavigateTab('ABOUT');
                onClose();
              }}
              className="w-full text-left py-1 text-[#91918A] hover:text-white flex items-center justify-between"
            >
              <span>ABOUT & MANIFESTO</span>
              <Compass className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                onNavigateTab('CONTACT');
                onClose();
              }}
              className="w-full text-left py-1 text-[#91918A] hover:text-white flex items-center justify-between"
            >
              <span>CONTACT & DISPATCHES</span>
              <Mail className="w-3.5 h-3.5" />
            </button>
          </nav>

          {/* Ambient Engine Control */}
          <div className="mt-8 pt-6 border-t border-[#262628] space-y-3">
            <div className="flex items-center justify-between text-[10px] font-grotesk tracking-widest text-[#7E7E7E] uppercase">
              <span>ATMOSPHERIC GENERATOR</span>
              <span className="text-[#C7C7BF]">LOTURA FREQ 04</span>
            </div>

            <button
              onClick={onToggleAudio}
              className={`w-full p-2.5 border text-xs font-grotesk tracking-widest uppercase flex items-center justify-center gap-2 transition-colors ${
                isPlayingAudio
                  ? 'border-[#F4F2EC] bg-[#18181A] text-white'
                  : 'border-[#262628] bg-[#141416] text-[#91918A] hover:border-[#3A3A3C]'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>DRONE ENGINE ACTIVE</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>START DRONE GENERATOR</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-[#262628] text-[10px] font-grotesk tracking-widest text-[#7E7E7E] uppercase space-y-1">
          <p>© 2025 ISXI ARCHIVE</p>
          <p>DUBAI DIGITAL PARK · DUBAI, UAE</p>
        </div>
      </div>
    </div>
  );
};
