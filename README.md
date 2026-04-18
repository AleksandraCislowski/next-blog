# Elsewhere Log

Elsewhere Log is a travel journal rebuilt into a polished portfolio product. It turns personal travel writing into a searchable, map-based editorial experience that can grow over time without becoming difficult to maintain.

The goal was not only to refresh the UI. I wanted to take an older project and turn it into something that feels intentional: visually branded, easy to browse, accessible, SEO-friendly, and practical enough for regular publishing.

Live site: [blog.aleksandracislowski.com](https://blog.aleksandracislowski.com)

## Why This Project Matters

Elsewhere Log connects two things I care about: travel and building useful tools. It gives me a place to publish travel notes, but it also shows how I approach frontend work in a real product context:

- improving an existing codebase instead of starting over blindly
- turning content into structured data
- designing user flows around real use cases
- simplifying architecture where the old solution was too heavy
- making the project easier to maintain for future content

## Product Impact

The rebuilt version makes the travel archive easier to explore and easier to keep alive.

- Readers can search, filter, sort, and browse notes by place, country, trip type, and tags.
- Each post includes location context, a map, related notes, and next/previous navigation.
- The homepage gives a quick overview of the archive through stats, highlights, and an interactive map.
- New posts can be created with a custom script instead of repeating manual setup every time.
- SEO, sitemap, social previews, and accessibility improvements make the project more production-ready.

## Key Features

- **Searchable archive**: travel notes can be searched by title, excerpt, city, country, region, trip type, and tags.
- **Smart filtering**: country, trip type, and tag filters work together and avoid dead-end combinations where possible.
- **Interactive maps**: Leaflet maps are generated from post coordinates on the homepage and individual post pages.
- **Editorial post pages**: each post has a cover image, field notes summary, tags, location map, related notes, and post navigation.
- **Dynamic content model**: markdown frontmatter powers cards, filters, maps, SEO metadata, related posts, and sitemap entries.
- **Responsive UI**: layouts were tuned for mobile, desktop, and ultrawide screens.
- **Accessibility pass**: skip link, visible focus states, semantic summary lists, reduced-motion support, and clearer interactive labels.
- **SEO polish**: Open Graph, Twitter cards, canonical URLs, JSON-LD, dynamic `sitemap.xml`, and `robots.txt`.
- **Simplified contact flow**: an old backend form was replaced with a reliable `mailto:` contact page.

## Publishing Workflow

I added a small Node.js script to make publishing easier and reduce repetitive setup.

```bash
npm run new-post -- "Porto Weekend"
```

The script creates:

```txt
posts/porto-weekend.md
public/images/posts/porto-weekend/
```

It also pre-fills the post from a reusable template with a matching slug, date, cover image name, and starter markdown structure. This keeps new posts consistent and prevents common mistakes like mismatched post slugs and image folders.

The full workflow is documented in [`docs/content-workflow.md`](docs/content-workflow.md).

## What I Improved

The project originally had course-era patterns and unused backend infrastructure. During the rebuild I:

- upgraded the stack
- removed unused MongoDB and Nodemailer dependencies
- replaced the contact API with a simpler contact page
- created a visual identity with a consistent palette, typography, logo, and image direction
- improved the navigation and mobile experience
- rewrote and expanded travel post content
- introduced structured frontmatter for every post
- added maps, archive filtering, search, related posts, and post navigation
- added SEO and accessibility improvements
- created a repeatable publishing workflow

## Tech Stack

- Next.js Pages Router
- React
- CSS Modules
- Markdown content with `gray-matter` and `react-markdown`
- Leaflet maps
- Node.js utility script for content creation

## Project Status

The core experience is complete and ready for portfolio presentation. The next step is to keep publishing new travel notes and iterate based on real usage.
