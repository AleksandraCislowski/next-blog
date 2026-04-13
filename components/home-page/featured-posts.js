import classes from "../../styles/featured-posts.module.css";
import PostsGrid from "../posts/posts-grid";

function FeaturedPosts(props) {
  return (
    <section id='featured-notes' className={classes.latest}>
      <h2>Featured Notes</h2>
      <PostsGrid posts={props.posts} />
    </section>
  );
}
export default FeaturedPosts;
