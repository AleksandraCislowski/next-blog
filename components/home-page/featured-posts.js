import classes from "../../styles/featured-posts.module.css";
import PostsGrid from "../posts/posts-grid";

function FeaturedPosts(props) {
  return (
    <section className={classes.latest}>
      <h2>Highlights</h2>
      <PostsGrid posts={props.posts} priorityCount={1} />
    </section>
  );
}
export default FeaturedPosts;
