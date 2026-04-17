# Post Template

Use `post-template.md` as the starting point for every new travel note.

## How To Add A Post

1. Copy `templates/post-template.md`.
2. Paste it into `posts/` with a lowercase slug file name, for example `porto.md`.
3. Create a matching image folder in `public/images/posts/`, for example `public/images/posts/porto/`.
4. Add the cover image listed in `image` to that folder.
5. Add every inline image referenced in the markdown body to the same folder.
6. Fill in the frontmatter fields.
7. Set `isFeatured: true` only when the post should appear in Highlights.

## Frontmatter Fields

- `title`: Display title for the post page and cards.
- `date`: Publish or travel date in `YYYY-MM-DD` format.
- `image`: Cover image file name from the post image folder.
- `city`, `country`, `region`: Used by cards, filters, archive stats, and maps.
- `coordinates.lat`, `coordinates.lng`: Used by the homepage map and post map.
- `tripType`: Used by archive filtering.
- `tags`: Used by archive filtering and post/card labels.
- `excerpt`: Short preview text for cards.
- `isFeatured`: Controls whether the post appears in Highlights.

## Image Rules

- Store images in `public/images/posts/[post-slug]/`.
- Keep the markdown image path as just the file name, for example `![Castle view](castle-view.jpg)`.
- Use descriptive alt text. It becomes the visible caption in the post.
- Put text between images so the post reads like a story, not a gallery dump.

## Suggested Trip Types

- `city break`
- `day trip`
- `history stop`
- `nature escape`
- `coastal walk`
- `museum day`
- `food stop`
