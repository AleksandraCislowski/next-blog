import classes from "../../styles/posts-grid.module.css";
import PostItem from "./post-item";

function PostsGrid(props) {
  const { posts } = props;

  return (
    <ul className={classes.grid}>
      {posts.map((post, index) => (
        <PostItem key={post.slug} post={post} priority={index < 6} />
      ))}
    </ul>
  );
}

export default PostsGrid;
