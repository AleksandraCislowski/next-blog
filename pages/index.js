import { Fragment } from "react";
import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";

const DUMMY_POST = [
  {
    title: "Getting started with NextJS.",
    image: "getting-started-nextjs.png",
    date: "2022-02-10",
    slug: "getting-started",
    excerpt: "NextJS is the React framework for production.",
  },
  {
    title: "Getting started with NextJS.",
    image: "getting-started-nextjs.png",
    date: "2022-02-10",
    slug: "getting-started22",
    excerpt: "NextJS is the React framework for production.",
  },
  {
    title: "Getting started with NextJS.",
    image: "getting-started-nextjs.png",
    date: "2022-02-10",
    slug: "getting-started3",
    excerpt: "NextJS is the React framework for production.",
  },
  {
    title: "Getting started with NextJS.",
    image: "getting-started-nextjs.png",
    date: "2022-02-10",
    slug: "getting-starte4",
    excerpt: "NextJS is the React framework for production.",
  },
];

function HomePage() {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={DUMMY_POST} />
    </Fragment>
  );
}

export default HomePage;
