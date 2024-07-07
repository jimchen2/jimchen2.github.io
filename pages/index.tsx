import Layout from "../components/Layout";
import Profile from "../components/Profile";
import LinkTree from "../components/LinkTree";
import { links } from "../components/links";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Jim Chen's LinkTree</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <div className="bg-white bg-opacity-90 rounded-lg shadow-2xl p-8 max-w-4xl w-full">
          <Profile />
          <LinkTree links={links} />
        </div>
      </Layout>
    </>
  );
}
