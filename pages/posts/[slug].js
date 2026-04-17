import { Fragment } from "react";
import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";
import Seo from "../../components/seo/seo";
import { absoluteUrl, siteConfig } from "../../lib/site-config";

function PostDetailPage(props) {
  const { post } = props;

  return (
    <Fragment>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/posts/${post.slug}`}
        image={post.imagePath}
        type='article'
        publishedTime={post.date}
        tags={post.tags}
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: absoluteUrl(post.imagePath),
          datePublished: post.date,
          author: {
            "@type": "Person",
            name: siteConfig.author,
          },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: {
              "@type": "ImageObject",
              url: absoluteUrl("/images/site/elsewhere-logo.png"),
            },
          },
          mainEntityOfPage: absoluteUrl(`/posts/${post.slug}`),
        }}
      />
      <PostContent post={post} />
    </Fragment>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);
  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFilenames = getPostsFiles();

  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default PostDetailPage;
