import "@/styles/globals.css";
import "animate.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import RiskProfileHydrate from "@/components/Hydration/RiskProfileHydrate";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Toaster />
      <Analytics />
      <RiskProfileHydrate />

      <Component {...pageProps} />
    </>
  );
}
