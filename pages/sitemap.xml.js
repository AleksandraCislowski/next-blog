import { getAllPosts } from "../lib/posts-util";
import { absoluteUrl } from "../lib/site-config";

function Sitemap() {}

function createUrlEntry(path, lastModified) {
  return `  <url>
    <loc>${absoluteUrl(path)}</loc>
    ${lastModified ? `<lastmod>${lastModified}</lastmod>` : ""}
  </url>`;
}

export function getServerSideProps({ res }) {
  const posts = getAllPosts();
  const staticPages = ["/", "/posts", "/contact"];
  const postPages = posts.map((post) => ({
    path: `/posts/${post.slug}`,
    lastModified: post.date,
  }));
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map((path) => createUrlEntry(path)).join("\n")}
${postPages.map((post) => createUrlEntry(post.path, post.lastModified)).join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default Sitemap;
