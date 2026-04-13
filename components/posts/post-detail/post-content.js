import Image from "next/image";
import classes from "../../../styles/post-content.module.css";
import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown";

function PostContent(props) {
  const { post } = props;

  const customRenderers = {
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0]?.tagName === "img") {
        const image = node.children[0];
        const imageAlt = image.properties.alt || image.alt || "";

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={imageAlt}
              fill
              sizes='(min-width: 768px) 46rem, 100vw'
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
    </article>
  );
}

export default PostContent;
