import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {" "}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}
