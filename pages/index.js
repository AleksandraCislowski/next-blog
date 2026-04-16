import { Fragment } from "react";
import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import PlacesOverview from "../components/home-page/places-overview";
import { getAllPosts, getFeaturedPosts } from "../lib/posts-util";
import Head from "next/head";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Elsewhere Log</title>
        <meta
          name='description'
          content='Travel notes from places worth remembering.'
        />
      </Head>
      <Hero />
      <div id='highlights'>
        <PlacesOverview posts={props.allPosts} />
        <FeaturedPosts posts={props.posts} />
      </div>
    </Fragment>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();
  const allPosts = getAllPosts();

  return {
    props: {
      posts: featuredPosts,
      allPosts,
    },
  };
}

export default HomePage;
