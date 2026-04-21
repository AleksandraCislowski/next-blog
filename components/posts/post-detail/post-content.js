import Image from "next/image";
import classes from "../../../styles/post-content.module.css";
import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown";
import RelatedPosts from "./related-posts";
import PostNavigation from "./post-navigation";
import { getPostImagePosition } from "../../../lib/post-image-positions";

function getFullYearsSince(dateString, now = new Date()) {
  const [startYear, startMonth, startDay] = dateString.split("-").map(Number);

  if (!startYear || !startMonth || !startDay) {
    return "";
  }

  let years = now.getFullYear() - startYear;
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();

  if (
    currentMonth < startMonth ||
    (currentMonth === startMonth && currentDay < startDay)
  ) {
    years -= 1;
  }

  return Math.max(0, years);
}

function resolveDynamicContent(content) {
  return content.replace(/\{\{yearsSince:(\d{4}-\d{2}-\d{2})\}\}/g, (_, date) =>
    getFullYearsSince(date)
  );
}

function PostContent(props) {
  const { post, relatedPosts, previousPost, nextPost } = props;
  const content = resolveDynamicContent(post.content);

  const customRenderers = {
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0]?.tagName === "img") {
        const image = node.children[0];
        const imageAlt = image.properties.alt || image.alt || "";
        const imageSrc = image.properties.src;
        const imagePosition = getPostImagePosition(post.slug, imageSrc);

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
        <ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
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
