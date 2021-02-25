import Head from 'next/head';
import "../styles/global.css";

import { ChallengesProveider } from '../contexts/ChallengesContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Home | move.it</title>
      </Head>
      <ChallengesProveider>
        <Component {...pageProps} />
      </ChallengesProveider>
        
    </>
  );
}

export default MyApp;
