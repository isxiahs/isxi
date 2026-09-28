import React from 'react';
import { X, ShieldCheck, Bookmark, Radio, Clock } from 'lucide-react';
import { MonographEntry } from '../types';

interface ReaderPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEntry: (entry: MonographEntry) => void;
  entries: MonographEntry[];
}

export const ReaderPassportModal: React.FC<ReaderPassportModalProps> = ({
  isOpen,
  onClose,
  onSelectEntry,
  entries,
}) => {
  if (!isOpen) return null;

  const bookmarked = entries.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
      />

      {/* Passport Card */}
      <div className="relative w-full max-w-md bg-[#18181A] border border-[#3A3A3C] p-6 z-10 space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#262628] pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-grotesk text-xs tracking-[0.2em] text-[#91918A] uppercase font-semibold">
              READER ACCREDITATION PASSPORT
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#91918A] hover:text-white p-1"
            aria-label="Close passport"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Reader Identification Badge */}
        <div className="border border-[#262628] p-4 bg-[#131314] space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-grotesk text-[10px] tracking-widest text-[#7E7E7E] uppercase block">
                SUBSCRIBER DESIGNATION
              </span>
              <p className="font-serif text-lg text-[#F4F2EC]">
                ARCHIVAL READER 04
              </p>
            </div>
            <div className="text-right">
              <span className="font-grotesk text-[10px] tracking-widest text-[#7E7E7E] uppercase block">
                ISSUED ID
              </span>
              <p className="font-mono text-xs text-[#E5E2E3] font-semibold">
                Nº7-8804-VO
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#262628] grid grid-cols-3 gap-2 text-center text-xs font-grotesk">
            <div>
              <span className="text-[10px] text-[#7E7E7E] block">TIER</span>
              <span className="text-[#C7C7BF] font-medium">FULL ARCHIVE</span>
            </div>
            <div>
              <span className="text-[10px] text-[#7E7E7E] block">EDITION</span>
              <span className="text-[#C7C7BF] font-medium">2025.ED</span>
            </div>
            <div>
              <span className="text-[10px] text-[#7E7E7E] block">FREQUENCY</span>
              <span className="text-[#C7C7BF] font-medium">128 KBPS</span>
            </div>
          </div>
        </div>

        {/* Saved Bookmarks */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-grotesk tracking-widest uppercase text-[#91918A]">
            <span className="flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5" />
              SAVED ARTICLES & PLATES
            </span>
            <span>{bookmarked.length} {bookmarked.length === 1 ? 'ITEM' : 'ITEMS'}</span>
          </div>

          <div className="space-y-2">
            {bookmarked.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectEntry(item);
                  onClose();
                }}
                className="p-2.5 border border-[#262628] bg-[#141416] hover:border-[#3A3A3C] cursor-pointer flex items-center justify-between transition-colors group"
              >
                <div>
                  <span className="text-[10px] font-grotesk text-[#91918A] tracking-wider uppercase block">
                    {item.indexCode}
                  </span>
                  <span className="font-serif text-xs text-[#F4F2EC] group-hover:text-white uppercase">
                    {item.title}
                  </span>
                </div>
                <span className="text-[10px] font-grotesk text-[#7E7E7E] group-hover:text-white uppercase">
                  OPEN →
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Listening / Reading Activity */}
        <div className="border border-[#262628] p-3 bg-[#141416] flex items-center justify-between text-xs font-grotesk tracking-wider">
          <div className="flex items-center gap-2 text-[#91918A]">
            <Clock className="w-4 h-4" />
            <span>SESSION LISTENING DURATION</span>
          </div>
          <span className="font-mono text-[#F4F2EC] font-medium">17.00 hs</span>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-white hover:bg-[#F4F2EC] text-[#131314] text-xs font-grotesk tracking-widest uppercase font-semibold transition-colors"
          >
            DISMISS PASSPORT
          </button>
        </div>
      </div>
    </div>
  );
};
