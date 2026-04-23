import classes from "../../styles/posts-grid.module.css";
import PostItem from "./post-item";

function PostsGrid(props) {
  const { posts, priorityCount = 0 } = props;

  return (
    <ul className={classes.grid}>
      {posts.map((post, index) => (
        <PostItem key={post.slug} post={post} priority={index < priorityCount} />
      ))}
    </ul>
  );
}

export default PostsGrid;
