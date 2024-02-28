import AllPosts from "../../components/posts/all-posts";

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
function AllPostsPage() {
  return <AllPosts posts={DUMMY_POST} />;
}

export default AllPostsPage;
