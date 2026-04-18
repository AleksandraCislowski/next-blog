import { absoluteUrl } from "../lib/site-config";

function RobotsTxt() {}

export function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/plain");
  res.write(`User-agent: *
Allow: /

Sitemap: ${absoluteUrl("/sitemap.xml")}
`);
  res.end();

  return {
    props: {},
  };
}

export default RobotsTxt;
