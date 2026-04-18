import "../styles/globals.css";
import "leaflet/dist/leaflet.css";
import Layout from "../components/layout/layout";
import Head from "next/head";
import RouteLoadingIndicator from "../components/ui/route-loading-indicator";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#33483d' />
        <meta name='application-name' content='Elsewhere Log' />
        <link rel='icon' type='image/png' href='/images/site/elsewhere-logo.png' />
        <link rel='apple-touch-icon' href='/images/site/elsewhere-logo.png' />
      </Head>
      <RouteLoadingIndicator />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
