import React from 'react';
import { ArrowLeft, Clock, MapPin, Bookmark } from 'lucide-react';
import { MonographEntry } from '../types';

interface InterviewTranscriptViewerProps {
  entry: MonographEntry;
  onClose: () => void;
}

export const InterviewTranscriptViewer: React.FC<InterviewTranscriptViewerProps> = ({
  entry,
  onClose,
}) => {
  const exchanges = entry.interview || [];

  return (
    <div className="fixed inset-0 z-50 bg-[#131314] overflow-y-auto no-scrollbar flex flex-col">
      {/* Reader Header */}
      <header className="sticky top-0 z-20 bg-[#131314]/95 backdrop-blur-md border-b border-[#262628] px-4 md:px-8 py-3.5 flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 font-grotesk text-xs tracking-[0.14em] uppercase text-[#C7C7BF] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO ARCHIVE</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-grotesk tracking-widest text-[#91918A]">
          <span className="text-[#E5E2E3]">TRANSCRIPT Nº37</span>
          <span>·</span>
          <span>45 MIN ESTIMATED</span>
        </div>

        <button
          onClick={onClose}
          className="px-3 py-1 border border-[#3A3A3C] text-xs font-grotesk uppercase text-[#C7C7BF] hover:text-white"
        >
          CLOSE
        </button>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-8 py-8 md:py-16">
        {/* Header Metadata */}
        <div className="flex items-center gap-3 text-xs font-grotesk tracking-[0.16em] uppercase text-[#91918A] pb-4 border-b border-[#262628] mb-6">
          <span className="text-[#F4F2EC] font-medium">{entry.indexCode}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            BERLIN / BASEL
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            RECORDED 28.01.2025
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-5xl text-[#F4F2EC] uppercase font-normal tracking-tight leading-[1.14] mb-6">
          {entry.title}
        </h1>

        <p className="font-sans text-sm md:text-base text-[#91918A] leading-relaxed mb-8 font-light">
          {entry.description}
        </p>

        {/* Hero ceramic vessel artwork */}
        {entry.imageUrl && (
          <div className="mb-12 border border-[#262628]">
            <img
              src={entry.imageUrl}
              alt={entry.imageAlt || entry.title}
              className="w-full aspect-[16/9] object-cover filter grayscale contrast-110"
            />
            <div className="p-3 bg-[#18181A] border-t border-[#262628] flex justify-between text-[11px] font-grotesk tracking-widest text-[#91918A] uppercase">
              <span>UNGLAZED ACOUSTIC TERRACOTTA DISSIPATION VESSEL (2024)</span>
              <span>STUDIO NEUKÖLLN</span>
            </div>
          </div>
        )}

        {/* Dialogue Exchanges */}
        <div className="space-y-8">
          {exchanges.map((ex, idx) => (
            <div key={idx} className="border-t border-[#262628] pt-6 space-y-2">
              <div className="flex items-center justify-between text-xs font-grotesk tracking-widest uppercase">
                <span className="font-semibold text-[#F4F2EC]">
                  {ex.speaker}
                </span>
                <span className="text-[#7E7E7E] tnum font-mono">
                  [{ex.timestamp}]
                </span>
              </div>
              <p className="text-[11px] text-[#91918A] font-grotesk tracking-wider uppercase mb-2">
                {ex.role}
              </p>
              <p className="font-sans text-base text-[#C7C7BF] leading-[1.8] font-light">
                {ex.dialogue}
              </p>
            </div>
          ))}
        </div>

        {/* Technical Archival Appendix */}
        <div className="mt-16 p-6 border border-[#262628] bg-[#18181A] space-y-3 font-grotesk text-xs">
          <p className="text-[#F4F2EC] tracking-widest uppercase font-semibold">
            ACOUSTIC SPECIFICATION APPENDIX
          </p>
          <p className="text-[#91918A] leading-relaxed">
            Recordings made using a matched pair of Schoeps omnidirectional microphones positioned at the focal aperture of the 120cm clay sphere. Natural reverberation decay time measured at 1.48 seconds in dry ambient conditions.
          </p>
        </div>

        <div className="mt-12 pt-6 border-t border-[#262628] flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-[#3A3A3C] hover:border-white text-xs font-grotesk tracking-widest uppercase text-[#F4F2EC] transition-colors"
          >
            ← RETURN TO ARCHIVE
          </button>
          <span className="font-mono text-xs text-[#91918A] tnum">
            {entry.folioNumber}
          </span>
        </div>
      </main>
    </div>
  );
};
