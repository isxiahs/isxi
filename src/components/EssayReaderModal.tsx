import React, { useState } from 'react';
import { ArrowLeft, Bookmark, Share2, Volume2, VolumeX, Type } from 'lucide-react';
import { MonographEntry } from '../types';

interface EssayReaderModalProps {
  entry: MonographEntry;
  onClose: () => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
}

export const EssayReaderModal: React.FC<EssayReaderModalProps> = ({
  entry,
  onClose,
  isPlayingAudio,
  onToggleAudio,
}) => {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const essay = entry.essayBody;

  return (
    <div className="fixed inset-0 z-50 bg-[#131314] overflow-y-auto no-scrollbar flex flex-col">
      {/* Top Sticky Reader Header */}
      <header className="sticky top-0 z-20 bg-[#131314]/95 backdrop-blur-md border-b border-[#262628] px-4 md:px-8 py-3.5 flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 font-grotesk text-xs tracking-[0.14em] uppercase text-[#C7C7BF] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO ARCHIVE</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Audio toggle button if available */}
          {entry.hasAudioPlay && (
            <button
              onClick={onToggleAudio}
              className={`p-2 border transition-colors ${
                isPlayingAudio
                  ? 'border-[#F4F2EC] bg-[#201F20] text-[#F4F2EC]'
                  : 'border-[#262628] text-[#91918A] hover:text-white'
              }`}
              title="Toggle essay atmospheric audio"
            >
              {isPlayingAudio ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Font Size Adjuster */}
          <div className="flex items-center border border-[#262628] bg-[#1C1B1C]">
            <button
              onClick={() => setFontSizeMultiplier((prev) => Math.max(0.85, prev - 0.1))}
              className="px-2 py-1 text-xs text-[#91918A] hover:text-white border-r border-[#262628]"
              title="Decrease text size"
            >
              A-
            </button>
            <button
              onClick={() => setFontSizeMultiplier((prev) => Math.min(1.35, prev + 0.1))}
              className="px-2 py-1 text-xs text-[#91918A] hover:text-white"
              title="Increase text size"
            >
              A+
            </button>
          </div>

          {/* Bookmark */}
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 border transition-colors ${
              isBookmarked
                ? 'border-[#F4F2EC] bg-[#201F20] text-[#F4F2EC]'
                : 'border-[#262628] text-[#91918A] hover:text-white'
            }`}
            title="Save to bookmarks"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#F4F2EC]' : ''}`} />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-2 border border-[#262628] text-[#91918A] hover:text-white transition-colors relative"
            title="Copy essay citation link"
          >
            <Share2 className="w-4 h-4" />
            {copiedLink && (
              <span className="absolute -bottom-8 right-0 bg-white text-[#131314] text-[10px] font-grotesk px-2 py-0.5 whitespace-nowrap">
                LINK COPIED
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Reading Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-8 py-8 md:py-16">
        {/* Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-grotesk tracking-[0.16em] uppercase text-[#91918A] pb-4 border-b border-[#262628] mb-6">
          <div className="flex items-center gap-2">
            <span className="text-[#F4F2EC] font-medium">{entry.indexCode}</span>
            <span>·</span>
            <span>FOLIO 04</span>
            <span>·</span>
            <span>{entry.category}</span>
          </div>
          <div>{entry.readingTime || '8 MIN READ'}</div>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#F4F2EC] font-normal tracking-tight leading-[1.12] mb-6 uppercase">
          {entry.title}
        </h1>

        {/* Author / Date Info */}
        <div className="flex items-center gap-3 font-grotesk text-xs tracking-wider text-[#C7C7BF] mb-10 pb-6 border-b border-[#262628]">
          <span>BY {entry.author.toUpperCase()}</span>
          <span>—</span>
          <span>OPEN FREQUENCY IMPRINT</span>
          {entry.refCode && (
            <>
              <span>—</span>
              <span className="text-[#F4F2EC]">{entry.refCode}</span>
            </>
          )}
        </div>

        {/* Hero Artwork if exists */}
        {entry.imageUrl && (
          <figure className="mb-12 border border-[#262628]">
            <img
              src={entry.imageUrl}
              alt={entry.imageAlt || entry.title}
              className="w-full aspect-[16/9] object-cover filter grayscale contrast-110"
            />
            <figcaption className="p-3 text-[11px] font-grotesk tracking-widest text-[#91918A] uppercase bg-[#18181A] border-t border-[#262628] flex justify-between">
              <span>{entry.imageAlt || entry.title}</span>
              <span>PLATE ARCHIVE</span>
            </figcaption>
          </figure>
        )}

        {/* Essay Content */}
        {entry.contentHtml ? (
          <div
            className="markdown-article text-[#C7C7BF] font-light leading-[1.85] space-y-6 [&>p:first-of-type]:font-serif [&>p:first-of-type]:text-lg [&>p:first-of-type]:md:text-xl [&>p:first-of-type]:text-[#F4F2EC] [&>p:first-of-type::first-letter]:text-5xl [&>p:first-of-type::first-letter]:font-serif [&>p:first-of-type::first-letter]:float-left [&>p:first-of-type::first-letter]:mr-3 [&>p:first-of-type::first-letter]:mt-1 [&>p:first-of-type::first-letter]:text-white [&>p:first-of-type::first-letter]:leading-none [&>h2]:font-grotesk [&>h2]:text-sm [&>h2]:md:text-base [&>h2]:tracking-[0.16em] [&>h2]:uppercase [&>h2]:text-[#F4F2EC] [&>h2]:font-semibold [&>h2]:pt-6 [&>h2]:mt-8 [&>h2]:border-t [&>h2]:border-[#262628]/70 [&>h3]:font-grotesk [&>h3]:text-xs [&>h3]:tracking-[0.14em] [&>h3]:uppercase [&>h3]:text-[#91918A] [&>h3]:font-medium [&>h3]:mt-6 [&>blockquote]:my-8 [&>blockquote]:p-6 [&>blockquote]:md:p-8 [&>blockquote]:border-l-2 [&>blockquote]:border-[#F4F2EC] [&>blockquote]:bg-[#18181A] [&>blockquote]:font-serif [&>blockquote]:italic [&>blockquote]:text-xl [&>blockquote]:md:text-2xl [&>blockquote]:text-[#F4F2EC] [&>hr]:border-[#262628] [&>hr]:my-8 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol]:text-xs [&>ol]:font-grotesk [&>ol]:text-[#91918A] [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:text-xs [&>ul]:font-grotesk [&>ul]:text-[#91918A]"
            style={{ fontSize: `${1 * fontSizeMultiplier}rem` }}
            dangerouslySetInnerHTML={{ __html: entry.contentHtml }}
          />
        ) : essay ? (
          <div
            className="prose prose-invert max-w-none space-y-8"
            style={{ fontSize: `${1 * fontSizeMultiplier}rem` }}
          >
            {/* Opening with Drop Cap */}
            <p className="font-serif text-lg md:text-xl text-[#F4F2EC] leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-white first-letter:leading-none">
              {essay.lead}
            </p>

            {/* Structured Sections */}
            {essay.sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-4 pt-4">
                {section.heading && (
                  <h2 className="font-grotesk text-sm md:text-base tracking-[0.16em] uppercase text-[#F4F2EC] font-semibold pt-2 border-t border-[#262628]/60">
                    {section.heading}
                  </h2>
                )}
                <p className="font-sans text-base text-[#C7C7BF] leading-[1.8] font-light">
                  {section.content}
                </p>
              </div>
            ))}

            {/* Pull Quote */}
            {essay.pullQuote && (
              <blockquote className="my-10 p-6 md:p-8 border-l-2 border-[#F4F2EC] bg-[#18181A]">
                <p className="font-serif italic text-xl md:text-2xl text-[#F4F2EC] leading-snug mb-3">
                  "{essay.pullQuote}"
                </p>
                {essay.pullQuoteAttribution && (
                  <cite className="font-grotesk not-italic text-xs tracking-widest uppercase text-[#91918A] block">
                    — {essay.pullQuoteAttribution}
                  </cite>
                )}
              </blockquote>
            )}

            {/* Footnotes */}
            {essay.footnotes && essay.footnotes.length > 0 && (
              <div className="pt-10 mt-12 border-t border-[#262628] text-xs font-grotesk text-[#7E7E7E] space-y-2">
                <p className="text-[11px] uppercase tracking-widest text-[#91918A] font-semibold mb-3">
                  ARCHIVAL CITATIONS & FOOTNOTES
                </p>
                {essay.footnotes.map((fn, fIdx) => (
                  <p key={fIdx} className="leading-relaxed">
                    {fn}
                  </p>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 text-[#C7C7BF] font-sans leading-relaxed">
            <p className="font-serif text-lg text-[#F4F2EC]">
              {entry.description}
            </p>
            <p>
              This catalog inquiry is archived in physical print under Monograph Folio 04. Digital transcripts and acoustic plates are preserved at 96kHz / 24-bit archival resolution.
            </p>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="mt-16 pt-8 border-t border-[#262628] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-[#3A3A3C] hover:border-white text-xs font-grotesk tracking-widest uppercase text-[#F4F2EC] transition-colors"
          >
            ← RETURN TO INDEX
          </button>
          <span className="font-mono text-xs text-[#91918A] tnum">
            {entry.folioNumber}
          </span>
        </div>
      </main>
    </div>
  );
};
