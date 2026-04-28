const fs = require("fs");
const path = require("path");

const titleInput = process.argv.slice(2).join(" ").trim();

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toTitleCase(value) {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

if (!titleInput) {
  console.error('Usage: npm run new-post -- "Place Name"');
  process.exit(1);
}

const slug = slugify(titleInput);

if (!slug) {
  console.error("Could not create a valid slug from this title.");
  process.exit(1);
}

const projectRoot = process.cwd();
const postPath = path.join(projectRoot, "posts", `${slug}.md`);
const imageDirectory = path.join(projectRoot, "public", "images", "posts", slug);
const templatePath = path.join(projectRoot, "templates", "post-template.md");

if (fs.existsSync(postPath)) {
  console.error(`Post already exists: posts/${slug}.md`);
  process.exit(1);
}

if (fs.existsSync(imageDirectory)) {
  console.error(`Image directory already exists: public/images/posts/${slug}/`);
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf8");
const title = toTitleCase(titleInput);
const today = new Date().toISOString().slice(0, 10);
const postContent = template
  .replace('title: "Place Name"', `title: "${title}"`)
  .replace('date: "YYYY-MM-DD"', `date: "${today}"`)
  .replace('addedDate: "YYYY-MM-DD"', `addedDate: "${today}"`)
  .replace("image: cover-image.jpg", `image: ${slug}1.jpg`)
  .replace("city: Place Name", `city: ${title}`)
  .replace("![Descriptive image alt text](image-2.jpg)", `![Descriptive image alt text](${slug}2.jpg)`)
  .replace("![Descriptive image alt text](image-3.jpg)", `![Descriptive image alt text](${slug}3.jpg)`)
  .replace("![Descriptive image alt text](image-4.jpg)", `![Descriptive image alt text](${slug}4.jpg)`);

fs.mkdirSync(imageDirectory, { recursive: true });
fs.writeFileSync(postPath, postContent);

console.log(`Created posts/${slug}.md`);
console.log(`Created public/images/posts/${slug}/`);
console.log("");
console.log("Next steps:");
console.log(`1. Add images named ${slug}1.jpg, ${slug}2.jpg, ...`);
console.log("2. Fill in country, region, coordinates, tags, and excerpt.");
console.log("3. Set isFeatured: true if the note should appear in Highlights.");
