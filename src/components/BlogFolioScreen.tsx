import React, { useState, useMemo } from 'react';
import { Download, CheckCircle2, Search, X, Clock, Play, ArrowRight, Calendar, Tag as TagIcon } from 'lucide-react';
import { MonographEntry } from '../types';

interface BlogFolioScreenProps {
  onSelectEntry: (entry: MonographEntry) => void;
  entries: MonographEntry[];
}

export const BlogFolioScreen: React.FC<BlogFolioScreenProps> = ({
  onSelectEntry,
  entries,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Collect all unique categories and tags across all posts
  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    cats.add('ALL');
    entries.forEach((e) => {
      if (e.category) cats.add(String(e.category).toUpperCase());
    });
    return Array.from(cats);
  }, [entries]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    entries.forEach((e) => {
      if (e.tags && Array.isArray(e.tags)) {
        e.tags.forEach((t) => tags.add(t));
      }
    });
    return Array.from(tags);
  }, [entries]);

  const handleDownloadCatalog = () => {
    const lines = entries.map(
      (e, idx) =>
        `${idx + 1}. [${e.indexCode || e.id}] ${e.title} (${e.category})\n   Date: ${e.date || e.dateOrMeta} | Reading Time: ${e.readingTime || 'N/A'}\n   Tags: ${(e.tags || []).join(', ') || 'None'}\n   Author: ${e.author}\n   Excerpt: ${e.description}\n`
    );

    const content = `ISXI™ ARCHIVE — BLOG & ESSAY REGISTRY (2025.ED)
Total Posts: ${entries.length}
==================================================

${lines.join('\n')}
==================================================
Colophon: Dubai Digital Park, A1 Building, Dubai, UAE
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'isxi-archive-blog-registry.txt';
    link.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      if (selectedCategory !== 'ALL' && String(entry.category).toUpperCase() !== selectedCategory) {
        return false;
      }
      if (selectedTag) {
        const hasTag = entry.tags?.some((t) => t.toLowerCase() === selectedTag.toLowerCase());
        if (!hasTag) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = entry.title.toLowerCase().includes(q);
        const matchesDesc = (entry.description || '').toLowerCase().includes(q);
        const matchesIndex = (entry.indexCode || '').toLowerCase().includes(q);
        const matchesAuthor = (entry.author || '').toLowerCase().includes(q);
        const matchesTags = (entry.tags || []).some((t) => t.toLowerCase().includes(q));
        return matchesTitle || matchesDesc || matchesIndex || matchesAuthor || matchesTags;
      }
      return true;
    });
  }, [entries, selectedCategory, selectedTag, searchQuery]);

  const featuredEntry = filteredEntries[0] || entries[0];
  const moreEntries = filteredEntries.filter((e) => e.id !== featuredEntry?.id);

  return (
    <div className="px-4 md:px-8 py-8 md:py-16 max-w-4xl mx-auto space-y-10">
      {/* Title Header */}
      <div className="border-b border-[#262628] pb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-grotesk text-xs tracking-[0.2em] text-[#91918A] uppercase mb-1">
            EDITORIAL ARCHIVE
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-[#F4F2EC] uppercase font-normal tracking-tight">
            BLOG & DISPATCHES
          </h1>
          <p className="font-sans text-sm text-[#91918A] mt-2 max-w-xl font-light">
            Critical theory essays, acoustic investigations, and architectural dispatches. Authored as Markdown/MDX in <code className="font-mono text-[11px] text-[#C7C7BF] bg-[#18181A] px-1.5 py-0.5 border border-[#262628]">content/posts</code>.
          </p>
        </div>

        {/* Download Catalog Trigger */}
        <button
          onClick={handleDownloadCatalog}
          className="px-4 py-2 border border-[#3A3A3C] hover:border-white bg-[#1C1B1C] text-xs font-grotesk tracking-widest text-[#F4F2EC] uppercase flex items-center gap-2 transition-colors focus:outline-none"
        >
          {downloadSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>CATALOG EXPORTED</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>EXPORT BLOG INDEX</span>
            </>
          )}
        </button>
      </div>

      {/* Featured Blog Post Card (First / Highlighted Post) */}
      {featuredEntry && (
        <article className="border border-[#262628] bg-[#18181A] hover:border-[#3A3A3C] transition-colors">
          {/* Card Top Meta Bar */}
          <div className="p-4 md:p-6 border-b border-[#262628] flex flex-wrap items-center justify-between gap-2 text-xs font-grotesk tracking-[0.16em] uppercase">
            <div className="flex items-center gap-2.5">
              <span className="text-white font-medium">{featuredEntry.indexCode || 'LATEST'}</span>
              <span className="text-[#555]">·</span>
              <span className="text-[#91918A] flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {featuredEntry.date || featuredEntry.dateOrMeta}
              </span>
              <span className="text-[#555]">·</span>
              <span className="text-[#C7C7BF]">{featuredEntry.category}</span>
            </div>

            <span className="px-2 py-0.5 text-[10px] tracking-wider border border-white bg-white text-black font-semibold">
              FEATURED DISPATCH
            </span>
          </div>

          {/* Hero Image */}
          {(featuredEntry.coverImage || featuredEntry.imageUrl) && (
            <div
              onClick={() => onSelectEntry(featuredEntry)}
              className="relative aspect-[16/9] w-full overflow-hidden cursor-pointer group bg-[#111112]"
            >
              <img
                src={featuredEntry.coverImage || featuredEntry.imageUrl}
                alt={featuredEntry.imageAlt || featuredEntry.title}
                className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18181A] via-transparent to-transparent opacity-80" />

              {/* Tags & Play Button Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-1.5">
                  {(featuredEntry.tags && featuredEntry.tags.length > 0 ? featuredEntry.tags : featuredEntry.badges).map((b, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-[10px] font-grotesk tracking-widest uppercase bg-[#131314]/90 text-[#F4F2EC] border border-[#3A3A3C]"
                    >
                      {b}
                    </span>
                  ))}
                </div>

                <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-black ml-0.5" />
                </div>
              </div>
            </div>
          )}

          {/* Card Body */}
          <div className="p-6 md:p-8 space-y-4">
            <h2
              onClick={() => onSelectEntry(featuredEntry)}
              className="font-serif text-2xl md:text-4xl text-[#F4F2EC] hover:text-white uppercase tracking-tight cursor-pointer transition-colors"
            >
              {featuredEntry.title}
            </h2>

            <p className="font-sans text-sm md:text-base text-[#91918A] leading-relaxed font-light">
              {featuredEntry.description}
            </p>

            {/* Author & Read Link */}
            <div className="pt-6 border-t border-[#262628] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs font-grotesk tracking-wider">
                <span className="text-[#C7C7BF] uppercase">BY {featuredEntry.author}</span>
                <span className="text-[#555]">·</span>
                <span className="text-[#7E7E7E] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {featuredEntry.readingTime || '5 MIN READ'}
                </span>
              </div>

              <button
                onClick={() => onSelectEntry(featuredEntry)}
                className="px-5 py-2.5 bg-white hover:bg-[#F4F2EC] text-[#131314] text-xs font-grotesk tracking-[0.16em] font-semibold uppercase flex items-center gap-2 transition-colors focus:outline-none"
              >
                <span>{featuredEntry.actionText || 'READ ESSAY —'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </article>
      )}

      {/* Filter and Articles Directory */}
      <div className="border border-[#262628] bg-[#18181A] p-6 space-y-6">
        <div className="border-b border-[#262628] pb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl text-[#F4F2EC] uppercase tracking-wide">
              PUBLISHED ARTICLES DIRECTORY
            </h3>
            <p className="font-sans text-xs text-[#91918A] mt-1 font-light">
              Select any post to open its dedicated individual page.
            </p>
          </div>
          <span className="font-mono text-xs text-[#91918A] tnum">
            {filteredEntries.length} OF {entries.length} PUBLISHED
          </span>
        </div>

        {/* Search Bar */}
        <div className="space-y-3">
          <div className="relative flex items-center">
            <div className="absolute left-3.5 pointer-events-none text-[#91918A]">
              <Search className="w-4 h-4 stroke-[1.8]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts by title, tag, keyword, or author..."
              className="w-full pl-10 pr-9 py-2.5 bg-[#141416] border border-[#262628] focus:border-[#F4F2EC] text-[#F4F2EC] placeholder-[#7E7E7E] text-xs font-grotesk tracking-wide outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-[#91918A] hover:text-[#F4F2EC] p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedTag(null);
                }}
                className={`px-3 py-1.5 text-[11px] font-grotesk tracking-[0.12em] uppercase whitespace-nowrap transition-colors border ${
                  selectedCategory === cat
                    ? 'bg-white text-[#131314] font-semibold border-white'
                    : 'bg-[#141416] text-[#C7C7BF] border-[#262628] hover:border-[#3A3A3C] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tags list if available */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-grotesk text-[#7E7E7E] uppercase tracking-wider mr-1 flex items-center gap-1">
                <TagIcon className="w-3 h-3" /> TAGS:
              </span>
              {allTags.map((tag) => {
                const isActive = selectedTag?.toLowerCase() === tag.toLowerCase();
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(isActive ? null : tag)}
                    className={`px-2 py-0.5 text-[10px] font-grotesk tracking-wider uppercase transition-colors border ${
                      isActive
                        ? 'border-[#F4F2EC] bg-[#222] text-white font-medium'
                        : 'border-[#262628] bg-[#141416] text-[#91918A] hover:border-[#3A3A3C] hover:text-[#C7C7BF]'
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag(null)}
                  className="text-[10px] text-[#C7C7BF] hover:text-white underline ml-1 font-grotesk"
                >
                  Clear tag
                </button>
              )}
            </div>
          )}
        </div>

        {/* Posts List */}
        <div className="space-y-3">
          {filteredEntries.length === 0 ? (
            <div className="p-8 text-center text-xs font-grotesk text-[#7E7E7E] uppercase tracking-wider border border-dashed border-[#262628]">
              No posts match your search or filter.
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <div
                key={entry.id}
                onClick={() => onSelectEntry(entry)}
                className="p-4 border border-[#262628] hover:border-[#3A3A3C] bg-[#141416] cursor-pointer transition-colors group flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-grotesk tracking-widest text-[#91918A] uppercase">
                    <span className="text-[#C7C7BF] font-medium">{entry.indexCode || entry.id}</span>
                    <span>·</span>
                    <span className="text-white/80">{entry.category}</span>
                    {(entry.date || entry.dateOrMeta) && (
                      <>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {entry.date || entry.dateOrMeta}
                        </span>
                      </>
                    )}
                    {entry.readingTime && (
                      <>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-[#7E7E7E]">
                          <Clock className="w-3 h-3" />
                          {entry.readingTime}
                        </span>
                      </>
                    )}
                  </div>

                  <h4 className="font-serif text-base md:text-lg text-[#F4F2EC] group-hover:text-white uppercase transition-colors">
                    {entry.title}
                  </h4>

                  {entry.description && (
                    <p className="font-sans text-xs text-[#91918A] line-clamp-1 font-light max-w-xl">
                      {entry.description}
                    </p>
                  )}

                  {/* Render Tags */}
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1 pt-1">
                      {entry.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] font-grotesk text-[#7E7E7E] tracking-wider uppercase"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <span className="text-[11px] font-grotesk tracking-widest text-[#C7C7BF] group-hover:text-white uppercase transition-colors">
                    OPEN PAGE →
                  </span>
                  <span className="font-mono text-[11px] text-[#7E7E7E] tnum">
                    {entry.folioNumber || '01 / 01'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
