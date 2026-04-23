# Content Workflow

This guide is for adding new travel notes to Elsewhere Log.

## Create A New Post

Run:

```bash
npm run new-post -- "Place Name"
```

Example:

```bash
npm run new-post -- "Porto Weekend"
```

This creates:

```txt
posts/porto-weekend.md
public/images/posts/porto-weekend/
```

The post file is generated from `templates/post-template.md`.

## Add Images

Add images to the generated folder:

```txt
public/images/posts/porto-weekend/
```

The generated template expects names like:

```txt
porto-weekend1.jpg
porto-weekend2.jpg
porto-weekend3.jpg
porto-weekend4.jpg
```

The cover image must match the `image` field in frontmatter:

```yaml
image: porto-weekend1.jpg
```

Inline markdown images should use only the file name:

```md
![Riverside view in Porto](porto-weekend2.jpg)
```

Do not include the full folder path in markdown images. The app resolves images from `public/images/posts/[post-slug]/`.

## Fill In Frontmatter

Every post should include:

```yaml
---
title: "Porto Weekend (Portugal)"
date: "2026-04-18"
addedDate: "2026-04-20"
image: porto-weekend1.jpg
city: Porto
country: Portugal
region: Norte
coordinates:
  lat: 41.1579
  lng: -8.6291
tripType: city break
tags:
  - Portugal
  - riverside
  - architecture
excerpt: A short, atmospheric summary of the note.
isFeatured: false
---
```

## What Each Field Does

- `title`: Used on the post page, cards, SEO title, and related-post cards.
- `date`: Travel date used for archive sorting, display, sitemap metadata, and article SEO.
- `addedDate`: Date the post was added. Used for the homepage "Recently added" link.
- `image`: Cover image for cards, post header, and social preview.
- `city`, `country`, `region`: Used in cards, field notes, filters, stats, maps, and search.
- `coordinates.lat`, `coordinates.lng`: Adds the post to the homepage map and post map.
- `tripType`: Used in filters, cards, field notes, and search.
- `tags`: Used in filters, chips, related posts, SEO tags, and search.
- `excerpt`: Used on cards, SEO descriptions, and social previews.
- `isFeatured`: Controls whether the post appears in Highlights on the homepage.

## Writing Guidelines

- Open with a clear mood or memory from the place.
- Add text between images so the post reads like a story, not a gallery.
- Use descriptive alt text for every image.
- Keep sections focused and readable.
- End with a short closing reflection.

## Publishing Checklist

Before committing a new post:

- The markdown file is in `posts/`.
- The image folder exists in `public/images/posts/[post-slug]/`.
- The cover image listed in `image` exists.
- Every inline markdown image exists.
- Every image has descriptive alt text.
- Coordinates are filled in.
- `excerpt` is written in one polished sentence.
- `isFeatured` is intentionally set to `true` or `false`.
- `npm run build` passes.

## After Adding A Post

Once the post has complete frontmatter, it automatically appears in:

- All Notes
- search results
- archive filters
- dynamic stats
- homepage map
- post map
- related notes
- sitemap

If `isFeatured: true`, it also appears in Highlights.
