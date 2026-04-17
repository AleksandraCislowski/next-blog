import Head from "next/head";
import { absoluteUrl, siteConfig } from "../../lib/site-config";

function Seo(props) {
  const {
    title = siteConfig.title,
    description = siteConfig.description,
    path = "/",
    image = siteConfig.defaultImage,
    type = "website",
    publishedTime,
    tags = [],
    schema,
  } = props;
  const pageTitle = title === siteConfig.title ? title : `${title} | ${siteConfig.name}`;
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name='description' content={description} />
      <meta name='author' content={siteConfig.author} />
      <link rel='canonical' href={canonicalUrl} />

      <meta property='og:site_name' content={siteConfig.name} />
      <meta property='og:locale' content={siteConfig.locale} />
      <meta property='og:type' content={type} />
      <meta property='og:title' content={pageTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={canonicalUrl} />
      <meta property='og:image' content={imageUrl} />
      <meta property='og:image:alt' content={title} />

      {publishedTime && <meta property='article:published_time' content={publishedTime} />}
      {type === "article" && <meta property='article:author' content={siteConfig.author} />}
      {tags.map((tag) => (
        <meta key={tag} property='article:tag' content={tag} />
      ))}

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={pageTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={imageUrl} />

      {schema && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </Head>
  );
}

export default Seo;
