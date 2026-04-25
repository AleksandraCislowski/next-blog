import fs from "fs";
import path from "path";

import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsFiles() {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"));
}

function getReadingTime(content) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
}

function normalizeTags(tags) {
  if (!Array.isArray(tags)) {
    return [];
  }

  return tags.filter(Boolean);
}

export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, ""); // removes the file extension
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    addedDate: data.addedDate || data.date,
    tags: normalizeTags(data.tags),
    location: {
      city: data.city || "",
      country: data.country || "",
      region: data.region || "",
      coordinates: data.coordinates || null,
    },
    imagePath: `/images/posts/${postSlug}/${data.image}`,
    readingTime: getReadingTime(content),
    content,
  };

  return postData;
}

export function getPostSummary(postIdentifier) {
  const { content, ...postSummary } = getPostData(postIdentifier);

  return postSummary;
}

export function getAllPosts() {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

export function getAllPostSummaries() {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) => {
    return getPostSummary(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPostSummaries();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}

export function getAllCountries() {
  const countries = getAllPosts().map((post) => post.location.country);

  return [...new Set(countries)].filter(Boolean).sort();
}

export function getAllTags() {
  const tags = getAllPosts().flatMap((post) => post.tags);

  return [...new Set(tags)].sort();
}

export function getTravelStats() {
  const allPosts = getAllPosts();
  const countries = new Set(allPosts.map((post) => post.location.country));
  const cities = new Set(allPosts.map((post) => post.location.city));

  return {
    postsCount: allPosts.length,
    countriesCount: [...countries].filter(Boolean).length,
    citiesCount: [...cities].filter(Boolean).length,
    tagsCount: getAllTags().length,
  };
}
