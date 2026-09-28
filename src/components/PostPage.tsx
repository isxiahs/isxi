import React, { useState } from 'react';
import { ArrowLeft, Bookmark, Share2, Volume2, VolumeX, Clock, Tag, Calendar, User, ChevronLeft, ChevronRight, FileCode, Check, Copy, X } from 'lucide-react';
import { MonographEntry } from '../types';

interface PostPageProps {
  post: MonographEntry;
  onBack: () => void;
  onSelectPost?: (post: MonographEntry) => void;
  allPosts?: MonographEntry[];
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
}

export const PostPage: React.FC<PostPageProps> = ({
  post,
  onBack,
  onSelectPost,
  allPosts = [],
  isPlayingAudio,
  onToggleAudio,
}) => {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [copiedSource, setCopiedSource] = useState(false);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopySource = () => {
    if (post.rawContent) {
      navigator.clipboard?.writeText(post.rawContent);
      setCopiedSource(true);
      setTimeout(() => setCopiedSource(false), 2000);
    }
  };

  const coverImage = post.coverImage || post.imageUrl;
  const postTags = post.tags && post.tags.length > 0 ? post.tags : post.badges;

  // Next and Previous navigation
  const currentIndex = allPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#131314] text-[#E5E2E3] flex flex-col font-sans selection:bg-[#F4F2EC] selection:text-[#111112]">
      {/* Sticky Reader Bar */}
      <header className="sticky top-0 z-40 bg-[#131314]/95 backdrop-blur-md border-b border-[#262628] px-4 md:px-8 py-3.5 flex items-center justify-between transition-colors">
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-grotesk text-xs tracking-[0.16em] uppercase text-[#C7C7BF] hover:text-white transition-colors focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO BLOG</span>
        </button>

        <div className="flex items-center gap-2.5">
          {/* Audio toggle button if available */}
          {post.hasAudioPlay && (
            <button
              onClick={onToggleAudio}
              className={`px-3 py-1.5 border text-xs font-grotesk tracking-wider uppercase flex items-center gap-1.5 transition-colors ${
                isPlayingAudio
                  ? 'border-[#F4F2EC] bg-[#201F20] text-[#F4F2EC]'
                  : 'border-[#262628] text-[#91918A] hover:text-white bg-[#18181A]'
              }`}
              title="Toggle atmospheric audio"
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">DRONE ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">AUDIO</span>
                </>
              )}
            </button>
          )}

          {/* Font Size Adjuster */}
          <div className="flex items-center border border-[#262628] bg-[#18181A]">
            <button
              onClick={() => setFontSizeMultiplier((prev) => Math.max(0.85, prev - 0.1))}
              className="px-2.5 py-1 text-xs text-[#91918A] hover:text-white border-r border-[#262628]"
              title="Decrease text size"
            >
              A-
            </button>
            <button
              onClick={() => setFontSizeMultiplier((prev) => Math.min(1.35, prev + 0.1))}
              className="px-2.5 py-1 text-xs text-[#91918A] hover:text-white"
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
                : 'border-[#262628] bg-[#18181A] text-[#91918A] hover:text-white'
            }`}
            title="Bookmark post"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#F4F2EC]' : ''}`} />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-2 border border-[#262628] bg-[#18181A] text-[#91918A] hover:text-white transition-colors relative"
            title="Copy post link"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copiedLink && (
              <span className="absolute -bottom-8 right-0 bg-white text-[#131314] text-[10px] font-grotesk px-2 py-0.5 whitespace-nowrap shadow-lg">
                LINK COPIED
              </span>
            )}
          </button>

          {/* View MDX Source Toggle */}
          <button
            onClick={() => setShowSource(!showSource)}
            className={`p-2 border text-[11px] font-grotesk tracking-wider uppercase transition-colors ${
              showSource
                ? 'border-[#F4F2EC] bg-white text-black'
                : 'border-[#262628] bg-[#18181A] text-[#91918A] hover:text-white'
            }`}
            title="View MDX source"
          >
            <FileCode className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Raw MDX Source Code Viewer Panel */}
      {showSource && (
        <div className="max-w-3xl mx-auto px-4 md:px-8 pt-6 w-full">
          <div className="border border-[#F4F2EC]/40 bg-[#0F0F10] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#262628]">
              <div>
                <span className="font-mono text-xs text-[#F4F2EC] font-semibold block">
                  content/posts/{post.id}.mdx
                </span>
                <span className="text-[11px] font-grotesk text-[#7E7E7E]">
                  Raw front matter & Markdown source
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySource}
                  className="px-3 py-1 bg-[#1E1E20] hover:bg-[#2A2A2D] text-[#C7C7BF] hover:text-white border border-[#3A3A3C] text-[11px] font-grotesk tracking-wider uppercase flex items-center gap-1.5 transition-colors"
                >
                  {copiedSource ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSource ? 'COPIED' : 'COPY MDX'}</span>
                </button>
                <button
                  onClick={() => setShowSource(false)}
                  className="p-1 text-[#7E7E7E] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <pre className="font-mono text-xs text-[#C7C7BF] bg-[#141416] p-4 border border-[#262628] overflow-x-auto whitespace-pre leading-relaxed select-text">
              {post.rawContent || post.description}
            </pre>
          </div>
        </div>
      )}

      {/* Main Post Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-8 py-8 md:py-16">
        {/* Post Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-grotesk tracking-[0.16em] uppercase text-[#91918A] pb-4 border-b border-[#262628] mb-6">
          <div className="flex items-center gap-2">
            <span className="text-[#F4F2EC] font-medium">{post.indexCode}</span>
            <span>·</span>
            <span className="text-[#C7C7BF]">{post.category}</span>
            {post.date && (
              <>
                <span>·</span>
                <span className="flex items-center gap-1 text-[#91918A]">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-[#7E7E7E]" />
            <span>{post.readingTime || '5 MIN READ'}</span>
          </div>
        </div>

        {/* Post Title */}
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#F4F2EC] font-normal tracking-tight leading-[1.12] mb-6 uppercase">
          {post.title}
        </h1>

        {/* Author & Tags Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[#262628]">
          <div className="flex items-center gap-2 font-grotesk text-xs tracking-wider text-[#C7C7BF]">
            <User className="w-3.5 h-3.5 text-[#91918A]" />
            <span>BY {post.author.toUpperCase()}</span>
            <span>—</span>
            <span className="text-[#91918A]">OPEN FREQUENCY IMPRINT</span>
          </div>

          {/* Tags */}
          {postTags && postTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {postTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-[10px] font-grotesk tracking-widest uppercase bg-[#18181A] border border-[#262628] text-[#91918A]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Cover Image */}
        {coverImage && (
          <figure className="mb-12 border border-[#262628] bg-[#18181A]">
            <img
              src={coverImage}
              alt={post.imageAlt || post.title}
              className="w-full aspect-[16/9] object-cover filter grayscale contrast-110"
            />
            <figcaption className="p-3 text-[11px] font-grotesk tracking-widest text-[#91918A] uppercase bg-[#141416] border-t border-[#262628] flex justify-between">
              <span>{post.imageAlt || post.title}</span>
              <span>PLATE ARCHIVE</span>
            </figcaption>
          </figure>
        )}

        {/* Article Body */}
        {post.contentHtml ? (
          <article
            className="markdown-article text-[#C7C7BF] font-light leading-[1.85] space-y-6 [&>p:first-of-type]:font-serif [&>p:first-of-type]:text-lg [&>p:first-of-type]:md:text-xl [&>p:first-of-type]:text-[#F4F2EC] [&>p:first-of-type::first-letter]:text-5xl [&>p:first-of-type::first-letter]:font-serif [&>p:first-of-type::first-letter]:float-left [&>p:first-of-type::first-letter]:mr-3 [&>p:first-of-type::first-letter]:mt-1 [&>p:first-of-type::first-letter]:text-white [&>p:first-of-type::first-letter]:leading-none [&>h2]:font-grotesk [&>h2]:text-sm [&>h2]:md:text-base [&>h2]:tracking-[0.16em] [&>h2]:uppercase [&>h2]:text-[#F4F2EC] [&>h2]:font-semibold [&>h2]:pt-6 [&>h2]:mt-8 [&>h2]:border-t [&>h2]:border-[#262628]/70 [&>h3]:font-grotesk [&>h3]:text-xs [&>h3]:tracking-[0.14em] [&>h3]:uppercase [&>h3]:text-[#91918A] [&>h3]:font-medium [&>h3]:mt-6 [&>blockquote]:my-8 [&>blockquote]:p-6 [&>blockquote]:md:p-8 [&>blockquote]:border-l-2 [&>blockquote]:border-[#F4F2EC] [&>blockquote]:bg-[#18181A] [&>blockquote]:font-serif [&>blockquote]:italic [&>blockquote]:text-xl [&>blockquote]:md:text-2xl [&>blockquote]:text-[#F4F2EC] [&>hr]:border-[#262628] [&>hr]:my-8 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol]:text-xs [&>ol]:font-grotesk [&>ol]:text-[#91918A] [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:text-xs [&>ul]:font-grotesk [&>ul]:text-[#91918A]"
            style={{ fontSize: `${1 * fontSizeMultiplier}rem` }}
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        ) : (
          <div className="space-y-4 text-sm font-light text-[#C7C7BF]">
            <p>{post.description}</p>
          </div>
        )}

        {/* Post Bottom Navigation */}
        <div className="mt-16 pt-8 border-t border-[#262628] space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="px-5 py-2.5 border border-[#3A3A3C] hover:border-white text-xs font-grotesk tracking-widest uppercase text-[#F4F2EC] transition-colors focus:outline-none"
            >
              ← RETURN TO BLOG
            </button>
            <span className="font-mono text-xs text-[#91918A] tnum">
              {post.folioNumber}
            </span>
          </div>

          {/* Previous / Next Article Links */}
          {(prevPost || nextPost) && onSelectPost && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#262628]/60">
              {prevPost ? (
                <button
                  onClick={() => onSelectPost(prevPost)}
                  className="p-4 border border-[#262628] bg-[#18181A] hover:border-[#3A3A3C] text-left transition-colors group flex items-start gap-3 focus:outline-none"
                >
                  <ChevronLeft className="w-4 h-4 text-[#91918A] shrink-0 mt-1 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <span className="text-[10px] font-grotesk tracking-widest text-[#91918A] uppercase block mb-1">
                      PREVIOUS POST
                    </span>
                    <span className="font-serif text-sm text-[#F4F2EC] group-hover:text-white uppercase line-clamp-1">
                      {prevPost.title}
                    </span>
                  </div>
                </button>
              ) : <div />}

              {nextPost ? (
                <button
                  onClick={() => onSelectPost(nextPost)}
                  className="p-4 border border-[#262628] bg-[#18181A] hover:border-[#3A3A3C] text-right transition-colors group flex items-start justify-end gap-3 focus:outline-none"
                >
                  <div>
                    <span className="text-[10px] font-grotesk tracking-widest text-[#91918A] uppercase block mb-1">
                      NEXT POST
                    </span>
                    <span className="font-serif text-sm text-[#F4F2EC] group-hover:text-white uppercase line-clamp-1">
                      {nextPost.title}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#91918A] shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : <div />}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
