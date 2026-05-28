# Codex Rules For This Blog

These rules are mandatory when working on travel posts in this repository.

## New Post Workflow

- Use every image file in `public/images/posts/[slug]/`.
- Never change the cover image unless the user explicitly asks for a different cover. The cover must stay exactly as selected by the user/frontmatter, including the exact filename.
- The cover image from frontmatter `image:` counts as used.
- Do not repeat the cover image inside the markdown body.
- Every image file in the post folder must be referenced exactly once: either as the cover or as a markdown image.
- Never remove or skip images because they look similar. Similar images are still intentional unless the user explicitly says to remove them.
- Before finishing, verify that the folder image list equals the markdown image references plus the cover image.

## Filename Safety

- Never rename image files unless the user explicitly asks for that exact rename.
- Never change image filename capitalization or extension capitalization. For example, `.JPG` must remain `.JPG`; `.jpg` must remain `.jpg`.
- Never normalize filenames for convenience, tooling, consistency, sorting, or aesthetics.
- Markdown references, frontmatter, layout config, and any helper mappings must use the exact filename as it exists on disk.
- If a filename case or extension case looks inconsistent, keep it unchanged and report it instead of modifying it.

## Image Safety

- Never rotate images.
- Never manually rotate images based on how they look in a preview tool.
- Never run the image optimizer unless the user explicitly asks to optimize images.
- Never optimize images as part of creating, editing, checking, or finishing a post unless the user explicitly requested image optimization in that task.
- The optimizer should apply EXIF orientation during processing so optimized files display the same way as the source files.
- Never “fix” image orientation based on how it appears in a preview tool.
- The image optimizer should process every image in the target post folder.
- Do not add EXIF-orientation refusal logic to the optimizer.
- If an image appears rotated after optimization, report it to the user. Do not repair it by rotating or transforming it unless the user explicitly asks.

## Captions And Paragraphs

- Travel post content, headings, captions, excerpts, tags, and frontmatter text must be written in English unless the user explicitly asks for another language. The user may give instructions in Polish; do not copy Polish phrasing into the post unless explicitly requested.
- Captions must be mapped to the exact image filename they describe. Do not write captions from memory or from an assumed sequence.
- When reviewing images, keep a filename-to-visible-content mapping for every file before editing the markdown.
- The cover image still needs its own visible-content note for verification, even though it must not be repeated in the markdown body.
- The cover image from frontmatter does not get a visible markdown caption unless it is explicitly inserted into the body, which is normally forbidden. The first visible markdown caption must describe the first markdown image filename, not the cover.
- Never shift captions because the cover image is omitted from the body. For example, if `image: slug1.jpg` is the cover, the first markdown image `slug2.jpg` must be captioned from `slug2.jpg`, not from `slug1.jpg`.
- Before finishing caption edits, compare every markdown image line against the actual file with the same filename and confirm the caption describes that file.
- Captions must describe what is actually visible in the image.
- Do not identify a building, monument, object, or place by name unless it is certain from the image or the user supplied that information.
- Avoid confident but unverified names like cathedral, hall, square, market, or monument unless the visual/context makes it certain.
- If uncertain, use literal descriptions: facade, fountain, statue, kiosk, waterfront building, harbor, market stall.
- After changing captions, update the surrounding paragraphs so they match the image.
- Do not let paragraphs claim details that are not visible in or supported by the image.

## Required Checks Before Final Response

- List folder images with `find public/images/posts/[slug] -maxdepth 1 -type f | sort -V`.
- Check markdown image usage with `rg -o "[slug][0-9]+\\.jpg" posts/[slug].md | sort -V | uniq -c`.
- Confirm every image appears exactly once, including the cover.
- Run `npm run build`.
- Report any missing-file issue explicitly.
