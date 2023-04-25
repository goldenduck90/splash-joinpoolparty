import React, { Suspense } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
const DynamicMain = dynamic(() => import('../src/Main'), {
  suspense: true,
  ssr: false
})

const IndexPage = ({}) => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Sniglet:wght@400;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Suspense fallback={`Loading...`}>
        <DynamicMain />
      </Suspense>
    </>
  );
};

export default IndexPage;
