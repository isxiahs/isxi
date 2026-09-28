import { marked } from 'marked';
import { MonographEntry, EntryCategory } from '../types';

export interface PageContent {
  slug: string;
  frontmatter: Record<string, any>;
  title?: string;
  subtitle?: string;
  summary?: string;
  html: string;
  raw: string;
}

// Robust browser/Vite frontmatter parser supporting strings, numbers, booleans, and lists
function parseFrontmatterAndBody(fileContent: string): {
  frontmatter: Record<string, any>;
  body: string;
} {
  const normalized = fileContent.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---')) {
    return { frontmatter: {}, body: normalized };
  }

  const endFrontmatterIndex = normalized.indexOf('\n---', 3);
  if (endFrontmatterIndex === -1) {
    return { frontmatter: {}, body: normalized };
  }

  const rawFrontmatter = normalized.slice(3, endFrontmatterIndex).trim();
  const body = normalized.slice(endFrontmatterIndex + 4).trim();

  const frontmatter: Record<string, any> = {};
  const lines = rawFrontmatter.split('\n');
  let currentKey = '';
  let isCollectingList = false;
  let currentListItem: Record<string, any> | null = null;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Detect indentation
    const indent = rawLine.search(/\S|$/);

    // List item with object properties (e.g., - id: "01" / title: ...)
    if (trimmed.startsWith('- ') && isCollectingList && currentKey) {
      const rest = trimmed.slice(2).trim();
      const colonIdx = rest.indexOf(':');

      if (colonIdx !== -1 && !rest.startsWith('http')) {
        // It's an object inside the list
        const objKey = rest.slice(0, colonIdx).trim();
        const objVal = cleanValue(rest.slice(colonIdx + 1).trim());
        currentListItem = { [objKey]: objVal };
        if (!Array.isArray(frontmatter[currentKey])) {
          frontmatter[currentKey] = [];
        }
        frontmatter[currentKey].push(currentListItem);
      } else {
        // Simple scalar item
        currentListItem = null;
        const itemVal = cleanValue(rest);
        if (!Array.isArray(frontmatter[currentKey])) {
          frontmatter[currentKey] = [];
        }
        frontmatter[currentKey].push(itemVal);
      }
      continue;
    }

    // Property of current list item object
    if (indent >= 4 && currentListItem && trimmed.includes(':')) {
      const colonIdx = trimmed.indexOf(':');
      const objKey = trimmed.slice(0, colonIdx).trim();
      const objVal = cleanValue(trimmed.slice(colonIdx + 1).trim());
      currentListItem[objKey] = objVal;
      continue;
    }

    // Top-level key: value
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx !== -1 && !trimmed.startsWith('-')) {
      const key = trimmed.slice(0, colonIdx).trim();
      const rawValue = trimmed.slice(colonIdx + 1).trim();

      currentKey = key;
      currentListItem = null;

      if (rawValue === '') {
        // Start of list or nested object
        frontmatter[key] = [];
        isCollectingList = true;
      } else if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
        // Inline array: ["Audio", "Essay"]
        const items = rawValue
          .slice(1, -1)
          .split(',')
          .map((s) => cleanValue(s.trim()))
          .filter(Boolean);
        frontmatter[key] = items;
        isCollectingList = false;
      } else {
        isCollectingList = false;
        frontmatter[key] = cleanValue(rawValue);
      }
    }
  }

  return { frontmatter, body };
}

function cleanValue(val: string): any {
  if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
  else if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);

  if (val === 'true') return true;
  if (val === 'false') return false;
  if (!isNaN(Number(val)) && val !== '') return Number(val);
  return val;
}

// Configure marked with GitHub Flavored Markdown and line breaks
marked.setOptions({
  gfm: true,
  breaks: true,
});

