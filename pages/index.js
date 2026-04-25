import { Fragment } from "react";
import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import FieldNotes from "../components/home-page/field-notes";
import PlacesOverview from "../components/home-page/places-overview";
import { getAllPostSummaries, getFeaturedPosts } from "../lib/posts-util";
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
        <FieldNotes posts={props.allPosts} />
        <FeaturedPosts posts={props.posts} />
      </div>
    </Fragment>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();
  const allPosts = getAllPostSummaries();

  return {
    props: {
      posts: featuredPosts,
      allPosts,
    },
  };
}

export default HomePage;
