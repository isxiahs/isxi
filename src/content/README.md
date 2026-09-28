# ISXI Content Directory

All blog posts and page copy are authored as standard **Markdown / MDX** (`.mdx` or `.md`) files with YAML front matter.
**You never need to edit article text or page descriptions inside `.tsx` components.**

---

## 📁 Directory Structure

```text
content/
├── posts/
│   └── hypnotic-minimalism.mdx    # Blog posts with front matter
├── pages/
│   ├── about.mdx                  # Manifesto, directives, curators, stockists
│   ├── contact.mdx                # Contact channels, dispatches info
│   └── legal.mdx                  # Studio address, copyright, intellectual property
└── README.md                      # This guide
```

---

## ✍️ How to Add a New Blog Post

### Step 1: Create a new `.mdx` file in `content/posts/`
Choose a filename that acts as the URL slug, for example:
`content/posts/subterranean-resonance.mdx`

### Step 2: Add Front Matter at the Top
Every post requires the following front matter keys enclosed between triple dashes (`---`):

```mdx
---
title: "SUBTERRANEAN RESONANCE & TECTONIC FREQUENCY"
date: "2025.05.02"
coverImage: "/src/assets/images/hypnotic_minimalism_synth_1790588947635.jpg"
category: "AUDIO"
tags:
  - Audio
  - Synthesis
  - Brutalism
readingTime: "6 min read"
author: "Kaelen Richter"
description: "Field acoustic inquiry into deep bass response within reinforced concrete bunker architectures."
indexCode: "20.05 — Nº42"
hasAudioPlay: true
audioTrackId: "freq-04"
actionText: "READ ESSAY —"
---
```

### Front Matter Fields Reference

| Key | Type | Description | Required? |
|---|---|---|---|
| `title` | `string` | The display title of the blog post | **Yes** |
| `date` | `string` | Publication date (e.g. `2025.05.02` or `17.00 hs`) | **Yes** |
| `coverImage` | `string` | Image path or URL for the article header card | **Yes** |
| `category` | `string` | Classification category (e.g. `AUDIO`, `ARCHITECTURE`, `THEORY`) | **Yes** |
| `tags` | `list` | List of tags for filtering (e.g. `[Audio, Essay, Ambient]`) | **Yes** |
| `readingTime` | `string` | Estimated read time (e.g. `6 min read`) | **Yes** |
| `author` | `string` | Author name (e.g. `Kaelen Richter`) | Optional (defaults to Archive Contributor) |
| `description` | `string` | Excerpt / summary shown on blog list | Recommended |
| `indexCode` | `string` | Catalog identifier (e.g. `20.05 — Nº42`) | Optional |
| `hasAudioPlay` | `boolean` | `true` to enable ambient audio drone player | Optional |
| `audioTrackId` | `string` | `freq-04` \| `freq-03` \| `void-09` \| `monolith-echo` | Optional |
| `actionText` | `string` | Button text (e.g. `READ ESSAY —`) | Optional |

---

### Step 3: Write Article Content in Standard Markdown

Write your body text below the closing `---`. Full Markdown / MDX syntax is supported:

```markdown
In the dim recesses of post-industrial chamber architectures, the kick drum reorganizes perceptual duration.

## I. Subterranean Resonance
Standard paragraphs flow with elegant, responsive typography and an automatic drop cap on the opening paragraph.

### Technical Specifications
- **Frequency**: 40 Hz – 80 Hz band
- **Decay Time**: 3.2 seconds
- **Boundary**: 600mm reinforced concrete

> "Minimalism is never the absence of matter; it is the absolute concentration of intent upon the threshold of perception."
> — *Hélène Voigt*

### Archival Citations & Footnotes
1. Voigt, H. (2024). *Dissipation Patterns in Unglazed Mineral Enclosures*.
2. Richter, K. (2025). *The 40Hz Neurological Entrainment Window*.
```

---

## ⚡ What Happens Automatically

1. **Automatic Discovery**: Vite dynamically imports all `.mdx` files in `content/posts/`. No manual importing or registering in TypeScript code!
2. **Blog Listing Page**: Your post immediately appears on the blog index with its cover image, tags, date, reading time, and excerpt.
3. **Dedicated Individual Page**: An individual page is automatically created for your post at `#/post/<filename>` (e.g. `#/post/subterranean-resonance`).
4. **Tag & Category Filters**: Your new tags and category automatically appear in the blog filter pills and search bar.
5. **Interactive Controls**: Readers can adjust font size, bookmark the article, copy the direct link, and toggle atmospheric drone audio.

---

## 📄 Editing the About & Legal Pages

- **About Page**: Edit `content/pages/about.mdx`. Modify the manifesto, core directives, curatorial board members, and physical bookshop stockists directly in Markdown/YAML.
- **Contact Page**: Edit `content/pages/contact.mdx`. Update email addresses, PGP keys, radio stream frequencies, and transmission guidelines.
- **Legal Notice**: Edit `content/pages/legal.mdx`. Update studio addresses, copyright notices, and legal disclaimers.