// Load all posts from /content/posts/*.{md,mdx} and /src/content/posts/*.{md,mdx}
export function loadAllPosts(): MonographEntry[] {
  // Vite glob import matching posts at root or inside src
  const postFilesRoot = import.meta.glob<string>('/content/posts/*.{md,mdx}', {
    query: '?raw',
    eager: true,
    import: 'default',
  });

  const postFilesSrc = import.meta.glob<string>('/src/content/posts/*.{md,mdx}', {
    query: '?raw',
    eager: true,
    import: 'default',
  });

  const allFiles = { ...postFilesSrc, ...postFilesRoot };
  const entries: MonographEntry[] = [];
  const seenIds = new Set<string>();

  for (const [path, content] of Object.entries(allFiles)) {
    if (typeof content !== 'string') continue;

    const { frontmatter, body } = parseFrontmatterAndBody(content);
    const filename = path.split('/').pop()?.replace(/\.(md|mdx)$/, '') || 'untitled';

    const id = frontmatter.id || frontmatter.slug || filename;
    if (seenIds.has(id)) continue;
    seenIds.add(id);

    const title = frontmatter.title || filename.toUpperCase();
    const description = frontmatter.description || frontmatter.excerpt || '';
    const dateOrMeta = frontmatter.date || frontmatter.dateOrMeta || 'ARCHIVE';
    const indexCode = frontmatter.indexCode || '01.01 — Nº01';
    const folioNumber = frontmatter.folioNumber || '01 / 01';
    const category = (frontmatter.category || 'AUDIO') as EntryCategory;

    // Tags list
    let tags: string[] = [];
    if (Array.isArray(frontmatter.tags)) {
      tags = frontmatter.tags.map(String);
    } else if (typeof frontmatter.tags === 'string') {
      tags = frontmatter.tags.split(',').map((t) => t.trim()).filter(Boolean);
    }

    // Badges: fallback to tags or category if none provided
    const badges = Array.isArray(frontmatter.badges)
      ? frontmatter.badges
      : tags.length > 0
      ? tags.slice(0, 2)
      : [String(category), frontmatter.readingTime || '5 MIN READ'];

    // Cover image: support coverImage, cover_image, imageUrl, image
    const coverImage =
      frontmatter.coverImage ||
      frontmatter.cover_image ||
      frontmatter.imageUrl ||
      frontmatter.image;
    const imageAlt = frontmatter.imageAlt || title;

    const hasAudioPlay = Boolean(frontmatter.hasAudioPlay);
    const audioTrackId = frontmatter.audioTrackId || (hasAudioPlay ? 'freq-04' : undefined);
    const actionText = frontmatter.actionText || 'READ ESSAY —';
    const author = frontmatter.author || 'Archive Contributor';
    const readingTime = frontmatter.readingTime || frontmatter.reading_time || '5 min read';

    const contentHtml = marked.parse(body) as string;

    entries.push({
      id,
      slug: id,
      folioNumber,
      indexCode,
      dateOrMeta,
      date: dateOrMeta,
      metaType: frontmatter.metaType || 'time',
      title,
      description,
      category,
      tags,
      badges,
      refCode: frontmatter.refCode,
      imageUrl: coverImage,
      coverImage,
      imageAlt,
      hasAudioPlay,
      audioTrackId,
      actionText,
      author,
      readingTime,
      rawContent: body,
      contentHtml,
      frontmatter,
    });
  }

  // Sort by date or id
  return entries;
}

// Load static markdown pages from /content/pages/*.{md,mdx} and /src/content/pages/*.{md,mdx}
export function loadAllPages(): Record<string, PageContent> {
  const pageFilesRoot = import.meta.glob<string>('/content/pages/*.{md,mdx}', {
    query: '?raw',
    eager: true,
    import: 'default',
  });

  const pageFilesSrc = import.meta.glob<string>('/src/content/pages/*.{md,mdx}', {
    query: '?raw',
    eager: true,
    import: 'default',
  });

  const allPageFiles = { ...pageFilesSrc, ...pageFilesRoot };
  const pages: Record<string, PageContent> = {};

  for (const [path, content] of Object.entries(allPageFiles)) {
    if (typeof content !== 'string') continue;

    const { frontmatter, body } = parseFrontmatterAndBody(content);
    const slug = path.split('/').pop()?.replace(/\.(md|mdx)$/, '') || 'page';
    const html = marked.parse(body) as string;

    pages[slug] = {
      slug,
      frontmatter,
      title: frontmatter.title,
      subtitle: frontmatter.subtitle,
      summary: frontmatter.summary || frontmatter.description,
      html,
      raw: body,
    };
  }

  return pages;
}
