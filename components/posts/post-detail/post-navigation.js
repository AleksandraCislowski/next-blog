import Link from "next/link";
import classes from "../../../styles/post-navigation.module.css";

function PostNavigation(props) {
  const { previousPost, nextPost } = props;

  if (!previousPost && !nextPost) {
    return null;
  }

  return (
    <nav className={classes.navigation} aria-label='Post navigation'>
      {nextPost && (
        <Link href={`/posts/${nextPost.slug}`} className={classes.link}>
          <span>Next note</span>
          <strong>{nextPost.title}</strong>
        </Link>
      )}
      {previousPost && (
        <Link href={`/posts/${previousPost.slug}`} className={classes.link}>
          <span>Previous note</span>
          <strong>{previousPost.title}</strong>
        </Link>
      )}
    </nav>
  );
}

export default PostNavigation;
