export const siteConfig = {
  name: "Elsewhere Log",
  title: "Elsewhere Log",
  description: "Travel notes from places worth remembering.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://elsewhere-log.vercel.app",
  defaultImage: "/images/site/coastal-scene.png",
  author: "Aleksandra Cislowski",
  locale: "en_US",
};

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${siteConfig.url}${normalizedPath}`;
}
