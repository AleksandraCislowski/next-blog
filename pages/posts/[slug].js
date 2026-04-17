import { Fragment } from "react";
import PostContent from "../../components/posts/post-detail/post-content";
import { getAllPosts, getPostData, getPostsFiles } from "../../lib/posts-util";
import Seo from "../../components/seo/seo";
import { absoluteUrl, siteConfig } from "../../lib/site-config";

function getRelatedPosts(currentPost, allPosts) {
  const currentTags = new Set(currentPost.tags || []);

  return allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const sameCountry = post.location?.country === currentPost.location?.country ? 3 : 0;
      const sharedTags = (post.tags || []).filter((tag) => currentTags.has(tag)).length;

      return {
        post,
        score: sameCountry + sharedTags,
      };
    })
    .sort((firstPost, secondPost) => {
      if (secondPost.score !== firstPost.score) {
        return secondPost.score - firstPost.score;
      }

      return firstPost.post.date > secondPost.post.date ? -1 : 1;
    })
    .slice(0, 3)
    .map((item) => item.post);
}

function getAdjacentPosts(currentPost, allPosts) {
  const currentIndex = allPosts.findIndex((post) => post.slug === currentPost.slug);

  if (currentIndex === -1) {
    return {
      previousPost: null,
      nextPost: null,
    };
  }

  return {
    previousPost: allPosts[currentIndex - 1] || null,
    nextPost: allPosts[currentIndex + 1] || null,
  };
}

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
      <PostContent
        post={post}
        relatedPosts={props.relatedPosts}
        previousPost={props.previousPost}
        nextPost={props.nextPost}
      />
    </Fragment>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);
  const allPosts = getAllPosts();
  const relatedPosts = getRelatedPosts(postData, allPosts);
  const { previousPost, nextPost } = getAdjacentPosts(postData, allPosts);

  return {
    props: {
      post: postData,
      relatedPosts,
      previousPost,
      nextPost,
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
