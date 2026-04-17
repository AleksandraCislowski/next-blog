import { Fragment } from "react";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";
import Seo from "../../components/seo/seo";

function AllPostsPage(props) {
  return (
    <Fragment>
      <Seo
        title='All Notes'
        description='Browse travel notes by place, story, date, country, and trip type.'
        path='/posts'
        image='/images/site/alpine-lake.png'
      />
      <AllPosts posts={props.posts} />
    </Fragment>
  );
}

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}

export default AllPostsPage;
