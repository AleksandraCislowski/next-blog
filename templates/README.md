# Post Template

Use `post-template.md` as the starting point for every new travel note.

For the full publishing workflow, see `docs/content-workflow.md`.

## How To Add A Post

1. Run `npm run new-post -- "Place Name"`.
2. Add the generated images to `public/images/posts/[post-slug]/`.
3. Fill in the frontmatter fields.
4. Set `isFeatured: true` only when the post should appear in Highlights.

You can still copy `templates/post-template.md` manually if you prefer.

## Frontmatter Fields

- `title`: Display title for the post page and cards.
- `date`: Travel date in `YYYY-MM-DD` format.
- `addedDate`: Date the post was added in `YYYY-MM-DD` format. Used for the homepage "Most recent" link.
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
