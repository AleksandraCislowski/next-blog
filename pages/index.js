import { Fragment } from "react";
import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import PlacesOverview from "../components/home-page/places-overview";
import { getAllPosts, getFeaturedPosts } from "../lib/posts-util";
import Seo from "../components/seo/seo";
import { absoluteUrl, siteConfig } from "../lib/site-config";

function HomePage(props) {
  return (
    <Fragment>
      <Seo
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          description: siteConfig.description,
          url: absoluteUrl("/"),
          author: {
            "@type": "Person",
            name: siteConfig.author,
          },
        }}
      />
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
