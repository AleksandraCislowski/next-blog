import Image from "next/image";
import classes from "../../../styles/post-content.module.css";
import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown";
import RelatedPosts from "./related-posts";
import PostNavigation from "./post-navigation";

const imagePositions = {
  "wroclaw/wroclaw4.JPG": "center 20%",
};

function PostContent(props) {
  const { post, relatedPosts, previousPost, nextPost } = props;

  const customRenderers = {
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0]?.tagName === "img") {
        const image = node.children[0];
        const imageAlt = image.properties.alt || image.alt || "";
        const imageSrc = image.properties.src;
        const imagePosition = imagePositions[`${post.slug}/${imageSrc}`];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${imageSrc}`}
              alt={imageAlt}
              fill
              quality={90}
              sizes='(min-width: 768px) 48rem, 90vw'
              style={imagePosition ? { objectPosition: imagePosition } : undefined}
            />
            {imageAlt && <span>{imageAlt}</span>}
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader post={post} />
      <div className={classes.body}>
        <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
      </div>
      <PostNavigation previousPost={previousPost} nextPost={nextPost} />
      <RelatedPosts posts={relatedPosts} />
      <footer className={classes.footer}>
        <a href='#page-top' className={classes.backToTop}>
          Back to top
        </a>
      </footer>
    </article>
  );
}

export default PostContent;
