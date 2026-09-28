import React, { useState } from 'react';
import { ShieldCheck, BookOpen, Compass, MapPin, FileCode, Check, Copy, X } from 'lucide-react';
import { loadAllPages } from '../utils/contentLoader';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  compass: Compass,
  book: BookOpen,
  shield: ShieldCheck,
};

export const AboutScreen: React.FC = () => {
  const [showMdxSource, setShowMdxSource] = useState(false);
  const [copied, setCopied] = useState(false);

  const pages = loadAllPages();
  const about = pages['about'];
  const fm = about?.frontmatter || {};

  const directives: Array<{ id: string; title: string; icon?: string; text: string }> =
    Array.isArray(fm.directives) ? fm.directives : [];

  const curators: Array<{ name: string; role: string; location: string }> =
    Array.isArray(fm.curators) ? fm.curators : [];

  const stockists: Array<{ name: string; address: string }> =
    Array.isArray(fm.stockists) ? fm.stockists : [];

  const handleCopy = () => {
    if (about?.raw) {
      navigator.clipboard?.writeText(about.raw);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="px-4 md:px-8 py-8 md:py-16 max-w-4xl mx-auto space-y-12">
      {/* Editorial Header from about.mdx */}
      <div className="border-b border-[#262628] pb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          {fm.subtitle && (
            <p className="font-grotesk text-xs tracking-[0.2em] text-[#91918A] uppercase mb-2">
              {fm.subtitle}
            </p>
          )}
          <h1 className="font-serif text-3xl md:text-5xl text-[#F4F2EC] uppercase font-normal tracking-tight mb-4">
            {fm.title || 'ABOUT & ARCHIVE'}
          </h1>
          {fm.summary && (
            <p className="font-sans text-base text-[#C7C7BF] leading-relaxed max-w-2xl font-light">
              {fm.summary}
            </p>
          )}
        </div>

        {/* View MDX Source File Trigger */}
        <button
          onClick={() => setShowMdxSource(!showMdxSource)}
          className={`px-3 py-1.5 border text-xs font-grotesk tracking-widest uppercase flex items-center gap-2 transition-colors focus:outline-none shrink-0 ${
            showMdxSource
              ? 'border-[#F4F2EC] bg-white text-black font-semibold'
              : 'border-[#3A3A3C] hover:border-white bg-[#18181A] text-[#C7C7BF]'
          }`}
          title="Open about.mdx source file preview"
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>{showMdxSource ? 'CLOSE SOURCE' : 'VIEW ABOUT.MDX'}</span>
        </button>
      </div>

      {/* Raw MDX Source Code Viewer Panel */}
      {showMdxSource && (
        <div className="border border-[#F4F2EC]/40 bg-[#0F0F10] p-5 md:p-6 space-y-4 transition-all">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#262628]">
            <div>
              <span className="font-mono text-xs text-[#F4F2EC] font-semibold block">
                content/pages/about.mdx
              </span>
              <span className="text-[11px] font-grotesk text-[#7E7E7E]">
                Also available as content/pages/about.md
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1 bg-[#1E1E20] hover:bg-[#2A2A2D] text-[#C7C7BF] hover:text-white border border-[#3A3A3C] text-[11px] font-grotesk tracking-wider uppercase flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED' : 'COPY MDX'}</span>
              </button>
              <button
                onClick={() => setShowMdxSource(false)}
                className="p-1 text-[#7E7E7E] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <pre className="font-mono text-xs text-[#C7C7BF] bg-[#141416] p-4 border border-[#262628] overflow-x-auto whitespace-pre leading-relaxed select-text">
            {about?.raw || '# No content loaded'}
          </pre>
        </div>
      )}

      {/* Triad of Core Directives from about.mdx */}
      {directives.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {directives.map((dir, idx) => {
            const IconComponent = (dir.icon && iconMap[dir.icon.toLowerCase()]) || Compass;
            return (
              <div key={idx} className="border border-[#262628] p-5 bg-[#18181A] space-y-3">
                <div className="flex items-center gap-2 font-grotesk text-xs tracking-widest text-[#F4F2EC] uppercase font-semibold">
                  <IconComponent className="w-4 h-4 text-[#C7C7BF]" />
                  <span>
                    {dir.id ? `${dir.id}. ` : ''}
                    {dir.title}
                  </span>
                </div>
                <p className="font-sans text-xs text-[#91918A] leading-relaxed font-light">
                  {dir.text}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Render Markdown Body from about.mdx if present */}
      {about?.html && (
        <div className="border border-[#262628] bg-[#18181A] p-6 md:p-8 space-y-4">
          <div
            className="prose prose-invert max-w-none text-sm text-[#C7C7BF] leading-[1.8] font-light space-y-4 [&>h2]:font-serif [&>h2]:text-xl [&>h2]:text-[#F4F2EC] [&>h2]:uppercase [&>h2]:tracking-wide [&>h2]:border-b [&>h2]:border-[#262628] [&>h2]:pb-2 [&>h3]:font-grotesk [&>h3]:text-sm [&>h3]:tracking-wider [&>h3]:text-[#F4F2EC] [&>h3]:uppercase [&>h3]:font-medium [&>p]:text-[#C7C7BF]"
            dangerouslySetInnerHTML={{ __html: about.html }}
          />
        </div>
      )}

      {/* Curatorial Masthead from about.mdx */}
      {curators.length > 0 && (
        <div className="border border-[#262628] bg-[#18181A] p-6 space-y-4">
          <h2 className="font-serif text-xl text-[#F4F2EC] uppercase tracking-wide border-b border-[#262628] pb-3">
            EDITORIAL BOARD & CURATORS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-grotesk">
            {curators.map((c, idx) => (
              <div key={idx}>
                <span className="text-[#F4F2EC] font-medium block uppercase">{c.name}</span>
                <span className="text-[#91918A] uppercase">{c.role}</span>
                {c.location && (
                  <span className="text-[10px] text-[#7E7E7E] block mt-0.5">{c.location}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stockists & Distribution from about.mdx */}
      {stockists.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-serif text-xl text-[#F4F2EC] uppercase tracking-wide">
            PHYSICAL STOCKISTS & HUBS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-grotesk">
            {stockists.map((stk, idx) => (
              <div key={idx} className="border border-[#262628] p-4 bg-[#141416] flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#91918A] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#F4F2EC] font-medium uppercase">{stk.name}</p>
                  <p className="text-[#91918A] text-[11px] mt-0.5">{stk.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Colophon & Typography Notes */}
      {(fm.typography || fm.edition) && (
        <div className="border-t border-[#262628] pt-6 flex flex-wrap items-center justify-between text-[11px] font-grotesk tracking-widest text-[#7E7E7E] uppercase">
          <span>{fm.typography || 'TYPESET IN PLAYFAIR DISPLAY & SPACE GROTESK'}</span>
          <span>{fm.edition || 'OPEN ARCHIVE'}</span>
        </div>
      )}
    </div>
  );
};
