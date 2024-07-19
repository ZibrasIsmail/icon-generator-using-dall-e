import Head from "next/head";
import Footer from "~/components/footer";
import Hero from "~/components/hero";
import { ImageList } from "~/components/imageList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Image Generator</title>
        <meta name="description" content="Image Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <ImageList />
      <Footer />
    </>

  )
}

