import Head from 'next/head';
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Home | move.it</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
