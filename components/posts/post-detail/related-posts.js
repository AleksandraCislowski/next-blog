import PostsGrid from "../posts-grid";
import classes from "../../../styles/related-posts.module.css";

function RelatedPosts(props) {
  const { posts } = props;

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className={classes.related} aria-labelledby='related-posts-heading'>
      <div className={classes.header}>
        <p>Read next</p>
        <h2 id='related-posts-heading'>More notes from nearby routes.</h2>
      </div>
      <PostsGrid posts={posts} />
    </section>
  );
}

export default RelatedPosts;
