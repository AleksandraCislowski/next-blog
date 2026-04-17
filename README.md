# Elsewhere Log

Elsewhere Log is a portfolio travel journal built with Next.js. It combines long-form travel notes, image-led post pages, archive filtering, and Leaflet maps generated from post metadata.

## Features

- Markdown-based travel posts with structured frontmatter
- Homepage hero, highlights, and mapped place overview
- Archive filters for country, trip type, tag, and sort order
- Interactive maps on the homepage and individual post pages
- Responsive navigation with a mobile menu
- Simple contact page using `mailto:` instead of a backend form
- Reusable post template in `templates/post-template.md`

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

```bash
npm run dev
npm run build
npm run start
```

## Adding A New Post

Use the template and guide in `templates/`.

Each post should have:

- a markdown file in `posts/`
- a matching image folder in `public/images/posts/[post-slug]/`
- frontmatter with location metadata and coordinates
- a cover image listed in the `image` field

Posts with `isFeatured: true` appear in Highlights.
