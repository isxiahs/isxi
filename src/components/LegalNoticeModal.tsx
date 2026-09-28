import React from 'react';
import { X, Shield } from 'lucide-react';
import { loadAllPages } from '../utils/contentLoader';

interface LegalNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const pages = loadAllPages();
const legalPage = pages['legal'];

export const LegalNoticeModal: React.FC<LegalNoticeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-[#18181A] border border-[#3A3A3C] p-6 z-10 space-y-5">
        <div className="flex items-center justify-between border-b border-[#262628] pb-3.5">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#F4F2EC]" />
            <h2 className="font-grotesk text-xs tracking-[0.2em] text-[#F4F2EC] uppercase font-semibold">
              {legalPage?.frontmatter?.title || 'LEGAL NOTICE & COLOPHON'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#91918A] hover:text-white p-1 focus:outline-none"
            aria-label="Close legal notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs font-grotesk text-[#C7C7BF] leading-relaxed">
          {legalPage ? (
            <div
              className="space-y-3 [&>h3]:text-[#91918A] [&>h3]:uppercase [&>h3]:tracking-wider [&>h3]:font-medium [&>p]:text-[#C7C7BF] [&>strong]:text-[#F4F2EC]"
              dangerouslySetInnerHTML={{ __html: legalPage.html }}
            />
          ) : (
            <>
              <div>
                <span className="text-[#91918A] uppercase tracking-wider block mb-1">
                  STUDIO IDENTIFICATION
                </span>
                <p className="text-[#F4F2EC]">
                  ISXI™ Studio & Digital Archive
                </p>
                <p className="text-[#91918A]">
                  Dubai Digital Park, A1 Building, Dubai, UAE
                </p>
              </div>

              <div>
                <span className="text-[#91918A] uppercase tracking-wider block mb-1">
                  INTELLECTUAL PROPERTY
                </span>
                <p>
                  All monographs, architectural plates, critical texts, and audio frequencies cataloged within ISXI™ Archive are protected under international copyright regulations.
                </p>
              </div>
            </>
          )}

          <div className="pt-2 border-t border-[#262628] text-[10px] text-[#7E7E7E] tracking-widest uppercase">
            {legalPage?.frontmatter?.copyright || '© 2025 ISXI ARCHIVE · ALL RIGHTS RESERVED'}
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-white hover:bg-[#F4F2EC] text-[#131314] text-xs font-grotesk tracking-widest uppercase font-semibold transition-colors"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};

