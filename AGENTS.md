# Codex Rules For This Blog

These rules are mandatory when working on travel posts in this repository.

## New Post Workflow

- Use every image file in `public/images/posts/[slug]/`.
- The cover image from frontmatter `image:` counts as used.
- Do not repeat the cover image inside the markdown body.
- Every image file in the post folder must be referenced exactly once: either as the cover or as a markdown image.
- Never remove or skip images because they look similar. Similar images are still intentional unless the user explicitly says to remove them.
- Before finishing, verify that the folder image list equals the markdown image references plus the cover image.

## Image Safety

- Never rotate images.
- Never manually rotate images based on how they look in a preview tool.
- The optimizer should apply EXIF orientation during processing so optimized files display the same way as the source files.
- Never “fix” image orientation based on how it appears in a preview tool.
- The image optimizer should process every image in the target post folder.
- Do not add EXIF-orientation refusal logic to the optimizer.
- If an image appears rotated after optimization, report it to the user. Do not repair it by rotating or transforming it unless the user explicitly asks.

## Captions And Paragraphs

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
