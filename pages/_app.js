import "../styles/globals.css";
import "leaflet/dist/leaflet.css";
import Layout from "../components/layout/layout";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/png' href='/images/site/elsewhere-logo.png' />
        <link rel='apple-touch-icon' href='/images/site/elsewhere-logo.png' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
